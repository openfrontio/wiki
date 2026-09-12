export const WIKI_CATEGORIES = [
  {
    slug: "getting-started",
    title: "Getting Started",
    description: "Learn the controls, game modes, and first principles before your first match.",
    icon: "◎",
    sections: ["Game modes", "Guides"],
    cats: ["Beginner", "Controls"],
  },
  {
    slug: "game-database",
    title: "Game Database",
    description: "Browse buildings, units, maps, terrain, and source-backed game data.",
    icon: "▦",
    sections: ["Maps", "Units", "Buildings"],
  },
  {
    slug: "advanced-mechanics",
    title: "Advanced Mechanics",
    description: "Understand combat, defense, economy, logistics, and late-game systems.",
    icon: "⌁",
    sections: ["Combat & mechanics", "Economy"],
    cats: ["Guides", "Mechanics"],
  },
  {
    slug: "rules-and-moderation",
    title: "Rules & Moderation",
    description: "Find the rules of play, conduct guidance, and reliable support information.",
    icon: "◇",
    cats: ["Rules", "Moderation", "FAQ"],
  },
  {
    slug: "updates-and-development",
    title: "Updates & Development",
    description: "Follow releases, changelogs, contribution guidance, and the project itself.",
    icon: "↗",
    sections: ["Updates"],
    cats: ["Development", "Updates"],
  },
  {
    slug: "community-and-esports",
    title: "Community & Esports",
    description: "Explore OpenFront Masters, tournaments, teams, players, and community history.",
    icon: "✦",
    sections: ["Meta & community"],
    cats: ["OpenFront Masters", "Tournaments", "Teams", "Players"],
  },
];

export function getWikiCategory(slug) {
  return WIKI_CATEGORIES.find((category) => category.slug === slug);
}

export function pagesForCategory(pages, category) {
  const matches = (page) => {
    const cats = page.cats || [];
    return category.sections?.includes(page.section) || category.cats?.some((cat) => cats.includes(cat));
  };
  return pages.filter(matches).sort((a, b) => a.title.localeCompare(b.title));
}