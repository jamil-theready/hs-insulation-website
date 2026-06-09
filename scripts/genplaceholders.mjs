// Generates on-brand SVG placeholder panels for every photo slot.
// Graphite gradient + orange insulation-wave motif + faint house monogram.
// Swap any file with a real/AI .jpg of the same name to upgrade the slot.
import { mkdirSync, writeFileSync } from "node:fs";

const ORANGE = "#F26A21";
const INK = "#16181b";
const INK2 = "#24282d";
const CREAM = "#f1f0ee";

function waves(cx, cy, n, step, amp, span, stroke, w, opacity = 1) {
  let out = "";
  for (let i = 0; i < n; i++) {
    const y = cy + i * step;
    const x0 = cx - span / 2;
    out += `<path d="M${x0},${y} q${span / 12},${amp} ${span / 6},0 t${span / 6},0 t${span / 6},0 t${span / 6},0 t${span / 6},0 t${span / 6},0" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" opacity="${opacity}"/>`;
  }
  return out;
}

function house(x, y, s, stroke, w, opacity) {
  return `<g transform="translate(${x},${y}) scale(${s})" opacity="${opacity}"><path d="M180,40 L110,96 L110,178 L250,178 L250,96 Z" fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"/></g>`;
}

function panel({ w, h, seed = 0, label = "" }) {
  const rot = (seed * 23) % 18 - 9;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${INK}"/>
      <stop offset="0.55" stop-color="${INK2}"/>
      <stop offset="1" stop-color="${INK}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.7" cy="0.25" r="0.9">
      <stop offset="0" stop-color="${ORANGE}" stop-opacity="0.20"/>
      <stop offset="0.6" stop-color="${ORANGE}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <g transform="rotate(${rot} ${w / 2} ${h / 2})">
    ${waves(w / 2, h * 0.5 - (h * 0.18), 6, h * 0.07, h * 0.05, w * 1.3, ORANGE, Math.max(2, h / 120), 0.85)}
  </g>
  ${house(w / 2 - 180 * (h / 360), h / 2 - 110 * (h / 360), h / 360, CREAM, 9, 0.06)}
  ${label ? `<text x="${w / 2}" y="${h - h * 0.08}" text-anchor="middle" font-family="Inter, sans-serif" font-weight="600" font-size="${Math.max(11, h * 0.035)}" letter-spacing="2" fill="${CREAM}" opacity="0.30">${label}</text>` : ""}
</svg>`;
  return svg;
}

const base = "public/images";
const slots = [
  ["hero/hero-attic-sprayfoam.jpg", 1600, 1000, 1, ""],
  ["hero/hero-truck.jpg", 1600, 1000, 2, ""],
  ["before-after/attic-before.jpg", 1000, 750, 3, "BEFORE"],
  ["before-after/attic-after.jpg", 1000, 750, 4, "AFTER"],
  ["services/spray-foam.jpg", 1000, 750, 5, "SPRAY FOAM"],
  ["services/blown-in.jpg", 1000, 750, 6, "BLOWN-IN"],
  ["services/batt.jpg", 1000, 750, 7, "BATT"],
  ["services/vacuum-removal.jpg", 1000, 750, 8, "VACUUM REMOVAL"],
  ["services/finished-beauty.jpg", 1000, 750, 9, ""],
  ["team/crew-action.jpg", 1000, 1100, 10, ""],
  ["textures/sprayfoam-closeup.jpg", 1200, 800, 11, ""],
  ["textures/batt-rolls.jpg", 1200, 800, 12, ""],
  ["og/og-image.jpg", 1200, 630, 13, ""],
];

for (const [rel, w, h, seed, label] of slots) {
  const dir = (base + "/" + rel).split("/").slice(0, -1).join("/");
  mkdirSync(dir, { recursive: true });
  // write as .svg next to intended name AND as the .jpg name won't work for svg content;
  // instead write actual .svg files and reference those in code.
  const svgName = (base + "/" + rel).replace(/\.jpg$/, ".svg");
  writeFileSync(svgName, panel({ w, h, seed, label }));
  console.log("wrote", svgName);
}
console.log("DONE placeholders");
