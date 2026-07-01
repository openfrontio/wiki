# OpenFront Wiki — improvements roadmap (items 1–7)

**Date:** 2026-07-01
**Status:** Roadmap. Each item is an independent sub-project; when we pick one up
it gets its own detailed TDD implementation plan before code.

## Context (as-built, verified)

- Astro 5.6 static export → Cloudflare Pages, auto-deploy on push to `main`.
- Content = `src/data/pages.json` from two pipelines: Miraheze crawl
  (`crawl-wiki.mjs` → `prepare-content.mjs`) and Liquipedia
  (`liquipedia-fetch.mjs` → `prepare-liquipedia.mjs`).
- Layout has base meta (title, description default, OG title/description/type/image,
  theme-color). `astro.config.mjs` has `site: "https://openfront.wiki"`.
- Search today = sidebar **title** filter only (`[slug].astro` inline script).
- `[slug].astro` passes only `title` to Layout (no per-page description).
- Junk pages (`List_of_heads_of_state_of_India` ×2, `Timurid_Empire_Flag_SVG`) are
  Miraheze-sourced; drop via `prepare-content.mjs` `DROP` set (line 20). The two
  India pages are also the only ones hotlinking external Wikimedia images.

## Recommended sequence

Small pipeline/curation fixes first (clean content), then SEO, then search, then
mobile, then automation last (so the scheduled job runs a clean, pruned pipeline):

**4 → 7 → 3 → 2 → 1 → 6 → 5**

| # | Item | Effort | Risk | Depends on |
|---|------|--------|------|-----------|
| 4 | Prune Liquipedia images on refresh | S | low | — |
| 7 | Icon-coverage guard | S | low | — |
| 3 | Content curation (drop junk) | S | low | — |
| 2 | Per-page SEO (desc + canonical + sitemap) | S–M | low | — |
| 1 | Full-text search (Pagefind) | M | med | — |
| 6 | Mobile audit + fixes | M | med | 1,2 (nice-to-have) |
| 5 | Automated refresh (GitHub Action) | M | high | 3,4,7 |

---

## 1. Full-text search (Pagefind)

**Goal:** search across all article *content*, not just titles.

**Approach:** [Pagefind](https://pagefind.app) — indexes the built `dist/` HTML at
build time, ships a static index + tiny JS UI, no server. Mark the article body
with `data-pagefind-body` and chrome (nav/sidebar/footer) with
`data-pagefind-ignore` so only content is indexed.

**Files:**
- `package.json` — add `pagefind` devDep; change build to `astro build && pagefind --site dist`.
- `src/pages/[slug].astro`, `index.astro`, `all.astro` — `data-pagefind-body` on `<article>`/main; `data-pagefind-ignore` on sidebar/TOC.
- `src/components/SiteHeader.astro` — a search input that opens Pagefind's UI (default modal first; restyle to tokens later).
- `src/layouts/Layout.astro` — load the Pagefind UI CSS/JS on demand.

**Steps (high-level):** add dep + build step → annotate body/ignore → drop in
Pagefind UI in header → verify the Cloudflare build runs `pagefind` (chain in the
build command so it runs in CI) → screenshot-verify search returns content hits.

**Effort:** M. **Risks:** the `pagefind` step must run in Cloudflare's build (chain
in `npm run build`); big tournament pages inflate the index slightly. **Decisions:**
Pagefind default UI (fast) vs a custom input bound to its JS API (on-brand) — start default.

## 2. Per-page SEO (descriptions + canonical + sitemap)

**Goal:** unique, meaningful metadata per article + machine-discoverable sitemap.

**Approach:**
- Derive a `description` per page: first ~155 chars of the article's *text* (strip
  tags + infoboxes/tables) → pass to `Layout` from each page.
- Add `<link rel="canonical">` + `og:url` in `Layout` using `Astro.site` + `Astro.url.pathname`.
- Add `@astrojs/sitemap` (works because `site` is set) → `sitemap-index.xml`.

**Files:**
- `src/layouts/Layout.astro` — canonical + og:url.
- `src/pages/[slug].astro` (+ `index.astro`, `all.astro`) — compute + pass `description`.
- `astro.config.mjs` — add `sitemap()` to integrations.
- `package.json` — `@astrojs/sitemap` devDep.

**Steps:** helper to extract a clean description (reuse cheerio, strip
infobox/wikitable/figure, collapse whitespace, trim to a word boundary) → wire into
pages → canonical/og:url → sitemap integration → verify built `<head>` + `sitemap-index.xml`.

**Effort:** S–M. **Risks:** description quality on infobox-heavy pages — strip
non-prose first. **Decisions:** description length (~155) and source (first prose paragraph).

## 3. Content curation (drop junk pages + external hotlinks)

**Goal:** remove off-topic/junk pages and eliminate external image hotlinks.

**Approach:** add `List_of_heads_of_state_of_India`,
`List_of_heads_of_state_of_India_1857`, `Timurid_Empire_Flag_SVG` to the
`prepare-content.mjs` `DROP` set; re-run the Miraheze crawl+prepare (or just
`prepare-content` if the crawl cache is present). Optionally add a `cleanHtml` rule
that de-links/removes any remaining `http(s)` image hotlinks site-wide (privacy +
perf + no external breakage).

**Files:** `scripts/prepare-content.mjs` (`DROP` set; optional external-img strip).

**Steps:** extend DROP → re-run pipeline → confirm the 3 slugs gone + `0 pages
hotlink external images` → build + audit (0 dead links / broken imgs) → commit.

**Effort:** S. **Risks:** need the crawl cache or a re-crawl. **Decisions:** confirm
the 3 pages to drop; whether to strip *all* external hotlinked images globally.

## 4. Prune Liquipedia images on refresh

**Goal:** `prepare-liquipedia` keeps `public/images/liquipedia/` in sync (like
`prepare-content` already does), so refreshes don't accrete orphans.

**Approach:** after copying hostable images, compute the referenced set from the
merged Liquipedia pages' HTML (`src="/images/liquipedia/..."`) and delete any file
in `public/images/liquipedia/` not referenced.

**Files:** `scripts/prepare-liquipedia.mjs` (mirror the prune block from `prepare-content.mjs`).

**Steps:** add prune loop scoped to the liquipedia dir → re-run prepare → confirm
`referenced == on-disk` → build. **Effort:** S. **Risks:** none (scoped to the
liquipedia subdir; the fetcher already only downloads hostable files).

## 5. Automated content refresh (scheduled GitHub Action)

**Goal:** both wikis refresh on a schedule without manual runs.

**Approach:** a cron GitHub Action (e.g. weekly) on an Ubuntu runner: install deps
+ `npx playwright install chromium`, run the Miraheze crawl→prepare and the
Liquipedia fetch→prepare into a temp cache, then if `src/data/pages.json` /
`public/images/**` changed, **open a PR** (safer than direct push) so changes are
reviewed before deploy.

**Files:** `.github/workflows/refresh-content.yml`.

**Steps:** workflow with Node + Playwright setup → run both pipelines → `git diff`
gate → create-or-update PR via `peter-evans/create-pull-request` (or push to a
`content-refresh` branch) → document in CLAUDE.md.

**Effort:** M. **Risks (highest of the set):** Cloudflare bot-protection on the
Miraheze crawl may behave differently in CI (the crawler already handles the
interstitial, but headless-in-CI is less proven); Liquipedia rate limits make the
job ~18+ min (fine on a scheduled runner); CI needs the browser + write
permissions/token. **Decisions:** cadence (weekly?); **PR vs auto-push** (recommend
PR for a human gate); failure handling (don't commit partial output).
**Do this last** — it should orchestrate the already-hardened, pruned pipelines (3, 4, 7).

## 6. Mobile audit + fixes

**Goal:** wiki + esports content is usable at 390 px.

**Approach:** screenshot the page-type matrix at `390×844` — home, a game article,
a wide-table page (`Flag_Table`, `Comparsion_Tables`), a tournament (tables +
brackets), a team, a player. Catalogue overflow, then fix in `global.css`: ensure
tables sit in an `overflow-x` wrapper, brackets scroll (already partly done),
infoboxes/teamcards go full-width under a breakpoint, and confirm the
`[slug].astro` 3-column grid collapses cleanly (it already uses `lg:` breakpoints).

**Files:** `src/styles/global.css` (responsive rules), possibly `[slug].astro` grid.

**Steps:** capture the matrix → list breakages → apply responsive fixes → re-shoot
mobile + desktop (no desktop regressions). **Effort:** M. **Risks:** many structures,
iterative. **Decisions:** how far to push bracket/table readability on phones.

## 7. Icon-coverage guard

**Goal:** new Liquipedia `fa-` classes never silently vanish.

**Approach:** in `prepare-liquipedia` (or a small check), collect every `fa-*` class
from the fetched HTML, diff against the `ICONS` map keys, and `console.warn` the
unmapped ones (with a hint to add them to `gen-liquipedia-icons.mjs` + regenerate).

**Files:** `scripts/prepare-liquipedia.mjs` (or `scripts/gen-liquipedia-icons.mjs` `--check`).

**Steps:** gather used `fa-` set → subtract mapped keys → warn on remainder → (manual)
add + regenerate. **Effort:** S. **Risks:** none (advisory only).

---

## Notes

- Items 2, 3, 4, 7 are small, independent, low-risk — a good first batch to land together.
- Item 1 (search) and item 2 (SEO) both touch `Layout`/pages; do SEO first (simpler), then search.
- Each item gets a full TDD implementation plan (via the writing-plans skill) when we start it.
