// ToS-compliant fetch of Liquipedia Lab OpenFront pages (API only, rate-limited,
// cached). Usage: node scripts/liquipedia-fetch.mjs <cacheDir> [--limit N]
//   [--only "Openfront/Antares,Openfront/2026 World Cup"] [--force]
import fs from "fs";
import path from "path";

const CACHE = process.argv[2];
if (!CACHE) {
  console.error("usage: liquipedia-fetch.mjs <cacheDir> [--limit N] [--only ...] [--force]");
  process.exit(1);
}
const argOf = (f) => {
  const i = process.argv.indexOf(f);
  return i >= 0 ? process.argv[i + 1] : undefined;
};
const LIMIT = argOf("--limit") ? Number(argOf("--limit")) : Infinity;
const ONLY = argOf("--only") ? argOf("--only").split(",").map((s) => s.trim()) : null;
const FORCE = process.argv.includes("--force");

const API = "https://liquipedia.net/lab/api.php";
const UA = "OpenFrontWiki/1.0 (https://openfront.wiki; lewis@outpostgroup.io)";
const RAW = path.join(CACHE, "raw");
const IMG = path.join(CACHE, "images");
fs.mkdirSync(RAW, { recursive: true });
fs.mkdirSync(IMG, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let lastParse = 0;
let lastOther = 0;
async function api(params, isParse) {
  // enforce rate limits: parse >=30s apart, others >=2s apart
  const now = Date.now();
  if (isParse) {
    const wait = 30000 - (now - lastParse);
    if (wait > 0) await sleep(wait);
  } else {
    const wait = 2000 - (now - lastOther);
    if (wait > 0) await sleep(wait);
  }
  const url = `${API}?${params}&format=json`;
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (isParse) lastParse = Date.now();
  else lastOther = Date.now();
  if (!r.ok) throw new Error(`API ${r.status} for ${params}`);
  return r.json();
}

const FREE = /cc[- ]by([- ]sa)?|cc0|public domain|creative commons/i;
const isFree = (lic) => !!lic && FREE.test(lic) && !/no license|non[- ]free|fair use|all rights/i.test(lic);

// 1. Enumerate Openfront/* content pages
let titles = [];
if (ONLY) {
  titles = ONLY;
} else {
  let apcontinue = "";
  for (let i = 0; i < 20; i++) {
    const r = await api(
      `action=query&list=allpages&apprefix=Openfront/&apnamespace=0&aplimit=500${apcontinue}`,
      false,
    );
    for (const p of r.query?.allpages ?? []) titles.push(p.title);
    if (r.continue?.apcontinue) apcontinue = `&apcontinue=${encodeURIComponent(r.continue.apcontinue)}`;
    else break;
  }
}
titles = titles.slice(0, LIMIT);
console.log(`fetching ${titles.length} pages`);

// 2. Parse each page (cached), collect File: names
const pages = [];
const fileNames = new Set();
for (const title of titles) {
  const slug = title.replace(/ /g, "_");
  const cacheFile = path.join(RAW, encodeURIComponent(slug) + ".json");
  let data;
  if (!FORCE && fs.existsSync(cacheFile)) {
    data = JSON.parse(fs.readFileSync(cacheFile, "utf8"));
    console.log("  cached:", slug);
  } else {
    const r = await api(
      `action=parse&page=${encodeURIComponent(title)}&prop=text|images|categories|displaytitle&redirects=1`,
      true,
    );
    data = r.parse;
    fs.writeFileSync(cacheFile, JSON.stringify(data));
    console.log("  fetched:", slug);
  }
  if (!data) continue;
  const imgs = (data.images || []).map((n) => n.replace(/ /g, "_"));
  imgs.forEach((n) => fileNames.add(n));
  pages.push({
    slug,
    title: (data.displaytitle || title).replace(/<[^>]+>/g, ""),
    sourceUrl: `https://liquipedia.net/lab/${encodeURIComponent(title).replace(/%2F/g, "/")}`,
    html: data.text?.["*"] || "",
    cats: (data.categories || []).map((c) => c["*"].replace(/_/g, " ")),
    _imgs: imgs,
  });
}

// 3. Resolve image URLs + licenses (batched query, 2s apart)
const meta = {}; // name -> {url, license}
const all = [...fileNames];
for (let i = 0; i < all.length; i += 20) {
  const batch = all.slice(i, i + 20).map((n) => "File:" + n).map(encodeURIComponent).join("|");
  const r = await api(`action=query&titles=${batch}&prop=imageinfo&iiprop=url|extmetadata`, false);
  for (const p of Object.values(r.query?.pages ?? {})) {
    const ii = p.imageinfo?.[0];
    if (!ii) continue;
    const name = p.title.replace(/^File:/, "").replace(/ /g, "_");
    const license =
      ii.extmetadata?.LicenseShortName?.["*"] || ii.extmetadata?.License?.["*"] || "";
    meta[name] = { url: ii.url, license };
  }
}

// 4. Download free images
async function download(url, dest) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) return false;
  fs.writeFileSync(dest, Buffer.from(await r.arrayBuffer()));
  return true;
}
for (const p of pages) {
  p.liqImages = [];
  for (const name of p._imgs) {
    const m = meta[name];
    const free = m ? isFree(m.license) : false;
    if (free && m) {
      const safe = name.replace(/[^a-zA-Z0-9._-]/g, "_");
      if (!fs.existsSync(path.join(IMG, safe))) await download(m.url, path.join(IMG, safe));
      p.liqImages.push({ name, safe, url: m.url, license: m.license, free: true });
    } else {
      p.liqImages.push({ name, url: m?.url, license: m?.license || "unknown", free: false });
    }
  }
  delete p._imgs;
}

fs.writeFileSync(path.join(CACHE, "liquipedia.json"), JSON.stringify(pages, null, 2));
const freeCount = pages.reduce((n, p) => n + p.liqImages.filter((i) => i.free).length, 0);
console.log(`wrote ${pages.length} pages; images: ${freeCount} free / ${all.length} total`);
