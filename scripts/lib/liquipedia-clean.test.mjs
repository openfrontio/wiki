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
