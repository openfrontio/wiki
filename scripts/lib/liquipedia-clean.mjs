import * as cheerio from "cheerio";

export function deriveSlug(rawSlug) {
  // rawSlug uses underscores for spaces, "/" for subpages
  let s = rawSlug.replace(/^Openfront\//, "");
  const ofm = s.startsWith("OFM/");
  s = s.replace(/^OFM\//, "").replace(/^Clans\//, "");
  s = s.replace(/\//g, "_"); // any remaining subpage slashes
  return ofm ? "OFM_" + s : s;
}

export function deriveCats(rawSlug, html) {
  const cats = ["OpenFront Masters"];
  const rest = rawSlug.replace(/^Openfront\//, "");
  const isOFM = rest.startsWith("OFM/");
  const isClan = rest.startsWith("Clans/");
  // tournaments have a bracket or an infobox labelled with a date/prize; teams
  // and players have team/player infoboxes. Use lightweight signals.
  const looksTournament = /bracket|infobox-header[^>]*>[^<]*(Tournament|Cup|Major|Minor|Clan Wars|Olympics|League)/i.test(html)
    || /(Cup|Major|Minor|Clan Wars|Olympics|Tournament|Qualifier|Game|Rumble|Assembly|Solstice|Clash)/i.test(rest);
  const looksTeam = isClan || /Big Gigachads|Squad|Antares|Cynosure|Grain de Malice|Liberated Battle Unit|United Nations/i.test(rest);
  if (looksTournament && !looksTeam) {
    cats.push("Tournaments", isOFM ? "OFM Official" : "Community");
  } else if (looksTeam) {
    cats.push("Teams");
  } else {
    cats.push("Players");
  }
  return cats;
}

export function buildSlugMap(rawPages) {
  const m = {};
  for (const p of rawPages) m[p.slug] = deriveSlug(p.slug);
  return m;
}

// Liquipedia exposes no machine-readable image license, so decide by filename.
// Host country flags (*_hd.png) + the game's own PNG/SVG UI assets; skip
// team/event logos and player photos. Populate the override sets in Task 8 for
// any straggler that slips past the heuristics.
const DENY_LIST = new Set([]); // exact filenames to always skip
const ALLOW_LIST = new Set([]); // exact filenames to always host
const FLAG = /_hd\.png$/i;
const LOGO_OR_PHOTO = /(logo|filler|event|avatar|profile|poster|banner|squad|photo)/i;
const PHOTO_EXT = /\.(jpe?g|webp|gif)$/i;
export function isHostableImage(name) {
  if (ALLOW_LIST.has(name)) return true;
  if (DENY_LIST.has(name)) return false;
  if (FLAG.test(name)) return true; // country flags: PD/low-risk
  if (LOGO_OR_PHOTO.test(name)) return false; // team/event logos
  if (PHOTO_EXT.test(name)) return false; // photos are typically jpg/webp
  return /\.(png|svg)$/i.test(name); // remaining PNG/SVG = game UI assets
}

export function cleanHtml(html, { slugMap, icons }) {
  const $ = cheerio.load(html, null, false);

  $(["script", "style", "link", "meta", ".mw-editsection", ".mw-empty-elt",
     ".noprint", "#toc", ".toctogglecheckbox"].join(",")).remove();

  // icons: <span class="fas fa-book"> -> inline svg
  $("span[class*='fa-']").each((_, el) => {
    const cls = ($(el).attr("class") || "").split(/\s+/).find((c) => icons[c]);
    if (cls) $(el).replaceWith(icons[cls]);
    else $(el).remove();
  });

  // links
  $("a[href]").each((_, el) => {
    const $el = $(el);
    let href = $el.attr("href") || "";
    const lab = href.match(/^(?:https?:\/\/liquipedia\.net)?\/lab\/(.+)$/);
    if (lab) {
      if ($el.hasClass("new")) {
        $el.replaceWith(`<span class="wiki-deadlink">${$el.html() ?? $el.text()}</span>`);
        return;
      }
      const rawTitle = decodeURIComponent(lab[1].split("#")[0]).replace(/ /g, "_");
      const local = slugMap[rawTitle];
      if (local) {
        $el.attr("href", "/" + local);
        $el.removeAttr("target").removeAttr("rel");
        return;
      }
      $el.attr("href", "https://liquipedia.net/lab/" + rawTitle);
      $el.attr("target", "_blank").attr("rel", "noopener noreferrer");
      return;
    }
    if (/^https?:\/\//.test(href)) {
      $el.attr("target", "_blank").attr("rel", "noopener noreferrer");
      return;
    }
    // red links / edit / unknown internal -> plain text
    if ($el.hasClass("new") || /action=edit|redlink=1|index\.php|Special:/.test(href)) {
      $el.replaceWith(`<span class="wiki-deadlink">${$el.html() ?? $el.text()}</span>`);
    }
  });

  // images: keep hostable ones (rewrite src), drop the rest to alt text
  $("img").each((_, el) => {
    const $el = $(el);
    const src = $el.attr("src") || "";
    const name = decodeURIComponent(src.split("/").pop() || "").replace(/ /g, "_");
    if (isHostableImage(name)) {
      const safe = name.replace(/[^a-zA-Z0-9._-]/g, "_");
      $el.attr("src", "/images/liquipedia/" + safe);
      $el.removeAttr("srcset").removeAttr("loading");
    } else {
      const alt = $el.attr("alt");
      $el.replaceWith(alt ? `<span class="liq-noimg">${alt}</span>` : "");
    }
  });

  return $.html().trim();
}
