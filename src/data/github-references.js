export const OPENFRONTIO_REVISION = "1b086cb59cb1d702eb3de3e8706a9b303ac064a6";
const ROOT = `https://github.com/openfrontio/OpenFrontIO/blob/${OPENFRONTIO_REVISION}/`;

const files = {
  config: ["Core configuration", "src/core/configuration/Config.ts"],
  clock: ["Doomsday Clock", "src/core/game/DoomsdayClock.ts"],
  attack: ["Attack resolution", "src/core/game/AttackImpl.ts"],
  alliances: ["Alliance state", "src/core/game/AllianceImpl.ts"],
  nations: ["Nation behavior", "src/core/game/NationCreation.ts"],
  maps: ["Map registry and terrain", "src/core/game/Maps.gen.ts"],
  rail: ["Rail networks", "src/core/game/RailNetwork.ts"],
  railImpl: ["Rail network implementation", "src/core/game/RailNetworkImpl.ts"],
  station: ["Train stations", "src/core/game/TrainStation.ts"],
  transport: ["Transport ships", "src/core/game/TransportShipUtils.ts"],
  veterancy: ["Unit veterancy", "src/core/game/Veterancy.ts"],
  water: ["Water systems", "src/core/game/WaterManager.ts"],
  gameMap: ["Game map model", "src/core/game/GameMap.ts"],
  allianceRequests: ["Alliance requests", "src/core/game/AllianceRequestImpl.ts"],
  teams: ["Team assignment", "src/core/game/TeamAssignment.ts"],
  stats: ["Match statistics", "src/core/game/Stats.ts"],
  statsImpl: ["Statistics implementation", "src/core/game/StatsImpl.ts"],
  statsSchemas: ["Statistics schemas", "src/core/StatsSchemas.ts"],
  motion: ["Unit motion plans", "src/core/game/MotionPlans.ts"],
  unit: ["Unit implementation", "src/core/game/UnitImpl.ts"],
  unitGrid: ["Unit spatial grid", "src/core/game/UnitGrid.ts"],
  railroad: ["Railroads", "src/core/game/Railroad.ts"],
  railroadGrid: ["Railroad spatial grid", "src/core/game/RailroadSpatialGrid.ts"],
  player: ["Player state", "src/core/game/PlayerImpl.ts"],
  settings: ["User settings", "src/core/game/UserSettings.ts"],
  updates: ["Game updates", "src/core/game/GameUpdates.ts"],
  updateUtils: ["Game update utilities", "src/core/game/GameUpdateUtils.ts"],
  terraNullius: ["Unowned territory", "src/core/game/TerraNulliusImpl.ts"],
  terrainLoader: ["Terrain map loader", "src/core/game/TerrainMapLoader.ts"],
  terrainSearch: ["Terrain search", "src/core/game/TerrainSearchMap.ts"],
  tileSet: ["Tile set", "src/core/game/TileSet.ts"],
};

const bySlug = {
  Doomsday_Clock: ["clock", "config"],
  Defense_Post: ["config"],
  SAM_Launcher: ["config"],
  Missile_Silo: ["config"],
  Atom_Bomb: ["config"],
  Hydrogen_Bomb: ["config"],
  MIRV: ["config"],
  Nuke: ["config", "attack"],
  Combat: ["attack", "config"],
  Ally: ["alliances"],
  Annexation: ["attack", "alliances"],
  Traitor: ["alliances", "attack"],
  Nations: ["nations"],
  Train: ["rail", "railImpl", "railroad", "railroadGrid", "station"],
  Railroad: ["rail", "railImpl", "railroad", "railroadGrid"],
  Trade: ["config", "water", "player"],
  Trade_Ship: ["config", "water"],
  Transport_Ship: ["transport", "water"],
  Warship: ["config", "veterancy"],
  Maps: ["maps", "gameMap"],
  Terrain: ["gameMap", "terrainLoader", "terrainSearch", "tileSet"],
  Tile: ["gameMap", "tileSet", "terrainSearch"],
  Controls: ["settings"],
  Teams: ["teams"],
  Troops: ["player", "unit", "motion"],
  Update_History: ["updates", "updateUtils"],
};

const bySection = {
  Maps: ["maps", "gameMap"],
  Units: ["config"],
  Buildings: ["config"],
  "Combat & mechanics": ["attack", "config"],
  Economy: ["config", "water"],
  "Game modes": ["config"],
  Guides: ["config"],
  "Meta & community": ["settings"],
};

export function githubReferencesForPage(page) {
  if (page.source === "liquipedia") return [];
  const keys = bySlug[page.slug] || bySection[page.section] || ["config"];
  return [...new Set(keys)].map((key) => {
    const [label, path] = files[key];
    return { label, path, url: `${ROOT}${path}` };
  });
}

export const GITHUB_SOURCE_FILES = Object.values(files).map(([label, path]) => ({
  label,
  path,
  url: `${ROOT}${path}`,
}));