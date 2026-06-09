#!/usr/bin/env python3
"""Blog generator for H&S Insulation.

Reads .seo/context.json to pick a high-priority insulation keyword, calls
Gemini with the H&S brand-voice system prompt, validates the output, and
writes a markdown file to content/blog/ in the schema src/lib/content.ts
reads (title, description, date, author, category, cover + body sections).
GitHub Actions handles the commit + push.

Cloned from the canonical Gina pattern (2026-06-09). Cadence is monthly for
H&S (contract = 1 post/month) but the engine supports any cadence.
"""

import json
import os
import random
import re
import sys
import time
import urllib.request
import urllib.error
from datetime import datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BLOG_DIR = ROOT / "content" / "blog"
CONTEXT_PATH = ROOT / ".seo" / "context.json"
LINKS_PATH = ROOT / ".seo" / "internal-links.json"
LIBRARY_DIR = ROOT / "public" / "images" / "blog" / "library"

GEMINI_MODEL = "gemini-2.5-flash"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"

SHEET_ID = "TODO_HS_CONTENT_TRACKER_SHEET_ID"  # set when the H&S content tracker sheet is created
SHEET_TAB = "posted_content_log"
SITE_BASE = "https://hernandezinsulation.com"

# Fallback cover images (branded placeholders) by cluster, used until the
# blog image library is populated. Swap for /images/blog/library/<file> once stocked.
FALLBACK_COVERS = {
    "sprayFoam": "/images/services/spray-foam.svg",
    "blownIn": "/images/services/blown-in.svg",
    "batt": "/images/services/batt.svg",
    "removal": "/images/services/vacuum-removal.svg",
    "cost": "/images/before-after/attic-after.svg",
    "comfort": "/images/before-after/attic-before.svg",
    "energy": "/images/textures/sprayfoam-closeup.svg",
    None: "/images/services/finished-beauty.svg",
}

CLUSTER_KEYWORDS = {
    "sprayFoam": [
        "spray foam insulation yuba city",
        "closed cell spray foam attic california",
        "open cell vs closed cell spray foam",
        "is spray foam insulation worth it",
        "spray foam crawl space insulation",
    ],
    "blownIn": [
        "blown in insulation attic yuba city",
        "blown in cellulose insulation cost",
        "blown in vs batt attic insulation",
        "topping up attic insulation california",
    ],
    "batt": [
        "batt insulation new construction california",
        "mineral wool vs fiberglass batt",
        "garage wall insulation california",
    ],
    "removal": [
        "old insulation removal attic california",
        "rodent contaminated insulation removal",
        "when to replace attic insulation",
    ],
    "cost": [
        "attic insulation cost northern california",
        "how much does spray foam insulation cost",
        "is new insulation tax deductible california",
        "insulation cost vs energy savings",
    ],
    "comfort": [
        "signs you need new insulation",
        "why is my house so hot upstairs",
        "how to lower energy bills insulation",
    ],
    "energy": [
        "title 24 attic insulation requirements california",
        "r value attic insulation california climate zone",
        "air sealing and insulation savings",
    ],
}

SEASONAL = {
    1: ["winter heating bill insulation california", "cold rooms insulation foothills"],
    2: ["air sealing drafts insulation california", "attic insulation winter savings"],
    3: ["spring home energy upgrade insulation", "attic insulation inspection california"],
    4: ["prepare home for summer heat insulation", "attic insulation before summer"],
    5: ["beat valley heat attic insulation", "is your attic ready for summer heat"],
    6: ["summer attic heat insulation yuba city", "how to keep upstairs cool insulation"],
    7: ["reduce ac bills attic insulation", "summer energy savings insulation california"],
    8: ["back to school home energy upgrade", "attic insulation late summer heat"],
    9: ["fall home prep insulation california", "get attic ready for winter insulation"],
    10: ["winterize home insulation foothills", "tahoe cabin insulation before snow"],
    11: ["holiday season warm home insulation", "lower heating bills before winter"],
    12: ["winter ready attic insulation california", "cold weather insulation tahoe truckee"],
}

CLUSTER_HINTS = {
    "sprayFoam": ["spray foam", "closed cell", "open cell"],
    "blownIn": ["blown in", "blown-in", "cellulose", "loose fill"],
    "batt": ["batt", "fiberglass roll", "mineral wool"],
    "removal": ["removal", "remove old", "contaminated", "rodent"],
    "cost": ["cost", "price", "how much", "tax deductible", "worth it"],
    "comfort": ["comfort", "drafty", "hot upstairs", "cold room", "signs you need"],
    "energy": ["r value", "r-value", "title 24", "air sealing", "energy bill", "savings"],
}


def slugify(s: str) -> str:
    s = re.sub(r"[^a-z0-9\s-]", "", s.lower())
    s = re.sub(r"\s+", "-", s).strip("-")
    return "-".join(s.split("-")[:6])


def existing_slugs() -> set:
    return {f.stem for f in BLOG_DIR.glob("*.md")}


def load_context() -> dict:
    if not CONTEXT_PATH.exists():
        return {}
    return json.loads(CONTEXT_PATH.read_text())


def load_internal_links() -> str:
    if not LINKS_PATH.exists():
        return ""
    data = json.loads(LINKS_PATH.read_text())
    lines = []
    for cluster, entries in sorted(data.get("byCluster", {}).items()):
        for e in entries[:6]:
            title, url = e.get("title", ""), e.get("url", "")
            if title and url:
                lines.append(f"- [{title}]({url})")
    return "\n".join(lines)


def _cluster_of(keyword: str):
    for cluster, kws in CLUSTER_KEYWORDS.items():
        if keyword in kws:
            return cluster
    kw = keyword.lower()
    for cluster, hints in CLUSTER_HINTS.items():
        if any(h in kw for h in hints):
            return cluster
    return None


def _recent_cluster_counts(n: int = 5) -> dict:
    counts = {c: 0 for c in CLUSTER_KEYWORDS}
    posts = sorted(BLOG_DIR.glob("*.md"), key=lambda p: p.stat().st_mtime, reverse=True)[:n]
    for p in posts:
        c = _cluster_of(p.stem.replace("-", " "))
        if c:
            counts[c] += 1
    return counts


def pick_keyword(context: dict, used: set):
    candidates = []
    for sp in context.get("strategicPriorities", [])[:3]:
        cluster = sp.get("cluster")
        for kw in CLUSTER_KEYWORDS.get(cluster, []):
            candidates.append((kw, f"strategic-{cluster}", cluster, 12.0))
    for q in context.get("opportunityQueries", [])[:10]:
        kw = q.get("query", "")
        if kw:
            score = 8.0 + (2.0 if q.get("nearMiss") else 0.0)
            candidates.append((kw, "opportunity-context", _cluster_of(kw), score))
    month = datetime.now().month
    for kw in SEASONAL.get(month, []):
        candidates.append((kw, "seasonal", _cluster_of(kw), 4.0))

    fresh = [c for c in candidates if slugify(c[0]) not in used]
    if not fresh:
        fresh = [("attic insulation services yuba city", "fallback", None, 0.0)]

    recent = _recent_cluster_counts()
    print(f"Recent cluster counts: {recent}")
    penalized = [(kw, src, cl, score - recent.get(cl, 0) * 3.0) for kw, src, cl, score in fresh]
    penalized.sort(key=lambda c: c[3], reverse=True)
    positive = [c for c in penalized if c[3] > 0]
    pool = positive if positive else penalized
    top = pool[:5]
    print("Top candidates:")
    for kw, src, cl, score in top:
        print(f"  {score:5.1f}  [{cl or '?':>10}]  {kw}  ({src})")
    chosen = random.choice(top)
    return chosen[0], chosen[1], chosen[2]


def pick_category() -> str:
    weights = {"Insulation 101": 35, "Cost & Value": 25, "Home Comfort": 25, "Energy Savings": 15}
    pool = [c for c, w in weights.items() for _ in range(w)]
    return random.choice(pool)


def pick_cover(cluster) -> str:
    if LIBRARY_DIR.exists():
        imgs = [p for p in LIBRARY_DIR.glob("*") if p.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp")]
        if imgs:
            return f"/images/blog/library/{random.choice(imgs).name}"
    return FALLBACK_COVERS.get(cluster, FALLBACK_COVERS[None])


def build_system_prompt(internal_links_md: str) -> str:
    return f"""# H&S Insulation, Blog Post Content Engine

You write SEO and AEO optimized blog posts for hernandezinsulation.com. Your ONLY output is a single blog post markdown file with YAML frontmatter. No other deliverables.

## About H&S Insulation

- Locally owned insulation contractor in Yuba City, CA. Serving Northern California since 2020.
- Owner and lead installer: Heradio Hernandez. Bilingual, serves English and Spanish speaking families.
- Services: spray foam (open and closed cell), blown-in (cellulose and fiberglass), batt (fiberglass and mineral wool), and full removal of old insulation, plus air sealing.
- Phone: (916) 912-2080. Hours: Monday to Saturday, 7 AM to 6 PM.
- Service areas: Yuba City, Marysville, Sutter County, Grass Valley, Auburn, Truckee, Lake Tahoe.

## Voice Rules (MUST follow)

- Confident, plain spoken, tradesman credible. Warm and reassuring, never high pressure.
- Short punchy sentences. Vary length. Active voice.
- NO hyphens used as punctuation and NO em dashes or en dashes. Use "to" for ranges: "5 to 10 days", "$1,500 to $3,000". Hyphenated compound words like "blown-in" and "closed-cell" are fine.
- NO AI filler: "in today's world", "whether you're", "let's dive in", "in conclusion", "when it comes to", "first and foremost", "at the end of the day", "navigating", "nestled".
- NO emojis. Max 1 exclamation mark in the entire post.
- Ground content in the real NorCal climate and homes (hot valley summers, cold foothill and Tahoe winters, older Marysville housing stock).
- Mention the bilingual angle naturally. Never invent reviews, testimonials, or fake credentials (company is newer, honesty is the brand).
- NEVER use "click here" or "learn more" as link anchor text.

## Output Format (REQUIRED)

Start IMMEDIATELY with YAML frontmatter (do NOT wrap in ```markdown or ```yaml):

---
title: "..." (45 to 60 chars, primary keyword in first 5 words)
description: "..." (140 to 155 chars, include keyword)
date: "YYYY-MM-DD"
author: "Heradio Hernandez"
category: "Insulation 101" OR "Cost & Value" OR "Home Comfort" OR "Energy Savings"
cover: "{{COVER}}"
---

Then the body in this exact structure:

## Quick answer
(1 to 2 sentences, direct answer to the keyword. Do not start with Yes, No, or Well.)

## (5 to 8 H2 sections, framed to match search queries, keyword in 2+ headings)
...

## Key takeaways
- (4 to 5 bullets, 10 to 25 words each, at least 1 with a specific number)

## Frequently asked questions
**Question?**
Answer in under 300 chars, self contained. (3 to 5 of these.)

End with a one sentence CTA that links to /contact and includes the phone (916) 912-2080.

## Body Requirements (HARD RULES, violating means rejection)

- 800 to 1300 words in the body.
- 5 to 8 H2 headings (the Quick answer, Key takeaways, and FAQ count toward this).
- A comparison table OR a cost/spec table somewhere in the body (AEO citation magnet).
- Internal links: minimum 3, descriptive anchors only, from the library below.
- At least 2 specific NorCal cities or neighborhoods.
- A cost or R-value specific number somewhere.
- Reference Title 24 / California energy code where relevant (attics typically target around R-38).

## Internal Link Library (use 3 to 5 of these LIVE pages)

{internal_links_md}

Format: [descriptive anchor text](URL). Anchors must be specific.

## Self-Check Before Outputting

Verify every rule. Your ENTIRE output is just the markdown file starting with --- and ending with the CTA. Nothing else."""


def build_user_prompt(keyword: str, category: str, source: str, cover: str) -> str:
    today = datetime.now().strftime("%Y-%m-%d")
    return f"""Today's date is {today}.

TARGETED KEYWORD: {keyword}
CONTENT CATEGORY: {category}
KEYWORD SOURCE: {source}
COVER IMAGE TO USE: {cover}

Write a comprehensive blog post targeting this keyword for H&S Insulation. Apply every voice rule, the output format, and the internal link library from the system prompt. Output only the markdown file starting with --- frontmatter."""


def call_gemini(system_prompt: str, user_prompt: str, api_key: str) -> str:
    body = {
        "contents": [{"role": "user", "parts": [{"text": user_prompt}]}],
        "systemInstruction": {"parts": [{"text": system_prompt}]},
        "generationConfig": {"temperature": 0.7, "maxOutputTokens": 8192},
    }
    url = f"{GEMINI_URL}?key={api_key}"
    data = json.dumps(body).encode()
    last_err = None
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"}, method="POST")
            with urllib.request.urlopen(req, timeout=120) as resp:
                payload = json.loads(resp.read())
                return payload["candidates"][0]["content"]["parts"][0]["text"]
        except (urllib.error.URLError, urllib.error.HTTPError, KeyError, IndexError) as e:
            last_err = e
            print(f"Gemini attempt {attempt + 1} failed: {e}", file=sys.stderr)
            if attempt < 2:
                time.sleep(30)
    raise RuntimeError(f"Gemini failed after 3 attempts: {last_err}")


def fm_field(fm: str, name: str) -> str:
    m = re.search(rf'^{name}:\s*"([^"]+)"', fm, re.MULTILINE)
    return m.group(1) if m else ""


def validate_and_extract(text: str):
    text = re.sub(r"^```(?:yaml|markdown|md)?\n", "", text.strip())
    text = re.sub(r"\n```\s*$", "", text)
    fm_match = re.match(r"^---\n([\s\S]*?)\n---", text)
    if not fm_match:
        raise ValueError("Output missing YAML frontmatter")
    fm = fm_match.group(1)
    body = text[len(fm_match.group(0)):].strip()

    missing = [r for r in ("title", "description", "date", "author", "category", "cover") if not fm_field(fm, r)]
    if missing:
        raise ValueError(f"Missing required frontmatter: {missing}")

    if "—" in text or "–" in text:
        raise ValueError("Output contains an em or en dash (banned by content rules)")

    wc = len(re.findall(r"\S+", body))
    if wc < 500:
        raise ValueError(f"Body has only {wc} words (need 500+)")
    h2 = len(re.findall(r"^## ", body, re.MULTILINE))
    if h2 < 3:
        raise ValueError(f"Only {h2} H2 headings (need 3+)")

    print(f"Validation OK: {wc} words, {h2} H2s")
    return fm_field(fm, "title"), text


def log_to_sheet(slug: str, title: str, category: str, status: str) -> None:
    sa_json = os.environ.get("GCP_SA_KEY_JSON")
    if not sa_json or SHEET_ID.startswith("TODO"):
        print("(sheet log skipped: no GCP_SA_KEY_JSON or sheet not configured)")
        return
    try:
        import gspread  # type: ignore
        from google.oauth2.service_account import Credentials  # type: ignore
        creds = Credentials.from_service_account_info(
            json.loads(sa_json), scopes=["https://www.googleapis.com/auth/spreadsheets"]
        )
        gc = gspread.authorize(creds)
        ws = gc.open_by_key(SHEET_ID).worksheet(SHEET_TAB)
        ws.append_row(
            [datetime.now().strftime("%Y-%m-%d %H:%M"), "blog", "blog", title,
             f"{SITE_BASE}/blog/{slug}/", category, slug, status],
            value_input_option="USER_ENTERED",
        )
        print(f"Logged to sheet: {slug}")
    except Exception as e:
        print(f"WARN: sheet log failed: {e}", file=sys.stderr)


def main() -> int:
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("ERROR: GEMINI_API_KEY not set", file=sys.stderr)
        return 2

    context = load_context()
    internal_links = load_internal_links()
    used = existing_slugs()

    keyword, source, cluster = pick_keyword(context, used)
    category = pick_category()
    cover = pick_cover(cluster)
    print(f"Topic: {keyword!r} | source={source} | cluster={cluster} | category={category}")

    system_prompt = build_system_prompt(internal_links).replace("{COVER}", cover)
    user_prompt = build_user_prompt(keyword, category, source, cover)

    raw = call_gemini(system_prompt, user_prompt, api_key)
    title, content = validate_and_extract(raw)

    date_str = datetime.now().strftime("%Y-%m-%d")
    slug = slugify(keyword)
    final_slug = slug if slug not in used else f"{slug}-{date_str}"
    content = re.sub(r'date:\s*"[^"]+"', f'date: "{date_str}"', content, count=1)
    content = re.sub(r'cover:\s*"[^"]+"', f'cover: "{cover}"', content, count=1)

    out_path = BLOG_DIR / f"{final_slug}.md"
    out_path.write_text(content)
    print(f"WROTE: {out_path}")

    log_to_sheet(final_slug, title, category, "published")
    return 0


if __name__ == "__main__":
    sys.exit(main())
