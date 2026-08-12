import { getCollection } from "astro:content";
import mastersData from "../data/pages.json";

// Editable game/maps/guides pages now live in the `wiki` Markdown collection.
// Map each entry to the lightweight page shape the sidebar, all-pages index and
// homepage consume ({ slug, title, section, cats }). No `source` field → they
// group as game pages (source !== "liquipedia").
export async function gamePages() {
  const entries = await getCollection("wiki");
  return entries.map((e) => ({
    slug: e.id,
    title: e.data.title,
    section: e.data.section,
    cats: e.data.cats || [],
  }));
}

// The OpenFront Masters pages stay in pages.json as the Liquipedia mirror.
export function mastersPages() {
  return mastersData.map((p) => ({
    slug: p.slug,
    title: p.title,
    section: p.section,
    cats: p.cats || [],
    source: p.source,
    sourceUrl: p.sourceUrl,
  }));
}

// One merged list — the single source of truth for every consumer that needs
// "all pages regardless of origin" (sidebar grouping, /all, homepage updates).
export async function allPages() {
  const [game, masters] = [await gamePages(), mastersPages()];
  return [...game, ...masters];
}
