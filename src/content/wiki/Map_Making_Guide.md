---
title: "Map Making Guide"
section: "Guides"
cats: []
---
Anyone can make a map for [OpenFront](/OpenFront.io). Maps live in the open-source game repository and are added by pull request; the community's own guide, templates and helper scripts are in the [Discord](/Discord) under 🎯DEVELOPMENT › 🌍 Maps › [New Map Making Guide and Resources](https://discord.com/channels/1284581928254701718/1350917721444847639/1350917721444847639). This page summarises how the game's map generator works, based on its [README](https://github.com/openfrontio/OpenFrontIO/blob/main/map-generator/README.md).

## How a map is built {#How_a_map_is_built}

A map is a folder in `map-generator/assets/maps/<mapname>/` in the [game repo](/Github) containing two files:

- `image.png` — the terrain image
- `info.json` — the map's metadata, nations and spawn points

The Go-based **map generator** (`go run .` in `map-generator/`, or `npm run gen-maps` from the repo root) turns those into the binary map data, mini-map scales and thumbnail the game loads, and regenerates the map list and English names automatically. There are no manual steps to enable a map in game once its folder exists.

## The terrain image {#The_terrain_image}

- The generator reads only the **blue channel** of each pixel to decide terrain type and height, so greyscale images work fine. The exact pixel-to-terrain mapping is documented in `map_generator.go`.
- **Pure black** pixels (`#000000`, with alpha ≥ 20) become **impassable terrain** (added in [Update 33.0](/Update_33.0)): a solid void that cannot be owned, attacked or nuked, that nukes cannot fly over, and that renders as the background colour. Use it for non-rectangular map shapes or for barriers without water. As of [Update 34.0](/Update_34.0) [rails](/Railroad) cannot cross it either.
- Islands smaller than **30 pixels** and bodies of water smaller than **200 pixels** are removed automatically (the generator fills them with the majority neighbouring terrain).
- Width and height are rounded down to multiples of 4.
- For performance, aim for roughly **2–3 million pixels** of total area and around 1–2 million land tiles; more than 3 million land tiles is not recommended.
- A very large world-map source image is linked from the README for cropping real-world regions (GIMP is recommended).

## info.json {#info.json}

Required fields:

- `id` — CamelCase name, matching the folder name (case-insensitive)
- `name` — the canonical name; it must never change once the map ships
- `translation_key` — `map.<foldername>`
- `categories` — one or more of `featured`, `new`, `world`, `continental`, `europe`, `asia`, `north_america`, `africa`, `south_america`, `oceania`, `antarctica`, `countries`, `cosmic`, `fictional`, `arcade`, `tournament`

Optional fields:

- `multiplayer_frequency` — how often the map appears in public rotation (0 or omitted = never). Since Update 34.0 you can override it per mode with `ffa_frequency`, `team_frequency` and `special_frequency`.
- `disabled_modifiers` / `forced_modifiers` — modifiers that should never, or always, be rolled for this map in special games.
- `display_name`, `featured_rank`, `special_team_count`
- `nations` — a list of `{ "name", "coordinates": [x, y], "flag" }` objects. Coordinates are from the top-left; omit them for a random spawn. `flag` is an ISO 3166 code from the game's country list.
- `additionalNations` — extra nations the game can draw on for bigger lobbies (used by maps such as [Gulf of Mexico](/Gulf_of_Mexico)).
- `custom_tribes` and `themes` — themed [tribe](/Tribes) names for the map's bots, optionally with spawn coordinates (Update 33.0).
- `layers` — extra PNG overlays (`<id>.png` in the map folder) rendered between terrain and territory, each with a `placement` of `land` or `water` and an optional `nukeable` flag. Players can turn layers off in graphics settings; the generator has a per-layer alpha slider (Update 34.0).

## Flags, credits and submitting {#Flags_credits_and_submitting}

- New flags go in `resources/flags/<code>.svg` and must be added to the game's country list.
- Add licence and attribution information for your source imagery to `CREDITS.md`. If you are unsure whether a source can be used, ask in Discord before starting.
- Open a pull request against [openfrontio/OpenFrontIO](https://github.com/openfrontio/OpenFrontIO). New maps ship with the next major update, tagged **New** in the map picker for one version.

## See also {#See_also}

- [Maps](/Maps)
- [Terrain](/Terrain)
- [Height Map](/Height_Map)
- [Nations](/Nations)
- [Github](/Github)
