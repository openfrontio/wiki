# Liquipedia → OpenFront Masters Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mirror Liquipedia Lab's OpenFront esports pages (tournaments, clans, players) into the site under an `OpenFront Masters` category, rendered through the existing article template with CC-BY-SA 3.0 attribution.

**Architecture:** A ToS-compliant, API-only, rate-limited fetcher writes a cached snapshot; a preparer cleans that HTML through a testable pure-function library and merges page objects into `src/data/pages.json` (copying license-filtered images). The existing static Astro build renders them; `[slug].astro`, `global.css`, and the nav get small additions for attribution, styling, and a hub index. No SSR — the fetch is a manual offline step whose output is committed, exactly like the Miraheze `crawl → prepare` pipeline.

**Tech Stack:** Node 24 (ESM, built-in `fetch`, built-in `node:test` runner — no new runtime deps), cheerio (already a devDependency), Astro 5 + Tailwind v4.

## Global Constraints

- **Static only:** never add an SSR adapter, `output: "server"/"hybrid"`, API routes, or `export const prerender = false`. Build stays a pure static export to `dist/`.
- **Liquipedia ToS:** API endpoint `https://liquipedia.net/lab/api.php` only — no HTML page scraping. `User-Agent: OpenFrontWiki/1.0 (https://openfront.wiki; lewis@outpostgroup.io)` on every request. Rate limit: `action=parse` ≤ 1 request / 30s; every other request ≤ 1 request / 2s. Cache raw responses; never refetch unless `--force`.
- **Attribution (exact copy):** every mirrored page shows — `This page uses material from Liquipedia, licensed under CC BY-SA 3.0.` with "Liquipedia" linking to the page's `sourceUrl` and "CC BY-SA 3.0" linking to `https://creativecommons.org/licenses/by-sa/3.0/`.
- **Slug convention:** `Title_With_Underscores`. Official OFM tournaments (`Openfront/OFM/*`) get an `OFM_` slug prefix; community tournaments do not. Categories always include `OpenFront Masters`; tournaments also get `OFM Official` or `Community`; plus a subtype `Tournaments`/`Teams`/`Players`.
- **Images:** Liquipedia exposes no machine-readable license (verified), so hostability is decided by the shared `isHostableImage(name)` filename allow-list (Task 2): country flags (`*_hd.png`) and the game's own PNG/SVG UI assets are hosted; team/event logos and photos (jpg/webp, or names containing `logo`/`filler`/`event`/`photo`/`avatar`/`banner`/`squad`) drop to `alt` text. `DENY_LIST`/`ALLOW_LIST` exact-name sets override.
- **Verification before commit:** any change affecting the rendered site is `npm run build` + screenshot-verified per `CLAUDE.md` before committing.
- **New page fields:** `source: "liquipedia"` and `sourceUrl: "<url>"` on mirrored pages only; game/legacy pages omit them.

---

## File Structure

- **Create** `scripts/liquipedia-fetch.mjs` — ToS-compliant API fetcher; enumerate → parse → image-license → download → cache → `liquipedia.json`.
- **Create** `scripts/lib/liquipedia-clean.mjs` — pure transform functions (slug, categories, HTML clean, link rewrite, image filter). No I/O.
- **Create** `scripts/lib/liquipedia-clean.test.mjs` — `node:test` unit tests for the pure functions.
- **Create** `scripts/prepare-liquipedia.mjs` — reads `liquipedia.json`, applies the transform lib, merges into `src/data/pages.json`, copies free images to `public/images/liquipedia/`.
- **Create** `src/data/liquipedia-icons.js` — map of the FontAwesome classes Liquipedia uses → inline SVG paths (no font dependency).
- **Modify** `src/pages/[slug].astro` — attribution block for `source === "liquipedia"`; auto-generated Masters index on the `OpenFront_Masters` page.
- **Modify** `src/styles/global.css` — scoped `.wiki-content` styles for `.infobox`, `.panel-box`, `.wikitable`, brackets, `.flag`, and the icon classes.
- **Modify** `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro` — add an "OpenFront Masters" nav link.
- **Modify** `LICENSING.md`, `CLAUDE.md` — Liquipedia bucket + pipeline/staleness docs.

Fetch output cache lives outside the repo (scratchpad / a `--cache` dir); only `src/data/pages.json` and `public/images/liquipedia/` are committed.

---

## Task 1: ToS-compliant Liquipedia fetcher

**Files:**
- Create: `scripts/liquipedia-fetch.mjs`

**Interfaces:**
- Consumes: `isHostableImage` from Task 2's `scripts/lib/liquipedia-clean.mjs` (build Task 2 first).
- Produces: a snapshot directory `<cacheDir>/` containing `raw/<slug>.json` (cached parse responses), `images/<name>` (downloaded hostable images), and `liquipedia.json` — an array of `{ slug: string, title: string, sourceUrl: string, html: string, cats: string[], liqImages: Array<{ name: string, safe?: string, url: string, host: boolean }> }`. `slug` here is the raw page title with spaces→`_` (e.g. `Openfront/OFM/2025_World_Cup`); the final site slug is derived later in Task 2.
- CLI: `node scripts/liquipedia-fetch.mjs <cacheDir> [--limit N] [--only "Title,Title"] [--force]`.

- [ ] **Step 1: Write the fetcher**

Create `scripts/liquipedia-fetch.mjs`:

```js
// ToS-compliant fetch of Liquipedia Lab OpenFront pages (API only, rate-limited,
// cached). Usage: node scripts/liquipedia-fetch.mjs <cacheDir> [--limit N]
//   [--only "Openfront/Antares,Openfront/2026 World Cup"] [--force]
import fs from "fs";
import path from "path";
import { isHostableImage } from "./lib/liquipedia-clean.mjs";

const CACHE = process.argv[2];
if (!CACHE) {
  console.error("usage: liquipedia-fetch.mjs <cacheDir> [--limit N] [--only ...] [--force]");
  process.exit(1);
}
const argOf = (f) => {
  const i = process.argv.indexOf(f);
  return i >= 0 ? process.argv[i + 1] : undefined;
};
const LIMIT = argOf("--limit") ? Number(argOf("--limit")) : Infinity;
const ONLY = argOf("--only") ? argOf("--only").split(",").map((s) => s.trim()) : null;
const FORCE = process.argv.includes("--force");

const API = "https://liquipedia.net/lab/api.php";
const UA = "OpenFrontWiki/1.0 (https://openfront.wiki; lewis@outpostgroup.io)";
const RAW = path.join(CACHE, "raw");
const IMG = path.join(CACHE, "images");
fs.mkdirSync(RAW, { recursive: true });
fs.mkdirSync(IMG, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let lastParse = 0;
let lastOther = 0;
async function api(params, isParse) {
  // enforce rate limits: parse >=30s apart, others >=2s apart
  const now = Date.now();
  if (isParse) {
    const wait = 30000 - (now - lastParse);
    if (wait > 0) await sleep(wait);
  } else {
    const wait = 2000 - (now - lastOther);
    if (wait > 0) await sleep(wait);
  }
  const url = `${API}?${params}&format=json`;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (isParse) lastParse = Date.now();
  else lastOther = Date.now();
  if (!r.ok) throw new Error(`API ${r.status} for ${params}`);
  return r.json();
}

// 1. Enumerate Openfront/* content pages
let titles = [];
if (ONLY) {
  titles = ONLY;
} else {
  let apcontinue = "";
  for (let i = 0; i < 20; i++) {
    const r = await api(
      `action=query&list=allpages&apprefix=Openfront/&apnamespace=0&aplimit=500${apcontinue}`,
      false,
    );
    for (const p of r.query?.allpages ?? []) titles.push(p.title);
    if (r.continue?.apcontinue) apcontinue = `&apcontinue=${encodeURIComponent(r.continue.apcontinue)}`;
    else break;
  }
}
titles = titles.slice(0, LIMIT);
console.log(`fetching ${titles.length} pages`);

// 2. Parse each page (cached), collect File: names
const pages = [];
const fileNames = new Set();
for (const title of titles) {
  const slug = title.replace(/ /g, "_");
  const cacheFile = path.join(RAW, encodeURIComponent(slug) + ".json");
  let data;
  if (!FORCE && fs.existsSync(cacheFile)) {
    data = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    console.log("  cached:", slug);
  } else {
    const r = await api(
      `action=parse&page=${encodeURIComponent(title)}&prop=text|images|categories|displaytitle&redirects=1`,
      true,
    );
    data = r.parse;
    fs.writeFileSync(cacheFile, JSON.stringify(data));
    console.log("  fetched:", slug);
  }
  if (!data) continue;
  const imgs = (data.images || []).map((n) => n.replace(/ /g, "_"));
  imgs.forEach((n) => fileNames.add(n));
  pages.push({
    slug,
    title: (data.displaytitle || title).replace(/<[^>]+>/g, ""),
    sourceUrl: `https://liquipedia.net/lab/${encodeURIComponent(title).replace(/%2F/g, "/")}`,
    html: data.text?.["*"] || "",
    cats: (data.categories || []).map((c) => c["*"].replace(/_/g, " ")),
    _imgs: imgs,
  });
}

// 3. Resolve image download URLs (batched query, 2s apart). Liquipedia exposes
//    no usable license metadata, so we only need the URL here; hostability is
//    decided by filename via isHostableImage.
const meta = {}; // name -> url
const all = [...fileNames];
for (let i = 0; i < all.length; i += 20) {
  const batch = all.slice(i, i + 20).map((n) => "File:" + n).map(encodeURIComponent).join("|");
  const r = await api(`action=query&titles=${batch}&prop=imageinfo&iiprop=url`, false);
  for (const p of Object.values(r.query?.pages ?? {})) {
    const ii = p.imageinfo?.[0];
    if (!ii) continue;
    const name = p.title.replace(/^File:/, "").replace(/ /g, "_");
    meta[name] = ii.url;
  }
}

// 4. Download hostable images (flags + game assets); logos/photos are skipped.
async function download(url, dest) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) return false;
  fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
  return true;
}
for (const p of pages) {
  p.liqImages = [];
  for (const name of p._imgs) {
    const url = meta[name];
    const host = isHostableImage(name);
    if (host && url) {
      const safe = name.replace(/[^a-zA-Z0-9._-]/g, "_");
      if (!fs.existsSync(path.join(IMG, safe))) await download(url, path.join(IMG, safe));
      p.liqImages.push({ name, safe, url, host: true });
    } else {
      p.liqImages.push({ name, url, host: false });
    }
  }
  delete p._imgs;
}

fs.writeFileSync(path.join(CACHE, "liquipedia.json"), JSON.stringify(pages, null, 2));
const hostCount = pages.reduce((n, p) => n + p.liqImages.filter((i) => i.host).length, 0);
console.log(`wrote ${pages.length} pages; images: ${hostCount} hostable / ${all.length} total`);
```

- [ ] **Step 2: Validate on a 3-page subset (one tournament, one team, one player)**

Run (uses the session scratchpad as cache):

```bash
node scripts/liquipedia-fetch.mjs /tmp/liq --only "Openfront/OFM/2025 World Cup,Openfront/Antares,Openfront/Hulkiora"
```

Expected: three `fetched:` lines (30s apart → ~1.5 min), then `wrote 3 pages; images: N free / M total`. Confirm `/tmp/liq/liquipedia.json` exists and each page has non-empty `html`, a `sourceUrl`, and a `liqImages` array with `license` strings.

- [ ] **Step 3: Commit**

```bash
git add scripts/liquipedia-fetch.mjs
git commit -m "Add ToS-compliant Liquipedia Lab fetcher"
```

---

## Task 2: Pure transform library (TDD)

**Files:**
- Create: `scripts/lib/liquipedia-clean.mjs`
- Test: `scripts/lib/liquipedia-clean.test.mjs`

**Interfaces:**
- Consumes: raw page objects from Task 1 (`{ slug, title, sourceUrl, html, cats, liqImages }`).
- Produces:
  - `deriveSlug(rawSlug: string): string` — `Openfront/OFM/2025_World_Cup` → `OFM_2025_World_Cup`; `Openfront/2026_World_Cup` → `2026_World_Cup`; `Openfront/Clans/United_Nations` → `United_Nations`; `Openfront/Antares` → `Antares`.
  - `deriveCats(rawSlug: string, html: string): string[]` — always includes `"OpenFront Masters"`; adds `"Tournaments"`+(`"OFM Official"`|`"Community"`) / `"Teams"` / `"Players"`.
  - `buildSlugMap(rawPages: Array): Record<string,string>` — maps each raw title (spaces→`_`) to its derived site slug, for link rewriting.
  - `isHostableImage(name: string): boolean` — filename allow-list (flags + game assets in; logos/photos out). Shared with the fetcher (Task 1).
  - `cleanHtml(html: string, opts: { slugMap, icons }): string` — strip chrome, rewrite links, keep `isHostableImage` images (rewrite `src`) and drop the rest to `alt` text, map icons.

- [ ] **Step 1: Write failing tests**

Create `scripts/lib/liquipedia-clean.test.mjs`:

```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { deriveSlug, deriveCats, buildSlugMap, cleanHtml, isHostableImage } from "./liquipedia-clean.mjs";

test("isHostableImage: flags and game assets in, logos/photos out", () => {
  assert.equal(isHostableImage("Us_hd.png"), true); // country flag
  assert.equal(isHostableImage("World_hd.png"), true);
  assert.equal(isHostableImage("Gold.png"), true); // game UI asset
  assert.equal(isHostableImage("Halved_Shield_default_lightmode.png"), true);
  assert.equal(isHostableImage("Logo_filler_event.png"), false); // event logo
  assert.equal(isHostableImage("Hulkiora.jpg"), false); // player photo
  assert.equal(isHostableImage("Team_banner.png"), false); // banner
});

test("deriveSlug strips Openfront prefixes, marks OFM", () => {
  assert.equal(deriveSlug("Openfront/OFM/2025_World_Cup"), "OFM_2025_World_Cup");
  assert.equal(deriveSlug("Openfront/2026_World_Cup"), "2026_World_Cup");
  assert.equal(deriveSlug("Openfront/Clans/United_Nations"), "United_Nations");
  assert.equal(deriveSlug("Openfront/Antares"), "Antares");
});

test("deriveCats classifies and tags OFM vs community", () => {
  assert.deepEqual(deriveCats("Openfront/OFM/2025_World_Cup", '<div class="infobox">Tournament</div>'),
    ["OpenFront Masters", "Tournaments", "OFM Official"]);
  assert.deepEqual(deriveCats("Openfront/2026_World_Cup", '<div class="infobox">Tournament</div>'),
    ["OpenFront Masters", "Tournaments", "Community"]);
  assert.deepEqual(deriveCats("Openfront/Antares", '<div class="infobox-header">Team</div>'),
    ["OpenFront Masters", "Teams"]);
  assert.deepEqual(deriveCats("Openfront/Hulkiora", '<div class="infobox">Player</div>'),
    ["OpenFront Masters", "Players"]);
});

test("buildSlugMap maps raw titles to site slugs", () => {
  const m = buildSlugMap([{ slug: "Openfront/Antares" }, { slug: "Openfront/OFM/2025_World_Cup" }]);
  assert.equal(m["Openfront/Antares"], "Antares");
  assert.equal(m["Openfront/OFM/2025_World_Cup"], "OFM_2025_World_Cup");
});

test("cleanHtml rewrites internal links to local slugs", () => {
  const map = { "Openfront/Antares": "Antares" };
  const out = cleanHtml('<a href="/lab/Openfront/Antares" title="x">Antares</a>', {
    slugMap: map, icons: {},
  });
  assert.match(out, /href="\/Antares"/);
});

test("cleanHtml sends unknown/liquipedia links external", () => {
  const out = cleanHtml('<a href="/lab/Dota_2">Dota</a>', { slugMap: {}, icons: {} });
  assert.match(out, /target="_blank"/);
  assert.match(out, /href="https:\/\/liquipedia\.net\/lab\/Dota_2"/);
});

test("cleanHtml keeps hostable images, drops others to alt text", () => {
  const keep = cleanHtml('<img src="/lab/commons/images/Us_hd.png" alt="flag">', { slugMap: {}, icons: {} });
  assert.match(keep, /src="\/images\/liquipedia\/Us_hd\.png"/);
  const drop = cleanHtml('<img src="/x/Logo_filler_event.png" alt="Team logo">', { slugMap: {}, icons: {} });
  assert.doesNotMatch(drop, /<img/);
  assert.match(drop, /Team logo/);
});

test("cleanHtml replaces fa icons with inline svg", () => {
  const icons = { "fa-book": '<svg data-i="book"></svg>' };
  const out = cleanHtml('<span class="fas fa-book" aria-hidden="true"></span>', { slugMap: {}, icons });
  assert.match(out, /data-i="book"/);
});

test("cleanHtml strips script/style/edit chrome", () => {
  const out = cleanHtml('<script>x</script><span class="mw-editsection">e</span><p>keep</p>', { slugMap: {}, icons: {} });
  assert.doesNotMatch(out, /<script|mw-editsection/);
  assert.match(out, /keep/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test scripts/lib/`
Expected: FAIL — `Cannot find module './liquipedia-clean.mjs'`.

- [ ] **Step 3: Implement the library**

Create `scripts/lib/liquipedia-clean.mjs`:

```js
import * as cheerio from "cheerio";

export function deriveSlug(rawSlug) {
  // rawSlug uses underscores for spaces, "/" for subpages
  let s = rawSlug.replace(/^Openfront\//, "");
  const ofm = s.startsWith("OFM/");
  s = s.replace(/^OFM\//, "").replace(/^Clans\//, "");
  s = s.replace(/\//g, "_"); // any remaining subpage slashes
  return ofm ? "OFM_" + s : s;
}

export function deriveCats(rawSlug, html) {
  const cats = ["OpenFront Masters"];
  const rest = rawSlug.replace(/^Openfront\//, "");
  const isOFM = rest.startsWith("OFM/");
  const isClan = rest.startsWith("Clans/");
  // tournaments have a bracket or an infobox labelled with a date/prize; teams
  // and players have team/player infoboxes. Use lightweight signals.
  const looksTournament = /bracket|infobox-header[^>]*>[^<]*(Tournament|Cup|Major|Minor|Clan Wars|Olympics|League)/i.test(html)
    || /(Cup|Major|Minor|Clan Wars|Olympics|Tournament|Qualifier|Game|Rumble|Assembly|Solstice|Clash)/i.test(rest);
  const looksTeam = isClan || /Big Gigachads|Squad|Antares|Cynosure|Grain de Malice|Liberated Battle Unit|United Nations/i.test(rest);
  if (looksTournament && !looksTeam) {
    cats.push("Tournaments", isOFM ? "OFM Official" : "Community");
  } else if (looksTeam) {
    cats.push("Teams");
  } else {
    cats.push("Players");
  }
  return cats;
}

export function buildSlugMap(rawPages) {
  const m = {};
  for (const p of rawPages) m[p.slug] = deriveSlug(p.slug);
  return m;
}

// Liquipedia exposes no machine-readable image license, so decide by filename.
// Host country flags (*_hd.png) + the game's own PNG/SVG UI assets; skip
// team/event logos and player photos. Populate the override sets in Task 8 for
// any straggler that slips past the heuristics.
const DENY_LIST = new Set([]); // exact filenames to always skip
const ALLOW_LIST = new Set([]); // exact filenames to always host
const FLAG = /_hd\.png$/i;
const LOGO_OR_PHOTO = /(logo|filler|event|avatar|profile|poster|banner|squad|photo)/i;
const PHOTO_EXT = /\.(jpe?g|webp|gif)$/i;
export function isHostableImage(name) {
  if (ALLOW_LIST.has(name)) return true;
  if (DENY_LIST.has(name)) return false;
  if (FLAG.test(name)) return true; // country flags: PD/low-risk
  if (LOGO_OR_PHOTO.test(name)) return false; // team/event logos
  if (PHOTO_EXT.test(name)) return false; // photos are typically jpg/webp
  return /\.(png|svg)$/i.test(name); // remaining PNG/SVG = game UI assets
}

export function cleanHtml(html, { slugMap, icons }) {
  const $ = cheerio.load(html, null, false);

  $(["script", "style", "link", "meta", ".mw-editsection", ".mw-empty-elt",
     ".noprint", "#toc", ".toctogglecheckbox"].join(",")).remove();

  // icons: <span class="fas fa-book"> -> inline svg
  $("span[class*='fa-']").each((_, el) => {
    const cls = ($(el).attr("class") || "").split(/\s+/).find((c) => icons[c]);
    if (cls) $(el).replaceWith(icons[cls]);
    else $(el).remove();
  });

  // links
  $("a[href]").each((_, el) => {
    const $el = $(el);
    let href = $el.attr("href") || "";
    const lab = href.match(/^(?:https?:\/\/liquipedia\.net)?\/lab\/(.+)$/);
    if (lab) {
      if ($el.hasClass("new")) { // red link -> plain text (do this before routing)
        $el.replaceWith(`<span class="wiki-deadlink">${$el.html() ?? $el.text()}</span>`);
        return;
      }
      const rawTitle = decodeURIComponent(lab[1].split("#")[0]).replace(/ /g, "_");
      const local = slugMap[rawTitle];
      if (local) {
        $el.attr("href", "/" + local);
        $el.removeAttr("target").removeAttr("rel");
        return;
      }
      $el.attr("href", "https://liquipedia.net/lab/" + rawTitle);
      $el.attr("target", "_blank").attr("rel", "noopener noreferrer");
      return;
    }
    if (/^https?:\/\//.test(href)) {
      $el.attr("target", "_blank").attr("rel", "noopener noreferrer");
      return;
    }
    // red links / edit / unknown internal -> plain text
    if ($el.hasClass("new") || /action=edit|redlink=1|index\.php|Special:/.test(href)) {
      $el.replaceWith(`<span class="wiki-deadlink">${$el.html() ?? $el.text()}</span>`);
    }
  });

  // images: keep hostable ones (rewrite src), drop the rest to alt text
  $("img").each((_, el) => {
    const $el = $(el);
    const src = $el.attr("src") || "";
    // Liquipedia srcs point at MediaWiki thumbnails (e.g. 36px-World_hd.png);
    // we host the base file, so strip the NNpx- prefix to match.
    const name = decodeURIComponent(src.split("/").pop() || "")
      .replace(/ /g, "_")
      .replace(/^\d+px-/, "");
    if (isHostableImage(name)) {
      const safe = name.replace(/[^a-zA-Z0-9._-]/g, "_");
      $el.attr("src", "/images/liquipedia/" + safe);
      $el.removeAttr("srcset").removeAttr("loading");
    } else {
      const alt = $el.attr("alt");
      $el.replaceWith(alt ? `<span class="liq-noimg">${alt}</span>` : "");
    }
  });

  return $.html().trim();
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test scripts/lib/`
Expected: PASS (8 tests). If `deriveCats` heuristics misclassify a real page in Task 5, refine the signals here and re-run.

- [ ] **Step 5: Commit**

```bash
git add scripts/lib/liquipedia-clean.mjs scripts/lib/liquipedia-clean.test.mjs
git commit -m "Add tested Liquipedia HTML transform library"
```

---

## Task 3: Preparer — merge into pages.json + copy images

**Files:**
- Create: `scripts/prepare-liquipedia.mjs`

**Interfaces:**
- Consumes: `<cacheDir>/liquipedia.json` + `<cacheDir>/images/` from Task 1; `deriveSlug`, `deriveCats`, `buildSlugMap`, `cleanHtml` from Task 2; the icon map from Task 4 (`src/data/liquipedia-icons.js`).
- Produces: appended entries in `src/data/pages.json` with `source`/`sourceUrl`; images in `public/images/liquipedia/`.
- CLI: `node scripts/prepare-liquipedia.mjs <cacheDir>`.

- [ ] **Step 1: Write the preparer**

Create `scripts/prepare-liquipedia.mjs`:

```js
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

const liqPages = raw.map((p) => {
  const html = cleanHtml(p.html, { slugMap, icons: ICONS });
  return {
    slug: deriveSlug(p.slug),
    title: p.title,
    cats: deriveCats(p.slug, p.html),
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
```

- [ ] **Step 2: Verify against the 3-page subset (after Task 4 provides icons)**

Run: `node scripts/prepare-liquipedia.mjs /tmp/liq`
Expected: `merged 3 Masters pages, copied N images; total 109`. Confirm `src/data/pages.json` now has 3 entries with `"source": "liquipedia"` and `OpenFront Masters` in `cats`.

- [ ] **Step 3: Commit**

```bash
git add scripts/prepare-liquipedia.mjs
git commit -m "Add Liquipedia preparer merging Masters pages into the manifest"
```

---

## Task 4: Icon map + best-effort styling

**Files:**
- Create: `src/data/liquipedia-icons.js`
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces: `export const ICONS: Record<string, string>` — FA class (e.g. `"fa-book"`) → inline `<svg>` string, consumed by Task 2/3.

- [ ] **Step 1: Create the icon map**

Create `src/data/liquipedia-icons.js` with inline SVGs for the icons observed in the fetched HTML (grep the cache: `grep -oh 'fa-[a-z-]*' /tmp/liq/raw/*.json | sort -u`). Seed with the ones recon already showed:

```js
// Minimal inline-SVG stand-ins for the FontAwesome classes Liquipedia uses.
// Add more as new fa- classes appear in fetched pages. 16x16, currentColor.
const svg = (p) => `<svg class="liq-icon" viewBox="0 0 512 512" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="${p}"/></svg>`;
export const ICONS = {
  "fa-book": svg("M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H448a32 32 0 0 0 0-64V32a32 32 0 0 0-32-32H96zm0 384H384v64H96a32 32 0 0 1 0-64z"),
  "fa-hammer": svg("M413 32l67 67c17 17 17 45 0 62l-51 51-129-129 51-51c17-17 45-17 62 0zM271 154l129 129L177 506a48 48 0 0 1-68 0L6 403a48 48 0 0 1 0-68z"),
  "fa-project-diagram": svg("M384 320H256c-18 0-32 14-32 32v128c0 18 14 32 32 32H384c18 0 32-14 32-32V352c0-18-14-32-32-32zM192 32C192 14 178 0 160 0H32C14 0 0 14 0 32V160c0 18 14 32 32 32H160c18 0 32-14 32-32V32z"),
  "fa-tasks": svg("M139 11a25 25 0 0 1 0 35L59 126a25 25 0 0 1-35 0L-1 100a25 25 0 0 1 35-35l7 7 63-62a25 25 0 0 1 35 0zM512 96a32 32 0 0 1-32 32H256a32 32 0 0 1 0-64H480a32 32 0 0 1 32 32z"),
  "fa-wrench": svg("M78 32C121 4 178 8 216 46c34 34 42 84 24 126l230 230a48 48 0 0 1-68 68L172 240C130 258 80 250 46 216 8 178 4 121 32 78z"),
};
```

- [ ] **Step 2: Add scoped styles**

Append to `src/styles/global.css` (theme with existing CSS vars/utility colors; keep it inside `.wiki-content` so it never leaks to chrome):

```css
/* --- Liquipedia (OpenFront Masters) content --- */
.wiki-content .infobox,
.wiki-content .panel-box {
  display: block;
  border: 1px solid rgb(255 255 255 / 0.1);
  border-radius: 0.5rem;
  background: rgb(15 23 42 / 0.6);
  padding: 0.75rem 1rem;
  margin: 1rem 0;
}
.wiki-content .infobox { max-width: 22rem; }
.wiki-content .panel-box-heading,
.wiki-content .infobox-header {
  font-weight: 600;
  color: var(--color-aquarius, #7dd3fc);
  margin-bottom: 0.5rem;
}
.wiki-content .wikitable {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.875rem;
}
.wiki-content .wikitable th,
.wiki-content .wikitable td {
  border: 1px solid rgb(255 255 255 / 0.1);
  padding: 0.4rem 0.6rem;
  text-align: left;
}
.wiki-content .wikitable th { background: rgb(255 255 255 / 0.05); }
/* brackets: fall back to a readable stacked layout */
.wiki-content .bracket,
.wiki-content .brkts-bracket {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  overflow-x: auto;
}
.wiki-content .bracket-game,
.wiki-content .brkts-match {
  border: 1px solid rgb(255 255 255 / 0.1);
  border-radius: 0.375rem;
  padding: 0.4rem 0.6rem;
  min-width: 12rem;
}
.wiki-content .flag img,
.wiki-content .flag svg { height: 0.9em; display: inline; vertical-align: baseline; }
.wiki-content .liq-icon { display: inline-block; vertical-align: -0.15em; margin-right: 0.35em; }
.wiki-content .liq-noimg { color: var(--color-dawn, #94a3b8); font-style: italic; }
```

- [ ] **Step 3: Commit**

```bash
git add src/data/liquipedia-icons.js src/styles/global.css
git commit -m "Add Liquipedia icon map and best-effort content styling"
```

---

## Task 5: Article template — attribution + Masters hub index

**Files:**
- Modify: `src/pages/[slug].astro`

**Interfaces:**
- Consumes: `page.source`, `page.sourceUrl`, and the full `pages` array (already imported).

- [ ] **Step 1: Add the Liquipedia attribution block**

In `src/pages/[slug].astro`, replace the existing footer credit block so Liquipedia pages show the CC-BY-SA 3.0 credit. Find:

```astro
      <div class="mt-10 border-t border-white/10 pt-5 text-xs text-dawn/50">
        Content from the OpenFront community wiki, available under
        <a
          href="https://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-aquarius hover:text-white">CC BY-SA 4.0</a
        >.
      </div>
```

Replace with:

```astro
      <div class="mt-10 border-t border-white/10 pt-5 text-xs text-dawn/50">
        {page.source === "liquipedia" ? (
          <span>
            This page uses material from
            <a href={page.sourceUrl} target="_blank" rel="noopener noreferrer" class="text-aquarius hover:text-white">Liquipedia</a>,
            licensed under
            <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer" class="text-aquarius hover:text-white">CC BY-SA 3.0</a>.
          </span>
        ) : (
          <span>
            Content from the OpenFront community wiki, available under
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" class="text-aquarius hover:text-white">CC BY-SA 4.0</a>.
          </span>
        )}
      </div>
```

- [ ] **Step 2: Add the auto-generated Masters index on the hub page**

In the frontmatter of `src/pages/[slug].astro` (after `const { page } = Astro.props;`), add:

```astro
// On the OpenFront Masters hub page, list the mirrored Masters pages by group.
const isMastersHub = page.slug === "OpenFront_Masters";
const mastersGroups = isMastersHub
  ? (() => {
      const masters = pages.filter((p) => (p.cats || []).includes("OpenFront Masters"));
      const pick = (sub) => masters.filter((p) => (p.cats || []).includes(sub)).sort((a, b) => a.title.localeCompare(b.title));
      return [
        { label: "OFM Official Tournaments", items: pick("OFM Official") },
        { label: "Community Tournaments", items: pick("Community") },
        { label: "Teams", items: pick("Teams") },
        { label: "Players", items: pick("Players") },
      ].filter((g) => g.items.length);
    })()
  : [];
```

Then, immediately after the `<article ... set:html={page.html} />` line, add:

```astro
    {isMastersHub && mastersGroups.length > 0 && (
      <div class="wiki-content mt-8">
        {mastersGroups.map((g) => (
          <section class="mb-6">
            <h2 class="font-display text-xl font-bold text-white">{g.label}</h2>
            <ul class="mt-2 grid gap-1 sm:grid-cols-2">
              {g.items.map((p) => (
                <li>
                  <a href={`/${p.slug}`} class="text-aquarius hover:text-white">{p.title}</a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    )}
```

- [ ] **Step 3: Build + screenshot-verify (subset already merged from Task 3)**

```bash
npm run build
(npm run preview -- --port 4330 &) ; sleep 4
node scripts/shot.mjs http://localhost:4330/OFM_2025_World_Cup /tmp/m-tourn.png 1440 1300
node scripts/shot.mjs http://localhost:4330/Antares /tmp/m-team.png 1440 1000
node scripts/shot.mjs http://localhost:4330/Hulkiora /tmp/m-player.png 1440 1000
node scripts/shot.mjs http://localhost:4330/OpenFront_Masters /tmp/m-hub.png 1440 1200
pkill -f "astro preview"
```

(If `scripts/shot.mjs` doesn't exist, create the bundled-Chromium helper: `chromium.launch({ headless: true })`, goto, screenshot, log page errors — see the Miraheze work.) **Read all four screenshots.** Confirm: tournament tables/brackets are legible, infoboxes render as bordered cards, no broken images (non-free dropped to alt text), the attribution line shows Liquipedia + CC BY-SA 3.0, and the hub lists the pages grouped OFM/Community/Teams/Players. No console/page errors.

- [ ] **Step 4: Commit**

```bash
git add src/pages/[slug].astro
git commit -m "Render Liquipedia attribution and Masters hub index"
```

---

## Task 6: Navigation link

**Files:**
- Modify: `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro`

- [ ] **Step 1: Add the nav link**

In `SiteHeader.astro`, add an `OpenFront Masters` entry (`href="/OpenFront_Masters"`) to the primary nav list, matching the existing link markup. In `SiteFooter.astro`, add the same under the "Wiki" column (mirroring the existing `{ name, href }` list entries).

- [ ] **Step 2: Build + screenshot-verify**

```bash
npm run build
(npm run preview -- --port 4330 &) ; sleep 4
node scripts/shot.mjs http://localhost:4330/ /tmp/m-home.png 1440 1000
pkill -f "astro preview"
```

Read `/tmp/m-home.png`: the header/footer show the new "OpenFront Masters" link and it points to `/OpenFront_Masters`.

- [ ] **Step 3: Commit**

```bash
git add src/components/SiteHeader.astro src/components/SiteFooter.astro
git commit -m "Add OpenFront Masters to site navigation"
```

---

## Task 7: Licensing + pipeline docs

**Files:**
- Modify: `LICENSING.md`, `CLAUDE.md`

- [ ] **Step 1: Update LICENSING.md**

Add a section documenting that pages with `source: "liquipedia"` in `src/data/pages.json` and images under `public/images/liquipedia/` originate from Liquipedia and are licensed **CC BY-SA 3.0**, attributed per-page; non-free images are intentionally excluded.

- [ ] **Step 2: Update CLAUDE.md content-pipeline section**

Document the second pipeline: `liquipedia-fetch.mjs` (API-only, rate-limited, cached — never scrape HTML, keep the UA) → `prepare-liquipedia.mjs` → `pages.json`. Note it's a manual-refresh snapshot that goes stale, and that `deriveCats` heuristics may need tuning when new pages appear.

- [ ] **Step 3: Commit**

```bash
git add LICENSING.md CLAUDE.md
git commit -m "Document Liquipedia licensing and pipeline"
```

---

## Task 8: Full fetch, merge, and final verification

**Files:**
- Modify: `src/data/pages.json`, `public/images/liquipedia/*` (generated)

- [ ] **Step 1: Full fetch (all ~35 pages, ~18 min)**

```bash
node scripts/liquipedia-fetch.mjs /tmp/liq
```

Expected: ~35 pages fetched/cached; `wrote 35 pages; images: N free / M total`.

- [ ] **Step 2: Refresh the icon map and vet the image allow-list from the full cache**

```bash
grep -oh 'fa-[a-z-]*' <cacheDir>/raw/*.json | sort -u    # icon classes in use
node -e 'const j=require("<cacheDir>/liquipedia.json");const m={};for(const p of j)for(const i of p.liqImages||[])m[i.name]=i.host;for(const [n,h] of Object.entries(m).sort())console.log(h?"HOST":"skip",n)'
```

For any `fa-` class not already in `src/data/liquipedia-icons.js`, add an inline SVG (or accept it renders as nothing — never leave the raw `fas` class). Review the `HOST`/`skip` list: if a team/event logo is wrongly `HOST`ed, add its exact filename to `DENY_LIST` in `scripts/lib/liquipedia-clean.mjs`; if a legit game asset is wrongly `skip`ped, add it to `ALLOW_LIST`. Re-run `node --test scripts/lib/` if you touched the library, then re-run the fetch (`--force` only if URLs changed) and prepare so downloads/manifest match.

- [ ] **Step 3: Merge**

```bash
node scripts/prepare-liquipedia.mjs /tmp/liq
```

Expected: `merged 35 Masters pages, copied N images; total ~141`.

- [ ] **Step 4: Build + audit + screenshot**

```bash
npm run build
```

Expected: static build succeeds, ~143 routes, no errors. Re-run the dead-link/orphan-image audit used in the Miraheze cleanup against `src/data/pages.json` + `public/images` and confirm 0 real dead internal links and 0 broken image refs among the new pages. Screenshot one page of each type (tournament with a bracket, team, player, hub) and read them — legible, attributed, no broken images or console errors, mobile (`390 844`) not obviously broken.

- [ ] **Step 5: Commit**

```bash
git add src/data/pages.json public/images/liquipedia
git commit -m "Mirror Liquipedia OpenFront Masters content (35 pages)"
```

- [ ] **Step 6: Push (deploys to Cloudflare)**

```bash
git push origin main
```

---

## Self-Review Notes

- **Spec coverage:** fetcher (T1), transform+tests (T2), preparer/merge (T3), styling+icons (T4), attribution+hub (T5), nav (T6), licensing/docs (T7), full run+verify (T8). All spec sections mapped.
- **ToS:** UA + rate limits + cache in T1 and Global Constraints; attribution in T5; license filter in T1/T2/T3.
- **Differentiation:** `OFM_` slug + `OFM Official`/`Community` cats in T2, surfaced on the hub in T5 — uniform format preserved (same template/slug convention).
- **Known soft spots to watch during execution:** `deriveCats` heuristics (tune against real pages in T5/T8); bracket HTML may only reach "readable table" fidelity (accepted); icon coverage completed from the real cache in T8 Step 2.
