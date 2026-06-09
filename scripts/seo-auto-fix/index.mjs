#!/usr/bin/env node
/**
 * SEO Auto-Fix — weekly cron-driven SEO remediation.
 *
 * Reads seo-config.json at repo root for per-client settings, runs each
 * enabled fixer, writes a markdown report, updates history. The GitHub
 * Actions workflow commits + files an issue + emails the report.
 *
 * Replication: copy this file + seo-config.json + workflow into any
 * client repo. Edit seo-config.json only.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "..");
const dryRun = process.argv.includes("--dry-run");
const isCI = process.env.CI === "true";

const configPath = path.join(root, "seo-config.json");
if (!fs.existsSync(configPath)) {
  console.error("seo-config.json missing at repo root — aborting");
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const report = {
  runDate: new Date().toISOString(),
  week: weekStamp(),
  client: config.client,
  dryRun,
  fixes: [],
  skipped: [],
  errors: [],
  before: {},
  after: {},
};

run().catch((e) => {
  report.errors.push({ step: "top-level", message: e.message });
  writeReport();
  process.exit(1);
});

async function run() {
  log(`SEO auto-fix starting ${dryRun ? "(DRY RUN)" : ""} for ${config.client}`);

  report.before = snapshotSchemas();

  await fix_serviceAreaPages_addServiceSchema();

  report.after = snapshotSchemas();
  writeReport();

  log(`Done. fixes=${report.fixes.length} skipped=${report.skipped.length} errors=${report.errors.length}`);
}

// ─────────────────────────────────────────────────────────
// Fixer: per-city Service schema on service area pages
// ─────────────────────────────────────────────────────────
async function fix_serviceAreaPages_addServiceSchema() {
  const libPath = path.join(root, config.paths.schemaLib);
  const pagePath = path.join(root, config.paths.serviceAreaTemplate);

  if (!fs.existsSync(libPath) || !fs.existsSync(pagePath)) {
    report.skipped.push({
      fix: "service-area-schema",
      reason: `schemaLib or serviceAreaTemplate missing (${config.paths.schemaLib}, ${config.paths.serviceAreaTemplate})`,
    });
    return;
  }

  let lib = fs.readFileSync(libPath, "utf8");
  let page = fs.readFileSync(pagePath, "utf8");

  // 1. Ensure serviceAreaSchema() exists in lib (client-specific values)
  if (!/export function serviceAreaSchema\b/.test(lib)) {
    const b = config.business;
    const helper = `
export function serviceAreaSchema(area: {
  slug: string;
  name: string;
  metaDescription?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: \`${b.serviceType} in \${area.name}, ${b.address.region}\`,
    description:
      area.metaDescription ||
      \`${b.defaultDescription.replace(/"/g, '\\"')} Serving \${area.name}, ${b.address.region}.\`,
    url: \`${b.siteUrl}/service-areas/\${area.slug}/\`,
    serviceType: "${b.serviceType}",
    provider: {
      "@type": ${JSON.stringify(b.schemaTypes)},
      name: "${b.name}",
      telephone: "${b.telephone}",
      url: "${b.siteUrl}",
      image: "${b.image}",
      address: {
        "@type": "PostalAddress",
        addressLocality: "${b.address.locality}",
        addressRegion: "${b.address.region}",
        addressCountry: "${b.address.country}",
      },
    },
    areaServed: {
      "@type": "City",
      name: area.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "${b.containedInPlace}",
      },
    },
  };
}
`;
    if (!dryRun) {
      fs.writeFileSync(libPath, lib.trimEnd() + "\n" + helper);
    }
    report.fixes.push({
      fix: "service-area-schema",
      file: config.paths.schemaLib,
      change: "Added serviceAreaSchema() helper",
    });
  }

  // 2. Wire serviceAreaSchema into the service-area template
  if (!/serviceAreaSchema/.test(page)) {
    page = page.replace(
      /import\s*{\s*([^}]+?)\s*}\s*from\s*"@\/lib\/schema";/,
      (m, inner) => {
        const names = inner.split(",").map((s) => s.trim()).filter(Boolean);
        if (!names.includes("serviceAreaSchema")) names.push("serviceAreaSchema");
        return `import { ${names.join(", ")} } from "@/lib/schema";`;
      }
    );

    const injectionMarker = /(dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(faqSchema\(area\.faqs\)\)\s*\}\}\s*\/>)/;
    if (injectionMarker.test(page)) {
      page = page.replace(
        injectionMarker,
        `$1
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreaSchema(area)) }}
      />`
      );
      if (!dryRun) {
        fs.writeFileSync(pagePath, page);
      }
      report.fixes.push({
        fix: "service-area-schema",
        file: config.paths.serviceAreaTemplate,
        change: "Wired serviceAreaSchema() into template (applies to all city pages)",
      });
    } else {
      report.errors.push({
        step: "service-area-schema-inject",
        message: `Injection marker not found in ${config.paths.serviceAreaTemplate} — template likely does not follow expected pattern (faqSchema(area.faqs) script block)`,
      });
    }
  } else {
    report.skipped.push({
      fix: "service-area-schema",
      reason: "Already wired",
    });
  }
}

// ─────────────────────────────────────────────────────────
// Measurement
// ─────────────────────────────────────────────────────────
function snapshotSchemas() {
  const counts = {};
  for (const p of config.pagesToAudit) {
    const full = path.join(root, p);
    if (!fs.existsSync(full)) { counts[p] = 0; continue; }
    const src = fs.readFileSync(full, "utf8");
    counts[p] = (src.match(/application\/ld\+json/g) || []).length;
  }
  return counts;
}

// ─────────────────────────────────────────────────────────
// Report writer
// ─────────────────────────────────────────────────────────
function writeReport() {
  const dir = path.join(root, "reports/seo-fixes");
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${report.week}.md`);

  const lines = [];
  lines.push(`# SEO Auto-Fix Report — ${report.week}`);
  lines.push(``);
  lines.push(`**Client:** ${report.client}`);
  lines.push(`**Run:** ${report.runDate}${dryRun ? " (dry run — no changes written)" : ""}`);
  lines.push(``);
  lines.push(`## Summary`);
  lines.push(`- Fixes applied: **${report.fixes.length}**`);
  lines.push(`- Skipped (already done): ${report.skipped.length}`);
  lines.push(`- Errors: ${report.errors.length}`);
  lines.push(``);

  if (report.fixes.length) {
    lines.push(`## Fixes`);
    for (const f of report.fixes) {
      lines.push(`- **${f.fix}** — \`${f.file}\``);
      lines.push(`  - ${f.change}`);
    }
    lines.push(``);
  }

  lines.push(`## Schema Count — Before → After`);
  lines.push(`| Page | Before | After | Δ |`);
  lines.push(`|------|--------|-------|---|`);
  for (const key of Object.keys(report.after)) {
    const b = report.before[key] ?? 0;
    const a = report.after[key] ?? 0;
    const d = a - b;
    const darrow = d > 0 ? `+${d} ✓` : d < 0 ? `${d} ⚠️` : "—";
    lines.push(`| \`${key}\` | ${b} | ${a} | ${darrow} |`);
  }
  lines.push(``);

  if (report.skipped.length) {
    lines.push(`## Skipped`);
    for (const s of report.skipped) lines.push(`- ${s.fix}: ${s.reason}`);
    lines.push(``);
  }

  if (report.errors.length) {
    lines.push(`## Errors`);
    for (const e of report.errors) lines.push(`- **${e.step}**: ${e.message}`);
    lines.push(``);
  }

  lines.push(`## Evidence`);
  lines.push(`- Rich Results Test (any city page): https://search.google.com/test/rich-results?url=${encodeURIComponent(config.business.siteUrl + "/service-areas/")}`);
  lines.push(`- GSC impressions impact: visible 7-14 days after deploy in Search Console`);
  lines.push(``);

  if (!dryRun) {
    fs.writeFileSync(file, lines.join("\n"));
    log(`Report written: ${path.relative(root, file)}`);

    const histPath = path.join(root, "reports/seo-fixes/history.json");
    let history = [];
    if (fs.existsSync(histPath)) {
      try { history = JSON.parse(fs.readFileSync(histPath, "utf8")); } catch {}
    }
    history.push({
      week: report.week,
      runDate: report.runDate,
      fixesCount: report.fixes.length,
      schemaBefore: report.before,
      schemaAfter: report.after,
    });
    fs.writeFileSync(histPath, JSON.stringify(history, null, 2));
  } else {
    console.log("\n" + lines.join("\n"));
  }
}

function weekStamp() {
  return new Date().toISOString().slice(0, 10);
}

function log(msg) {
  console.log((isCI ? "" : "[seo-auto-fix] ") + msg);
}
