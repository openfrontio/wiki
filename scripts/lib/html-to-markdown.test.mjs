import { test } from "node:test";
import assert from "node:assert/strict";
import { htmlToMarkdown } from "./html-to-markdown.mjs";

test("mw-heading becomes markdown heading with explicit id", () => {
  const md = htmlToMarkdown('<div class="mw-heading mw-heading2"><h2 id="See_also">See also</h2></div>');
  assert.equal(md.trim(), "## See also {#See_also}");
});

test("paragraph with bold, italic and internal link", () => {
  const md = htmlToMarkdown('<p>Use a <b>Warship</b> to <i>capture</i> a <a href="/Trade_Ship" title="Trade Ship">trade ship</a>.</p>');
  assert.equal(md.trim(), "Use a **Warship** to _capture_ a [trade ship](/Trade_Ship).");
});

test("unordered list", () => {
  const md = htmlToMarkdown("<ul><li>one</li><li>two</li></ul>");
  assert.equal(md.trim(), "- one\n- two");
});

test("wikitable is preserved as raw html", () => {
  const html = '<table class="wikitable"><tbody><tr><th>A</th></tr></tbody></table>';
  assert.ok(htmlToMarkdown(html).includes('<table class="wikitable">'));
});

test("figure is preserved as raw html", () => {
  const html = '<figure class="mw-default-size"><img src="/images/x.webp"><figcaption>cap</figcaption></figure>';
  const md = htmlToMarkdown(html);
  assert.ok(md.includes("<figure") && md.includes("<figcaption>cap</figcaption>"));
});

test("reference sup and references list preserved as raw html", () => {
  const html = '<p>fact<sup id="cite_ref-1" class="reference"><a href="#cite_note-1">[1]</a></sup></p><div class="mw-references-wrap"><ol class="references"><li id="cite_note-1">src</li></ol></div>';
  const md = htmlToMarkdown(html);
  assert.ok(md.includes('class="reference"') && md.includes('class="references"'));
});

test("external links get plain markdown link", () => {
  const md = htmlToMarkdown('<p><a href="https://github.com/openfrontio" target="_blank" rel="noopener noreferrer">GitHub</a></p>');
  assert.equal(md.trim(), "[GitHub](https://github.com/openfrontio)");
});

test("inline math inside a paragraph is preserved as raw html", () => {
  const html = '<p>speed is <span class="mwe-math-element"><span class="mwe-math-mathml-inline"><math>x</math></span></span> here</p>';
  const md = htmlToMarkdown(html);
  assert.ok(md.includes('class="mwe-math-element"'));
});

test("bare ol.references without mw-references-wrap is preserved as raw html", () => {
  const html = '<ol class="references"><li id="cite_note-1">src</li></ol>';
  const md = htmlToMarkdown(html);
  assert.ok(md.includes('class="references"') && md.includes('id="cite_note-1"'));
});

test("pre block is preserved as raw html", () => {
  const html = "<pre>foo()</pre>";
  const md = htmlToMarkdown(html);
  assert.ok(md.includes("<pre>foo()</pre>"));
});

test("hatnote div is preserved as raw html", () => {
  const html = '<div role="note" class="hatnote">See also X</div>';
  const md = htmlToMarkdown(html);
  assert.ok(md.includes('class="hatnote"'));
});

test("list item text after a <br> is not dropped", () => {
  const html =
    '<ul><li>A strategy uses <a href="/Bots" title="Bots">bots</a>. <br> However, this needs care due to X.</li></ul>';
  const md = htmlToMarkdown(html);
  assert.equal(md.trim(), "- A strategy uses [bots](/Bots). However, this needs care due to X.");
});

test("list item with a nested list keeps the parent text intact and renders the sub-list separately, without duplicating it", () => {
  const html =
    '<ul><li>Top level text, so:\n<ul><li>Sub item one.</li>\n<li>Sub item two.</li></ul></li>\n<li>Second top item.</li></ul>';
  const md = htmlToMarkdown(html);
  assert.equal(
    md.trim(),
    "- Top level text, so:\n  - Sub item one.\n  - Sub item two.\n- Second top item.",
  );
});
