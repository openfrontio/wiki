import fs from "fs";
import * as cheerio from "cheerio";

const pages = JSON.parse(fs.readFileSync("src/data/pages.json", "utf8"));
const editable = pages.filter((p) => p.section && p.source !== "liquipedia");

const norm = (s) => s.replace(/\s+/g, " ").trim();
function facts(file) {
  if (!fs.existsSync(file)) return null;
  const $ = cheerio.load(fs.readFileSync(file, "utf8"));
  const art = $("article.wiki-content");
  return {
    text: norm(art.text()),
    ids: art.find("h1,h2,h3,h4").map((_, e) => $(e).attr("id")).get().filter(Boolean).sort(),
    tables: art.find("table").length,
    figures: art.find("figure").length,
  };
}
let bad = 0;
for (const p of editable) {
  const live = facts(`dist/${p.slug}/index.html`);
  const prev = facts(`dist/wiki-preview/${p.slug}/index.html`);
  if (!live || !prev) { console.log("MISSING", p.slug); bad++; continue; }
  const idsEq = JSON.stringify(live.ids) === JSON.stringify(prev.ids);
  const tblEq = live.tables === prev.tables && live.figures === prev.figures;
  // text may differ slightly (md whitespace); flag large divergence only
  const textClose = Math.abs(live.text.length - prev.text.length) < live.text.length * 0.1;
  if (!idsEq || !tblEq || !textClose) {
    bad++;
    console.log("DIFF", p.slug, { idsEq, tblEq, textClose, liveTables: live.tables, prevTables: prev.tables });
  }
}
console.log(bad ? `\n${bad} pages diverge — inspect above` : "\nparity OK across all editable pages");
