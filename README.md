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

The wiki articles are a self-contained snapshot of the live wiki — there are no
links back to `openfront.wiki`. Content lives in `src/data/pages.json` (rendered
by `src/pages/[slug].astro`) with images in `public/images`. To refresh it from
the live wiki:

```bash
# 1. crawl every page (passes the Cloudflare challenge with headless Chromium)
node .claude/skills/run-openfront/crawl-wiki.mjs /tmp/wiki-crawl
# 2. clean the HTML + rewrite links/images into the site manifest
node scripts/prepare-content.mjs /tmp/wiki-crawl
```

`crawl-wiki.mjs` requires the one-time headless-Chromium setup in
`.claude/skills/run-openfront/` (`bash setup.sh`).

## Brand assets

The colours, fonts and imagery follow `Openfront_Brand_Guidelines.pdf`. The full
design source pack lives in `brand_guidelines/` (git-ignored — large `.ai`/`.psd`
files); only the assets the site actually uses are checked in under
`public/assets`.
