# OpenFront Wiki

A redesigned home page for the [OpenFront](https://openfront.io/) community wiki,
built with [Astro](https://astro.build/) and [Tailwind CSS](https://tailwindcss.com/)
using the official OpenFront brand palette and assets.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output -> dist/
npm run preview
```

## Deploy (Cloudflare Pages)

The build is fully static, so Cloudflare Pages serves `dist/` directly. Set:

| Setting          | Value           |
| ---------------- | --------------- |
| Build command    | `npm run build` |
| Build output dir | `dist`          |
| Node version     | 20+             |

Every commit to the connected branch triggers a deploy.

## Content

Content lives in `src/data/pages.json` (rendered by `src/pages/[slug].astro`)
with images in `public/images`. **`pages.json` is the source of truth and is
maintained directly in this repo** — edit it, and add images to `public/images`,
as needed.

### Miraheze crawl (retired)

The wiki was originally seeded by crawling the live Miraheze wiki
(`openfront.miraheze.org`) and cleaning the HTML into `pages.json`. That import
was **last run on 1 July 2026 and is no longer used** — the site has since
diverged (v33 content, new and enriched pages, fixes) and is hand-maintained.

The old pipeline — `scripts/prepare-content.mjs` plus
`.claude/skills/run-openfront/crawl-wiki.mjs` — is kept for historical reference
only. **Do not re-run it: it would overwrite the hand-authored content.** Durable
repo-authored pages live in `scripts/legacy-pages.json` and their browse
categories in `scripts/game-categories.json`.

## Brand assets

The colours, fonts and imagery follow `Openfront_Brand_Guidelines.pdf`. The full
design source pack lives in `brand_guidelines/` (git-ignored — large `.ai`/`.psd`
files); only the assets the site actually uses are checked in under
`public/assets`.

## Licensing

This repo mixes three licenses — see [LICENSING.md](./LICENSING.md):

- **Source code** — [MIT](./LICENSE)
- **OpenFront brand assets** (logos, font, background) — proprietary, all rights reserved
- **Wiki content & media** (`src/data/pages.json`, `public/images`) — CC BY-SA 4.0
