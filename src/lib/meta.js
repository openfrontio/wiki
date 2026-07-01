import * as cheerio from "cheerio";

// Build a clean ~max-char meta description from an article's HTML: prefer the
// first substantive paragraph, strip infoboxes/tables/figures, truncate on a
// word boundary.
export function pageDescription(html, max = 155) {
  const $ = cheerio.load(html || "", null, false);
  $("table, .infobox, .panel-box, .wikitable, figure, .thumb, style, script, .liq-noimg, .wiki-deadlink").remove();
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
