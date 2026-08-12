import { test } from "node:test";
import assert from "node:assert/strict";
import { encodePageSource, decodePageSource } from "./edit-source.js";

test("round-trips plain markdown", () => {
  const md = "# Title\n\nSome **text** with a [link](/Nations).";
  assert.equal(decodePageSource(encodePageSource(md)), md);
});

test("round-trips content containing a closing script tag and raw HTML", () => {
  const md = 'before <table class="wikitable"><tr><td>x</td></tr></table> </script> after';
  assert.equal(decodePageSource(encodePageSource(md)), md);
});

test("encoded output contains no literal '<' (cannot terminate a script element)", () => {
  const md = "a <b> c </script> d";
  assert.ok(!encodePageSource(md).includes("<"));
});

test("round-trips unicode and quotes", () => {
  const md = 'emoji 🗺️ and "quotes" and \\backslash';
  assert.equal(decodePageSource(encodePageSource(md)), md);
});
