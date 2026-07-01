# Liquipedia → OpenFront Masters integration — design

**Date:** 2026-07-01
**Status:** Draft for review

## Overview

Mirror the OpenFront esports content from Liquipedia's Lab wiki
(`https://liquipedia.net/lab/Openfront`) into this site as part of the
**OpenFront Masters** section: tournaments, clans/teams, and players. Content is
hosted locally (full mirror), rendered through the existing `[slug].astro`
article template, flat in `pages.json` and tagged with an `OpenFront Masters`
category. Liquipedia content is licensed CC-BY-SA 3.0 and requires attribution.

This is a **separate pipeline** from the Miraheze crawler because Liquipedia's
API Terms of Use prohibit HTML scraping and impose strict rate limits.

## Goals

- Host all ~35 `Openfront/*` Lab pages (tournaments, clans, players) locally.
- Render them acceptably in the site's dark theme ("best-effort readable"):
  infoboxes, panels, tables, and brackets are legible even if not pixel-perfect.
- Attribute Liquipedia (CC-BY-SA 3.0) visibly on every mirrored page.
- Stay ToS-compliant: API-only, custom User-Agent, rate-limited, cached.
- Keep the build a **pure static export** (no SSR, no build-time dependence on a
  private service). Fetch is an offline, manually-run step whose output is
  committed — exactly like `crawl-wiki.mjs` → `prepare-content.mjs`.

## Non-goals

- No live/auto-updating results. The mirror is a manual-refresh snapshot; esports
  data will go stale between refreshes (accepted trade-off of "full mirror").
- No re-hosting of non-free images (fair-use team logos / player photos).
- No namespaced `/masters/...` routes — pages are flat, grouped by category.
- No port of Liquipedia's full skin CSS.

## Architecture

Three stages, mirroring the existing pipeline shape:

```
Liquipedia Lab API (api.php)
      │  [1] scripts/liquipedia-fetch.mjs   (API-only, rate-limited, cached)
      ▼
  <cacheDir>/liquipedia.json + <cacheDir>/images/   (raw snapshot)
      │  [2] scripts/prepare-liquipedia.mjs  (clean + transform + license-filter)
      ▼
  merged into src/data/pages.json  +  public/images/liquipedia/
      │  astro build (getStaticPaths over pages.json — unchanged)
      ▼
  dist/  →  Cloudflare Pages
```

### Stage 1 — `scripts/liquipedia-fetch.mjs` (new)

ToS-compliant fetcher. Usage: `node scripts/liquipedia-fetch.mjs <cacheDir>`.

- **User-Agent:** `OpenFrontWiki/1.0 (https://openfront.wiki; lewis@outpostgroup.io)`.
- **Rate limits:** `action=parse` ≤ 1 request / 30s; all other requests ≤ 1 / 2s.
  ~35 pages ⇒ ~18 minutes. A single long manual run.
- **Enumerate:** `action=query&list=allpages&apprefix=Openfront/&apnamespace=0`
  (cross-checked against `prop=links` on the `Openfront` portal page).
- **Fetch content:** for each page, `action=parse&prop=text|images|links|categories|displaytitle`.
- **Fetch image metadata:** `action=query&titles=File:…&prop=imageinfo&iiprop=url|extmetadata`
  to get the download URL **and license** (`LicenseShortName`, `License`).
- **Cache:** write each raw API response to `<cacheDir>/raw/<page>.json`. Re-runs
  reuse the cache and skip already-fetched pages unless `--force`, so we don't
  re-hit Liquipedia unnecessarily.
- **Output:** `<cacheDir>/liquipedia.json` = `[{ slug, title, sourceUrl, html,
  cats, images:[{name,url,license,free}] }]`, plus downloaded free images in
  `<cacheDir>/images/`.

### Stage 2 — `scripts/prepare-liquipedia.mjs` (new)

Cleans the Liquipedia HTML and merges into the manifest. Kept separate from
`prepare-content.mjs` because the cleaning rules differ (Liquipedia skin vs.
MediaWiki/Citizen). Emits page objects appended to `src/data/pages.json` and
copies kept images into `public/images/liquipedia/`.

Cleaning rules:
- **Strip** script/style/edit-section/skin chrome we can't support; **keep**
  `infobox`, `panel-box`, `wikitable`, bracket, and `flag` structures with their
  class names intact so our CSS can target them.
- **Internal links:** `Openfront/X` → local slug (see below). Other Lab pages and
  any `liquipedia.net` links → external (`target=_blank`, `rel=noopener`),
  keeping the reader on Liquipedia for anything we don't host. Red links (`.new`)
  → plain text.
- **Images:** rewrite kept images' `src` → `/images/liquipedia/<name>`. Images
  whose license is **not** free (per Stage 1 metadata) are removed and replaced
  with their `alt` text. Free licenses: CC-BY-SA*, CC-BY*, CC0/public domain,
  "self".
- **Attribution:** set `source: "liquipedia"` and `sourceUrl` on each page object.

### Stage 3 — site integration

- **`src/pages/[slug].astro`:** when `page.source === "liquipedia"`, render a
  visible attribution block: "This page uses material from
  [Liquipedia](sourceUrl), licensed under CC-BY-SA 3.0." (replacing/supplementing
  the existing CC-BY-SA 4.0 footer for these pages).
- **`src/styles/global.css`:** add scoped styles under `.wiki-content` for
  `.infobox`, `.panel-box`, `.wikitable`, brackets (rendered as readable tables),
  and `.flag`, themed for dark mode. Self-host a **minimal FontAwesome subset**
  (only the icons Liquipedia actually uses) for `fas fa-*`; strip unused ones.
- **Hub page:** the existing `OpenFront_Masters` page gains an auto-generated
  index (grouped Tournaments / Teams / Players) of the mirrored pages. Add
  "OpenFront Masters" to `SiteHeader`/`SiteFooter` nav.

## Data model

`pages.json` entries gain two optional fields (game/legacy pages omit them):

```jsonc
{
  "slug": "2026_World_Cup",
  "title": "2026 World Cup",
  "cats": ["OpenFront Masters", "Tournaments"],
  "headings": [...],
  "html": "...",
  "source": "liquipedia",
  "sourceUrl": "https://liquipedia.net/lab/Openfront/2026_World_Cup"
}
```

### Slug & category scheme

- Slug = title with `Openfront/` (and `Openfront/OFM/`, `Openfront/Clans/`)
  prefixes stripped, spaces → `_`. Example: `Openfront/OFM/2025 World Cup` →
  `OFM_2025_World_Cup` (keep the `OFM` marker to disambiguate the official-org
  tournaments from community ones and avoid collisions). Collisions with existing
  slugs are detected and suffixed.
- Categories: `OpenFront Masters` always, plus one of `Tournaments` / `Teams` /
  `Players` inferred from the page (bracket/infobox type, or portal grouping).

## Licensing

- Update `LICENSING.md` with a fourth bucket: **Liquipedia-sourced Masters
  content** (`source: "liquipedia"` pages + `public/images/liquipedia/`) under
  **CC-BY-SA 3.0**, attributed per-page. CC-BY-SA 3.0 → the site's 4.0 is
  one-way compatible.
- Non-free images are never re-hosted (Stage 2 license filter).

## Refresh & staleness

- Refresh = re-run Stage 1 (cached; `--force` to refetch) then Stage 2, then
  rebuild. Document in `CLAUDE.md` alongside the Miraheze pipeline notes, with a
  clear caveat that Masters content is a snapshot and dates/results go stale.

## ToS compliance checklist

- [x] API only — no HTML page scraping.
- [x] Custom User-Agent with project URL + contact email.
- [x] `action=parse` ≤ 1/30s, others ≤ 1/2s.
- [x] Local caching to avoid redundant requests.
- [x] CC-BY-SA 3.0 attribution shown on every mirrored page.

## Decisions (resolved)

- **Integration model:** full mirror (host everything).
- **Structure:** flat in `pages.json` + `OpenFront Masters` category (not
  namespaced routes).
- **Fidelity:** best-effort readable (own lightweight CSS + FontAwesome subset;
  brackets as readable tables).
- **Images:** omit non-free logos/photos (license-filtered); keep free media.
- **Attribution:** prominent per-page Liquipedia CC-BY-SA 3.0 credit.

## Testing / verification

- Fetch a small subset first (e.g. one tournament, one team, one player) to
  validate cleaning/rendering before the full ~18-min run.
- Static build must succeed (`npm run build`, pure static).
- Screenshot-verify (per `CLAUDE.md`) one of each page type (tournament with a
  bracket, team infobox, player infobox) desktop + mobile; confirm no console
  errors, images resolve or degrade to alt text, attribution shows.
- Re-audit dead internal links / orphan images via the existing checks.

## Open risks

- Bracket HTML may still render only as plain tables; acceptable per "best-effort".
- Community/coordination: mirroring another active Lab. Mitigation: prominent
  attribution; revisit if the Liquipedia contributors object.
