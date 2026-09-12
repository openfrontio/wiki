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

export function articleLead(html, max = 280) {
  const $ = cheerio.load(html || "", null, false);
  $("table, .infobox, .panel-box, .wikitable, figure, .thumb, style, script").remove();
  const paragraphs = $("p").toArray()
    .map((el) => $(el).text().replace(/\s+/g, " ").trim())
    .filter((text) => text.length > 35);
  const text = paragraphs[0] || $.root().text().replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const sp = cut.lastIndexOf(" ");
  return `${(sp > 0 ? cut.slice(0, sp) : cut).trim()}…`;
}

export function articleAudience(page) {
  if (page.source === "liquipedia") return ["Community reference", "Event data"];
  if (page.section === "Guides") return ["New players", "Strategy players"];
  if (["Units", "Buildings", "Economy", "Combat & mechanics"].includes(page.section)) return ["New players", "Data-oriented players"];
  if (page.section === "Maps") return ["Map browsers", "Scenario players"];
  return ["All players"];
}

export function cleanArticleHtml(html) {
  const $ = cheerio.load(html || "", null, false);
  // Imported maintenance boxes are stale editorial metadata, not player content.
  $("table.ambox, table.metadata").remove();
  return $.html().trim();
}
