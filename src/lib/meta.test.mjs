import { test } from "node:test";
import assert from "node:assert/strict";
import { pageDescription } from "./meta.js";

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
