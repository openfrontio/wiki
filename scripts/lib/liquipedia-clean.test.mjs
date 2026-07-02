import { test } from "node:test";
import assert from "node:assert/strict";
import { deriveSlug, deriveCats, cleanHtml, isHostableImage, correctTitleYear } from "./liquipedia-clean.mjs";

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

test("deriveSlug sanitizes path-illegal characters", () => {
  assert.doesNotMatch(deriveSlug("Openfront/BAGNO:_King_of_the_Hill"), /[<>:"\\|?*]/);
  assert.equal(deriveSlug("Openfront/BAGNO:_King_of_the_Hill"), "BAGNO__King_of_the_Hill");
});

test("deriveCats classifies from Liquipedia categories, tags OFM vs community", () => {
  assert.deepEqual(deriveCats("Openfront/OFM/2025_World_Cup", ["Tournaments", "S-Tier Tournaments"]),
    ["OpenFront Masters", "Tournaments", "OFM Official"]);
  assert.deepEqual(deriveCats("Openfront/2026_World_Cup", ["Tournaments", "Finished Tournaments"]),
    ["OpenFront Masters", "Tournaments", "Community"]);
  assert.deepEqual(deriveCats("Openfront/Antares", ["Teams"]),
    ["OpenFront Masters", "Teams"]);
  assert.deepEqual(deriveCats("Openfront/Hulkiora", ["Players", "Active Players", "French Players"]),
    ["OpenFront Masters", "Players"]);
  // player whose page also references tournaments must still classify as Player
  assert.deepEqual(deriveCats("Openfront/Biffeur", ["Players", "S-Tier Tournaments"]),
    ["OpenFront Masters", "Players"]);
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

test("cleanHtml maps thumbnail src to hosted base file", () => {
  const out = cleanHtml('<img src="/lab/commons/images/thumb/1/12/World_hd.png/36px-World_hd.png" alt="w">', { slugMap: {}, icons: {} });
  assert.match(out, /src="\/images\/liquipedia\/World_hd\.png"/);
});

test("cleanHtml replaces fa icons on span AND i tags with inline svg", () => {
  const icons = { "fa-book": '<svg data-i="book"></svg>', "fa-trophy": '<svg data-i="trophy"></svg>' };
  const span = cleanHtml('<span class="fas fa-book" aria-hidden="true"></span>', { slugMap: {}, icons });
  assert.match(span, /data-i="book"/);
  const i = cleanHtml('<i class="fas fa-trophy"></i>', { slugMap: {}, icons });
  assert.match(i, /data-i="trophy"/);
  assert.doesNotMatch(i, /<i /);
});

test("cleanHtml strips inline event handlers and javascript: URIs", () => {
  const out = cleanHtml('<a href="javascript:alert(1)" onclick="x()">t</a><img src="javascript:void" onerror="y()">', { slugMap: {}, icons: {} });
  assert.doesNotMatch(out, /onclick|onerror|javascript:/i);
});

test("cleanHtml strips script/style/edit chrome", () => {
  const out = cleanHtml('<script>x</script><span class="mw-editsection">e</span><p>keep</p>', { slugMap: {}, icons: {} });
  assert.doesNotMatch(out, /<script|mw-editsection/);
  assert.match(out, /keep/);
});

test("cleanHtml strips infobox edit/help [e][h] buttons", () => {
  const out = cleanHtml('<span class="infobox-buttons navigation-not-searchable">[<a href="/x?action=edit">e</a>]</span><b>Name</b>', { slugMap: {}, icons: {} });
  assert.doesNotMatch(out, /infobox-buttons|\[e\]|action=edit/);
  assert.match(out, /Name/);
});

test("cleanHtml wraps general-collapsible sections in closed <details>", () => {
  const out = cleanHtml('<div class="csstable-widget collapsed general-collapsible prizepooltable">rows</div>', { slugMap: {}, icons: {} });
  assert.match(out, /<details class="liq-collapse"><summary>Prize pool<\/summary>/);
  assert.doesNotMatch(out, /<details[^>]*open/); // closed by default
  // nested collapsibles: only the outer is wrapped
  const nested = cleanHtml('<div class="general-collapsible"><div class="general-collapsible brkts">x</div></div>', { slugMap: {}, icons: {} });
  assert.equal((nested.match(/<details/g) || []).length, 1);
});

test("cleanHtml converts /lab red links (class=new) to plain text", () => {
  const out = cleanHtml('<a href="/lab/Openfront/MissingPage" class="new">Missing</a>', { slugMap: {}, icons: {} });
  assert.doesNotMatch(out, /<a /);
  assert.match(out, /wiki-deadlink/);
  assert.match(out, /Missing/);
});

test("correctTitleYear fixes a title year that disagrees with the slug", () => {
  assert.equal(
    correctTitleYear("Openfront/OFM/2026_Winter_Major", "Openfront Masters 2025 Winter Major"),
    "Openfront Masters 2026 Winter Major",
  );
  assert.equal(correctTitleYear("Openfront/OFM/2025_World_Cup", "2025 World Cup"), "2025 World Cup");
  assert.equal(correctTitleYear("Openfront/Antares", "Antares"), "Antares");
});
