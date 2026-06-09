#!/usr/bin/env node
// Builds .seo/internal-links.json from live pages, used by daily-blog.py to
// inject real internal links. H&S services + service-areas are TypeScript data
// (src/lib/site.ts), so we read them from there; blog posts are markdown.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, ".seo");
const OUT = path.join(OUT_DIR, "internal-links.json");

function classifyCluster(text) {
  const t = (text || "").toLowerCase();
  if (/spray foam|closed cell|open cell/.test(t)) return "sprayFoam";
  if (/blown.?in|cellulose|loose fill/.test(t)) return "blownIn";
  if (/batt|fiberglass roll|mineral wool/.test(t)) return "batt";
  if (/removal|remove old|contaminated|rodent/.test(t)) return "removal";
  if (/cost|price|how much|worth it|tax deductible/.test(t)) return "cost";
  if (/comfort|drafty|hot upstairs|cold room|signs you need/.test(t)) return "comfort";
  if (/r.?value|title 24|air seal|energy|savings/.test(t)) return "energy";
  return "general";
}

// 1. Services + service areas, parsed out of src/lib/site.ts (no TS runtime needed).
const siteSrc = fs.readFileSync(path.join(ROOT, "src/lib/site.ts"), "utf8");

function extractEntries(arrayName, urlPrefix) {
  const out = [];
  const re = new RegExp(`slug:\\s*"([^"]+)"[\\s\\S]*?(?:name|city):\\s*"([^"]+)"`, "g");
  const block = siteSrc.split(`export const ${arrayName}`)[1] || "";
  const stop = block.indexOf("\nexport ");
  const scoped = stop > -1 ? block.slice(0, stop) : block;
  let m;
  while ((m = re.exec(scoped))) {
    out.push({ slug: m[1], title: m[2], url: `${urlPrefix}/${m[1]}/` });
  }
  return out;
}

const services = extractEntries("services", "/services").map((e) => ({
  ...e, type: "service", cluster: classifyCluster(`${e.title} ${e.slug}`),
}));
const areas = extractEntries("serviceAreas", "/service-areas").map((e) => ({
  ...e, type: "area", title: `Insulation in ${e.title}`, cluster: "general",
}));

// 2. Blog posts from content/blog markdown.
function readBlog() {
  const dir = path.join(ROOT, "content", "blog");
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md")).map((f) => {
    const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
    const slug = f.replace(/\.md$/, "");
    return {
      type: "blog", slug, title: data.title || slug,
      url: `/blog/${slug}/`, cluster: classifyCluster(`${data.title} ${slug} ${data.category}`),
    };
  });
}

const entries = [...services, ...areas, ...readBlog()];
const byCluster = {};
for (const e of entries) {
  (byCluster[e.cluster] ||= []).push({ slug: e.slug, title: e.title, url: e.url, type: e.type });
}

const library = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  totalEntries: entries.length,
  totalServices: services.length,
  totalAreas: areas.length,
  totalBlogPosts: entries.filter((e) => e.type === "blog").length,
  byCluster,
  entries,
};

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT, JSON.stringify(library, null, 2), "utf8");
console.log(`Wrote internal-links.json — ${entries.length} entries across ${Object.keys(byCluster).length} clusters`);
