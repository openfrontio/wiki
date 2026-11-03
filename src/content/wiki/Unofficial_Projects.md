---
title: "Unofficial Projects"
section: "Meta & community"
cats: []
---
Unofficial community projects utilize Openfront data or interact with the Openfront systems.

The [Openfront Api](https://github.com/openfrontio/OpenFrontIO/blob/main/docs/API.md) provides endpoints to query game, player, and clan data: you can list game metadata within a two-day window, fetch full game details, and retrieve player info and session lists by player ID; clan endpoints include a top-100 leaderboard (weighted wins with a 30-day half-life) and detailed clan stats and sessions over optional time ranges

For Software and Tools related to maps, see [Map Making](/Map_Making_Guide).

_Note that some of these projects may be work in progress, incomplete, or abandoned._

# Stats and rating trackers {#Stats_and_rating_trackers}

Community-built analytics platforms, rating ladders and tracking tools. None of them are official; each reads public game data through the API.

## OFStats {#OFStats}

[ofstats.io](https://ofstats.io/) — the community-standard statistics and game analytics hub.

- Tiered FFA rating ladders and win rates, with dedicated Ranked and Team boards.
- An in-browser replay viewer for any archived match.
- Map analytics and spawn meta: heatmaps of the best spawn positions, map stats and fastest-win records.
- Weekly clan leaderboards, custom achievements and speedrun tracking.
- Never does seasonal resets: ratings and ladders are computed from your entire match history.

## TrackerFront {#TrackerFront}

[trackerfront.com](https://trackerfront.com/) — long-term progression tracking and a global FFA ranking built on TrueSkill.

- Skill ranks from Iron to Conqueror, with global tier-distribution analytics.
- Detailed match logs, live game feeds and personal progression curves.
- A casual mode to join lobbies without risking your ladder standing.
- Seasonal ladders with periodic resets.

## OFRatings {#OFRatings}

[ofratings.com](https://ofratings.com/) — a performance-weighted Elo ladder, tournament system and fair-play moderation.

- Placement Elo computed from land capture, economy, nuke use and conquests (winners locked to 1st).
- Skill classes from Novice to OF Super GM, seasonal profile badges and a Hall of Fame.
- Boards for upcoming scrims, tournaments and quests.
- A community review system for reporting teaming, scripting and spawn sniping.
- An interactive conquest map, player comparisons and an open developer API; structured seasons are planned.

## TheFrontHub {#TheFrontHub}

[thefronthub.com](https://thefronthub.com/dashboard.html) — activity-driven rankings, competitive ladders and speedrun records.

- Weekly and all-time activity-points boards (+10 per FFA win, +5 per Team win, +1 per Ranked win).
- Mirrors of the official Ranked 1v1 and 2v2 top-100.
- Verified map and game-mode speedrun leaderboards.
- Live lobby feeds, an interactive map atlas, community power rankings and tournament brackets.

## TeamStats {#TeamStats}

[teamstats.pro](https://teamstats.pro/) — clan-focused analytics, competitive team seasons and creative tools.

- Clan and team Elo leaderboards alongside 1v1, 2v2, FFA and speedrun boards.
- A seasonal clan world map driven by real match outcomes.
- Live tracking of clan-vs-clan public lobbies.
- A creator suite: replay finder, heatmaps, a custom map builder and a custom skin designer.

# Web Apps {#Web_Apps}

## OpenFront Atlas {#OpenFront_Atlas}

An interactive atlas and browser of OpenFront's maps — continental and regional — with thumbnails and per-map details.

- [openfront-atlas.xyz](https://www.openfront-atlas.xyz/)

## OpenFront.io Replay Analyzer {#OpenFront.io_Replay_Analyzer}

A Web Application to analyze OF games

- [ofra.vimacs.workers.dev](https://ofra.vimacs.workers.dev/)
- Author: scamiv
- Version: v28

## FrontPlus.io {#FrontPlus.io}

FrontPlus.io is a companion web platform for OpenFront.io players.

- [https://frontplus.io/](https://frontplus.io/)

# Software {#Software}

<table class="box-Warning plainlinks metadata ambox ambox-content" role="presentation"><tbody><tr><td class="mbox-image"><div class="mbox-image-div"><span typeof="mw:File"><span><img alt="" src="/images/Ambox_important.svg" decoding="async" width="40" height="40" class="mw-file-element"></span></span></div></td><td class="mbox-text" style="text-align: left;"><div class="mbox-text-span">All software linked below is community-created and not official in any capacity. Use at your own risk. Always review any code you download before running it.</div></td></tr></tbody></table>

## OpenfrontIO Api Client (JS/TS) {#OpenfrontIO_Api_Client_(JS/TS)}

An unofficial, robust JavaScript/TypeScript client for the OpenFront API.

- [Github](https://github.com/Tidwell/openfrontio-api-client)
- Author: Tidwell
- Version: v28

## Openfront Utility {#Openfront_Utility}

This project is a tool for generating and previewing Openfront.io patterns in Base64 format.

- [Github](https://github.com/Aotumuri/openfront-utility)
- Author: Aotumuri
- Version: v28

## Openfront Tactical Suitcase {#Openfront_Tactical_Suitcase}

Monorepo for the Openfront Tactical Suitcase project, including the web UI, shared game logic, and a browser userscript HUD.

- [Github](https://github.com/docteurzoidberg/openfront-tactical-suitcase)
- Author: DrZoid
- Version: v28

## OpenFront Replay Analyzer {#OpenFront_Replay_Analyzer}

This repository runs OpenFront replays against the exact game engine version recorded in each replay’s gitCommit, without embedding the analyzer inside the main OpenFront repo.

- [Github](https://github.com/scamiv/ofra)
- Author: scamiv
- Version: v28

## OpenFront.io Reinforcement Learning Agent {#OpenFront.io_Reinforcement_Learning_Agent}

Academic Research project for a sophisticated deep reinforcement learning system for training AI agents to play OpenFront.io.

- [Github](https://github.com/Alexis-CAPON/Reinforcement-Learning-Agent-OpenFront.io)
- Author: Terry, Jordan K and Black, Benjamin and Jayakumar, Mario
- Version: v27

## OpenFront Watcher Chrome Extension {#OpenFront_Watcher_Chrome_Extension}

A Chrome extension that monitors openfront.io for "Free for All" in the online mode rotation and sends desktop notifications.

- [Github](https://github.com/PeanutButte7/openfront-watcher/tree/main)
- Author: PeanutButte7
- Version: v28

_Tools related to automating/cheating, gameplay modification, or forks of the Official OpenfrontIO game are not to be included here.  Inactive software/tools will be flagged as inactive when they cease to function.  If you verify software working on a more recent version than listed here, please contribute an update!_
