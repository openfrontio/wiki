export const LIVE_GAME_REVISION = "1b086cb59cb1d702eb3de3e8706a9b303ac064a6";
const MAP_SOURCE = `https://github.com/openfrontio/OpenFrontIO/blob/${LIVE_GAME_REVISION}/src/core/game/Maps.gen.ts`;
const GAME_SOURCE = `https://github.com/openfrontio/OpenFrontIO/blob/${LIVE_GAME_REVISION}/src/core/game/Game.ts`;

export const MISSING_LIVE_MAPS = [
  { slug: "cape-cod", id: "CapeCod", title: "Cape Cod", categories: ["North America","New"], nations: 31, image: "/images/maps/cape-cod.png", description: "Cape Cod is a live OpenFront map in the North America, New catalogue with 31 default nations.", source: MAP_SOURCE },
  { slug: "central-america", id: "CentralAmerica", title: "Central America", categories: ["New","North America"], nations: 22, image: "/images/maps/central-america.png", description: "Central America is a live OpenFront map in the New, North America catalogue with 22 default nations.", source: MAP_SOURCE },
  { slug: "qing-china", id: "QingChina", title: "Qing China", categories: ["Asia","Countries"], nations: 32, image: "/images/maps/qing-china.png", description: "Qing China is a live OpenFront map in the Asia, Countries catalogue with 32 default nations.", source: MAP_SOURCE },
  { slug: "tourney-2-teams", id: "Tourney1", title: "Tourney 2 Teams", categories: ["Tournament"], nations: 2, image: "/images/maps/tourney-2-teams.png", description: "Tourney 2 Teams is a live OpenFront map in the Tournament catalogue with 2 default nations.", source: MAP_SOURCE },
  { slug: "tourney-3-teams", id: "Tourney2", title: "Tourney 3 Teams", categories: ["Tournament"], nations: 3, image: "/images/maps/tourney-3-teams.png", description: "Tourney 3 Teams is a live OpenFront map in the Tournament catalogue with 3 default nations.", source: MAP_SOURCE },
  { slug: "tourney-4-teams", id: "Tourney3", title: "Tourney 4 Teams", categories: ["Tournament"], nations: 4, image: "/images/maps/tourney-4-teams.png", description: "Tourney 4 Teams is a live OpenFront map in the Tournament catalogue with 4 default nations.", source: MAP_SOURCE },
  { slug: "tourney-8-teams", id: "Tourney4", title: "Tourney 8 Teams", categories: ["Tournament"], nations: 8, image: "/images/maps/tourney-8-teams.png", description: "Tourney 8 Teams is a live OpenFront map in the Tournament catalogue with 8 default nations.", source: MAP_SOURCE },
  { slug: "yangtze-river", id: "YangtzeRiver", title: "Yangtze River", categories: ["New","Asia"], nations: 9, image: "/images/maps/yangtze-river.png", description: "Yangtze River is a live OpenFront map in the New, Asia catalogue with 9 default nations.", source: MAP_SOURCE },
];

export const INTERNAL_GAME_ENTITIES = [
  { name: "Shell", kind: "Projectile", description: "The simulated projectile used by combat attacks; it is not a player-buildable structure.", source: `${GAME_SOURCE}#L194-L211` },
  { name: "SAM Missile", kind: "Projectile", description: "The interceptor projectile launched by a SAM Launcher; it is created by the system rather than built directly.", source: `${GAME_SOURCE}#L194-L211` },
  { name: "MIRV Warhead", kind: "Projectile", description: "The independently simulated payload produced after a MIRV separates.", source: `${GAME_SOURCE}#L194-L211` },
  { name: "Train Engine", kind: "Train component", description: "The leading component in the TrainType enum.", source: `${GAME_SOURCE}#L213-L217` },
  { name: "Train Tail Engine", kind: "Train component", description: "The trailing engine component used by train formations.", source: `${GAME_SOURCE}#L213-L217` },
  { name: "Train Carriage", kind: "Train component", description: "The carriage component used in train formations.", source: `${GAME_SOURCE}#L213-L217` },
];