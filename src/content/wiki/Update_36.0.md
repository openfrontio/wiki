---
title: "Update 36.0"
section: "Updates"
cats: ["Updates"]
---
**[OpenFront](/OpenFront.io) v36** — The ratings update: the [FFA Rating](/Ranked) and Season 1 built with OFstats, save/load/share for [singleplayer](/Single_Player) games, a replay viewer you can continue playing from, friends and notifications, the Atlas map picker with eight new maps ([Paris](/Paris), [London](/London), [Mexico](/Mexico), [Canada](/Canada), [Türkiye](/Turkiye), the [Ottoman Empire](/Ottoman_Empire), [Zealandia](/Zealandia) and [Brahmaputra](/Brahmaputra)) plus rebuilt [World](/World) maps, quick build on mobile, new keybinds, lobby presets, readable nuke warnings and big performance gains.

Released **November 9th 2026** (v0.36.0). This page follows the [official release notes](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.36.0).

# 📦 OpenFront v36 Changelog {#OpenFront_v36_Changelog}

## ⭐ Overview {#Overview}

- **Save and share singleplayer games** — Signed-in players can save a [singleplayer](/Single_Player) game from the in-game menu and pick it up later from the Solo modal's new Saved games bar, where saves can be renamed, deleted or shared. A shared save opens from its link, or from its code pasted into the Saved games box, so it works on [Steam](/Steam) and the game portals too. Guests can play shared saves.
- **Continue a replay from any point** — The new replay viewer is now the default for every replay. Pause it anywhere, press Continue, choose a surviving player and a [difficulty](/Difficulty) for the other humans, and you're playing that game from that moment as a singleplayer match. The classic replay is still a toggle in Settings.
- **FFA Rating** — The ranked FFA queue is gone. Public [FFA](/Free_for_All) games now count towards an **[FFA Rating](/Ranked)** from OFstats instead: a rank and a rating with its uncertainty (like 1613 ± 85), ten calibration games before you're placed, a rating change on the win screen and in your game history, and a season banner with the dates and days left. The leaderboard gets a tab for each of the 8 ranks, Iron to Grandmaster, each listing that rank's top 250, and it opens on your own rank.
- **The Atlas** — The map picker has an Atlas tab: a world map with a pin for each of the 100+ real-world [maps](/Maps). Hover a pin for its preview, description and map designer, then click to pick it. Every map card also gets a "?" with its size, land share, nation count, expected players and designer.
- **New maps** — [Paris](/Paris), [London](/London), [Mexico](/Mexico), [Canada](/Canada), [Türkiye](/Turkiye), the [Ottoman Empire in 1683](/Ottoman_Empire), [Zealandia](/Zealandia) and [Brahmaputra](/Brahmaputra). The [World](/World) maps were rebuilt with new terrain and waterways, [World 4000](/World_4000) replaces [Giant World](/Giant_World_Map), and [World 10000](/World_10000) is a huge new map for custom games and tournaments. [Africa](/Africa) has new, greener terrain, [Los Angeles](/Los_Angeles) has a rebuilt road network, and a batch of other maps got fixes.
- **Quick build on mobile** — Phones and tablets get a permanent build bar for structures, [warships](/Warship) and missiles, so you no longer need the radial menu for them. The first tap previews a placement, tapping elsewhere moves it, and tapping the preview again builds or launches.
- **New keybinds** — **J** sends troops and **O** opens the send-gold window for the ally under your cursor. **I** opens their player panel. Hold **H** to build a separate structure next to one you'd otherwise [upgrade](/Upgrading). Pressing a build key again on the same spot now steps the amount 1 → 5 → 10 → 15 (up to 50), and Alt+scroll adjusts it by 1. On AZERTY and other layouts, the default keys and hints now show the keys on your own keyboard (ZQSD instead of WASD). The new keybinds can be changed in Settings > Keybinds (see [Controls](/Controls)).
- **Nuke warnings you can read** — The [nuke](/Nuke) blast-radius circle is yellow when a strike only ends an alliance with a [traitor](/Traitor) or disconnected ally, and flashes red when it would make you a traitor.
- **Lobby presets and a custom win threshold** — Save your Create Game and Solo settings as named presets from the new Presets button in the modal header. Hosts can also set the share of the map needed to win, from 10% to 99.9% (80% stays the default; see [Game Settings](/Game_Settings)).
- **Faster in heavy games** — Nukes, [MIRVs](/MIRV) and [SAMs](/SAM_Launcher) got a lot cheaper to simulate: MIRV targeting is up to 15× faster, peak memory is about 13% lower in big SAM fights, and the early-game freeze during the spawn phase is gone.

## ☢️ Gameplay & Balance {#Gameplay_Balance}

- Fix games crashing for everyone who traded with a player whose [port](/Port) had tens of thousands of levels; [trade](/Trade) odds are unchanged — **Josh**
- [Annexation](/Annexation) reworked: a nuked-off arm is annexed even when the crater stands between it and the sea, a nation cut in two is no longer annexed twice in one tick, and inland empires stop losing small border tips — **JB940**
- Fix boats failing to get past, or detouring around, river bends that double back ([Didier](/Didier), [Conakry](/Conakry), [Russia](/Russia), [China](/China), [Europe](/Europe)) — **FloPinguin**
- [Trains](/Train) move 2 tiles per [tick](/Tick) from the first tick again (they moved 3 on the first one) — **JB940**
- Hosts can set a custom win threshold (10–99.9%) for private games; Overtime counts down from it — **Rikardo66The100**

## 🤖 Nations {#Nations}

- [Nations](/Nations) stop sending their whole army when two attacks start in the same tick — **FloPinguin**
- Island nations boat the [bots](/Bots) across the water before going after players — **FloPinguin**
- With [atom bombs](/Atom_Bomb) disabled, nations save up for [hydrogen bombs](/Hydrogen_Bomb) instead of spending it all on [warships](/Warship), and only counter real warship infestations — **FloPinguin**

## 🏆 FFA Rating & Progression {#FFA_Rating_Progression}

- [FFA Rating](/Ranked) by OFstats replaces the ranked FFA queue: rank badges, rating ± uncertainty and calibration on the leaderboard, profile, game history and win screen — **Lewis**
- A season banner on the FFA Rating tab with the season's dates, days left and progress — **Lewis**
- The FFA leaderboard has a tab for each rank showing its top 250, opens on your own rank, and pins your exact position — **Lewis**
- Provisional [XP](/Levels_and_XP) from a game that never gets scored now clears after 3.5 hours instead of 12 — **LoSt543215543**

## 🎞️ Singleplayer & Replays {#Singleplayer_Replays}

- Save, load, rename and share [singleplayer](/Single_Player) games from the in-game menu and the Solo modal — **Evan**
- Open a shared save by pasting its link or code, on [Steam](/Steam) and the game portals too — **Evan**
- "Continue game from here" in the replay viewer: take over any surviving player at any point — **LoSt543215543**
- The new replay viewer is now the default; the classic replay is still available — **LoSt543215543**
- Fix hovering a player in the replay viewer throwing errors, and the shortcut buttons showing there — **Evan**
- Fix hovering a player with a nuke heading for unowned land breaking the replay viewer's player icons — **Evan**
- Reloading a singleplayer game no longer sends you to a "lobby not found" screen — **Himansu**
- The in-game menu lists Save game first, then Graphics and Settings — **VariableVince**

## 🧑‍🤝‍🧑 Lobby & Social {#Lobby_Social}

- Friend requests show up in a new notifications panel under the bell (see [Accounts](/Accounts)) — **cazlabIO**
- Lobby setting presets for Create Game and Solo, in a Presets popover in the modal header — **LoSt543215543**, **Evan**
- Copy the [game link](/Game_Link) from the end-of-game screen and from a new share button in the in-game top bar — **LoSt543215543**
- The Detailed View filters can have a default profile, applied on the first open after a page load, and profiles are saved per account — **Rikardo66The100**
- Spectators no longer count towards a lobby's player count — **LoSt543215543**
- [Team](/Teams) lobbies round their player cap to whole teams, so the card no longer says 6/100 for 33 teams of 3 — **LoSt543215543**
- The in-game team leaderboard shows [clan](/Clan) tags as team names instead of "Team 16" — **LoSt543215543**
- The nation difficulty tag is hidden on lobbies without nations — **FloPinguin**
- The FFA slot on the homepage keeps its size when no FFA lobby is open, so the page doesn't jump — **LoSt543215543**
- The username reservation banner no longer covers the Upcoming lobbies heading — **LoSt543215543**

## 🛡️ Trust & Safety {#Trust_Safety}

- When someone you reported gets banned, you get a thank-you message the next time you open the game — **Lewis**
- Redesigned ban notice with clear reason and expiry, and a "Contact us on [Discord](/Discord)" button for appeals — **Lewis**

## 🎨 Accounts, Cosmetics & Store {#Accounts_Cosmetics_Store}

- A "Nobody" option in cosmetic visibility hides everyone's cosmetics while you keep yours equipped — **Aotumuri**
- Scroll-to-top button in the store and inventory — **LoSt543215543**
- [Flags](/Flag_Table) for all 12 Dutch provinces — **Niels-600**
- A subscription in its grace period shows as active in your [account](/Accounts) instead of a grey "grace" — **Josh**

## 🗺️ Maps {#Maps}

### New Maps {#New_Maps}

<table class="wikitable">
<tbody><tr>
<th>Map</th>
<th>Description</th>
<th>Credits</th></tr>
<tr>
<td><b><a href="/Paris" title="Paris">Paris</a></b> 🇫🇷</td>
<td>The city limits, with the Seine, canals and main boulevards as waterways and 60 nations on the city's quartiers</td>
<td><b>Théophile</b>, <b>RickD004</b></td></tr>
<tr>
<td><b><a href="/London" title="London">London</a></b> 🇬🇧</td>
<td>Greater London with its major roads as rivers, thin bridges across the Thames and 30+ borough nations</td>
<td><b>RickD004</b>, <b>Lewis</b></td></tr>
<tr>
<td><b><a href="/Mexico" title="Mexico">Mexico</a></b> 🇲🇽</td>
<td>Mexico with every state flag</td>
<td><b>crunchybbb2</b></td></tr>
<tr>
<td><b><a href="/Canada" title="Canada">Canada</a></b> 🇨🇦</td>
<td>13 provinces and territories at their capitals, plus 24 First Nations, Inuit and Métis nations</td>
<td><b>cazlabIO</b></td></tr>
<tr>
<td><b><a href="/Turkiye" title="Türkiye">Türkiye</a></b> 🇹🇷</td>
<td>Real elevation, the major rivers and lakes, and the Bosphorus and Dardanelles open to ships</td>
<td><b>halil1054</b>, <b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Ottoman_Empire" title="Ottoman Empire">Ottoman Empire (1683)</a></b></td>
<td>The empire at its greatest extent in Europe, with 46 eyalets, sanjaks and vassal states, and no Suez Canal</td>
<td><b>halil1054</b>, <b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Zealandia" title="Zealandia">Zealandia</a></b></td>
<td>The submerged continent around New Zealand, risen from the sea</td>
<td><b>thebananamoon</b>, <b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Brahmaputra" title="Brahmaputra">Brahmaputra</a></b></td>
<td>A two-team map of the Assam valley, north bank against south bank, crossable by boat almost anywhere</td>
<td><b>Avner</b>, <b>RickD004</b></td></tr>
<tr>
<td><b><a href="/World_10000" title="World 10000">World 10000</a></b> 🌍</td>
<td>A 10,000-pixel-wide world with 377 nations, for custom games and tournaments; too heavy for phones</td>
<td><b>PatrickPlaysBadly</b>, <b>VariableVince</b>, <b>RickD004</b></td></tr>
<tr>
<td><b><a href="/World_4000" title="World 4000">World 4000</a></b> 🌍</td>
<td>Rebuilt with new terrain, rivers and softer decoration layers; replaces <a href="/Giant_World_Map" title="Giant World Map">Giant World</a>, which is retired</td>
<td><b>PatrickPlaysBadly</b>, <b>VariableVince</b>, <b>RickD004</b>, <b>Josh</b></td></tr></tbody></table>

### Map Improvements & Fixes {#Map_Improvements_Fixes}

- **[World](/World)** rebuilt with new terrain, rivers and softer decoration layers — **PatrickPlaysBadly**, **VariableVince**, **RickD004**, **Josh**
- The Atlas: a world-map tab in the map picker, plus designer, description and stats for every map — **FloPinguin**
- [Brain Rot](/Brain_Rot) gets new, calmer decoration art now that Halloween is over — **PatrickPlaysBadly**, **VariableVince**, **RickD004**
- New, greener terrain for [Africa](/Africa), with new nations and fixed flags — **RickD004**
- [Los Angeles](/Los_Angeles) gets a rebuilt road network and new nations; [Las Vegas Strip](/Las_Vegas_Strip) loses most northern blocks and gains crosswalks; Henichesk Strait in [Crimea](/Crimea); a bigger [Korea](/Korea); reworked [Channel Islands](/Channel_Islands); fixes for [China](/China) and [Qing China](/Qing_China) — **crunchybbb2**
- Map descriptions for many maps — **RickD004**, **gabigabogabu**, **crunchybbb2**, **PatrickPlaysBadly**
- Took the v35 maps out of the New category — **RickD004**

## ⌨️ Controls & Keybinds {#Controls_Keybinds}

- A permanent quick-build bar on mobile with tap-to-preview, tap-to-confirm placement — **AppieKalac**, **VariableVince**
- The mobile build bar matches the control panel's height and drops its unit counts — **Evan**
- Donate troops (**J**) and gold (**O**) to the ally under your cursor — **FloPinguin**
- Toggle the player info panel for the player under your cursor with **I** — **FloPinguin**
- Hold **H** to build a new structure instead of [upgrading](/Upgrading) a nearby one — **MRGhust**
- Build keys step the amount 1 → 5 → 10 → 15, and Alt+scroll changes it by 1 — **Pedro**
- Keybinds follow your keyboard layout, so AZERTY players get ZQSD by default — **ayushthepiro11-design**
- Modifier keys (Shift, Ctrl, Alt) can be bound in Settings, and pan and zoom keys can use Shift combinations — **LoSt543215543**
- The Keybinds tab shows on touch devices with a keyboard attached — **LoSt543215543**
- The performance overlay key (Shift+D) can be rebound, and its toggle updates live — **VariableVince**
- Keybinds sorted into the right groups (chat and emoji with Menu Shortcuts, warship selection with Attack, build modifiers with Build), with clearer upgrade descriptions — **VariableVince**
- The help modal hides keyboard shortcuts on touch-only devices and labels the troubleshooting button on mobile — **VariableVince**

## 🎛️ Graphics, UI & Quality of Life {#Graphics_UI_Quality_of_Life}

- Fix nuked land and [fallout](/Fallout) rendering solid black on some mobile GPUs, like Samsung phones — **LoSt543215543**
- The [nuke](/Nuke) circle is yellow when it only breaks an alliance and flashes red when it marks you a [traitor](/Traitor) — **Evan**
- The [rail](/Railroad) preview shows every connection a new station will make — **cazlabIO**
- Graphics tuning is back: a compact left-side panel in game and Advanced settings under Settings > Graphics — **MRGhust**
- Nuke previews clear when you lose your last [missile silo](/Missile_Silo) — **VariableVince**
- The teammate spawn glow is about 30% bigger — **Evan**
- The game timer stays in the corner when the Overtime or [Doomsday Clock](/Doomsday_Clock) panel shows — **FloPinguin**
- Hovering a verified badge or a targeted player's enlarged name makes the nameplate transparent like the rest of it — **Himansu**, **ayushthepiro11-design**
- Buttons on game history cards can be clicked under the sticky date labels — **LoSt543215543**
- A smaller Start game button on short screens and portal frames, so the map picker has room — **Evan**
- A GPU that can't compile a cosmetic effect shader now gets a game without that effect, instead of a connection error — **Evan**
- Fix a crash on browsers whose keyboard API can't report layout changes — **Evan**
- The win screen's share ring stays centred when the button lifts — **LoSt543215543**
- New key art for search results and link previews — **Evan**

## 🔊 Audio {#Audio}

- Two new gameplay music tracks; each game starts on a random one and rotates through all three — **Evan**
- Music streams on any browser that locks media volume, not only iOS — **ayushthepiro11-design**

## ⚡ Performance {#Performance}

- Faster nukes, [MIRVs](/MIRV) and [SAMs](/SAM_Launcher) (MIRV targeting up to 15× faster, ~13% less peak memory), lighter unit updates, and no more spawn-phase freezes — **JB940**
- Fewer per-tick allocations in the simulation and client, and no more leaked listeners, menus and timers across repeated games — **Himansu**

## 🖥️ Server, Infra & Tooling {#Server_Infra_Tooling}

- Fix players being rejected or kicked on quick reconnects and dual-stack connections — **JB940**
- TypeScript 7, and Oxlint in place of ESLint, with stricter promise checks, a `test:changed` script and a test suite that passes on Windows — **VariableVince**, **wraith4081**

## 🌐 Translations {#Translations}

- Translation updates (mls v5.22) — **Aotumuri**
- Translator credits for v36 were not published with the release notes. See [Languages](/Languages) for how to help translate.

## 🩹 Also new since v35.0 (shipped in v35 hotfixes) {#Also_new_since_v35.0}

These went out in v0.35.1–v0.35.14 and are not in the v36 release notes. If you haven't played since the v35 launch, here's what you missed:

- **Onboarding tutorial:** a guided tutorial for new players covering expansion, nukes, a second nation and winning by conquest, fully translated — **Evan**
- **[Clan map](/Clan#Clan_map):** now live, with a loading spinner while it draws — **Evan**
- **Top donors leaderboard** in the clan Donations tab — **Lewis**
- **Store sales:** running sales and flash sales now show in the store — **Evan**
- **AI labels on cosmetics:** "No AI used" and "AI use unknown" tags in the store — **Lewis**
- **Subscriptions and gifts:** a paid subscription and a gift now show side by side, and the store says what a gift did — **Josh**
- **VIVERSE:** OpenFront is now playable on VIVERSE, and typed display names stick between sessions — **Evan**
- **Friends stay together** in public Duos, Trios and Quads — **Lewis**
- **Map Layers setting** to hide map decoration layers on every map; holding space hides land layers in the alternate view — **FloPinguin**
- **Snap Build Preview** setting (off by default) — **Evan**
- **New quick chat phrases** — **FloPinguin**
- **Halloween maps**, Antarctic tribe themes and team spawns for new maps — **PatrickPlaysBadly**, **RickD004**
- **Compact screens:** homepage, footer, leaderboard and lobby cards fitted to small screens — **Evan**
- **Account username suffix** shown as #1234 on the profile card — **Rikardo66The100**
- **Provisional XP** shows straight away for players still in the game when it ends — **Lewis**
- **Steam:** buy through Steam's web approval when the desktop overlay isn't available — **Josh**
- **Fixes:** a troop duplication exploit (**Ryan**), a water-nuke crash and Game Info leaking server data (**JB940**), stale store balance after clan donations (**Ashique**), kicked accounts now kicked from every session (**Evan**), clearer error when the game client can't load (**Evan**), and the 20-character username limit enforced on join (**LoSt543215543**)

## 🙏 Contributors {#Contributors}

v36 took 25 people. Code, maps, perf, translations, the lot. Thank you:

**Aotumuri** · **AppieKalac** · **Avner** · **ayushthepiro11-design** · **cazlabIO** · **crunchybbb2** · **Evan** · **FloPinguin** · **gabigabogabu** · **halil1054** · **Himansu** · **JB940** · **Josh** · **Lewis** · **LoSt543215543** · **MRGhust** · **Niels-600** · **PatrickPlaysBadly** · **Pedro** · **RickD004** · **Rikardo66The100** · **thebananamoon** · **Théophile** · **VariableVince** · **wraith4081**

## See also {#See_also}

- [Ranked](/Ranked)
- [Maps](/Maps)
- [Update 35.0](/Update_35.0)
- [Update History](/Update_History)
