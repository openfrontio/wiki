// Merge the Liquipedia snapshot into the site manifest.
//   node scripts/prepare-liquipedia.mjs <cacheDir>
import fs from "fs";
import path from "path";
import { deriveSlug, deriveCats, cleanHtml } from "./lib/liquipedia-clean.mjs";
import { ICONS } from "../src/data/liquipedia-icons.js";

const CACHE = process.argv[2];
if (!CACHE) { console.error("usage: prepare-liquipedia.mjs <cacheDir>"); process.exit(1); }
const root = path.resolve(".");
const DATA = path.join(root, "src", "data", "pages.json");
const OUT_IMG = path.join(root, "public", "images", "liquipedia");
fs.mkdirSync(OUT_IMG, { recursive: true });

const raw = JSON.parse(fs.readFileSync(path.join(CACHE, "liquipedia.json"), "utf8"));

// icon-coverage guard: warn on FontAwesome classes we don't map (they'd be
// stripped and render as nothing). fa-xs/fa-fw/fa-lg are size/util modifiers.
const MODIFIERS = new Set(["fa-xs", "fa-sm", "fa-lg", "fa-fw", "fa-2x", "fa-3x", "fa-spin", "fa-pulse"]);
const usedIcons = new Set();
for (const p of raw)
  for (const m of (p.html || "").matchAll(/\bfa-[a-z0-9-]+/g)) usedIcons.add(m[0]);
const mappedIcons = new Set(Object.keys(ICONS));
const unmapped = [...usedIcons].filter((c) => !mappedIcons.has(c) && !MODIFIERS.has(c));
if (unmapped.length)
  console.warn(
    `WARN ${unmapped.length} unmapped fa- icon(s) (will render blank): ${unmapped.join(", ")}\n` +
      `  add them to scripts/gen-liquipedia-icons.mjs and re-run it.`,
  );

const cheerioMod = await import("cheerio");

// content pages only (skip Template:/User:/… namespace pages under Openfront/)
const content = raw.filter((p) => !/:/.test(p.slug.replace(/^Openfront\//, "")));

// existing non-liquipedia pages — their slugs reserve the namespace
const existing = JSON.parse(fs.readFileSync(DATA, "utf8")).filter((p) => p.source !== "liquipedia");

// Assign each page a final unique slug (collision-guarded against existing pages
// AND against each other, e.g. two "Antares" pages), and build the internal-link
// map from those SAME final slugs so links and page slugs always agree.
const used = new Set(existing.map((p) => p.slug));
const slugMap = {}; // rawSlug -> final unique site slug
for (const p of content) {
  let s = deriveSlug(p.slug);
  const base = s;
  for (let n = 2; used.has(s); n++) s = `${base}_${n}`;
  used.add(s);
  slugMap[p.slug] = s;
}

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

const liqPages = content.map((p) => {
  const html = cleanHtml(p.html, { slugMap, icons: ICONS });
  return {
    slug: slugMap[p.slug],
    title: p.title,
    cats: deriveCats(p.slug, p.cats),
    headings: headings(html),
    html,
    source: "liquipedia",
    sourceUrl: p.sourceUrl,
  };
});

const merged = [...existing, ...liqPages].sort((a, b) => a.title.localeCompare(b.title));

// prune images no Liquipedia page references (keeps the dir in sync on refresh)
const referencedImgs = new Set();
for (const p of liqPages)
  for (const m of p.html.matchAll(/src="\/images\/liquipedia\/([^"]+)"/g))
    referencedImgs.add(decodeURIComponent(m[1]));
let prunedImgs = 0;
for (const f of fs.readdirSync(OUT_IMG)) {
  if (!referencedImgs.has(f)) {
    fs.rmSync(path.join(OUT_IMG, f));
    prunedImgs++;
  }
}

fs.writeFileSync(DATA, JSON.stringify(merged, null, 2));
console.log(`merged ${liqPages.length} Masters pages, copied ${imgN} images, pruned ${prunedImgs}; total ${merged.length}`);
