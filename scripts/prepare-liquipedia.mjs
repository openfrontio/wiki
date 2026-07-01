// Merge the Liquipedia snapshot into the site manifest.
//   node scripts/prepare-liquipedia.mjs <cacheDir>
import fs from "fs";
import path from "path";
import { deriveSlug, deriveCats, buildSlugMap, cleanHtml } from "./lib/liquipedia-clean.mjs";
import { ICONS } from "../src/data/liquipedia-icons.js";

const CACHE = process.argv[2];
if (!CACHE) { console.error("usage: prepare-liquipedia.mjs <cacheDir>"); process.exit(1); }
const root = path.resolve(".");
const DATA = path.join(root, "src", "data", "pages.json");
const OUT_IMG = path.join(root, "public", "images", "liquipedia");
fs.mkdirSync(OUT_IMG, { recursive: true });

const raw = JSON.parse(fs.readFileSync(path.join(CACHE, "liquipedia.json"), "utf8"));
const slugMap = buildSlugMap(raw);
const cheerioMod = await import("cheerio");

function headings(html) {
  const $ = cheerioMod.load(html, null, false);
  const out = [];
  $("h2, h3").each((_, el) => {
    const id = $(el).attr("id");
    const text = $(el).text().trim();
    if (id && text) out.push({ id, text, level: el.tagName === "h3" ? 3 : 2 });
  });
  return out;
}

// copy hostable images (fetcher already downloaded only these)
let imgN = 0;
for (const p of raw)
  for (const im of p.liqImages || [])
    if (im.host && im.safe) {
      const src = path.join(CACHE, "images", im.safe);
      if (fs.existsSync(src)) { fs.copyFileSync(src, path.join(OUT_IMG, im.safe)); imgN++; }
    }

const liqPages = raw
  // skip namespace pages (Template:/User:/… under Openfront/) — not real content
  .filter((p) => !/:/.test(p.slug.replace(/^Openfront\//, "")))
  .map((p) => {
  const html = cleanHtml(p.html, { slugMap, icons: ICONS });
  return {
    slug: deriveSlug(p.slug),
    title: p.title,
    cats: deriveCats(p.slug, p.cats),
    headings: headings(html),
    html,
    source: "liquipedia",
    sourceUrl: p.sourceUrl,
  };
});

// merge: replace any existing liquipedia-sourced pages, keep the rest
const existing = JSON.parse(fs.readFileSync(DATA, "utf8")).filter((p) => p.source !== "liquipedia");
const bySlug = new Set(existing.map((p) => p.slug));
for (const lp of liqPages) {
  while (bySlug.has(lp.slug)) lp.slug += "_M"; // collision guard vs game pages
  bySlug.add(lp.slug);
}
const merged = [...existing, ...liqPages].sort((a, b) => a.title.localeCompare(b.title));
fs.writeFileSync(DATA, JSON.stringify(merged, null, 2));
console.log(`merged ${liqPages.length} Masters pages, copied ${imgN} images; total ${merged.length}`);
