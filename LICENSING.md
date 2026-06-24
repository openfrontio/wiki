# Licensing

This repository bundles three categories of material under **different** terms.
Read this before reusing anything.

## 1. Source code — MIT

All source code is licensed under the [MIT License](./LICENSE). This includes:

- `src/**` (Astro pages, layouts, components, styles) — **except** the bundled
  content data noted in §3
- `scripts/**`, `astro.config.mjs`, `tsconfig.json`, and other config
- `.claude/skills/**` tooling
- `public/assets/hex-pattern.svg` (generated decorative asset)

You are free to reuse the code per the MIT terms.

## 2. OpenFront brand assets — proprietary, all rights reserved

The OpenFront brand assets are **NOT** covered by the MIT license. They remain
the property of OpenFront Inc. and may not be copied, redistributed, modified, or
used in any other project without written permission. This includes:

- `public/assets/logo-white.png`, `public/assets/logo-blue.png`
- `public/assets/icon-round.png`, `public/assets/icon-square.png`
- `public/assets/hero-bg.webp`, `public/assets/hero-bg.jpg` (signature background)
- `public/favicon.svg`, `public/favicon.png`
- `public/fonts/OpenFront.ttf` — the custom OpenFront brand display font. It is
  licensed exclusively for use on OpenFront brand materials and must **not** be
  redistributed, resold, or used on any other project without written permission.

The full brand design pack (`brand_guidelines/`, the brand guidelines PDF) is not
included in this repository (it is git-ignored) and is likewise proprietary.

## 3. Wiki content & media — CC BY-SA 4.0

The wiki article text and the contributor-supplied images/screenshots originate
from the OpenFront community wiki and are licensed under
[Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/),
unless otherwise noted. This includes:

- `src/data/pages.json` (article text and markup)
- `public/images/**` (screenshots, diagrams, map thumbnails)

Reuse of this material must preserve attribution and the share-alike terms.

---

**Summary:** the code is open (MIT); the brand assets are proprietary; the wiki
content is CC BY-SA 4.0. When in doubt, ask before reusing.
