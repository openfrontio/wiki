# Wiki Improvements — Batch 1 (pipeline hygiene + SEO) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Land the four small, low-risk improvements — prune Liquipedia images on refresh (#4), warn on unmapped FontAwesome icons (#7), drop off-topic junk pages + external image hotlinks (#3), and add per-page SEO: descriptions, canonical URLs, og:url, and a sitemap (#2).

**Architecture:** #4/#7 are additions to `scripts/prepare-liquipedia.mjs` (re-run against the existing cache, no network). #3 extends `scripts/prepare-content.mjs`'s `DROP` set + adds an external-image strip to its `clean()` (re-run against the existing Miraheze crawl cache). #2 adds a tested pure `pageDescription()` helper wired into the article pages, plus canonical/og:url in `Layout` and the `@astrojs/sitemap` integration.

**Tech Stack:** Node 24 (`node --test`, built-in), cheerio (devDep), Astro 5.6 + `@astrojs/sitemap`.

## Global Constraints

- **Static only:** no SSR adapter/`output:"server"`/API routes/`prerender=false`. Pure static export to `dist/`.
- **Verification before commit:** any change affecting the rendered site is `npm run build` + spot-checked before committing.
- **Caches (no network needed):** Miraheze crawl at `<SCR>/wiki-crawl`, Liquipedia at `<SCR>/liq`, where `<SCR>` = `C:/Users/lewis/AppData/Local/Temp/claude/C--Users-lewis-OneDrive-Documents-GitHub-adminbot/66d16ef4-2403-41fe-898d-9a564c1bdee4/scratchpad`.
- **Pipelines are the source of truth:** regenerate `pages.json`/images by re-running the prepare scripts; never hand-edit `pages.json`.
- **Site URL:** `https://openfront.wiki` (already set as `site` in `astro.config.mjs`) — canonical/sitemap depend on it.
- **Test command (this repo/OS):** `node --test <file.test.mjs>` (the bare-directory form fails on this Node/Windows setup).
- **Do NOT commit** the scratchpad caches; only `src/**`, `scripts/**`, `astro.config.mjs`, `package.json`, and regenerated `src/data/pages.json` / `public/images/**`.

## File Structure

- **Modify** `scripts/prepare-liquipedia.mjs` — add image prune (#4) + icon-coverage warning (#7).
- **Modify** `scripts/prepare-content.mjs` — extend `DROP` (#3) + strip external `http(s)` image hotlinks in `clean()` (#3).
- **Create** `src/lib/meta.js` — `pageDescription(html, max?)` pure helper (#2).
- **Create** `src/lib/meta.test.mjs` — `node:test` unit tests for it (#2).
- **Modify** `src/pages/[slug].astro`, `src/pages/all.astro` — pass a `description` to `Layout` (#2).
- **Modify** `src/layouts/Layout.astro` — `<link rel="canonical">` + `og:url` (#2).
- **Modify** `astro.config.mjs`, `package.json` — `@astrojs/sitemap` integration + devDep (#2).

---

## Task 1: Prune orphaned Liquipedia images on refresh (#4)

**Files:**
- Modify: `scripts/prepare-liquipedia.mjs`

**Interfaces:**
- Consumes: `liqPages` (array of merged page objects, each with `.html`), `OUT_IMG` (`public/images/liquipedia` path) — both already defined in the file.
- Produces: `public/images/liquipedia/` containing only images referenced by the merged Liquipedia pages.

- [ ] **Step 1: Add the prune block**

In `scripts/prepare-liquipedia.mjs`, immediately BEFORE the final
`fs.writeFileSync(DATA, JSON.stringify(merged, null, 2));` line, add:

```js
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
```

- [ ] **Step 2: Report the prune count**

Change the final log line from:
```js
console.log(`merged ${liqPages.length} Masters pages, copied ${imgN} images; total ${merged.length}`);
```
to:
```js
console.log(`merged ${liqPages.length} Masters pages, copied ${imgN} images, pruned ${prunedImgs}; total ${merged.length}`);
```

- [ ] **Step 3: Re-run against the cache and verify sync**

Run (from repo root):
```bash
node scripts/prepare-liquipedia.mjs "C:/Users/lewis/AppData/Local/Temp/claude/C--Users-lewis-OneDrive-Documents-GitHub-adminbot/66d16ef4-2403-41fe-898d-9a564c1bdee4/scratchpad/liq"
```
Expected: `merged 40 Masters pages, copied 573 images, pruned 0; total 146` (pruned 0 on the first run because the dir is already in sync — that's correct). Then verify referenced == on-disk:
```bash
node -e 'const p=require("./src/data/pages.json");const fs=require("fs");const ref=new Set();for(const x of p.filter(y=>y.source==="liquipedia"))for(const m of x.html.matchAll(/src="\/images\/liquipedia\/([^"]+)"/g))ref.add(decodeURIComponent(m[1]));const disk=fs.readdirSync("public/images/liquipedia");console.log("referenced:",ref.size,"on-disk:",disk.length,"orphans:",disk.filter(f=>!ref.has(f)).length)'
```
Expected: `orphans: 0`.

- [ ] **Step 4: Prove it actually prunes**

Drop a fake orphan, re-run, confirm it's removed:
```bash
echo x > public/images/liquipedia/_orphan_test.png
node scripts/prepare-liquipedia.mjs "C:/Users/lewis/AppData/Local/Temp/claude/C--Users-lewis-OneDrive-Documents-GitHub-adminbot/66d16ef4-2403-41fe-898d-9a564c1bdee4/scratchpad/liq" 2>&1 | tail -1
test ! -f public/images/liquipedia/_orphan_test.png && echo "PRUNED OK"
```
Expected: the log shows `pruned 1`, then `PRUNED OK`.

- [ ] **Step 5: Build + commit**

```bash
npm run build 2>&1 | grep -E "Complete|Error" | tail -1
git add scripts/prepare-liquipedia.mjs src/data/pages.json public/images/liquipedia
git commit -m "prepare-liquipedia: prune orphaned images on refresh"
```

---

## Task 2: Icon-coverage guard (#7)

**Files:**
- Modify: `scripts/prepare-liquipedia.mjs`

**Interfaces:**
- Consumes: `raw` (the fetched Liquipedia snapshot array, each with `.html`) and `ICONS` (imported map) — both already in the file.
- Produces: a `console.warn` listing any `fa-*` icon class present in the source HTML but absent from `ICONS` (advisory; never throws).

- [ ] **Step 1: Add the coverage check**

In `scripts/prepare-liquipedia.mjs`, right AFTER the `const raw = JSON.parse(...)` line near the top, add:

```js
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
```

- [ ] **Step 2: Run and verify it reports cleanly**

```bash
node scripts/prepare-liquipedia.mjs "C:/Users/lewis/AppData/Local/Temp/claude/C--Users-lewis-OneDrive-Documents-GitHub-adminbot/66d16ef4-2403-41fe-898d-9a564c1bdee4/scratchpad/liq" 2>&1 | grep -E "WARN|merged" | head
```
Expected: a `merged …` line and EITHER no `WARN` line (all icons mapped) OR a `WARN` listing specific classes. If it warns, that's the guard working — for each listed class add a `MAP` entry in `scripts/gen-liquipedia-icons.mjs`, run `node scripts/gen-liquipedia-icons.mjs`, and re-run this step until no warning (or the remainder are intentionally-unmapped decorative classes — note them).

- [ ] **Step 3: Commit**

```bash
git add scripts/prepare-liquipedia.mjs
git commit -m "prepare-liquipedia: warn on unmapped FontAwesome icon classes"
```

---

## Task 3: Content curation — drop junk pages + external hotlinks (#3)

**Files:**
- Modify: `scripts/prepare-content.mjs`

**Interfaces:**
- Consumes: the Miraheze crawl cache at `<SCR>/wiki-crawl`.
- Produces: `src/data/pages.json` without the 3 junk slugs and with no `http(s)` image hotlinks.

- [ ] **Step 1: Extend the DROP set**

In `scripts/prepare-content.mjs`, change (line ~20):
```js
const DROP = new Set(["TestPage"]); // obvious junk
```
to:
```js
const DROP = new Set([
  "TestPage",
  // off-topic imported content (not OpenFront); also the only external-image hotlinks
  "List_of_heads_of_state_of_India",
  "List_of_heads_of_state_of_India_1857",
  "Timurid_Empire_Flag_SVG",
]);
```

- [ ] **Step 2: Strip external image hotlinks in `clean()`**

In `scripts/prepare-content.mjs`, inside the `clean(html)` function, right before its
`return $.html().trim();`, add:
```js
// drop external image hotlinks (privacy/perf; we host our own images) -> alt text
$("img").each((_, el) => {
  const $el = $(el);
  if (/^https?:\/\//i.test($el.attr("src") || "")) {
    const alt = $el.attr("alt");
    $el.replaceWith(alt ? `<span class="liq-noimg">${alt}</span>` : "");
  }
});
```

- [ ] **Step 3: Re-run BOTH pipelines in order (content, then liquipedia)**

`prepare-content` rewrites `pages.json` from the Miraheze crawl + legacy only — it
does NOT preserve the Liquipedia pages (those are appended afterward by
`prepare-liquipedia`, which reads the existing file). So re-running `prepare-content`
alone WIPES the 40 Masters pages; you MUST re-run `prepare-liquipedia` after it to
restore them. Set `SCR` once:
```bash
SCR="C:/Users/lewis/AppData/Local/Temp/claude/C--Users-lewis-OneDrive-Documents-GitHub-adminbot/66d16ef4-2403-41fe-898d-9a564c1bdee4/scratchpad"
node scripts/prepare-content.mjs "$SCR/wiki-crawl" 2>&1 | tail -2   # drops 3 junk pages; removes liquipedia pages
node scripts/prepare-liquipedia.mjs "$SCR/liq" 2>&1 | tail -1        # re-appends the 40 Masters pages
```
Expected: the content run's `wrote N pages …` is 3 fewer than before; the liquipedia run reports `merged 40 Masters pages …`.

**Verify** after BOTH runs:
```bash
node -e 'const p=require("./src/data/pages.json");console.log("total:",p.length,"| liquipedia:",p.filter(x=>x.source==="liquipedia").length,"| junk left:",p.filter(x=>/heads_of_state|Timurid_Empire_Flag/.test(x.slug)).length,"| external hotlinks:",p.filter(x=>/src="https?:\/\//.test(x.html)).length)'
```
Expected: `liquipedia: 40`, `junk left: 0`, `external hotlinks: 0`. If `liquipedia` is not 40, you skipped the second run — re-run `prepare-liquipedia`.

- [ ] **Step 4: Build + audit + commit**

```bash
npm run build 2>&1 | grep -E "Complete|Error" | tail -1
```
Expected: `Complete!`, with 3 fewer routes than before. Then:
```bash
git add scripts/prepare-content.mjs src/data/pages.json public/images
git commit -m "Drop off-topic junk pages and external image hotlinks"
```

---

## Task 4: Per-page description helper + wiring (#2a)

**Files:**
- Create: `src/lib/meta.js`
- Test: `src/lib/meta.test.mjs`
- Modify: `src/pages/[slug].astro`, `src/pages/all.astro`

**Interfaces:**
- Produces: `pageDescription(html: string, max = 155): string` — a clean, ~155-char meta description from an article's HTML (first substantive paragraph, tags/infoboxes/tables stripped, truncated at a word boundary with an ellipsis). Consumed by the article pages.

- [ ] **Step 1: Write the failing tests**

Create `src/lib/meta.test.mjs`:
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { pageDescription } from "./meta.js";

test("pageDescription returns the first substantive paragraph as plain text", () => {
  const d = pageDescription("<p>Short.</p><p>Warships are a type of naval unit used to control sea routes.</p>");
  assert.equal(d, "Warships are a type of naval unit used to control sea routes.");
});

test("pageDescription ignores infobox/table text", () => {
  const d = pageDescription('<table class="infobox"><tr><td>Cost 250</td></tr></table><p>The city generates gold over time for the owning player.</p>');
  assert.doesNotMatch(d, /Cost 250/);
  assert.match(d, /generates gold/);
});

test("pageDescription truncates at a word boundary with an ellipsis", () => {
  const long = "word ".repeat(60).trim();
  const d = pageDescription(`<p>${long}</p>`, 40);
  assert.ok(d.length <= 41, `len ${d.length}`);
  assert.match(d, /…$/);
  assert.doesNotMatch(d, /wor…$/); // cut on a space, not mid-word
});

test("pageDescription falls back to body text when there is no <p>", () => {
  const d = pageDescription("<ul><li>Alpha bravo charlie delta echo foxtrot golf.</li></ul>");
  assert.match(d, /Alpha bravo/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test src/lib/meta.test.mjs`
Expected: FAIL — `Cannot find module './meta.js'`.

- [ ] **Step 3: Implement the helper**

Create `src/lib/meta.js`:
```js
import * as cheerio from "cheerio";

// Build a clean ~max-char meta description from an article's HTML: prefer the
// first substantive paragraph, strip infoboxes/tables/figures, truncate on a
// word boundary.
export function pageDescription(html, max = 155) {
  const $ = cheerio.load(html || "", null, false);
  $("table, .infobox, .panel-box, .wikitable, figure, .thumb, style, script, .liq-noimg, .wiki-deadlink").remove();
  let text = "";
  $("p").each((_, el) => {
    if (text) return;
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (t.length > 40) text = t;
  });
  if (!text) text = $.root().text().replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sp = cut.lastIndexOf(" ");
  return (sp > 0 ? cut.slice(0, sp) : cut).trim() + "…";
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test src/lib/meta.test.mjs`
Expected: PASS (4 tests).

- [ ] **Step 5: Wire the description into the article pages**

In `src/pages/[slug].astro` frontmatter, after `const { page } = Astro.props;`, add:
```js
import { pageDescription } from "../lib/meta.js";
const metaDescription = pageDescription(page.html);
```
Then change the `<Layout ...>` opening tag from:
```astro
<Layout title={`${page.title} — OpenFront Wiki`}>
```
to:
```astro
<Layout title={`${page.title} — OpenFront Wiki`} description={metaDescription}>
```
In `src/pages/all.astro`, change:
```astro
<Layout title="All Pages — OpenFront Wiki">
```
to:
```astro
<Layout title="All Pages — OpenFront Wiki" description="Browse every article in the OpenFront community wiki — game mechanics, units, maps, tournaments, and more.">
```

- [ ] **Step 6: Build + verify unique descriptions + commit**

```bash
npm run build 2>&1 | grep -E "Complete|Error" | tail -1
grep -o '<meta name="description" content="[^"]*"' dist/Warship/index.html | head -1
grep -o '<meta name="description" content="[^"]*"' dist/City/index.html | head -1
```
Expected: `Complete!`, and the two pages show DIFFERENT, article-specific description text (not the site tagline).
```bash
git add src/lib/meta.js src/lib/meta.test.mjs src/pages/[slug].astro src/pages/all.astro
git commit -m "Add per-page meta descriptions from article content"
```

---

## Task 5: Canonical URLs, og:url, and sitemap (#2b)

**Files:**
- Modify: `src/layouts/Layout.astro`, `astro.config.mjs`, `package.json`

**Interfaces:**
- Consumes: `Astro.site` (`https://openfront.wiki`, already configured) and `Astro.url.pathname`.
- Produces: a `<link rel="canonical">` + `og:url` per page, and a `sitemap-index.xml` in `dist/`.

- [ ] **Step 1: Add canonical + og:url to the layout**

In `src/layouts/Layout.astro` frontmatter (top `---` block), add:
```js
const canonical = new URL(Astro.url.pathname, Astro.site);
```
Then in the `<head>`, immediately after the existing `<meta property="og:type" ... />` line, add:
```astro
    <link rel="canonical" href={canonical} />
    <meta property="og:url" content={canonical} />
```

- [ ] **Step 2: Install and register the sitemap integration**

```bash
npm install -D @astrojs/sitemap
```
In `astro.config.mjs`, add the import at the top:
```js
import sitemap from "@astrojs/sitemap";
```
Then add `integrations: [sitemap()],` to the `defineConfig({ ... })` object (create the `integrations` array if it doesn't exist; leave the existing `site` and `vite` keys untouched).

- [ ] **Step 3: Build and verify canonical + sitemap**

```bash
npm run build 2>&1 | grep -E "Complete|Error|sitemap" | tail -3
grep -o '<link rel="canonical" href="[^"]*"' dist/Warship/index.html | head -1
ls dist/sitemap-index.xml dist/sitemap-0.xml
```
Expected: `Complete!`; the canonical for Warship is `https://openfront.wiki/Warship`; and both sitemap files exist in `dist/`.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro astro.config.mjs package.json package-lock.json
git commit -m "Add canonical URLs, og:url, and XML sitemap"
```

---

## Self-Review Notes

- **Coverage:** #4 → Task 1; #7 → Task 2; #3 → Task 3; #2 → Tasks 4 (descriptions) + 5 (canonical/og:url/sitemap). All four roadmap items mapped.
- **Type consistency:** `pageDescription(html, max=155)` defined in Task 4, consumed in Task 4 Step 5 with the same signature. `liqPages`/`OUT_IMG`/`raw`/`ICONS` in Tasks 1–2 are pre-existing identifiers in `prepare-liquipedia.mjs`.
- **Key ordering gotcha (verified in code):** `prepare-content` overwrites `pages.json` from the Miraheze crawl + legacy and does NOT keep the Liquipedia pages; `prepare-liquipedia` re-appends them by reading the existing file. So the refresh order is always `prepare-content` → `prepare-liquipedia`. Task 3 Step 3 runs both and hard-gates on `liquipedia: 40`.
- **Also touches `.liq-noimg`:** Task 3's external-image strip reuses the existing `.liq-noimg` span class (already styled in `global.css`), so dropped hotlinks render as muted italic alt text consistent with the Liquipedia image handling.
- **No new hardcoded copy beyond** the `all.astro` description string and the icon-modifier list, both shown verbatim.
