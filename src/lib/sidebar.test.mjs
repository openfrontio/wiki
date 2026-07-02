import { test } from "node:test";
import assert from "node:assert/strict";
import { GAME_CATEGORY_ORDER, groupGamePages, groupMastersPages } from "./sidebar.js";

const P = (slug, title, extra = {}) => ({ slug, title, cats: [], ...extra });

test("groupGamePages groups by section in fixed order, A-Z within, drops empty", () => {
  const pages = [
    P("Warship", "Warship", { section: "Units" }),
    P("City", "City", { section: "Buildings" }),
    P("Africa", "Africa", { section: "Maps" }),
    P("Atom_Bomb", "Atom Bomb", { section: "Units" }),
    P("OFM_x", "X", { source: "liquipedia", cats: ["Teams"] }), // excluded (masters)
  ];
  const g = groupGamePages(pages);
  assert.deepEqual(g.map((x) => x.category), ["Maps", "Units", "Buildings"]);
  assert.deepEqual(g.find((x) => x.category === "Units").items.map((p) => p.title), ["Atom Bomb", "Warship"]);
});

test("groupGamePages sends missing/unknown section to Other last", () => {
  const g = groupGamePages([P("Foo", "Foo"), P("Bar", "Bar", { section: "Maps" })]);
  assert.equal(g[g.length - 1].category, "Other");
  assert.equal(g[g.length - 1].items[0].title, "Foo");
});

test("groupMastersPages splits tournaments OFM-first, then teams/players", () => {
  const pages = [
    P("t1", "Zeta Cup", { source: "liquipedia", cats: ["OpenFront Masters", "Tournaments", "Community"] }),
    P("t2", "Alpha Major", { source: "liquipedia", cats: ["OpenFront Masters", "Tournaments", "OFM Official"] }),
    P("tm", "Antares", { source: "liquipedia", cats: ["OpenFront Masters", "Teams"] }),
    P("pl", "Biffeur", { source: "liquipedia", cats: ["OpenFront Masters", "Players"] }),
    P("g", "Gold", { section: "Economy" }), // excluded (game)
  ];
  const m = groupMastersPages(pages);
  assert.deepEqual(m.tournaments.map((p) => p.title), ["Alpha Major", "Zeta Cup"]);
  assert.deepEqual(m.teams.map((p) => p.title), ["Antares"]);
  assert.deepEqual(m.players.map((p) => p.title), ["Biffeur"]);
});
