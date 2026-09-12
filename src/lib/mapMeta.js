import * as cheerio from "cheerio";

export function mapPresentation(page) {
  const $ = cheerio.load(page.html || "", null, false);
  const image = $("img[src^='/images/']").first().attr("src") || null;
  const paragraphs = $("p").toArray()
    .map((el) => $(el).text().replace(/\s+/g, " ").trim())
    .filter((text) => text.length > 35);
  return {
    image,
    description: paragraphs[0] || `${page.title} is an OpenFront map. See the map article for terrain, layout, and strategy notes.`,
  };
}