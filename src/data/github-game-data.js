// Curated from OpenFrontIO at this revision. Keep values versioned and linked
// to source lines so the wiki never presents a moving GitHub branch as stable data.
export const GITHUB_GAME_DATA = {
  repository: "openfrontio/OpenFrontIO",
  revision: "1b086cb59cb1d702eb3de3e8706a9b303ac064a6",
  checkedAt: "2026-09-12",
  files: [
    {
      label: "Core configuration",
      path: "src/core/configuration/Config.ts",
      url: "https://github.com/openfrontio/OpenFrontIO/blob/1b086cb59cb1d702eb3de3e8706a9b303ac064a6/src/core/configuration/Config.ts",
    },
    {
      label: "Doomsday Clock implementation",
      path: "src/core/game/DoomsdayClock.ts",
      url: "https://github.com/openfrontio/OpenFrontIO/blob/1b086cb59cb1d702eb3de3e8706a9b303ac064a6/src/core/game/DoomsdayClock.ts",
    },
    {
      label: "Rail networks and stations",
      path: "src/core/game/RailNetworkImpl.ts",
      url: "https://github.com/openfrontio/OpenFrontIO/blob/1b086cb59cb1d702eb3de3e8706a9b303ac064a6/src/core/game/RailNetworkImpl.ts",
    },
    {
      label: "Transport ships and water systems",
      path: "src/core/game/TransportShipUtils.ts",
      url: "https://github.com/openfrontio/OpenFrontIO/blob/1b086cb59cb1d702eb3de3e8706a9b303ac064a6/src/core/game/TransportShipUtils.ts",
    },
    {
      label: "Unit veterancy",
      path: "src/core/game/Veterancy.ts",
      url: "https://github.com/openfrontio/OpenFrontIO/blob/1b086cb59cb1d702eb3de3e8706a9b303ac064a6/src/core/game/Veterancy.ts",
    },
  ],
  sections: [
    {
      title: "Defensive systems",
      description: "Values read from the current core configuration.",
      entries: [
        { label: "Defense Post range", value: "30 tiles", source: "Config.ts" },
        { label: "SAM cooldown", value: "90 ticks", source: "Config.ts" },
        { label: "SAM construction", value: "300 ticks", source: "Config.ts" },
        { label: "Default SAM range", value: "70", source: "Config.ts" },
        { label: "Maximum SAM range", value: "150", source: "Config.ts" },
      ],
    },
    {
      title: "Nuclear systems",
      description: "Costs and blast magnitudes currently encoded in Config.ts.",
      entries: [
        { label: "Atom Bomb", value: "750,000 gold", source: "Config.ts" },
        { label: "Hydrogen Bomb", value: "5,000,000 gold", source: "Config.ts" },
        { label: "MIRV launch", value: "25,000,000 gold + 15,000,000 gold per launch", source: "Config.ts" },
        { label: "MIRV warhead magnitude", value: "12 inner / 18 outer", source: "Config.ts#L1066-L1068" },
        { label: "Atom Bomb magnitude", value: "12 inner / 30 outer", source: "Config.ts#L1069-L1071" },
        { label: "Hydrogen Bomb magnitude", value: "80 inner / 100 outer", source: "Config.ts#L1072-L1074" },
      ],
    },
    {
      title: "Doomsday Clock defaults",
      description: "The anti-stall defaults; the feature is disabled unless enabled by game configuration.",
      entries: [
        { label: "Default state", value: "Disabled", source: "Config.ts" },
        { label: "Warning period", value: "30 seconds", source: "Config.ts" },
        { label: "Troop drain ramp", value: "90 seconds", source: "Config.ts" },
        { label: "Troop drain floor", value: "5% of maximum", source: "Config.ts" },
        { label: "Territory elimination deadline", value: "150 seconds", source: "Config.ts" },
      ],
    },
    {
      title: "Structures and vessels",
      description: "Current base costs and construction values from the unit configuration.",
      entries: [
        { label: "City", value: "125,000 gold base; 20 ticks", source: "Config.ts" },
        { label: "Factory", value: "125,000 gold base; 20 ticks", source: "Config.ts" },
        { label: "Port", value: "125,000 gold base; 50 ticks", source: "Config.ts" },
        { label: "Missile Silo", value: "1,000,000 gold; 100 ticks", source: "Config.ts" },
        { label: "Defense Post", value: "50,000 gold base; 50 ticks", source: "Config.ts" },
        { label: "SAM Launcher", value: "1,500,000 gold base; 300 ticks", source: "Config.ts" },
        { label: "Warship", value: "250,000 gold base; 1000 max health", source: "Config.ts" },
      ],
    },
  ],
};

export function githubSourceUrl(source) {
  const [path, fragment] = source.split("#");
  const file = GITHUB_GAME_DATA.files.find((entry) => entry.path.endsWith(path));
  return file ? `${file.url}${fragment ? `#${fragment}` : ""}` : file?.url;
}

const PAGE_DATA = {
  City: ["City"],
  Factory: ["Factory"],
  Port: ["Port"],
  Missile_Silo: ["Missile Silo"],
  Defense_Post: ["Defense Post"],
  SAM_Launcher: ["SAM Launcher"],
  Warship: ["Warship"],
  Atom_Bomb: ["Atom Bomb"],
  Hydrogen_Bomb: ["Hydrogen Bomb"],
  MIRV: ["MIRV launch", "MIRV warhead magnitude"],
  Doomsday_Clock: ["Default state", "Warning period", "Troop drain ramp", "Troop drain floor", "Territory elimination deadline"],
};

export function currentGameDataForPage(slug) {
  const labels = PAGE_DATA[slug];
  if (!labels) return [];
  return GITHUB_GAME_DATA.sections.flatMap((section) =>
    section.entries.filter((entry) => labels.includes(entry.label)),
  );
}