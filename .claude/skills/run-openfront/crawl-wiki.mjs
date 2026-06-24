// Full crawl of openfront.wiki: discover every content page via Special:AllPages,
// scrape each article's rendered HTML, download its images, rewrite internal
// links to local routes, and emit a manifest.
//   node .claude/skills/run-openfront/crawl-wiki.mjs <outDir>
import fs from "fs";
import os from "os";
import path from "path";
import { chromium } from "playwright";

const CACHE = path.join(os.homedir(), ".cache", "openfront-run");
const env = { ...process.env };
const libs = path.join(CACHE, "extracted", "usr", "lib", "x86_64-linux-gnu");
if (fs.existsSync(libs)) {
  env.LD_LIBRARY_PATH = env.LD_LIBRARY_PATH ? `${libs}:${env.LD_LIBRARY_PATH}` : libs;
  env.FONTCONFIG_FILE = path.join(CACHE, "fonts.conf");
}

const OUT = process.argv[2] || "/tmp/wiki-crawl";
const IMG = path.join(OUT, "images");
fs.mkdirSync(IMG, { recursive: true });
const BASE = "https://openfront.wiki";

const browser = await chromium.launch({ channel: "chromium", args: ["--no-sandbox"], env });
const context = await browser.newContext({
  viewport: { width: 1400, height: 1200 },
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
});
await context.addInitScript(() => {
  Object.defineProperty(navigator, "webdriver", { get: () => undefined });
});
const page = await context.newPage();

async function goto(url) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  for (let i = 0; i < 50; i++) {
    const t = await page.title();
    if (!/just a moment|verification|attention required/i.test(t)) break;
    try {
      await page.mouse.click(290, 337);
    } catch {}
    await page.waitForTimeout(1500);
  }
  await page.waitForTimeout(600);
}

// 1. Discover all content-namespace pages.
await goto(`${BASE}/Special:AllPages`);
let titles = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll("#mw-content-text a").forEach((a) => {
    const href = a.getAttribute("href") || "";
    const m = href.match(/^\/([^:?#]+)$/);
    if (m && !a.classList.contains("new")) out.push(decodeURIComponent(m[1]));
  });
  return out;
});
// drop Main Page aliases (we ship a custom homepage) and dedupe
titles = [...new Set(titles)].filter((t) => !/^Main[_ ]?[Pp]age$/.test(t));
console.log("discovered", titles.length, "pages:", titles.join(", "));

const known = new Set(titles.map((t) => t.replace(/ /g, "_")));
const imageUrls = new Set();

const pages = [];
for (const title of titles) {
  const slug = title.replace(/ /g, "_");
  await goto(`${BASE}/${encodeURIComponent(title).replace(/%2F/g, "/")}`);
  const data = await page.evaluate(() => {
    const root = document.querySelector(".mw-parser-output");
    if (!root) return null;
    const clone = root.cloneNode(true);
    // strip editorial chrome
    clone
      .querySelectorAll(
        ".mw-editsection, script, style, .mw-jump-link, .noprint, .mw-empty-elt, link, .printfooter, #toc .toctogglecheckbox",
      )
      .forEach((n) => n.remove());
    const imgs = [];
    clone.querySelectorAll("img").forEach((img) => {
      imgs.push(img.getAttribute("src"));
      img.removeAttribute("srcset");
      img.removeAttribute("loading");
    });
    return {
      heading: document.querySelector("#firstHeading")?.textContent.trim(),
      html: clone.innerHTML,
      imgs,
      cats: [...document.querySelectorAll("#mw-normal-catlinks li a")].map((a) =>
        a.textContent.trim(),
      ),
    };
  });
  if (!data) {
    console.log("  SKIP (no content):", title);
    continue;
  }
  for (const src of data.imgs) if (src) imageUrls.add(new URL(src, BASE).href);
  pages.push({ slug, title: data.heading || title, html: data.html, cats: data.cats });
  console.log("  scraped:", slug, `(${data.html.length}b, ${data.imgs.length} imgs)`);
}

// 2. Download images.
console.log("downloading", imageUrls.size, "images...");
const imgMap = {};
for (const url of imageUrls) {
  try {
    const resp = await context.request.get(url);
    if (!resp.ok()) {
      console.log("  img FAIL", resp.status(), url);
      continue;
    }
    let name = decodeURIComponent(path.basename(new URL(url).pathname));
    name = name.replace(/[^a-zA-Z0-9._-]/g, "_");
    fs.writeFileSync(path.join(IMG, name), await resp.body());
    // map both the absolute and original relative form to /images/name
    imgMap[url] = `/images/${name}`;
  } catch (e) {
    console.log("  img ERR", url, e.message);
  }
}

// 3. Rewrite links + image srcs in each page's HTML.
function rewrite(html) {
  // images: replace any src that resolves to a downloaded file
  html = html.replace(/src="([^"]+)"/g, (m, src) => {
    const abs = (() => {
      try {
        return new URL(src, BASE).href;
      } catch {
        return null;
      }
    })();
    if (abs && imgMap[abs]) return `src="${imgMap[abs]}"`;
    return m;
  });
  // internal anchors -> local routes (only if the target page exists)
  html = html.replace(/href="([^"]+)"/g, (m, href) => {
    let pathname = href;
    try {
      pathname = new URL(href, BASE).pathname;
    } catch {}
    const internal = pathname.match(/^\/([^:?#]+)$/);
    if (internal) {
      const target = decodeURIComponent(internal[1]);
      if (known.has(target)) return `href="/${target}"`;
    }
    // red links / edit links / specials -> drop to plain (handled in template via .new)
    return m;
  });
  return html;
}

for (const p of pages) p.html = rewrite(p.html);

fs.writeFileSync(path.join(OUT, "pages.json"), JSON.stringify(pages, null, 2));
console.log("done:", pages.length, "pages,", Object.keys(imgMap).length, "images ->", OUT);
await browser.close();
