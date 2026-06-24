// Screenshot a local URL with the locally-extracted chromium (see setup.sh).
//   node .claude/skills/run-openfront/shot.mjs <url> <outPng> [width] [height]
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

const url = process.argv[2] || "http://localhost:4321";
const out = process.argv[3] || "/tmp/shot.png";
const width = Number(process.argv[4] || 1440);
const height = Number(process.argv[5] || 1000);

const browser = await chromium.launch({
  channel: "chromium",
  args: ["--no-sandbox"],
  env,
});
const page = await browser.newPage({ viewport: { width, height } });
const errors = [];
page.on("pageerror", (e) => errors.push("PAGEERROR: " + e.message.split("\n")[0]));
page.on("console", (m) => {
  if (m.type() === "error") errors.push("CONSOLE: " + m.text());
});
await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(800);
await page.screenshot({ path: out, fullPage: true });
console.log("shot ->", out);
if (errors.length) console.log(errors.join("\n"));
await browser.close();
