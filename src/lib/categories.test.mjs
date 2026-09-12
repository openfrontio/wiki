import { test } from "node:test";
import assert from "node:assert/strict";
import { pagesForCategory, WIKI_CATEGORIES } from "./categories.js";

const category = (slug) => WIKI_CATEGORIES.find((entry) => entry.slug === slug);
const page = (slug, title, extra = {}) => ({ slug, title, cats: [], ...extra });

test("pagesForCategory combines sections and topical categories", () => {
  const pages = [
    page("Combat", "Combat", { section: "Combat & mechanics" }),
    page("Guide", "Advanced Guide", { cats: ["Guides"] }),
    page("City", "City", { section: "Buildings" }),
  ];

  assert.deepEqual(
    pagesForCategory(pages, category("advanced-mechanics")).map((entry) => entry.title),
    ["Advanced Guide", "Combat"],
  );
});

test("pagesForCategory leaves unrelated pages out", () => {
  const pages = [
    page("Maps", "Maps", { section: "Maps" }),
    page("Tournament", "Tournament", { cats: ["OpenFront Masters"] }),
  ];

  assert.deepEqual(
    pagesForCategory(pages, category("game-database")).map((entry) => entry.title),
    ["Maps"],
  );
});