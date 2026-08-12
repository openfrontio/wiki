import { test } from "node:test";
import assert from "node:assert/strict";
import { pageDescription, descriptionFromMarkdown } from "./meta.js";

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

test("pageDescription keeps inline de-linked/dropped-image text (no mid-sentence gaps)", () => {
  const d = pageDescription('<p>The empire of <span class="wiki-deadlink">Timur</span> conquered vast territory across the region.</p>');
  assert.match(d, /empire of Timur conquered/);
});

test("descriptionFromMarkdown strips bold and link syntax from the first paragraph", () => {
  const body = "The **Missile Silo** is a [weaponry building](/Buildings) used to launch nukes.";
  const d = descriptionFromMarkdown(body);
  assert.equal(d, "The Missile Silo is a weaponry building used to launch nukes.");
  assert.doesNotMatch(d, /\*\*/);
  assert.doesNotMatch(d, /\[.*\]\(.*\)/);
  assert.doesNotMatch(d, /#/);
});

test("descriptionFromMarkdown skips a leading heading and a raw HTML table", () => {
  const body = [
    "## Heading {#Id}",
    "",
    "<table><tr><td>Cost 250</td></tr></table>",
    "",
    "Warships are a type of naval unit used to control sea routes and escort convoys.",
  ].join("\n");
  const d = descriptionFromMarkdown(body);
  assert.doesNotMatch(d, /Heading/);
  assert.doesNotMatch(d, /Cost 250/);
  assert.doesNotMatch(d, /<table>/);
  assert.match(d, /Warships are a type of naval unit/);
});

test("descriptionFromMarkdown skips a leading raw-HTML block even when its text exceeds 40 chars (stub/ambox notice)", () => {
  const body = [
    '<div role="note" class="asbox">This article is a stub. You can help the wiki by expanding it further today.</div>',
    "",
    "The Atom Bomb is the cheapest and least powerful nuclear weapon in OpenFront.",
  ].join("\n");
  const d = descriptionFromMarkdown(body);
  assert.match(d, /^The Atom Bomb is the cheapest/);
  assert.doesNotMatch(d, /stub/);
});

test("descriptionFromMarkdown truncates at a word boundary with an ellipsis", () => {
  const long = "word ".repeat(60).trim();
  const d = descriptionFromMarkdown(long, 40);
  assert.ok(d.length <= 41, `len ${d.length}`);
  assert.match(d, /…$/);
});
