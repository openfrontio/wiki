# Sidebar navigation overhaul — design

**Date:** 2026-07-01
**Status:** Draft for review

## Overview

Replace the article sidebar's flat, 143-item, title-only-filtered list with a
**sectioned, collapsible browse** plus **inline full-text search**. Today every
page — ~103 game-wiki pages and 40 esports (OpenFront Masters) pages — sits in one
alphabetical list with a title filter, which is overwhelming, mixes two unrelated
domains, and shows confusing duplicate titles. This also delivers roadmap item #1
(search).

## Goals

- Make the sidebar scannable and not overwhelming: collapsed sections by default.
- Separate the two domains: Game Wiki vs OpenFront Masters (esports).
- Real find-ability: inline full-text search over page content (Pagefind).
- Remove confusing duplicate/mislabeled entries.
- Stay a pure static export; search indexed at build time.

## Non-goals

- No server/SSR (Pagefind is static: build-time index + client JS).
- No redesign of the article body, header, or footer.
- No re-categorising the game wiki (its source pages are mostly uncategorised —
  that's why the game side is A–Z, not category-grouped).

## Design

### Layout (top → bottom)

1. **Search box** — full-text search input at the top.
2. **`GAME WIKI` section** (count) — collapsible; when open, an **A–Z list with
   sticky letter dividers** (A, B, C…). Contains every non-Masters page.
3. **`OPENFRONT MASTERS` section** (count) — collapsible; when open, three
   sub-groups, each collapsible: **Tournaments** (OFM-official listed first, then
   community), **Teams**, **Players**. Contains every `source: "liquipedia"` page.

### Behavior

- **Collapsed by default.** First load shows the search box + the two section
  headers (with counts) only. The user expands what they want.
- **State persists** across navigation via `localStorage` (per-section open/closed),
  so expanding a section stays expanded as you move between pages.
- **Current page** is highlighted; when its containing section is open it scrolls
  into view. Its section is not force-expanded (keeps the default minimal).
- **Counts** shown next to each section/sub-group header.

### Search (Pagefind, inline)

- Typing queries a build-time [Pagefind](https://pagefind.app) index over page
  **content**; the browse sections are replaced by ranked **result cards** (page
  title + a matched excerpt with highlight). Clearing the box (× or empty) returns
  to browse. `/` focuses the search box from anywhere on the page.
- Indexing: the `<article>` body is marked `data-pagefind-body`; sidebar, header,
  footer, and TOC are marked `data-pagefind-ignore` so only content is indexed.
- Static: `pagefind --site dist` runs after `astro build`; the client loads the
  Pagefind JS module on first focus/keystroke (lazy), no server.

### Data cleanup (removes the confusing twins)

- **Mislabeled tournament years:** `OFM_2026_Winter_Major` is currently *titled*
  "…2025 Winter Major" (Liquipedia displaytitle disagrees with the slug year).
  In `prepare-liquipedia.mjs`, when the slug carries a 4-digit year that the title
  lacks or contradicts, correct the title to the slug's year. Same for Winter Minor.
- **Duplicate `Antares`:** two source pages (`Openfront/Antares`,
  `Openfront/Clans/Antares`) resolve to two entries titled "Antares". Investigate
  during implementation: if the content is duplicative, drop the alias via the
  existing filtering (prefer the canonical team page); if genuinely distinct,
  disambiguate the display title. Verified end state: no two sidebar entries share
  an identical label.

## Architecture / files

- **Create** `src/components/BrowseSidebar.astro` — the whole sidebar (search box +
  sections + sub-groups), taking the current page's slug as a prop. Encapsulates the
  grouping logic (partition pages → game A–Z vs Masters sub-groups) and the markup.
  Replaces the inline sidebar currently in `src/pages/[slug].astro`.
- **Create** `src/lib/sidebar.js` — pure grouping helpers: `groupGamePages(pages)`
  → `[{letter, items}]`; `groupMastersPages(pages)` → `{tournaments, teams, players}`.
  Unit-tested (`node:test`).
- **Modify** `src/pages/[slug].astro` (and `index.astro`/`all.astro` if they render a
  sidebar) — use `<BrowseSidebar>` instead of the inline list.
- **Modify** `src/layouts/Layout.astro` — load Pagefind UI assets; keep `data-pagefind-*`
  hooks consistent.
- **Create/modify** a client script (in `BrowseSidebar.astro`) — section toggle +
  persistence, and the inline Pagefind search (query → render result cards → restore).
- **Modify** `package.json` — add `pagefind` devDep; build becomes
  `astro build && pagefind --site dist`.
- **Modify** `scripts/prepare-liquipedia.mjs` — title-year correction (+ a unit test
  for the correction helper).
- **Modify** `src/data/pages.json` — regenerated after the title fix.

Mobile: the existing outer collapsible "Browse Pages" (`<details>`) is preserved; the
new sections live inside it.

## Testing / verification

- Unit tests (`node:test`) for the grouping helpers and the title-year corrector.
- Static build succeeds (`npm run build && pagefind --site dist`), pure static.
- Screenshot-verify (per `CLAUDE.md`) desktop + mobile (390×844): default collapsed
  state, an expanded section with letter dividers, the Masters sub-groups, and a
  search with result cards. No console errors; `/` focuses search; state persists
  across a navigation.
- Confirm no two sidebar entries share an identical label.

## Decisions (resolved)

- **Navigation model:** sectioned collapsible browse + inline search (both).
- **Default state:** all sections **collapsed**.
- **Search UX:** inline in the sidebar (results replace the browse list).
- **Game grouping:** A–Z with letter dividers (game pages lack categories).
- **Masters grouping:** Tournaments (OFM first) / Teams / Players.

## Open risks

- Pagefind's `pagefind` binary must run in Cloudflare's build (chain it in the build
  command). Big tournament pages inflate the index slightly.
- `Astro.url`/trailing-slash: result links must use the same slug routes the browse
  list uses (`/Slug`).
