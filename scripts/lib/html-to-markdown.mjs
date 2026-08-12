import * as cheerio from "cheerio";

// Tags/selectors whose subtree is emitted verbatim as raw HTML (fidelity kept).
const RAW = "table, figure, pre, .hatnote, .mw-references-wrap, .gallery, .mwe-math-element, .mwe-math-mathml-inline, .mwe-math-mathml-display";

function inline($, el) {
  const $el = $(el);
  return $el
    .contents()
    .toArray()
    .map((n) => {
      if (n.type === "text") return n.data;
      const $n = $(n);
      const tag = n.tagName;
      if (tag === "b" || tag === "strong") return `**${inline($, n).trim()}**`;
      if (tag === "i" || tag === "em") return `_${inline($, n).trim()}_`;
      if (tag === "code") return `\`${$n.text()}\``;
      if (tag === "a") {
        const href = $n.attr("href") || "";
        return `[${inline($, n).trim()}](${href})`;
      }
      if (tag === "sup" && $n.hasClass("reference")) return $.html(n); // keep refs raw
      if (tag === "br") return "\n";
      return inline($, n);
    })
    .join("");
}

function listMarkdown($, el, ordered, depth = 0) {
  const pad = "  ".repeat(depth);
  return $(el)
    .children("li")
    .toArray()
    .map((li, i) => {
      const marker = ordered ? `${i + 1}.` : "-";
      const nested = $(li).children("ul, ol").toArray();
      const text = inline($, li).trim().split("\n")[0];
      let out = `${pad}${marker} ${text}`;
      for (const n of nested) out += "\n" + listMarkdown($, n, n.tagName === "ol", depth + 1);
      return out;
    })
    .join("\n");
}

export function htmlToMarkdown(html) {
  const $ = cheerio.load(html, null, false);
  const blocks = [];
  // process only top-level nodes; unwrap mw-heading wrappers first
  $("div.mw-heading").each((_, el) => $(el).replaceWith($(el).contents()));
  $.root()
    .contents()
    .toArray()
    .forEach((node) => {
      if (node.type === "comment") return;
      if (node.type === "text") {
        if (node.data.trim()) blocks.push(node.data.trim());
        return;
      }
      const $node = $(node);
      const tag = node.tagName;
      if (/^h[1-6]$/.test(tag)) {
        const level = Number(tag[1]);
        const id = $node.attr("id");
        const text = inline($, node).trim();
        blocks.push(`${"#".repeat(level)} ${text}${id ? ` {#${id}}` : ""}`);
        return;
      }
      if (tag === "p") {
        const text = inline($, node).trim();
        if (text) blocks.push(text);
        return;
      }
      if (tag === "ul" || tag === "ol") {
        blocks.push(listMarkdown($, node, tag === "ol"));
        return;
      }
      if ($node.is(RAW)) {
        blocks.push($.html(node).trim());
        return;
      }
      // fallback: keep unknown block as raw html so nothing is lost
      blocks.push($.html(node).trim());
    });
  return blocks.join("\n\n") + "\n";
}
