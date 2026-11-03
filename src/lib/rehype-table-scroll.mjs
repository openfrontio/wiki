// Wrap every table in the Markdown content collection in a horizontally
// scrollable div, so wide wikitables scroll on their own at phone widths
// instead of forcing the whole page to scroll sideways. Tables that already
// sit inside a MediaWiki overflow wrapper (`.citizen-overflow-content`) are
// left alone. No dependencies: a tiny hast walker is all this needs.
//
// Almost every table on the wiki is raw HTML inside the Markdown, and at the
// point user rehype plugins run those are still `raw` nodes (one per HTML
// block), so the plugin handles both real `table` elements and raw HTML
// blocks that contain a complete <table>…</table>.

const WRAPPER_CLASS = "table-scroll";

function hasClass(node, name) {
  const cls = node?.properties?.className;
  if (!cls) return false;
  return (Array.isArray(cls) ? cls : String(cls).split(/\s+/)).includes(name);
}

function wrapRaw(value) {
  if (!/<table\b/i.test(value)) return value;
  if (value.includes("citizen-overflow-content") || value.includes(WRAPPER_CLASS)) return value;
  const opens = (value.match(/<table\b/gi) || []).length;
  const closes = (value.match(/<\/table>/gi) || []).length;
  // Only wrap when the block holds whole tables; a table split across blocks
  // (by a blank line inside it) is left as-is rather than risking an unclosed div.
  if (opens === 0 || opens !== closes) return value;
  return value
    .replace(/<table\b/gi, `<div class="${WRAPPER_CLASS}"><table`)
    .replace(/<\/table>/gi, "</table></div>");
}

function walk(node) {
  if (!node || !Array.isArray(node.children)) return;
  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];
    if (child.type === "raw") {
      child.value = wrapRaw(child.value);
      continue;
    }
    if (child.type === "element" && child.tagName === "table") {
      const alreadyWrapped =
        hasClass(node, "citizen-overflow-content") || hasClass(node, WRAPPER_CLASS);
      if (!alreadyWrapped) {
        node.children[i] = {
          type: "element",
          tagName: "div",
          properties: { className: [WRAPPER_CLASS] },
          children: [child],
        };
      }
      continue; // never recurse into tables
    }
    walk(child);
  }
}

export default function rehypeTableScroll() {
  return (tree) => walk(tree);
}
