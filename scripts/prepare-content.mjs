// Clean the raw crawl output into the site's content manifest.
//   node scripts/prepare-content.mjs <crawlDir>
// Reads <crawlDir>/pages.json + <crawlDir>/images, writes src/data/pages.json
// and copies images into public/images.
import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

const CRAWL = process.argv[2];
if (!CRAWL) {
  console.error("usage: prepare-content.mjs <crawlDir>");
  process.exit(1);
}
const root = path.resolve(".");
const DATA_DIR = path.join(root, "src", "data");
const PUBLIC_IMG = path.join(root, "public", "images");
fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(PUBLIC_IMG, { recursive: true });

const DROP = new Set(["TestPage"]); // obvious junk

const raw = JSON.parse(fs.readFileSync(path.join(CRAWL, "pages.json"), "utf8"));
const knownSlugs = new Set(raw.map((p) => p.slug));

function clean(html) {
  const $ = cheerio.load(html, null, false);

  // remove skin chrome / non-content
  $(
    [
      ".citizen-section-indicator",
      ".citizen-ui-icon",
      ".mw-ui-icon-wikimedia-collapse",
      ".citizen-overflow-nav",
      ".citizen-overflow-navButton",
      ".toctogglecheckbox",
      ".mw-broken-media",
      "#toc",
      ".toc",
      "meta",
      "style",
      "script",
      "link",
      "input",
      ".mw-editsection",
      ".mw-empty-elt",
    ].join(","),
  ).remove();

  // red links + self links -> plain text (no dead routes)
  $("a.new, a.selflink, a.mw-selflink").each((_, el) => {
    const $el = $(el);
    $el.replaceWith(`<span class="wiki-deadlink">${$el.html() ?? $el.text()}</span>`);
  });

  // any remaining edit / index.php / unknown internal links -> de-link
  $("a[href]").each((_, el) => {
    const $el = $(el);
    let href = $el.attr("href") || "";
    if (/action=edit|redlink=1|index\.php|Special:|[?&]title=/.test(href)) {
      $el.replaceWith(`<span class="wiki-deadlink">${$el.html() ?? $el.text()}</span>`);
      return;
    }
    // Main Page link -> site home
    if (/^(?:https?:\/\/(?:openfront\.wiki|openfront\.miraheze\.org))?(?:\/wiki)?\/Main[_ ]?[Pp]age$/.test(href)) {
      $el.attr("href", "/");
      return;
    }
    // namespace pages we don't host (File:/Template:/Category:/…) -> unwrap,
    // keeping the inner content (e.g. the image a File: link wraps)
    if (/^(?:https?:\/\/(?:openfront\.wiki|openfront\.miraheze\.org))?(?:\/wiki)?\/(File|Template|Category|Help|OpenFront|User|MediaWiki|Module|Talk|Project):/.test(href)) {
      $el.replaceWith($el.contents());
      return;
    }
    // normalise absolute wiki links to local routes when the page exists
    const m = href.match(/^(?:https?:\/\/(?:openfront\.wiki|openfront\.miraheze\.org))?(?:\/wiki)?(\/[^:?#]+)$/);
    if (m) {
      const target = decodeURIComponent(m[1].slice(1)).replace(/ /g, "_");
      if (knownSlugs.has(target)) {
        $el.attr("href", "/" + target);
        $el.removeClass("mw-redirect");
      }
    }
    // external links open in a new tab
    if (/^https?:\/\//.test($el.attr("href") || "")) {
      $el.attr("target", "_blank");
      $el.attr("rel", "noopener noreferrer");
    }
  });

  // unwrap citizen section wrappers but keep their content
  $("section.citizen-section").each((_, el) => $(el).replaceWith($(el).contents()));

  return $.html().trim();
}

function headings(html) {
  const $ = cheerio.load(html, null, false);
  const out = [];
  $("h2, h3").each((_, el) => {
    const id = $(el).attr("id");
    const text = $(el).text().trim();
    if (id && text) out.push({ id, text, level: el.tagName === "h3" ? 3 : 2 });
  });
  return out;
}

const pages = [];
for (const p of raw) {
  if (DROP.has(p.slug)) continue;
  const html = clean(p.html);
  pages.push({
    slug: p.slug,
    title: p.title,
    cats: (p.cats || []).filter(Boolean),
    headings: headings(html),
    html,
  });
}
// Merge durable legacy pages: substantive articles that once lived on the old
// wiki but have no equivalent on the current source, so a crawl can't recover
// them. Stored (pre-cleaned) in scripts/legacy-pages.json; upstream wins if a
// slug ever reappears at the source.
const LEGACY_JSON = path.join(root, "scripts", "legacy-pages.json");
if (fs.existsSync(LEGACY_JSON)) {
  const have = new Set(pages.map((p) => p.slug));
  let merged = 0;
  for (const lp of JSON.parse(fs.readFileSync(LEGACY_JSON, "utf8"))) {
    if (have.has(lp.slug)) continue;
    pages.push(lp);
    merged++;
  }
  if (merged) console.log(`merged ${merged} legacy pages from scripts/legacy-pages.json`);
}

pages.sort((a, b) => a.title.localeCompare(b.title));

// copy images
let imgN = 0;
for (const f of fs.readdirSync(path.join(CRAWL, "images"))) {
  fs.copyFileSync(path.join(CRAWL, "images", f), path.join(PUBLIC_IMG, f));
  imgN++;
}

// copy durable images referenced only by the legacy pages above
const LEGACY_IMG = path.join(root, "scripts", "legacy-images");
if (fs.existsSync(LEGACY_IMG)) {
  for (const f of fs.readdirSync(LEGACY_IMG)) {
    fs.copyFileSync(path.join(LEGACY_IMG, f), path.join(PUBLIC_IMG, f));
    imgN++;
  }
}

fs.writeFileSync(path.join(DATA_DIR, "pages.json"), JSON.stringify(pages, null, 2));
console.log(`wrote ${pages.length} pages, copied ${imgN} images`);

// quick category report
const cats = {};
for (const p of pages) for (const c of p.cats) (cats[c] ||= []).push(p.slug);
console.log("categories:", Object.keys(cats).length);
for (const [c, ps] of Object.entries(cats).sort((a, b) => b[1].length - a[1].length))
  console.log(`  ${ps.length}  ${c}`);
console.log("uncategorised:", pages.filter((p) => !p.cats.length).map((p) => p.slug).join(", "));
