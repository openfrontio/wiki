// Scrape openfront.wiki pages past the Cloudflare interstitial using the
// locally-extracted chromium libs/fonts from setup.sh. Run from repo root:
//   node .claude/skills/run-openfront/scrape-wiki.mjs <outDir> [Page1 Page2 ...]
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

const outDir = process.argv[2] || "/tmp/wiki-scrape";
const pages = process.argv.slice(3);
if (pages.length === 0) pages.push("Main_Page");
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({
  channel: "chromium", // full new-headless build (chromium-1228), not the detectable shell
  args: ["--no-sandbox", "--disable-blink-features=AutomationControlled"],
  env,
});
const context = await browser.newContext({
  viewport: { width: 1400, height: 1200 },
  locale: "en-US",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
});
await context.addInitScript(() => {
  Object.defineProperty(navigator, "webdriver", { get: () => undefined });
});
const page = await context.newPage();

for (const p of pages) {
  const url = `https://openfront.wiki/${p}`;
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  for (let i = 0; i < 50; i++) {
    const title = await page.title();
    if (!/just a moment|verification|attention required/i.test(title)) break;
    // Try clicking the Turnstile checkbox region (it sits ~20px in from the widget left edge).
    try {
      await page.mouse.click(290, 337);
    } catch {}
    await page.waitForTimeout(1500);
  }
  await page.waitForTimeout(2000);
  console.log(p, "->", await page.title());
  fs.writeFileSync(path.join(outDir, `${p}.html`), await page.content());
  const data = await page.evaluate(() => {
    const main = document.querySelector("#mw-content-text") || document.body;
    const grab = (sel) =>
      [...document.querySelectorAll(sel)].map((a) => ({
        text: a.textContent.trim().replace(/\s+/g, " "),
        href: a.getAttribute("href"),
      }));
    return {
      title: document.title,
      heading: document.querySelector("#firstHeading")?.textContent.trim(),
      text: main.innerText,
      contentLinks: grab("#mw-content-text a"),
      navLinks: grab("#mw-panel a, .mw-portlet a, #p-navigation a"),
    };
  });
  fs.writeFileSync(path.join(outDir, `${p}.json`), JSON.stringify(data, null, 2));
  await page.screenshot({ path: path.join(outDir, `${p}.png`), fullPage: true });
}

await browser.close();
console.log("done ->", outDir);
