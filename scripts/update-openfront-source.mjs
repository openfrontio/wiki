import fs from "node:fs/promises";
import path from "node:path";

const repo = "openfrontio/OpenFrontIO";
const root = path.resolve(".");
const files = [
  "src/data/github-game-data.js",
  "src/data/github-references.js",
  "src/data/live-game-registry.js",
  "src/data/reference-pages.js",
];

async function githubJson(endpoint) {
  const response = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "openfront-wiki-source-refresh",
    },
  });
  if (!response.ok) throw new Error(`GitHub ${endpoint}: ${response.status} ${response.statusText}`);
  return response.json();
}

async function githubRaw(file, revision) {
  const response = await fetch(`https://raw.githubusercontent.com/${repo}/${revision}/${file}`);
  if (!response.ok) throw new Error(`GitHub ${file}: ${response.status} ${response.statusText}`);
  return response.text();
}

function arithmetic(expression) {
  const clean = expression.replaceAll("_", "").trim();
  if (!/^[0-9+*/(). -]+$/.test(clean)) throw new Error(`Unsupported numeric expression: ${expression}`);
  return Function(`"use strict"; return (${clean});`)();
}

function methodNumber(config, name) {
  const match = config.match(new RegExp(`${name}\\(\\): number \\{\\s*return ([^;]+);`));
  if (!match) throw new Error(`Could not find ${name}() in Config.ts`);
  return arithmetic(match[1]);
}

function defaultsValue(config, name) {
  const defaults = config.match(/const DOOMSDAY_CLOCK_DEFAULTS = \{([\s\S]*?)\n\};/)?.[1];
  const match = defaults?.match(new RegExp(`\\b${name}: ([^,\\n]+)`));
  if (!match) throw new Error(`Could not find Doomsday default ${name}`);
  return match[1].trim().replace(/^"|"$/g, "");
}

function unitBlock(config, unit) {
  const match = config.match(new RegExp(`case\\s+UnitType\\.${unit}\\s*:[\\s\\S]*?\\n\\s*break\\s*;`));
  if (!match) throw new Error(`Could not find UnitType.${unit} in Config.ts`);
  return match[0];
}

function unitCost(config, unit) {
  const block = unitBlock(config, unit);
  const fixed = block.match(/costWrapper\(\(\) => ([0-9_]+)/);
  if (fixed) return arithmetic(fixed[1]);
  const scaled = block.match(/\(numUnits: number\)[\s\S]*?\(numUnits\s*\+\s*1\)\s*\*\s*([0-9_]+)/);
  if (scaled) return arithmetic(scaled[1]);
  const power = block.match(/pow2\(numUnits\) \* ([0-9_]+)/);
  if (power) return arithmetic(power[1]);
  throw new Error(`Could not extract cost for UnitType.${unit}`);
}

function constructionTicks(config, unit) {
  const block = unitBlock(config, unit);
  const match = block.match(/constructionDuration: this\.instantBuild\(\) \? 0 : ([^,\n]+)/);
  return match ? arithmetic(match[1]) : null;
}

function replaceEntry(text, label, value) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(`(\\{ label: "${escaped}", value: ")[^"]+(", source: ")[^"]+(")`);
  if (!pattern.test(text)) throw new Error(`Could not update game-data entry ${label}`);
  return text.replace(pattern, `$1${value}$2Config.ts$3`);
}

const commit = await githubJson(`/repos/${repo}/commits/main`);
const revision = commit.sha;
const commitDate = commit.commit?.committer?.date?.slice(0, 10) || new Date().toISOString().slice(0, 10);
const revisionPattern = /[a-f0-9]{40}/g;
const config = await githubRaw("src/core/configuration/Config.ts", revision);
const mapsSource = await githubRaw("src/core/game/Maps.gen.ts", revision);
const tree = await githubJson(`/repos/${repo}/git/trees/${revision}?recursive=1`);
if (tree.truncated) throw new Error("GitHub source tree was truncated; refusing to publish an incomplete audit");

let changed = 0;
for (const relative of files) {
  const filePath = path.join(root, relative);
  const before = await fs.readFile(filePath, "utf8");
  const after = before
    .replace(revisionPattern, revision)
    .replace(/checkedAt: "\d{4}-\d{2}-\d{2}"/, `checkedAt: "${commitDate}"`);
  if (after !== before) {
    await fs.writeFile(filePath, after);
    changed++;
  }
}

const gameDataPath = path.join(root, "src/data/github-game-data.js");
let gameData = await fs.readFile(gameDataPath, "utf8");
const update = (label, value) => { gameData = replaceEntry(gameData, label, value); };
const formatGold = (value) => `${value.toLocaleString("en-US")} gold`;
const formatTicks = (value) => `${value} ticks`;

update("Defense Post range", `${methodNumber(config, "defensePostRange")} tiles`);
update("SAM cooldown", `${methodNumber(config, "SAMCooldown")} ticks`);
update("SAM construction", `${arithmetic(config.match(/SAM_CONSTRUCTION_TICKS = ([^;]+);/)?.[1] || "") } ticks`);
update("Default SAM range", String(methodNumber(config, "defaultSamRange")));
update("Maximum SAM range", String(methodNumber(config, "maxSamRange")));
update("Atom Bomb", formatGold(unitCost(config, "AtomBomb")));
update("Hydrogen Bomb", formatGold(unitCost(config, "HydrogenBomb")));
update("MIRV launch", `${formatGold(25_000_000)} + ${formatGold(15_000_000)} per launch`);
update("City", `${formatGold(unitCost(config, "City"))} base; ${formatTicks(constructionTicks(config, "City"))}`);
update("Factory", `${formatGold(unitCost(config, "Factory"))} base; ${formatTicks(constructionTicks(config, "Factory"))}`);
update("Port", `${formatGold(unitCost(config, "Port"))} base; ${formatTicks(constructionTicks(config, "Port"))}`);
update("Missile Silo", `${formatGold(unitCost(config, "MissileSilo"))}; ${formatTicks(constructionTicks(config, "MissileSilo"))}`);
update("Defense Post", `${formatGold(unitCost(config, "DefensePost"))} base; ${formatTicks(constructionTicks(config, "DefensePost"))}`);
update("SAM Launcher", `${formatGold(unitCost(config, "SAMLauncher"))} base; ${formatTicks(arithmetic(config.match(/SAM_CONSTRUCTION_TICKS = ([^;]+);/)?.[1] || ""))}`);
update("Warship", `${formatGold(unitCost(config, "Warship"))} base; ${unitBlock(config, "Warship").match(/maxHealth: ([0-9_]+)/)?.[1].replaceAll("_", "") || "?"} max health`);
update("Default state", defaultsValue(config, "enabled") === "false" ? "Disabled" : "Enabled");
update("Warning period", `${defaultsValue(config, "warnSeconds")} seconds`);
update("Troop drain ramp", `${defaultsValue(config, "drainRampSeconds")} seconds`);
update("Troop drain floor", `${defaultsValue(config, "drainFloorPercent")}% of maximum`);
update("Territory elimination deadline", `${defaultsValue(config, "rotDeathSeconds")} seconds`);
await fs.writeFile(gameDataPath, gameData);

const pages = JSON.parse(await fs.readFile(path.join(root, "src/data/pages.json"), "utf8"));
const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, "");
const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const enumNames = Object.fromEntries(
  [...mapsSource.matchAll(/^\s+(\w+) = "([^"]+)"/gm)].map((match) => [match[1], match[2]]),
);
const allMapRecords = [...mapsSource.matchAll(/\{\s*id: "(\w+)",[\s\S]*?categories: \[([^\]]*)\],[\s\S]*?multiplayerFrequency: (-?\d+),[\s\S]*?ffaFrequency: (-?\d+),[\s\S]*?teamFrequency: (-?\d+),[\s\S]*?defaultNationCount: (\d+),[\s\S]*?\n  \},/g)]
  .map((match) => ({ id: match[1], title: enumNames[match[1]] || match[1], categories: [...match[2].matchAll(/"([^"]+)"/g)].map((item) => item[1]), multiplayerFrequency: Number(match[3]), ffaFrequency: Number(match[4]), teamFrequency: Number(match[5]), nations: Number(match[6]) }));
const mapRecords = allMapRecords
  .filter((map) => !pages.some((page) => normalize(page.title) === normalize(map.title)));
await fs.writeFile(path.join(root, "src/data/map-catalog.json"), `${JSON.stringify({ repository: repo, revision, checkedAt: commitDate, maps: allMapRecords }, null, 2)}\n`);
const mapImageDir = path.join(root, "public", "images", "maps");
await fs.mkdir(mapImageDir, { recursive: true });
for (const map of mapRecords) {
  map.slug = slugify(map.title);
  map.image = `/images/maps/${map.slug}.png`;
  const readableCategories = map.categories.map((category) => category.replace(/(^|_)([a-z])/g, (_, start, letter) => `${start ? " " : ""}${letter.toUpperCase()}`));
  map.description = `${map.title} is a live OpenFront map in the ${readableCategories.join(", ")} catalogue with ${map.nations} default nations.`;
  const imageResponse = await fetch(`https://raw.githubusercontent.com/${repo}/${revision}/map-generator/assets/maps/${map.id.toLowerCase()}/image.png`);
  if (imageResponse.ok) await fs.writeFile(path.join(mapImageDir, `${map.slug}.png`), Buffer.from(await imageResponse.arrayBuffer()));
}
const mapEntries = mapRecords.map((map) => {
  const slug = map.slug;
  const categories = map.categories.map((category) => category.replace(/(^|_)([a-z])/g, (_, start, letter) => `${start ? " " : ""}${letter.toUpperCase()}`));
  return `  { slug: "${slug}", id: "${map.id}", title: "${map.title}", categories: ${JSON.stringify(categories)}, nations: ${map.nations}, image: "${map.image}", description: ${JSON.stringify(map.description)}, source: MAP_SOURCE },`;
}).join("\n");
const registryPath = path.join(root, "src/data/live-game-registry.js");
const registry = await fs.readFile(registryPath, "utf8");
const registryUpdated = registry.replace(/export const MISSING_LIVE_MAPS = \[[\s\S]*?\n\];/, `export const MISSING_LIVE_MAPS = [\n${mapEntries}\n];`);
if (!/export const MISSING_LIVE_MAPS = \[/.test(registry)) throw new Error("Could not find missing live map registry");
await fs.writeFile(registryPath, registryUpdated);

const trackedSourcePaths = new Set([
  "src/core/configuration/Config.ts",
  "src/core/configuration/DefaultConfig.ts",
  "src/core/Schemas.ts",
  "src/core/game/Game.ts",
  "src/core/game/DoomsdayClock.ts",
  "src/core/game/AttackImpl.ts",
  "src/core/game/AllianceImpl.ts",
  "src/core/game/NationCreation.ts",
  "src/core/game/Maps.gen.ts",
  "src/core/game/RailNetwork.ts",
  "src/core/game/RailNetworkImpl.ts",
  "src/core/game/TrainStation.ts",
  "src/core/game/TransportShipUtils.ts",
  "src/core/game/Veterancy.ts",
  "src/core/game/WaterManager.ts",
  "src/core/game/GameMap.ts",
  "src/core/game/AllianceRequestImpl.ts",
  "src/core/game/TeamAssignment.ts",
  "src/core/game/Stats.ts",
  "src/core/game/StatsImpl.ts",
  "src/core/StatsSchemas.ts",
  "src/core/game/MotionPlans.ts",
  "src/core/game/UnitImpl.ts",
  "src/core/game/UnitGrid.ts",
  "src/core/game/Railroad.ts",
  "src/core/game/RailroadSpatialGrid.ts",
  "src/core/game/PlayerImpl.ts",
  "src/core/game/UserSettings.ts",
  "src/core/game/GameUpdates.ts",
  "src/core/game/GameUpdateUtils.ts",
  "src/core/game/TerraNulliusImpl.ts",
  "src/core/game/TerrainMapLoader.ts",
  "src/core/game/TerrainSearchMap.ts",
  "src/core/game/TileSet.ts",
]);
const auditFiles = tree.tree
  .filter((entry) => entry.type === "blob")
  .map((entry) => entry.path)
  .filter((file) => /^(src\/(core\/(game|configuration)\/.*\.ts|core\/(Schemas|StatsSchemas)\.ts|client\/.*\.ts|server\/.*\.ts)|map-generator\/.*\.(ts|json))$/.test(file))
  .sort();
const sourceAudit = {
  repository: repo,
  revision,
  checkedAt: commitDate,
  scope: "src/core/game, src/core/configuration, core schemas, client/server runtime, and map-generator source files",
  totalFiles: auditFiles.length,
  coveredFiles: auditFiles.filter((file) => trackedSourcePaths.has(file)),
  mapDataFiles: auditFiles.filter((file) => file.startsWith("map-generator/assets/maps/")),
  uncoveredFiles: auditFiles.filter((file) => !trackedSourcePaths.has(file) && !file.startsWith("map-generator/assets/maps/")),
};
await fs.writeFile(path.join(root, "src/data/github-source-audit.json"), `${JSON.stringify(sourceAudit, null, 2)}\n`);

const metaPath = path.join(root, "src/data/github-source-meta.json");
const meta = {
  repository: repo,
  revision,
  commitUrl: `https://github.com/${repo}/commit/${revision}`,
  checkedAt: commitDate,
  commitMessage: commit.commit?.message?.split("\n", 1)[0] || "",
};
const oldMeta = await fs.readFile(metaPath, "utf8").catch(() => "");
const newMeta = `${JSON.stringify(meta, null, 2)}\n`;
if (oldMeta !== newMeta) {
  await fs.writeFile(metaPath, newMeta);
  changed++;
}

console.log(`OpenFrontIO ${revision.slice(0, 7)} (${commitDate}): updated ${changed} file(s)`);