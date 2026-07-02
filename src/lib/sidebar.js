export const GAME_CATEGORY_ORDER = [
  "Maps", "Units", "Buildings", "Combat & mechanics", "Economy",
  "Game modes", "Guides", "Updates", "Meta & community", "Other",
];

const byTitle = (a, b) => a.title.localeCompare(b.title);

export function groupGamePages(pages) {
  const game = pages.filter((p) => p.source !== "liquipedia");
  const buckets = {};
  for (const p of game) (buckets[GAME_CATEGORY_ORDER.includes(p.section) ? p.section : "Other"] ||= []).push(p);
  return GAME_CATEGORY_ORDER
    .filter((c) => buckets[c]?.length)
    .map((c) => ({ category: c, items: buckets[c].sort(byTitle) }));
}

export function groupMastersPages(pages) {
  const liq = pages.filter((p) => p.source === "liquipedia");
  const has = (p, c) => (p.cats || []).includes(c);
  const pick = (c) => liq.filter((p) => has(p, c)).sort(byTitle);
  return {
    tournaments: [...liq.filter((p) => has(p, "OFM Official")).sort(byTitle),
                  ...liq.filter((p) => has(p, "Community")).sort(byTitle)],
    teams: pick("Teams"),
    players: pick("Players"),
  };
}
