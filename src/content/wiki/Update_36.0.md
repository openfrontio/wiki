---
title: "Update 36.0"
section: "Updates"
cats: ["Updates"]
---
**[OpenFront](/OpenFront.io) v36** — The ratings update: [FFA Rating](/Ranked) and Season 1 built with OFstats, friends and notifications, save/load/share for [singleplayer](/Single_Player) games, a new replay viewer with "Continue game from here", lobby presets, donate hotkeys, smarter nuke warnings, a mobile quick-build bar, the [London](/London) and [Mexico](/Mexico) maps, monthly [Steam](/Steam) exclusive skins and big performance gains.

Released **November 9th 2026** (v0.36.0).

# 📦 OpenFront v36 Changelog {#OpenFront_v36_Changelog}

## ⭐ Overview {#Overview}

- **FFA Rating and Season 1** — Ranked FFA has been rebuilt from the ground up. There's no separate queue any more: every public FFA game you play while signed in now counts towards your **FFA Rating**, built with our partners at [OFstats](/Unofficial_Projects). After 10 calibration games you're placed in a tier and division, with a rating and how certain it is (for example "1613 ± 85"). Your rating goes up or down based on both the result and where you placed, measured against how likely you were to win. After each rated game the win screen shows your rating before and after, the change, your expected win chance, the split between result and placement, and a "Promoted to…" message when you move up a tier. Your game history shows the change for every rated game, and your profile shows your current tier, rating and peak. The leaderboard's FFA tab becomes the FFA Rating ladder, with tier badges and a pinned "Calibrating N/10" row while you're still placing. **Season 1 starts today.** The new season banner shows the start and end dates, how many days are left and how far through the season we are.
- **Friends and notifications** — You can now send and accept friend requests. The bell in the menu opens a notifications panel instead of going straight to the release notes, and your friend requests show up there. In public Duos, Trios and Quads, friends are kept on the same [team](/Teams).
- **Save, load and share singleplayer games** — If you're signed in, [singleplayer](/Single_Player) games have a "Save game" option in the in-game menu. Your saves are listed in the Solo screen, where you can play, rename, share or delete them. Paste a share link or code to open someone else's save.
- **New replay viewer, with "Continue game from here"** — The new replay viewer is now the default. You can stop a replay at any moment and carry on playing from that point.
- **Lobby presets** — Save your host-lobby and singleplayer settings as named presets and load them again from a new button in the header. Custom games also get a **Win threshold (%)** setting next to Game length and Overtime. It's off by default, which keeps the usual 80% (see [Game Settings](/Game_Settings)).
- **Donate with a keypress** — Press **J** to send troops (your attack ratio's share) to the ally or teammate under your cursor. Press **O** to open the send-gold window for them. You no longer need the radial menu to donate (see [Controls](/Controls)).
- **Smarter nuke warnings** — The [nuke](/Nuke) range circle turns yellow when a strike would only break an alliance, and flashes red when it would mark you as a [traitor](/Traitor).
- **Mobile quick-build** — Mobile now has a permanent quick-build bar for structures, warships and missiles, with tap-to-preview placement, so you don't have to go through the radial menu. The unit bar is also smaller.
- **Atlas map picker, London, Mexico and map updates** — The map picker has a new Atlas tab, and every map now lists its designer, a description and stats. This update adds **[London](/London)** (Greater London) and **[Mexico](/Mexico)** maps, new greener terrain for **[Africa](/Africa)**, and rework or fixes for [Los Angeles](/Los_Angeles), [Las Vegas](/Las_Vegas_Strip), [Crimea](/Crimea), [Channel Islands](/Channel_Islands), [Korea](/Korea), [China](/China), [Qing China](/Qing_China) and [Yellow Sea](/Yellow_Sea).
- **Monthly Steam exclusive skins** — Each month a new [Steam](/Steam) exclusive skin drops. Steam players get a popup at launch to claim it, equip it straight away, or preview it first. Steam exclusive cosmetics now carry a corner banner in the store and inventory.
- **Big performance gains** — Nukes, SAMs, MIRVs and range checks were reworked: a test run of the whole simulation was about 15% faster, with a third less worst-case tick lag. Click-to-build placement is around 130× faster.

## 🏆 Ranked: FFA Rating & Seasons {#Ranked_FFA_Rating_Seasons}

- New FFA Rating, built with OFstats: every public FFA game played while signed in is rated, and the separate Ranked FFA queue is gone; guests aren't rated — **Lewis**
- 10 calibration games, then a tier and division, with rating ± uncertainty and your peak rating — **Lewis**
- Rating changes are based on both result and placement, weighted by your expected chance to win — **Lewis**
- Win screen after a rated FFA game: rating before and after, the change, expected win chance, the result and placement split, and "Promoted to…" on a tier-up — **Lewis**
- Game history shows the rating change and expected win chance for each rated FFA game; hover to see the result and placement split — **Lewis**
- Profile and account page show your tier, rating, uncertainty and peak, or "Calibrating N/10" — **Lewis**
- Leaderboard FFA tab is now the FFA Rating ladder, with tier badges, an OFstats credit and a pinned "Calibrating N/10" row for players still placing — **Lewis**
- Season 1 begins: a season banner on the FFA Rating tab with start and end dates, days left and progress through the season, and a "Last day" warning when it ends — **Lewis**

## ☢️ Gameplay & Balance {#Gameplay_Balance}

- Fix a game crash for every player trading with someone who has a very high-level [port](/Port) — **Josh**
- Fix [nations](/Nations) sending almost their whole army away when two attacks start in the same tick — **FloPinguin**
- Nations now save gold for [hydrogen bombs](/Hydrogen_Bomb) when atom bombs are disabled, and only respond to real [warship](/Warship) build-ups instead of overbuilding warships — **FloPinguin**
- Island nations now boat over to nearby [bots](/Bots) before attacking players — **FloPinguin**
- Fix boats failing at, or taking long detours around, river bends that double back ([Didier](/Didier), [Conakry](/Conakry), [Russia](/Russia), [China](/China), [Europe](/Europe)) — **FloPinguin**
- Fix territory being [annexed](/Annexation) twice when encircled land is split between several enemies — **JB940**
- Fix [trains](/Train) moving 3 tiles on their first tick instead of 2 — **JB940**
- Hold **H** to build a separate structure instead of [upgrading](/Upgrading) the one nearby — **NOBODY**
- Ghost structure multiplier now steps 1 → 5 → 10 → 15…, with Alt+scroll for ±1 adjustments — **Pedro**
- Better [rail](/Railroad) placement preview — **cazlabIO**
- Clear nuke previews when you lose your last [missile silo](/Missile_Silo) — **VariableVince**
- Fix a crash in player icons when a nuke's target changes owner — **Evan**

## 🧑‍🤝‍🧑 Lobby & Social {#Lobby_Social}

- Friend requests, with a new notifications panel on the bell — **cazlabIO**
- Save and reuse lobby settings presets — **Gemini**, **Evan**
- Win threshold setting for custom games — **Rikardo66**
- Spectators no longer count as players in lobby counts — **Gemini**
- Fix the max-player cap for team modes in lobbies — **Gemini**
- [Clan](/Clan) tags now show as team names on the team leaderboard — **Gemini**
- Fix the FFA hero slot height and section placement on the homepage — **Gemini**
- Hide the nation difficulty tag when nations are disabled — **FloPinguin**
- Fix the username reservation banner covering the upcoming lobby heading — **Gemini**
- Fix desyncs and disconnects at the join check for players on dual-stack connections or with lag — **JB940**

## 🎞️ Replays & Sharing {#Replays_Sharing}

- The new replay viewer is now the default — **Gemini**
- "Continue game from here" in the replay viewer — **Gemini**
- Save, load and share [singleplayer](/Single_Player) games; open a shared save from its link or code — **Evan**
- Share button on the end-of-game screen and in the in-game top-right control bar — **Gemini**
- Hide the player overlay's shortcut buttons in the replay viewer — **Evan**

## 🛡️ Trust, Safety & Moderation {#Trust_Safety_Moderation}

- Players are thanked when someone they reported gets banned — **Lewis**
- Redesigned ban notice, with appeals linked to [Discord](/Discord) — **Lewis**

## 🗺️ Maps {#Maps}

### New Maps {#New_Maps}

<table class="wikitable">
<tbody><tr>
<th>Map</th>
<th>Description</th>
<th>Author</th></tr>
<tr>
<td><b><a href="/London" title="London">London</a></b> 🇬🇧</td>
<td>Greater London, borough by borough</td>
<td><b>RickD004</b></td></tr>
<tr>
<td><b><a href="/Mexico" title="Mexico">Mexico</a></b> 🇲🇽</td>
<td>Country map of Mexico and its states</td>
<td><b>crunchybbb</b></td></tr></tbody></table>

### Map Improvements & Fixes {#Map_Improvements_Fixes}

- Map fixes for v36: [Los Angeles](/Los_Angeles) road network rework with new nations, [Las Vegas](/Las_Vegas_Strip), [Crimea](/Crimea) (Henichesk Strait), [Channel Islands](/Channel_Islands), larger [Korea](/Korea), [China](/China), [Qing China](/Qing_China) and [Yellow Sea](/Yellow_Sea) (Yellow River) — **crunchybbb**
- New terrain for [Africa](/Africa), with green areas in the Congo basin and West Africa — **RickD004**
- New Atlas tab in the map picker, plus map designers, descriptions and stats for every map — **FloPinguin**
- New map descriptions for several maps — **RickD004**, **gabigabogabu**
- v35 maps no longer marked New — **RickD004**
- Dutch province flags — **Niels_600**

## 🎛️ Graphics, UI & Quality of Life {#Graphics_UI_Quality_of_Life}

- [Nuke](/Nuke) range circle shows alliance-break (yellow) and traitor (flashing red) warnings — **Evan**
- Mobile quick-build bar and tap-to-preview placement — **AppieKalac**
- Smaller mobile unit bar without unit counts — **Evan**
- Bigger teammate spawn glow — **Evan**
- Option to hide all cosmetics — **Aotumuri**
- Default profile setting for Detailed View filters — **Rikardo66**
- Restore the left-aligned graphics tuning panel — **NOBODY**
- Keep the game timer in the corner when the Overtime or [Doomsday Clock](/Doomsday_Clock) panel is shown — **FloPinguin**
- Scroll-to-top button in the shop and inventory — **Gemini**
- Smaller Start game button on short screens — **Evan**
- Improved help screen on mobile — **VariableVince**
- Fix the in-game settings order — **VariableVince**
- Fix the performance overlay's hardcoded key and its toggle not always updating — **VariableVince**
- Fix buttons under the sticky date labels in game history not being clickable — **Gemini**
- Fix unscored provisional [XP](/Levels_and_XP) hanging around; it now expires after 3.5 hours — **Gemini**
- Fix nameplate hover and targeting areas (including the verified badge) — **ayushthepiro11-design**, **Himansu**
- Fix the share button's flash ring shifting on hover — **Gemini**
- A failed effects shader no longer crashes the game — **Evan**
- New key art in search results and a black favicon background — **Evan**

## ⌨️ Keybinds {#Keybinds}

- Donate Troops (**J**) and Donate Gold (**O**) to the player under your cursor — **FloPinguin**
- Fix AZERTY and other regional keyboard layouts showing the wrong keys — **ayushthepiro11-design**
- Modifier keys can now be remapped in settings — **Gemini**
- Show the Keybinds settings tab on touch devices that have a keyboard — **Gemini**
- Fix Shift-modified hold-to-pan and hold-to-zoom — **Gemini**
- Move wrongly grouped keybinds, unify modifier rules, and clarify the upgrade and pause hotkeys — **VariableVince**
- Fix a keyboard layout crash — **Evan**

## 🎨 Cosmetics & Steam {#Cosmetics_Steam}

- Monthly [Steam](/Steam) exclusive skin drop: a popup at launch to claim, claim and equip, or preview this month's skin — **Lewis**
- "Steam exclusive" corner banner on cosmetic cards in the store and inventory — **Lewis**

## ⚡ Performance {#Performance}

- Large speed-ups for nukes, [SAMs](/SAM_Launcher), [MIRV](/MIRV) targeting and range checks: about 15% faster simulation, a third less worst-case tick lag, and around 130× faster click-to-build placement — **JB940**
- Fewer per-tick and per-frame allocations in the simulation, stats sampler, attack labels and skin uploads; faster nearest-tile search — **Himansu**
- Fix memory leaks and errors from screens and listeners not being cleaned up (radial menu, matchmaking, news box, renderer, flag textures) — **Himansu**

## 🔊 Audio {#Audio}

- Two new gameplay music tracks that rotate in game — **Evan**
- Fix music streaming on devices where volume is locked — **ayushthepiro11-design**

## 🌐 Translations {#Translations}

- Translation updates (mls v5.22) — **Aotumuri**

## 🩹 Also new since v35.0 (shipped in v35 hotfixes) {#Also_new_since_v35.0}

These went out in v0.35.1–v0.35.14. If you haven't played since launch, here's what you missed:

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
- **Halloween maps**, Antarctic tribe themes and team spawns for new maps — **Patrick Plays Badly**, **RickD004**
- **Compact screens:** homepage, footer, leaderboard and lobby cards fitted to small screens — **Evan**
- **Account username suffix** shown as #1234 on the profile card — **Rikardo66**
- **Provisional XP** shows straight away for players still in the game when it ends — **Lewis**
- **Steam:** buy through Steam's web approval when the desktop overlay isn't available — **Josh**
- **Fixes:** a troop duplication exploit (**Ryan**), a water-nuke crash and Game Info leaking server data (**JB940**), stale store balance after clan donations (**Ashique**), kicked accounts now kicked from every session (**Evan**), clearer error when the game client can't load (**Evan**), and the 20-character username limit enforced on join (**Gemini**)

## 🙏 Contributors {#Contributors}

v36 took a lot of people. Code, maps, perf, the lot. Thank you:

**AppieKalac** · **Aotumuri** · **Ashique** · **ayushthepiro11-design** · **cazlabIO** · **crunchybbb** · **Evan** · **FloPinguin** · **gabigabogabu** · **Gemini** · **Himansu** · **JB940** · **Josh** · **Lewis** · **Niels_600** · **NOBODY** · **Patrick Plays Badly** · **Pedro** · **RickD004** · **Rikardo66** · **Ryan** · **VariableVince**

## See also {#See_also}

- [Ranked](/Ranked)
- [Update 35.0](/Update_35.0)
- [Update History](/Update_History)
