import * as cheerio from "cheerio";

// Build a clean ~max-char meta description from an article's HTML: prefer the
// first substantive paragraph, strip infoboxes/tables/figures, truncate on a
// word boundary.
export function pageDescription(html, max = 155) {
  const $ = cheerio.load(html || "", null, false);
  // strip non-prose blocks; keep inline .wiki-deadlink/.liq-noimg text (they are
  // words within a sentence — removing them would leave mid-sentence gaps)
  $("table, .infobox, .panel-box, .wikitable, figure, .thumb, style, script").remove();
  let text = "";
  $("p").each((_, el) => {
    if (text) return;
    const t = $(el).text().replace(/\s+/g, " ").trim();
    if (t.length > 40) text = t;
  });
  if (!text) text = $.root().text().replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sp = cut.lastIndexOf(" ");
  return (sp > 0 ? cut.slice(0, sp) : cut).trim() + "…";
}

// Build a clean ~max-char meta description from a wiki-collection page's
// Markdown source (which may contain raw HTML blocks like <figure>/<table>
// carried over from the MediaWiki import). Finds the first substantial prose
// paragraph — skipping headings, raw HTML blocks, and list/blockquote
// markers — strips Markdown syntax down to plain text, then reuses
// pageDescription's word-boundary truncation.
export function descriptionFromMarkdown(body, max = 155) {
  let text = (body || "").replace(/```[\s\S]*?```/g, "\n"); // drop fenced code blocks

  const blocks = text.split(/\n\s*\n/);

  for (const rawBlock of blocks) {
    let block = rawBlock;
    block = block.replace(/<[^>]+>/g, " "); // raw HTML tags
    block = block.replace(/!\[[^\]]*\]\([^)]*\)/g, ""); // images dropped
    block = block.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1"); // [text](url) -> text
    block = block.replace(/\s*\{#[^}]*\}/g, ""); // explicit heading-id suffix
    block = block
      .split("\n")
      .map((line) => line.replace(/^\s{0,3}(#{1,6}\s+|>+\s?|[-*+]\s+|\d+\.\s+)/, ""))
      .join(" ");
    block = block.replace(/[*_`]+/g, ""); // emphasis/code markers

    const clean = block.replace(/\s+/g, " ").trim();
    if (clean.length > 40) return pageDescription(`<p>${clean}</p>`, max);
  }

  return "";
}
