# Sidebar Navigation Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat 143-item sidebar with collapsed-by-default sections — a category-grouped Game Wiki and a Tournaments/Teams/Players Masters section — plus inline full-text (Pagefind) search, and clean up the confusing duplicate/mislabeled entries.

**Architecture:** A one-time agent content-scan produces a curated `game-categories.json`; `prepare-content` stamps each game page with a `section`. Pure grouping helpers (`src/lib/sidebar.js`, unit-tested) turn `pages.json` into section/sub-group structures rendered by a new `BrowseSidebar.astro` (native `<details>` collapse + a small persistence script). Pagefind indexes the built `dist/` at build time; an inline `is:inline` search script swaps the browse list for result cards. No SSR.

**Tech Stack:** Node 24 (`node:test`), cheerio (devDep), Astro 5.6, Pagefind (static index), native `<details>`.

## Global Constraints

- **Static only:** no SSR adapter/`output:"server"`/API routes/`prerender=false`. Pure static export to `dist/`.
- **Pagefind runs in the build:** the build command becomes `astro build && pagefind --site dist` so the index exists in `dist/` (and on Cloudflare). Pagefind is a devDependency.
- **Collapsed by default:** all sidebar sections/sub-groups start closed; open state persists per-user in `localStorage`.
- **Fixed game taxonomy (exact strings):** `Maps`, `Units`, `Buildings`, `Combat & mechanics`, `Economy`, `Game modes`, `Guides`, `Updates`, `Meta & community`, plus `Other` (fallback). Game pages sort A–Z within a category; empty categories are omitted.
- **Masters sub-groups:** `Tournaments` (OFM-official first, then community), `Teams`, `Players`.
- **New page field:** game pages (`source !== "liquipedia"`) gain `section: "<Category>"`. Masters pages keep grouping by their `cats`.
- **No two sidebar entries share an identical visible label** after the data cleanup.
- **Test command (this repo/OS):** `node --test <file.test.mjs>` (bare-directory form fails on this Node/Windows).
- **Caches (no network):** Miraheze crawl `<SCR>/wiki-crawl`, Liquipedia `<SCR>/liq`, where `<SCR>` = `C:/Users/lewis/AppData/Local/Temp/claude/C--Users-lewis-OneDrive-Documents-GitHub-adminbot/66d16ef4-2403-41fe-898d-9a564c1bdee4/scratchpad`.
- **Refresh order:** `prepare-content` then `prepare-liquipedia` (content overwrites `pages.json`; liquipedia re-appends).
- **Verify before commit:** `npm run build` + screenshot per `CLAUDE.md`.

## File Structure

- **Create** `scripts/game-categories.json` — curated `{ "<slug>": "<Category>" }` for every game page (Task 1).
- **Create** `src/lib/sidebar.js` — `groupGamePages` / `groupMastersPages` pure helpers (Task 4).
- **Create** `src/lib/sidebar.test.mjs` — unit tests (Task 4).
- **Create** `src/components/BrowseSidebar.astro` — the sidebar (search box + sections + collapse/persistence + search script) (Tasks 5–6).
- **Modify** `scripts/prepare-content.mjs` — stamp `section` from the map + warn on unmapped (Task 2).
- **Modify** `scripts/prepare-liquipedia.mjs` + `scripts/lib/liquipedia-clean.mjs` — title-year correction + Antares de-dup (Task 3).
- **Modify** `src/pages/[slug].astro` — use `<BrowseSidebar>`; add `data-pagefind-*` hooks (Tasks 5–6).
- **Modify** `src/layouts/Layout.astro` — `data-pagefind-ignore` on chrome as needed (Task 6).
- **Modify** `package.json` — `pagefind` devDep + build chain (Task 6).
- **Modify** `src/data/pages.json` — regenerated (game `section`, corrected titles).

---

## Task 1: Categorise the game pages → `game-categories.json`

**Files:**
- Create: `scripts/game-categories.json`

**Interfaces:**
- Produces: `scripts/game-categories.json` = an object mapping EVERY game-page slug
  (`source !== "liquipedia"` in `src/data/pages.json`) to exactly one category from
  the fixed taxonomy. Consumed by Task 2.

- [ ] **Step 1: List the game pages with a content preview**

```bash
node -e 'const p=require("./src/data/pages.json");for(const x of p.filter(y=>y.source!=="liquipedia")){const txt=x.html.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,160);console.log(x.slug+"\t"+txt)}' > /tmp/game-pages.txt
wc -l /tmp/game-pages.txt
```

- [ ] **Step 2: Assign a category to each, write the map**

Read each page's title + preview (and open the full `html` in `pages.json` when the
title is ambiguous). Assign exactly one category from the fixed taxonomy:
`Maps`, `Units`, `Buildings`, `Combat & mechanics`, `Economy`, `Game modes`,
`Guides`, `Updates`, `Meta & community`. Guidance:
- Maps = playable maps + continents/regions + the `Maps` index (Africa, Europe, World, Baikal, Mars, New York City, …).
- Units = mobile/purchasable units + weapons (Warship, Trade Ship, Transport Ship, Atom Bomb, Hydrogen Bomb, MIRV, Nuke, Troops, Train).
- Buildings = placeable structures (City, Port, Factory, Defense Post, Missile Silo, SAM Launcher, Railroad, the `Buildings` index).
- Combat & mechanics = rules/systems (Alliance, Ally, Betray, Traitor, Annexation, Radiation, Fallout, Terrain, Height Map, Tick, Nations, Bots, Tile, Difficulty).
- Economy = Gold, Trade, Trading.
- Game modes = FFA/Free for All, Teams, Clans, Single Player, and mode variants (FLOAT, Baikal (Nuke Wars) if it's a mode).
- Guides = anything titled/structured as a how-to (Attacking Guide, Early Game, Map Making Guide).
- Updates = `Update *`, `Update History`, `Minor Updates of *`, `Map Updates`, `Upgrading`.
- Meta & community = off-game/community/reference (Discord, GitHub, Controls, Settings, Languages, Content creators, Links Masterpost, Unofficial Projects, Communication, Comparsion Tables, Game Link, OpenFront.io, OpenFront Masters overview, Sandboxels, Flag Table, Openfront Wiki).

Write `scripts/game-categories.json` (2-space indent), e.g.:
```json
{
  "Warship": "Units",
  "City": "Buildings",
  "Africa": "Maps"
}
```

- [ ] **Step 3: Validate full coverage + valid values**

```bash
node -e 'const p=require("./src/data/pages.json");const m=require("./scripts/game-categories.json");const TAX=new Set(["Maps","Units","Buildings","Combat & mechanics","Economy","Game modes","Guides","Updates","Meta & community"]);const game=p.filter(x=>x.source!=="liquipedia").map(x=>x.slug);const missing=game.filter(s=>!m[s]);const extra=Object.keys(m).filter(s=>!game.includes(s));const bad=Object.entries(m).filter(([s,c])=>!TAX.has(c));console.log("game:",game.length,"| mapped:",Object.keys(m).length,"| missing:",missing.length,missing,"| extra:",extra.length,extra,"| bad values:",bad.length,bad)'
```
Expected: `missing: 0`, `extra: 0`, `bad values: 0`.

- [ ] **Step 4: Commit**

```bash
git add scripts/game-categories.json
git commit -m "Add curated game-page category map"
```

---

## Task 2: Stamp `section` onto game pages in `prepare-content`

**Files:**
- Modify: `scripts/prepare-content.mjs`

**Interfaces:**
- Consumes: `scripts/game-categories.json` (Task 1); the in-memory `pages` array.
- Produces: every game page in `src/data/pages.json` has `section: "<Category>"`
  (or `"Other"`). Consumed by Task 4's `groupGamePages`.

- [ ] **Step 1: Assign section after the pages array is built**

In `scripts/prepare-content.mjs`, AFTER the legacy-merge block and BEFORE
`pages.sort(...)`, add:
```js
// stamp a browse category (section) on every page from the curated map;
// unmapped slugs fall to "Other" and are surfaced for categorising.
const CAT_MAP = path.join(root, "scripts", "game-categories.json");
const gameCats = fs.existsSync(CAT_MAP) ? JSON.parse(fs.readFileSync(CAT_MAP, "utf8")) : {};
const uncategorised = [];
for (const p of pages) {
  p.section = gameCats[p.slug] || "Other";
  if (!gameCats[p.slug]) uncategorised.push(p.slug);
}
if (uncategorised.length)
  console.warn(`WARN ${uncategorised.length} game page(s) uncategorised (-> Other): ${uncategorised.join(", ")}\n  add them to scripts/game-categories.json`);
```

- [ ] **Step 2: Re-run both pipelines (content, then liquipedia) and verify**

```bash
SCR="C:/Users/lewis/AppData/Local/Temp/claude/C--Users-lewis-OneDrive-Documents-GitHub-adminbot/66d16ef4-2403-41fe-898d-9a564c1bdee4/scratchpad"
node scripts/prepare-content.mjs "$SCR/wiki-crawl" 2>&1 | tail -2
node scripts/prepare-liquipedia.mjs "$SCR/liq" 2>&1 | tail -1
node -e 'const p=require("./src/data/pages.json");const g=p.filter(x=>x.source!=="liquipedia");const other=g.filter(x=>x.section==="Other");const bySec={};for(const x of g)bySec[x.section]=(bySec[x.section]||0)+1;console.log("game:",g.length,"| Other:",other.length,other.map(x=>x.slug),"\nsections:",bySec)'
```
Expected: the content run prints `WARN 0` (no warning) or none; `Other: 0`; and `sections` lists the taxonomy with sensible counts. Liquipedia pages are unaffected (they have no `section`).

- [ ] **Step 3: Build + commit**

```bash
npm run build 2>&1 | grep -E "Complete|Error" | tail -1
git add scripts/prepare-content.mjs src/data/pages.json
git commit -m "Stamp browse category (section) on game pages"
```

---

## Task 3: Fix mislabeled tournament years + de-dup Antares

**Files:**
- Modify: `scripts/lib/liquipedia-clean.mjs`, `scripts/lib/liquipedia-clean.test.mjs`, `scripts/prepare-liquipedia.mjs`

**Interfaces:**
- Produces: `correctTitleYear(rawSlug: string, title: string): string` in
  `liquipedia-clean.mjs`; applied in `prepare-liquipedia.mjs`. No two `pages.json`
  titles are identical afterward.

- [ ] **Step 1: Write the failing test for the year corrector**

Add to `scripts/lib/liquipedia-clean.test.mjs`:
```js
test("correctTitleYear fixes a title year that disagrees with the slug", () => {
  assert.equal(
    correctTitleYear("Openfront/OFM/2026_Winter_Major", "Openfront Masters 2025 Winter Major"),
    "Openfront Masters 2026 Winter Major",
  );
  assert.equal(correctTitleYear("Openfront/OFM/2025_World_Cup", "2025 World Cup"), "2025 World Cup");
  assert.equal(correctTitleYear("Openfront/Antares", "Antares"), "Antares");
});
```
And add `correctTitleYear` to the import line at the top of the test file.

- [ ] **Step 2: Run it to confirm failure**

Run: `node --test scripts/lib/liquipedia-clean.test.mjs`
Expected: FAIL — `correctTitleYear is not a function` (or import error).

- [ ] **Step 3: Implement the corrector**

In `scripts/lib/liquipedia-clean.mjs`, add and export:
```js
// If the slug carries a 4-digit year the title contradicts, correct the title's
// year to the slug's (fixes Liquipedia displaytitles like a 2026 page titled 2025).
export function correctTitleYear(rawSlug, title) {
  const slugYear = (rawSlug.match(/\b(20\d{2})\b/) || [])[1];
  if (!slugYear) return title;
  const titleYear = (title.match(/\b(20\d{2})\b/) || [])[1];
  if (titleYear && titleYear !== slugYear) return title.replace(titleYear, slugYear);
  return title;
}
```

- [ ] **Step 4: Run tests to confirm pass**

Run: `node --test scripts/lib/liquipedia-clean.test.mjs`
Expected: PASS.

- [ ] **Step 5: Apply it in the preparer**

In `scripts/prepare-liquipedia.mjs`, import `correctTitleYear` (add to the existing
`import { ... } from "./lib/liquipedia-clean.mjs"`), then where each page object is
built (the `title:` field), wrap it:
```js
    title: correctTitleYear(p.slug, p.title),
```

- [ ] **Step 6: Investigate + resolve the duplicate Antares**

```bash
node -e 'const p=require("./src/data/pages.json");const a=p.filter(x=>x.title==="Antares");for(const x of a)console.log(x.slug,x.sourceUrl,"len",x.html.length)'
```
Two entries titled "Antares" (`Antares` ← `Openfront/Antares`, `Antares_2` ← `Openfront/Clans/Antares`). Open both in `pages.json` and compare. Then EITHER:
- If they are the same team (duplicative content): in `scripts/prepare-liquipedia.mjs`, skip the redundant source page by adding a drop check in the `content` filter, e.g. keep `Openfront/Clans/Antares` only if there is no `Openfront/Antares` (or vice-versa — keep whichever has real roster content). Add:
  ```js
  const DROP_LIQ = new Set(["Openfront/Antares"]); // redundant duplicate of Openfront/Clans/Antares (or swap after inspecting)
  ```
  and extend the `content` filter: `.filter((p) => !DROP_LIQ.has(p.slug))`.
- If genuinely different: append a disambiguator to one title in the map/build so labels differ (e.g. `"Antares (clan)"`).

Pick based on the content comparison; document which in the commit message.

- [ ] **Step 7: Re-run liquipedia, verify no duplicate labels, build**

```bash
SCR="C:/Users/lewis/AppData/Local/Temp/claude/C--Users-lewis-OneDrive-Documents-GitHub-adminbot/66d16ef4-2403-41fe-898d-9a564c1bdee4/scratchpad"
node scripts/prepare-liquipedia.mjs "$SCR/liq" 2>&1 | tail -1
node -e 'const p=require("./src/data/pages.json");const t={};for(const x of p)(t[x.title]=t[x.title]||[]).push(x.slug);const dup=Object.entries(t).filter(([k,v])=>v.length>1);console.log("duplicate titles:",dup.length,dup)'
npm run build 2>&1 | grep -E "Complete|Error" | tail -1
```
Expected: `duplicate titles: 0`; build `Complete!`.

- [ ] **Step 8: Commit**

```bash
git add scripts/lib/liquipedia-clean.mjs scripts/lib/liquipedia-clean.test.mjs scripts/prepare-liquipedia.mjs src/data/pages.json public/images/liquipedia
git commit -m "Fix mislabeled tournament years and de-dup Antares"
```

---

## Task 4: Grouping helpers `src/lib/sidebar.js` (TDD)

**Files:**
- Create: `src/lib/sidebar.js`, `src/lib/sidebar.test.mjs`

**Interfaces:**
- Produces:
  - `GAME_CATEGORY_ORDER: string[]` (the 9 taxonomy categories + `"Other"`, in display order).
  - `groupGamePages(pages)` → `Array<{ category: string, items: Page[] }>` — game pages
    (`source !== "liquipedia"`) grouped by `section`, in `GAME_CATEGORY_ORDER`, A–Z by
    title within a group, empty categories omitted.
  - `groupMastersPages(pages)` → `{ tournaments: Page[], teams: Page[], players: Page[] }`
    — liquipedia pages by `cats`; tournaments = OFM-official (A–Z) then community (A–Z).

- [ ] **Step 1: Write the failing tests**

Create `src/lib/sidebar.test.mjs`:
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { GAME_CATEGORY_ORDER, groupGamePages, groupMastersPages } from "./sidebar.js";

const P = (slug, title, extra = {}) => ({ slug, title, cats: [], ...extra });

test("groupGamePages groups by section in fixed order, A-Z within, drops empty", () => {
  const pages = [
    P("Warship", "Warship", { section: "Units" }),
    P("City", "City", { section: "Buildings" }),
    P("Africa", "Africa", { section: "Maps" }),
    P("Atom_Bomb", "Atom Bomb", { section: "Units" }),
    P("OFM_x", "X", { source: "liquipedia", cats: ["Teams"] }), // excluded (masters)
  ];
  const g = groupGamePages(pages);
  assert.deepEqual(g.map((x) => x.category), ["Maps", "Units", "Buildings"]);
  assert.deepEqual(g.find((x) => x.category === "Units").items.map((p) => p.title), ["Atom Bomb", "Warship"]);
});

test("groupGamePages sends missing/unknown section to Other last", () => {
  const g = groupGamePages([P("Foo", "Foo"), P("Bar", "Bar", { section: "Maps" })]);
  assert.equal(g[g.length - 1].category, "Other");
  assert.equal(g[g.length - 1].items[0].title, "Foo");
});

test("groupMastersPages splits tournaments OFM-first, then teams/players", () => {
  const pages = [
    P("t1", "Zeta Cup", { source: "liquipedia", cats: ["OpenFront Masters", "Tournaments", "Community"] }),
    P("t2", "Alpha Major", { source: "liquipedia", cats: ["OpenFront Masters", "Tournaments", "OFM Official"] }),
    P("tm", "Antares", { source: "liquipedia", cats: ["OpenFront Masters", "Teams"] }),
    P("pl", "Biffeur", { source: "liquipedia", cats: ["OpenFront Masters", "Players"] }),
    P("g", "Gold", { section: "Economy" }), // excluded (game)
  ];
  const m = groupMastersPages(pages);
  assert.deepEqual(m.tournaments.map((p) => p.title), ["Alpha Major", "Zeta Cup"]);
  assert.deepEqual(m.teams.map((p) => p.title), ["Antares"]);
  assert.deepEqual(m.players.map((p) => p.title), ["Biffeur"]);
});
```

- [ ] **Step 2: Run to confirm failure**

Run: `node --test src/lib/sidebar.test.mjs`
Expected: FAIL — `Cannot find module './sidebar.js'`.

- [ ] **Step 3: Implement the helpers**

Create `src/lib/sidebar.js`:
```js
export const GAME_CATEGORY_ORDER = [
  "Maps", "Units", "Buildings", "Combat & mechanics", "Economy",
  "Game modes", "Guides", "Updates", "Meta & community", "Other",
];

const byTitle = (a, b) => a.title.localeCompare(b.title);

export function groupGamePages(pages) {
  const game = pages.filter((p) => p.source !== "liquipedia");
  const buckets = {};
  for (const p of game) (buckets[GAME_CATEGORY_ORDER.includes(p.section) ? p.section : "Other"] ||= []).push(p);
  return GAME_CATEGORY_ORDER
    .filter((c) => buckets[c]?.length)
    .map((c) => ({ category: c, items: buckets[c].sort(byTitle) }));
}

export function groupMastersPages(pages) {
  const liq = pages.filter((p) => p.source === "liquipedia");
  const has = (p, c) => (p.cats || []).includes(c);
  const pick = (c) => liq.filter((p) => has(p, c)).sort(byTitle);
  return {
    tournaments: [...liq.filter((p) => has(p, "OFM Official")).sort(byTitle),
                  ...liq.filter((p) => has(p, "Community")).sort(byTitle)],
    teams: pick("Teams"),
    players: pick("Players"),
  };
}
```

- [ ] **Step 4: Run tests to confirm pass**

Run: `node --test src/lib/sidebar.test.mjs`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/sidebar.js src/lib/sidebar.test.mjs
git commit -m "Add tested sidebar grouping helpers"
```

---

## Task 5: `BrowseSidebar.astro` — sectioned browse + collapse persistence

**Files:**
- Create: `src/components/BrowseSidebar.astro`
- Modify: `src/pages/[slug].astro`

**Interfaces:**
- Consumes: `groupGamePages`, `groupMastersPages` (Task 4); `pages.json`; a
  `currentSlug` prop.
- Produces: `<BrowseSidebar currentSlug={string} />`.

- [ ] **Step 1: Create the component**

Create `src/components/BrowseSidebar.astro`:
```astro
---
import pages from "../data/pages.json";
import { groupGamePages, groupMastersPages } from "../lib/sidebar.js";
const { currentSlug } = Astro.props;
const game = groupGamePages(pages);
const masters = groupMastersPages(pages);
const gameCount = game.reduce((n, g) => n + g.items.length, 0);
const mastersCount = masters.tournaments.length + masters.teams.length + masters.players.length;
const linkCls = (slug) =>
  "block rounded-md px-2.5 py-1.5 text-sm transition-colors hover:bg-white/5 hover:text-white " +
  (slug === currentSlug ? "bg-malibu/15 font-semibold text-aquarius" : "text-dawn/80");
const mastersSub = [
  { label: "Tournaments", items: masters.tournaments },
  { label: "Teams", items: masters.teams },
  { label: "Players", items: masters.players },
].filter((s) => s.items.length);
---
<div id="wiki-sidebar">
  <input
    id="wiki-search"
    type="search"
    placeholder="Search the wiki…"
    autocomplete="off"
    aria-label="Search the wiki"
    class="mb-3 w-full rounded-lg border border-white/10 bg-navy-700/70 px-3 py-2 text-sm text-white placeholder:text-dawn/40 focus:border-malibu/60 focus:outline-none"
  />

  <div id="wiki-results" hidden class="space-y-1.5"></div>

  <div id="wiki-browse" class="space-y-1">
    <details class="wiki-section" data-key="game">
      <summary class="wiki-summary">
        <span>Game Wiki</span><span class="wiki-count">{gameCount}</span>
      </summary>
      {game.map((grp) => (
        <details class="wiki-subsection" data-key={`game:${grp.category}`}>
          <summary class="wiki-subsummary"><span>{grp.category}</span><span class="wiki-count">{grp.items.length}</span></summary>
          <ul>{grp.items.map((p) => (<li><a href={`/${p.slug}`} data-title={p.title.toLowerCase()} class={linkCls(p.slug)}>{p.title}</a></li>))}</ul>
        </details>
      ))}
    </details>

    <details class="wiki-section" data-key="masters">
      <summary class="wiki-summary">
        <span>OpenFront Masters</span><span class="wiki-count">{mastersCount}</span>
      </summary>
      {mastersSub.map((s) => (
        <details class="wiki-subsection" data-key={`masters:${s.label}`}>
          <summary class="wiki-subsummary"><span>{s.label}</span><span class="wiki-count">{s.items.length}</span></summary>
          <ul>{s.items.map((p) => (<li><a href={`/${p.slug}`} data-title={p.title.toLowerCase()} class={linkCls(p.slug)}>{p.title}</a></li>))}</ul>
        </details>
      ))}
    </details>
  </div>
</div>

<style>
  .wiki-summary, .wiki-subsummary { cursor: pointer; list-style: none; display: flex; align-items: center; gap: 6px; user-select: none; }
  .wiki-summary::-webkit-details-marker, .wiki-subsummary::-webkit-details-marker { display: none; }
  .wiki-summary { padding: 0.4rem 0.25rem; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-cyan-glow); }
  .wiki-subsummary { padding: 0.35rem 0.5rem; font-size: 0.8rem; color: var(--color-dawn); }
  .wiki-summary::before, .wiki-subsummary::before { content: "▸"; color: var(--color-aquarius); transition: transform 0.15s; }
  details[open] > .wiki-summary::before, details[open] > .wiki-subsummary::before { transform: rotate(90deg); }
  .wiki-count { margin-left: auto; font-size: 0.7rem; color: var(--color-dawn); opacity: 0.55; }
  .wiki-subsection { padding-left: 0.5rem; }
  #wiki-results a { display: block; border: 1px solid rgb(255 255 255 / 0.1); border-radius: 0.5rem; padding: 0.5rem 0.7rem; }
  #wiki-results a:hover { background: rgb(255 255 255 / 0.04); }
  .wiki-result-title { display: block; font-size: 0.85rem; font-weight: 600; color: var(--color-aquarius); }
  .wiki-result-excerpt { display: block; font-size: 0.78rem; color: var(--color-dawn); opacity: 0.8; line-height: 1.4; margin-top: 2px; }
  .wiki-result-excerpt mark { background: rgb(255 215 0 / 0.18); color: #fff; padding: 0 2px; border-radius: 2px; }
</style>

<script>
  // Persist section open/closed state across navigations.
  const KEY = "wiki-sidebar-open";
  const openSet = new Set(JSON.parse(localStorage.getItem(KEY) || "[]"));
  document.querySelectorAll("#wiki-browse details").forEach((d) => {
    const k = d.getAttribute("data-key");
    if (openSet.has(k)) d.open = true;
    d.addEventListener("toggle", () => {
      if (d.open) openSet.add(k); else openSet.delete(k);
      localStorage.setItem(KEY, JSON.stringify([...openSet]));
    });
  });
</script>
```

- [ ] **Step 2: Use it in the article page**

In `src/pages/[slug].astro`, replace the entire left `<aside>…</aside>` browse block
(the one containing the old `#page-filter` input and `#page-list`) with:
```astro
    <aside class="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto">
      <details open>
        <summary class="mb-3 flex cursor-pointer list-none items-center justify-between text-xs font-semibold uppercase tracking-widest text-cyan-glow lg:cursor-default">
          Browse Pages <span class="lg:hidden">▾</span>
        </summary>
        <BrowseSidebar currentSlug={page.slug} />
      </details>
    </aside>
```
Add the import to the frontmatter: `import BrowseSidebar from "../components/BrowseSidebar.astro";`
Then DELETE the now-unused old sidebar `<script>` (the `#page-filter` filter block) at
the bottom of `[slug].astro` (the `input?.addEventListener("input", …)` for `page-filter`).

- [ ] **Step 3: Build + screenshot-verify browse**

```bash
npm run build 2>&1 | grep -E "Complete|Error" | tail -1
(npm run preview -- --port 4340 &) ; sleep 4
node scripts/_shot.mjs http://localhost:4340/Warship /tmp/sb-collapsed.png 420 900
```
Create `scripts/_shot.mjs` if absent (bundled-chromium screenshot helper — headless launch, goto, fullPage screenshot, log page errors). **Read the screenshot:** expect the sidebar collapsed to the search box + `Game Wiki` and `OpenFront Masters` headers with counts, no long list. Then expand a section in a second shot by pre-seeding localStorage is optional; instead verify the built HTML contains the sub-group summaries:
```bash
grep -c "wiki-subsummary" dist/Warship/index.html   # > 0
pkill -f "astro preview"
```
No console/page errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/BrowseSidebar.astro src/pages/[slug].astro
git commit -m "Add collapsible sectioned BrowseSidebar with persistence"
```

---

## Task 6: Pagefind inline search

**Files:**
- Modify: `package.json`, `src/pages/[slug].astro`, `src/components/BrowseSidebar.astro`, `src/layouts/Layout.astro`

**Interfaces:**
- Consumes: the built `dist/` HTML (Pagefind indexes it); the `#wiki-search`,
  `#wiki-browse`, `#wiki-results` elements from Task 5.
- Produces: a working inline search that swaps browse for result cards.

- [ ] **Step 1: Add Pagefind + build chain**

```bash
npm install -D pagefind
```
In `package.json` `scripts`, change:
```json
"build": "astro build",
```
to:
```json
"build": "astro build && pagefind --site dist",
```

- [ ] **Step 2: Mark indexable content vs chrome**

In `src/pages/[slug].astro`, add `data-pagefind-body` to the article element:
```astro
      <article class="wiki-content mt-6" set:html={page.html} data-pagefind-body />
```
Add `data-pagefind-ignore` to non-content regions so only article text is indexed:
- the left `<aside>` (browse), the breadcrumb `<nav>`, the right TOC `<aside>`, and in
  `src/layouts/Layout.astro` the `<header>`/`SiteHeader` and `<footer>`/`SiteFooter`
  wrappers. Add the bare attribute `data-pagefind-ignore` to each of those elements.

- [ ] **Step 3: Add the search script to BrowseSidebar**

Append to `src/components/BrowseSidebar.astro` a SECOND script, marked `is:inline` so
Vite does not try to bundle the runtime-only `/pagefind/pagefind.js` path:
```astro
<script is:inline>
  (() => {
    const input = document.getElementById("wiki-search");
    const browse = document.getElementById("wiki-browse");
    const results = document.getElementById("wiki-results");
    if (!input) return;
    let pf, timer;
    async function run(q) {
      if (!q) { results.hidden = true; results.innerHTML = ""; browse.hidden = false; return; }
      try { pf ||= await import("/pagefind/pagefind.js"); }
      catch { results.innerHTML = '<p style="font-size:.8rem;opacity:.7">Search runs on the built site.</p>'; results.hidden = false; browse.hidden = true; return; }
      const search = await pf.search(q);
      const cards = await Promise.all(search.results.slice(0, 12).map((r) => r.data()));
      results.innerHTML = cards.length
        ? cards.map((c) => `<a href="${c.url}"><span class="wiki-result-title">${c.meta?.title || ""}</span><span class="wiki-result-excerpt">${c.excerpt}</span></a>`).join("")
        : '<p style="font-size:.8rem;opacity:.7">No results.</p>';
      browse.hidden = true; results.hidden = false;
    }
    input.addEventListener("input", (e) => { clearTimeout(timer); const q = e.target.value.trim(); timer = setTimeout(() => run(q), 150); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== input && !/input|textarea/i.test(document.activeElement?.tagName || "")) { e.preventDefault(); input.focus(); }
    });
  })();
</script>
```

- [ ] **Step 4: Build (with Pagefind) + verify the index and search**

```bash
npm run build 2>&1 | grep -iE "Complete|Error|pagefind|indexed" | tail -4
ls dist/pagefind/pagefind.js
(npm run preview -- --port 4341 &) ; sleep 4
node scripts/_shot.mjs "http://localhost:4341/Warship" /tmp/sb-page.png 420 900
node -e '(async()=>{const b=await (await import("playwright")).chromium.launch({headless:true,args:["--no-sandbox"]});const p=await b.newPage({viewport:{width:420,height:900}});const errs=[];p.on("pageerror",e=>errs.push(e.message.split("\n")[0]));await p.goto("http://localhost:4341/Warship",{waitUntil:"networkidle"});await p.fill("#wiki-search","world");await p.waitForTimeout(800);const cards=await p.$$eval("#wiki-results a",els=>els.map(e=>e.querySelector(".wiki-result-title")?.textContent));await p.screenshot({path:"/tmp/sb-search.png",fullPage:true});console.log("result titles:",cards,"| errors:",errs);await b.close()})()'
pkill -f "astro preview"
```
Expected: `dist/pagefind/pagefind.js` exists; the search fill yields non-empty `result titles` (e.g. World / Maps / Giant World Map); no page errors. **Read `/tmp/sb-search.png`** — result cards with titles + highlighted excerpts replace the browse list.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/pages/[slug].astro src/components/BrowseSidebar.astro src/layouts/Layout.astro
git commit -m "Add inline Pagefind full-text search to the sidebar"
```

---

## Self-Review Notes

- **Spec coverage:** categorisation (T1–T2), title/dup cleanup (T3), grouping helpers (T4), sectioned collapsible sidebar + persistence + current-page highlight (T5), inline Pagefind search + build chain (T6). All spec sections mapped.
- **Ordering:** T1→T2 (map before pipeline), T2/T3 both regenerate `pages.json` and BOTH re-run in the content→liquipedia order; T4 helpers depend on the `section` field (T2) and corrected titles (T3); T5 consumes T4; T6 builds on T5's DOM ids (`#wiki-search`/`#wiki-browse`/`#wiki-results`).
- **Type consistency:** `section` field set in T2, read by `groupGamePages` in T4; `#wiki-*` ids created in T5, used in T6; `correctTitleYear(rawSlug,title)` defined + consumed in T3.
- **Known env notes:** Pagefind's `/pagefind/` only exists after a build, so search is verified via `astro preview` (built output), not `astro dev`; the search script is `is:inline` to keep Vite from resolving the runtime path. `scripts/_shot.mjs` is a throwaway bundled-chromium screenshot helper — create if missing, and it need not be committed.
