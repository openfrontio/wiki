import { GITHUB_GAME_DATA } from "./github-game-data.js";

export const EQUATION_AUDIT = {
  revision: GITHUB_GAME_DATA.revision,
  checkedAt: GITHUB_GAME_DATA.checkedAt,
  entries: [
    {
      name: "Human attack order",
      formula: "attackStack = troops / 5",
      status: "verified",
      meaning: "The default human attack order is one fifth of the attacker's current troops.",
      source: "src/core/configuration/Config.ts#L956-L962",
      guide: "/guides/attacking-effectively",
    },
    {
      name: "Boat attack order",
      formula: "boatAttackStack = floor(troops / 5)",
      status: "verified",
      meaning: "Boat attacks use the same fifth-of-troops shape, rounded down.",
      source: "src/core/configuration/Config.ts#L936-L938",
      guide: "/guides/attacking-effectively",
    },
    {
      name: "Human troop capacity",
      formula: "2 * (tiles^0.6 * 1000 + 50000) + completedCityLevels * 250000",
      status: "verified",
      meaning: "Territory gives a sublinear capacity increase; completed City levels add a fixed bonus.",
      source: "src/core/configuration/Config.ts#L985-L1003",
      guide: "/guides/attacking-effectively",
    },
    {
      name: "Human troop regeneration",
      formula: "(10 + troops^0.73 / 4) * (1 - troops / maxTroops)",
      status: "verified",
      meaning: "Regeneration falls as current troops approach maximum capacity.",
      source: "src/core/configuration/Config.ts#L1019-L1051",
      guide: "/guides/attacking-effectively",
    },
    {
      name: "Attack troop ratio",
      formula: "troopRatio = defenderTroops / attackStack",
      status: "verified",
      meaning: "The attack resolver uses the defender-to-stack ratio alongside density, terrain, territory, and modifiers.",
      source: "src/core/configuration/Config.ts#L900-L925",
      guide: "/guides/attacking-effectively",
    },
    {
      name: "Doomsday deadline",
      formula: "territoryDeadline = rotDeathSeconds",
      status: "verified",
      meaning: "The territory deadline is a source-defined total deadline, not an extra interval to add to the warning period.",
      source: "src/core/configuration/Config.ts#L213-L216",
      guide: "/reference/doomsday-clock",
    },
    {
      name: "Historical wiki formulas",
      formula: "varies by article and game revision",
      status: "context",
      meaning: "Formula-like prose in old update, tournament, and community pages is historical context; current gameplay guidance is maintained in the verified entries above.",
      source: "/reference/source-tree",
      guide: "/reference/patch-notes",
    },
  ],
};

export function equationSourceUrl(source) {
  if (source.startsWith("/")) return source;
  const [path, fragment] = source.split("#");
  return `https://github.com/openfrontio/OpenFrontIO/blob/${EQUATION_AUDIT.revision}/${path}${fragment ? `#${fragment}` : ""}`;
}