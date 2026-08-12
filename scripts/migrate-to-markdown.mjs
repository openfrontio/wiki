import fs from "fs";
import path from "path";
import { htmlToMarkdown } from "./lib/html-to-markdown.mjs";

const OUT = path.resolve("src/content/wiki");
fs.mkdirSync(OUT, { recursive: true });
const pages = JSON.parse(fs.readFileSync("src/data/pages.json", "utf8"));

// editable = has a browse section AND is not the Liquipedia mirror
const editable = pages.filter((p) => p.section && p.source !== "liquipedia");

const yamlStr = (s) => JSON.stringify(String(s)); // safe-quote for YAML
let n = 0;
for (const p of editable) {
  const fm = [
    "---",
    `title: ${yamlStr(p.title)}`,
    `section: ${yamlStr(p.section)}`,
    `cats: ${JSON.stringify(p.cats || [])}`,
    p.stub ? "stub: true" : "",
    "---",
    "",
  ].filter(Boolean).join("\n");
  const body = htmlToMarkdown(p.html);
  fs.writeFileSync(path.join(OUT, `${p.slug}.md`), fm + "\n" + body);
  n++;
}
console.log(`wrote ${n} markdown pages to src/content/wiki`);
