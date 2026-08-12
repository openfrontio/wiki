---
title: "Update 33.0"
section: "Updates"
cats: ["Updates"]
---
**[OpenFront](/OpenFront.io) v33** — Our biggest update yet: a new battle-royale gamemode, ranked 2v2, 22 new maps, impassable terrain, account usernames, custom tribe names and a major performance pass.

# 📦 OpenFront v33 Changelog {#OpenFront_v33_Changelog}

## ⭐ Major Changes {#Major_Changes}

- **Doomsday Clock** — A new battle-royale style zone gamemode. A shrinking doom zone drains troops (and warships) from doomed sides, with a 10-minute grace period and wave-based squeeze to break late-game stalemates. Now part of the public modifier rotation.
- **Ranked 2v2** — Ranked matchmaking now supports 2v2 alongside 1v1, with its own leaderboard ladder, clanmate pairing, and match cancellation for lobbies that don't fill or fully spawn.
- **Login with Google** — Sign in with a Google account and link it to an existing account.
- **Account usernames + verified badge** — Claim an account-level username (`base.suffix`, or a bare name for subscribers) and play under it with a verified badge next to your name.
- **Custom tribe names** — Buy a custom tribe name in the store's new Tribes tab and it can appear on bot tribes in public games. Boosts make your tribe appear more often, and a public tribe leaderboard tracks how they do.
- **Impassable terrain** — Mappers can now mark terrain as impassable, opening up a new class of map design. Several new maps already use it.
- **Warship veterancy** — Warships gain veterancy over their service life.
- **MIRVs are real nukes now** — MIRV warheads fly like standard nukes with per-type speeds and can be intercepted normally by SAMs. Launching a MIRV also puts the silo on cooldown.
- **Anonymous names** — A lobby setting that replaces player names with memorable, collision-proof animal names.
- **22 new maps** — including Sol, Russia, United States, France, Germany, China, Vietnam, Scandinavia and the first maps built around impassable terrain.

## ☢️ Gameplay & Balance {#Gameplay_Balance}

- Added the Doomsday Clock battle-royale zone gamemode — **Zixer1**
- Rebalanced the Doomsday Clock: 10-minute grace period, wave squeeze, slower troop drain, gentler-but-steeper warship attrition — **Zixer1**
- Doomsday Clock now decays warships alongside troops for doomed sides, and floors the drain at 5% of max instead of wiping to zero — **Zixer1**
- Doomsday Clock judges teams against the same bar as solo sides — **Zixer1**
- Doomed warships stay on patrol instead of idling at ports — **Zixer1**
- Added warship veterancy, with updated in-game instructions — **bijx**
- MIRV warheads are now standard nukes: real flight, normal SAM interception, per-type speeds — **Evan**
- Missile silos go on cooldown when launching a MIRV — **Evan**
- MIRV warheads now spawn properly over impassable terrain — **TKTK123456**
- Fixed SAM targeting, range miscalculations and nuke pathing — **JB940**
- Added impassable terrain — **FloPinguin**
- Fixed minimap priority for impassable terrain pathfinding — **FloPinguin**
- Added a custom alliance duration lobby control — **Zixer1**
- Fixed pirating not being disabled when a warship's owner has no port in that body of water — **TKTK123456**
- Fixed transport ships targeting unreachable inland-lake shores — **Navaneeth Prabha**
- Fixed transport ship troop counts not updating when a hydrogen bomb hits the player — **AmanorsElliot**
- Fixed the rail network path length limit and re-added its tests — **TKTK123456**
- Fixed the factory ghost radius — **TKTK123456**
- Fixed non-structures being deletable — **unne27**
- Fixed the nuke preview showing teammate SAMs as threats — **Evan**
- Highlight the owner of hovered naval units — **unne27**
- Reduced compact map chance in 1v1 from 50% to 20% — **FloPinguin**
- Removed the ports-disabled modifier from public games — **Evan**

## 🏆 Ranked & Matchmaking {#Ranked_Matchmaking}

- Added 2v2 ranked matchmaking — **Evan**
- Added the 2v2 ranked ladder as its own leaderboard tab — **Evan**
- Ranked 2v2 now prefers pairing clanmates as teammates — **Evan**
- Ranked 2v2 games end early when a full team is dead or disconnected — **Evan**
- Increased ranked 2v2 PvP spawn immunity to 1 minute — **Evan**
- Ranked 2v2 uses compact maps only 50% of the time — **Evan**
- Cancel ranked matches that don't fill or fully spawn — **Evan**
- Widened the matchmaking join window and cancel games that start short-handed — **Evan**
- Show the live queue size while matchmaking, and reconnect on silent disconnects — **Evan**
- Handle matchmaking socket close codes per the API contract — **Evan**
- Handle ranked play limits in the client — **Evan**
- Keep matchmaking games out of lobby reports and salvage invalid entries — **Evan**
- Mint game ids on the server and randomly route create-game across workers — **Evan**
- Removed clan tags from the 1v1 ranked leaderboard (it's an individual ladder) — **Ryan**
- Split the clan tag into its own filterable leaderboard column, with cleaner rank/clan/player cells — **Ryan**
- Fixed an infinite retry at the end of the ranked leaderboard — **Ryan**

## 🗺️ Maps {#Maps}

### New Maps {#New_Maps}

<table class="wikitable">
<tbody><tr>
<th>Map</th>
<th>Description</th>
<th>Author</th></tr>
<tr>
<td><b><a href="/Sol" title="Sol">Sol</a></b> 🪐</td>
<td>Massive map of the Solar System</td>
<td><b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Russia" title="Russia">Russia</a></b> 🇷🇺</td>
<td>Big-map treatment of Russia</td>
<td><b>RickD004</b></td></tr>
<tr>
<td><b><a href="/United_States" title="United States">United States</a></b> 🇺🇸</td>
<td>Large country map built for the new impassable terrain feature</td>
<td><b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Germany" title="Germany">Germany</a></b> 🇩🇪</td>
<td>With state flags</td>
<td><b>SpeakIsntThere</b></td></tr>
<tr>
<td><b><a href="/China" title="China">China</a></b> 🇨🇳</td>
<td>Qing-China themed country map</td>
<td><b>crunchybbb</b></td></tr>
<tr>
<td><b><a href="/France" title="France">France</a></b> 🇫🇷</td>
<td>Large country map</td>
<td><b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Vietnam" title="Vietnam">Vietnam</a></b> 🇻🇳</td>
<td>Skinny country map based on Vietnam War</td>
<td><b>crunchybbb</b></td></tr>
<tr>
<td><b><a href="/Scandinavia" title="Scandinavia">Scandinavia</a></b> 🧊</td>
<td>Massive European regional map</td>
<td><b>crunchybbb</b></td></tr>
<tr>
<td><b><a href="/Baltics" title="Baltics">Baltics</a></b> 🚢</td>
<td>Regional map with multiple islands on edges</td>
<td><b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Caspian_Sea" title="Caspian Sea">Caspian Sea</a></b> 🌊</td>
<td>Medium sized vertical lake in Central Asia, gameplay similar to Black Sea</td>
<td><b>crunchybbb</b></td></tr>
<tr>
<td><b><a href="/Crimea" title="Crimea">Crimea</a></b> 🇺🇦</td>
<td>Disputed region between Ukraine and Russia</td>
<td><b>crunchybbb</b></td></tr>
<tr>
<td><b><a href="/Finger_Lakes" title="Finger Lakes">Finger Lakes</a></b> 👆</td>
<td>Six skinny lakes connecting to a river; located in upstate New York</td>
<td><b>crunchybbb</b></td></tr>
<tr>
<td><b><a href="/Gulf_of_Guinea" title="Gulf of Guinea">Gulf of Guinea</a></b> 🌍</td>
<td>African map with central Bioko Island</td>
<td><b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Hecate_Strait" title="Hecate Strait">Hecate Strait</a></b> 🏞️</td>
<td>Strait located in British Columbia; full of fjords</td>
<td><b>Liam Langford</b></td></tr>
<tr>
<td><b><a href="/Irish_Sea" title="Irish Sea">Irish Sea</a></b> 🏰</td>
<td>Three landmasses surrounding the Isle of Man in the center</td>
<td><b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Levant" title="Levant">Levant</a></b> 🐫</td>
<td>Three landmasses surrounding Cyprus in the middle</td>
<td><b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Tierra_del_Fuego" title="Tierra del Fuego">Tierra del Fuego</a></b> 🔥</td>
<td>Featuring impassable terrain</td>
<td><b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Branching_Paths" title="Branching Paths">Branching Paths</a></b> 🌿</td>
<td>Branching fractals form waterways</td>
<td><b>NotRocketfish</b></td></tr>
<tr>
<td><b><a href="/More_than_Luck" title="More than Luck">More than Luck</a></b> 🍀</td>
<td>Five-leafed clover shaped map inspired by nuke trajectories</td>
<td><b>Patrick Plays Badly</b></td></tr>
<tr>
<td><b><a href="/Balkhash" title="Balkhash">Balkhash</a></b> 🏜️</td>
<td>Pipe shaped lake in Kazakhstan</td>
<td><b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Clearwater_Lakes" title="Clearwater Lakes">Clearwater Lakes</a></b> ☄️</td>
<td>Double impact crater lakes in Canada</td>
<td><b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Las_Vegas_Strip" title="Las Vegas Strip">Las Vegas Strip</a></b> 🎰</td>
<td>Skinny long map with roads as water and casinos as nations</td>
<td><b>crunchybbb</b></td></tr></tbody></table>

### Map Improvements & Fixes {#Map_Improvements_Fixes}

- Allow mappers to specify custom tribe spawn coordinates in `info.json` — **FloPinguin**
- Added a tribe name themes system with custom tribes support — **FloPinguin**
- Added tribe themes to all real-world maps, plus custom tribes with spawn coordinates on Los Angeles — **crunchybbb**
- Multiple terrain changes and fixes across maps, plus further map changes for v33 — **RickD004**
- Updated map outlines (no resizing, except Oceania) and updated the Dyslexdria map — **Patrick Plays Badly**
- Small corrections across Dyslexdria, Los Angeles, World Inverted and More than Luck; recategorized More than Luck and Branching Paths as arcade — **Patrick Plays Badly**
- Minor updates to Branching Paths — **NotRocketfish**
- Added flags to flagless nations on the Spain and Italy maps — **RickD004**
- Standardized the SVGs of flags in the flags folder, plus other flag fixes — **RickD004**
- Added impassable terrain to the Korea map — **crunchybbb**
- Took v32 maps out of the "New" category to make room for v33 maps; tagged Branching Paths as new — **RickD004**, **NotRocketfish**
- Arcade maps now appear in all playlists — **FloPinguin**
- Fixed a crash on the Indian Subcontinent map — **blon**
- Filled a landlocked lake on the NW island of Four Islands to fix port placement — **blon**
- Prevented AI from placing ports on small lakes — **FloPinguin**
- Fixed map thumbnails resolving by map id instead of display name — **Evan**
- Added an Expand Maps button — **bijx**
- Trimmed archived map names — **Ryan**
- Updated the color mapping location in the map generator README — **Aaron Tidwell**

## 🎨 Cosmetics & Store {#Cosmetics_Store}

- Added a warship cosmetic effect (gradient/transition recolor) — **Evan**
- Added nuke-trail cosmetic effects with a tabbed effects picker, plus a spiral nuke trail — **Evan**
- Added nuke-explosion cosmetic effects with per-bomb-type shockwave customization, plus a sparkles explosion type — **Evan**
- Added a structures cosmetic effect (hover-shown gradient/transition recolor) — **Evan**
- Added the effects cosmetic category with a transport-ship trail, rendered as a gradient with an animated store swatch — **Evan**
- Added a search bar to the effects picker modal — **Evan**
- Added a crown cosmetic type, rendered above player names — **Evan**
- Merged the skin and effects pickers into a single lobby Cosmetics modal, and collapsed skins under one banner — **Evan**, **Ryan**
- Show plutonium and caps balances in the store header — **Evan**
- Added custom plutonium amount purchases with a cleaner amount UI — **Evan**, **Ryan**
- Confirm plutonium and caps purchases before charging — **Evan**
- Show USD-equivalent value in the cosmetic info tooltip — **Evan**
- Added claimable subscription rewards UI — **Evan**
- Restored subscriptions in the store and account modal, and added a checkmarked perk list on subscription tiles — **Evan**
- Specific rate-limit message on tier change, using shared dialogs for subscription flows — **Evan**
- Reworked the store into a popup and removed the "subscribe" / "purchase" text — **Ryan**
- Fixed the store bonus ribbon layout across languages — **Aotumuri**
- Grouped owned cosmetic variants for performance — **Jish**
- Fixed cosmetics blocking buttons on mobile — **tiger**

## 🏕️ Custom Tribe Names {#Custom_Tribe_Names}

- Added a Tribes tab to the store to buy and manage custom tribe names — **Evan**
- Custom tribe names now appear on bot tribes in public games — **Evan**
- Added tribe name boost purchases to the store — **Evan**
- Added a public tribe-name leaderboard tab — **Evan**
- Show active boost counts on the tribe leaderboard — **Evan**
- Show when the next tribe boost expires in the store — **Evan**

## 👤 Accounts, Profiles & Stats {#Accounts_Profiles_Stats}

- Added account-level custom usernames (`base.suffix` plus premium bare names) — **Evan**
- Show account usernames and a verified badge on player-facing lists — **Evan**
- Added a verified-name toggle so you can play under your account name — **Evan**
- Prettier username rendering — **Ryan**
- Login with Google — client UI — **Jish**
- Show "Linked to Google" once a Google account is linked — **Jish**
- Added a shareable player profile modal (`#modal=profile&publicID=x`), profile links and game history on profiles — **Ryan**
- Added a Clans tab to the profile modal — **Ryan**
- Added a Games tab to the account modal — **Ryan**
- Reworked stats into a dedicated embedded stats modal, with a stats button on clan game history and backward compatibility for older games — **Ryan**
- Renamed "ranking" to "stats" — **Ryan**
- Let admins see clan tags in FFA — **Ryan**
- Fixed a bug when not being in a clan on mobile — **Ryan**
- Discord integration — **Ryan**
- Added marketing email consent UI (post-login prompt + account settings) — **iamlewis**
- Added CSV separation between names — **Ryan**

## 🕵️ Anonymous Names {#Anonymous_Names}

- Added the anonymize-names feature — **Zixer1**
- Memorable, collision-proof animal anonymous names — **Zixer1**
- Surfaced anonymous names as a lobby setting — **Zixer1**
- Name reveal now works by publicID during game config — **Zixer1**
- Fixed an anonymize-names desync by seeding the cluster-recalc offset from `id()` instead of `name()` — **Evan**
- Fixed the anonymous-names setting not hiding names on the map — **Evan**

## 📺 Featured Stream {#Featured_Stream}

- Added the featured stream feature — **Zixer1**
- Off-web exclusion, ad-free close, and keeping the stream through the lobby wait — **Zixer1**
- Mobile flick-to-dismiss — **Zixer1**
- Keep the Twitch embed at its 400x300 minimum — **Zixer1**
- Added a Streaming Now panel to the play page with live streamer cards, plus an identity bubble showing your flag, name and skin — **Zixer1**
- Stopped probing Twitch on every page load to avoid rate limits — **Zixer1**

## 🧑‍🤝‍🧑 Lobby & Social {#Lobby_Social}

- Subscriber-hosted public lobby listing, gated on the `canCreatePublicLobbies` entitlement — **Evan**
- Auto-start listed lobbies after 5 minutes, surviving host modal close during auto-start — **Evan**
- Disabled host pause in publicly listed games — **Evan**
- Show notable settings on open-lobby rows in the join modal — **Evan**
- Show a loading spinner while the Join Lobby list loads — **Evan**
- Reuse private lobbies — **MushroomLamp**
- Added an allowlist for private lobbies (OFM) — **Zixer1**
- Replaced the leave-lobby popup with a custom popup — **Ryan**
- Allow mobile players to take part in the aftergame — **FloPinguin**
- Fixed the lobby status bar scrolling out of view when many players join — **FloPinguin**
- Accept `#` as `.` when adding friends — **Ryan**
- Configurable leaderboard and team stats columns — **Ryan**

## 🎛️ Graphics, UI & Quality of Life {#Graphics_UI_Quality_of_Life}

- Added graphics presets, simplifying the settings behind an Advanced section — **Evan**
- Added terrain color settings, with live preview, and restored the default terrain colors — **Vivacious Box**, **Evan**
- Added a nuke fallout color graphics option and a structure dots toggle — **Evan**
- Set the structure border to territory color for the local player — **Vivacious Box**
- Added a black outline to the alliance icon for terrain contrast — **Evan**
- Update the coastline color dynamically when the ocean color changes — **Berk**
- Fixed the ocean color change reverting nuke-created water to land — **Evan**
- Replaced the small-player highlight toggle with a strength slider, moved into graphics overrides, and raised the default to 35% — **Zixer1**, **Evan**
- Standardized gradient `colorSize` to game tiles — **Evan**
- Fall back to a full border recompute on massive tile changes — **blon**
- Render the spawn overlay with instancing to support large lobbies — **Evan**
- Gate users without GPU-accelerated WebGL2 instead of running at ~1fps — **Evan**
- Capped the renderer device-pixel-ratio at 2 — **Evan**
- Improved spawn phase progress bar visibility and sped up the spawn-phase ring pulse — **ItsTimeTooSleep**, **Evan**
- Made train tracks visible from farther out — **Evan**
- Made the important events panel scrollable — **Evan**
- Surfaced alliance renewal and rejection events in the important-events panel — **Evan**
- Added a trade ship captured event with a toggle setting — **Evan**
- Donation received events are now blue instead of green — **Evan**
- Host lobby start button turns yellow during countdown — **Evan**
- Changed factory icons from circles to hexagons — **Antonio Lentini**
- Right-click now cancels warship/boat selection instead of opening the menu — **eastwoodgrant**
- Respect the "Disable emojis" setting in all emoji display paths — **eastwoodgrant**
- Fixed trackpad pinch zoom in Safari — **Landon**
- Reworked `InputHandler.ts` — **TKTK123456**
- Added billions to the money utils — **bijx**
- Added an achievement medal overview — **bijx**
- Fixed classes for the control panel unit display and the control panel / player info gold display — **JB940**
- Removed the background wrap-around seam on the home page when nav is hidden — **Evan**
- Show a loading spinner on the account button until auth resolves — **Evan**
- Prevented the Google CCPA button from shifting layout — **blon**
- Updated the tutorial video URL — **Evan**
- Translation updates (mls v5.8) and removed the Discord URL placeholder from translations — **Aotumuri**

## ⚡ Performance {#Performance}

- Reduced core live-memory footprint by 45% on large maps — **Evan**
- Cut core-sim GC churn by 75% cumulative across three passes, and added GC-churn profiling to the perf harness — **Evan**
- Main-thread memory harness: dropped three map-sized render buffers (−23%) — **Evan**
- Tick-dispatch timing harness and main-thread tick optimizations (late-game p95 −65%) — **Evan**
- Return the live `TileSet` from `Player.tiles()` instead of cloning — **Evan**
- Reuse cached TradeShip paths for motion plans — **Raka Hourianto**
- Cache `maxTroops` during the leaderboard update — **Demonessica**
- Standardized cardinal-neighbor iteration on `neighbors()` N,S,W,E order — **Evan**

## 🤖 Nations & Bots {#Nations_Bots}

- Fixed nations always attacking nuked territory instead of waiting for the correct strategy — **FloPinguin**
- Prevented AI from placing ports on small lakes — **FloPinguin**
- Added the tribe name themes system with custom tribes support — **FloPinguin**

## 🛠️ Server, Admin & Tooling {#Server_Admin_Tooling}

- Added an admin bot HTTP API for managing private games — **Evan**
- Added a live game stats endpoint to the admin bot API — **Evan**
- Added a private match telemetry stream — **Jish**
- `kick_player` can target a publicId, including disconnected accounts — **Zixer1**
- Include publicID in admin-bot live stats players — **Zixer1**
- Per-player `killedBy`, `deathPosition` and `winner` for live standings — **Zixer1**
- OFM tournament: log final standings and per-kill eliminations — **Zixer1**
- Integrated batch `username_check` moderation into game servers — **Evan**
- Archive singleplayer games via the API instead of the game server — **Evan**
- API schema cleanup — **Ryan**
- Fixed `getApiBase()` returning `https://undefined` when `API_DOMAIN` was unset — **Jish**
- Fixed asset uploads for filenames with apostrophes — **Evan**
- Removed unused dependencies, dead components and a stale package override — **VariableVince**
- Added an "assign to me" checkbox to issue templates — **Evan**
- Exempted Dependabot PRs from the PR gate, fixed the stale bot re-commenting on case-mismatched labels, and removed the PR description validation check — **Evan**
- Removed the Wicked Sick service-provider paragraph from the privacy policy — **iamlewis**

## 🔒 Security & Anti-Cheat {#Security_Anti_Cheat}

- Reject spawn intents after the spawn phase (anti-teleport) — **iamlewis**
- Prevent the client from bypassing random spawn selection — **FloPinguin**
- Reject malformed tile refs and unit ids in intents — a single bad intent could freeze a whole lobby — **Evan**
- Keep private-lobby allowlist publicIds out of the game record and start message — **Evan**
- Require a strict majority in 1v1 winner-vote consensus — **Jish**
- Don't re-challenge Turnstile on lobby reconnect — **Evan**
- Removed FFA collusion warnings on replay and ranked — **Antonio Lentini**
- Dependency security bumps — **dependabot**

## 🌐 Translators {#Translators}

- **Arabic🇸🇦**: N0ur, Moha & SyntaxPM
- **Bengali🇧🇩**: sheikh
- **Brazilian Portuguese🇧🇷**: theskeleton4393 & juliosilvaqwerty5
- **Bulgarian🇧🇬**: Nikola123 & NewHappyRabbit
- **Chinese Simplified🇨🇳**: Moki
- **Chinese Traditional🇨🇳**: SkiRhino
- **Czech🇨🇿**: Xaelor, erinthegirl & Matouš Adamů
- **Danish🇩🇰**: NiclasWK
- **Dutch🇳🇱**: cldprv, tryout33, Zjefken & Niels
- **Esperanto**: r3ms & Katokoda
- **Estonian🇪🇪**: ramon.o
- **Finnish🇫🇮**: Tanepro193
- **French🇫🇷**: cldprv, gx21, r3ms & Eiwalis
- **Galician**: toldinsound
- **German🇩🇪**: Pilkey, jacks0n, floriankilian, Fibig & TNB
- **German🇨🇭**: originaloha
- **Greek🇬🇷**: pantelispantelidis
- **Hungarian🇭🇺**: ap.ms
- **Hebrew🇮🇱**: Goblinon
- **Hindi🇮🇳**: sheikh
- **Italian🇮🇹**: frappa10 & Lollosean
- **Indonesian🇮🇩**: tronsar
- **Japanese🇯🇵**: Aotumuri, daimyo_panda2, gafunuko, kaywb & akisan
- **Korean🇰🇷**: Jinyoon
- **Macedonian🇲🇰**: Perdiccas
- **Polish🇵🇱**: zibi, RinkyDinky, Rulfam & krissutonieja
- **Persian🇮🇷**: nobodyiran
- **Russian🇷🇺**: Rulfam & Redincon
- **Serbo-Croatian🇷🇸🇭🇷🇧🇦🇲🇪**: Vekser
- **Slovak🇸🇰**: extraextra
- **Slovenian🇸🇮**: MotivatedMonkey
- **Spanish🇪🇸**: 6uzm4n
- **Swedish🇸🇪**: Moha, theangel2 & Keevee
- **Toki Pona**: Makonede
- **Turkish🇹🇷**: Toyatak & grassified
- **Ukrainian🇺🇦**: Rulfam

## 🙏 Contributors {#Contributors}

Thank you to everyone who shipped code, maps, art and translations for v33:

**Aaron Tidwell** · **AmanorsElliot** · **Antonio Lentini** · **Aotumuri** · **Berk** · **bijx** · **blon** · **crunchybbb** · **Demonessica** · **eastwoodgrant** · **Evan** · **FloPinguin** · **iamlewis** · **ItsTimeTooSleep** · **JB940** · **Jish** · **Landon** · **Liam Langford** · **tiger** · **MushroomLamp** · **Navaneeth Prabha** · **NotRocketfish** · **Patrick Plays Badly** · **Raka Hourianto** · **RickD004** · **Ryan** · **SpeakIsntThere** · **TKTK123456** · **unne27** · **VariableVince** · **Vivacious Box** · **Zixer1** · **dependabot**

## See also {#See_also}

- [Update 26.0](/Update_26.0)
- [Update History](/Update_History)
