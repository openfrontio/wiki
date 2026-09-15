---
title: "Update 34.0"
section: "Updates"
cats: ["Updates"]
---
**[OpenFront](/OpenFront.io) v34** — The Steam update: OpenFront launches on [Steam](/Steam) on September 17th 2026, alongside public profiles, smarter Hard/Impossible [nations](/Nations), trusted-only lobbies and player reporting, a cosmetics inventory, a full lobby browser, Support a Creator, four new maps and a rebuilt attack-loss model.

Released **September 14th 2026** (v0.34.0), followed by v0.34.1 the same day.

# 📦 OpenFront v34 Changelog {#OpenFront_v34_Changelog}

## ⭐ Overview {#Overview}

- **Public profiles** — All profiles are public, so anyone can review a player's games — the same approach Lichess and Chess.com use to prevent cheating and teaming. If you'd rather not have that, you can delete your [account](/Accounts) to hide all your games.
- **Meta** — [Gold](/Gold) generation is a bit higher in the early game, but slows down mid-late game. Attack [combat](/Combat) got some tweaks — for most players, most of the time, it shouldn't be very noticeable. The giant-empire speed bonus is smoothed and capped at roughly 3.3× a small player's rate instead of running away at 9×, so players can no longer be captured extremely fast.
- **Steam** — OpenFront is coming to [Steam](/Steam) September 17th! The Steam client adds exclusive cosmetics, a free month of premium, offline play, achievements, an overhauled audio pass and instant trusted account status (see [Why Steam?](#Why_Steam) below).
- **Smarter nations** — Hard and Impossible [nations](/Nations) got a brain upgrade: they now hunt the most valuable bordering rival they can safely beat, and betray an ally only when it's actually worth it and the retaliation they'd face stays small.
- **Trusted lobbies & player reporting** — Every 4th scheduled public game is now trusted-only, gated on account trust tier. And there's a Report button in the player panel (botting, teaming, bad names, griefing), feeding straight into the moderation tools.
- **Cosmetics inventory** — A proper inventory locker for everything you own, a redesigned store built around shared cosmetic cards, live in-game previews for skins and effects, and cosmetic bundles.
- **Detailed View** — A full lobby browser on the homepage: every advertised lobby, tabbed by mode, with deep links.
- **Support a Creator** — Add your favorite [content creator's](/Content_creators) code to your profile and they get a share of every purchase you make. Creators get their own profile panel and `openfront.io/c/CODE` share links.
- **New maps** — [Yangtze River](/Yangtze_River), [Cape Cod](/Cape_Cod), [Channel Islands](/Channel_Islands) and [Gulf of Mexico](/Gulf_of_Mexico) are new, and [China](/China) got modern borders; the classic map lives on as [Qing China](/Qing_China).

## 🎮 Why Steam? {#Why_Steam}

OpenFront is still free in the browser, and always will be. The [Steam](/Steam) client is the same game with a set of things a browser tab can't do:

- Free Steam-exclusive cosmetics, just for playing on Steam
- A month of premium subscription: a verified username, an instant hard-currency bonus, a daily hard-currency reward, public custom lobby hosting (second tier and above) and unlimited ranked games (third tier). Rewards scale with your tier.
- Offline and local play
- Steam achievements
- Maps and assets are already on disk, so games start without waiting on a download
- A full sound and music rework
- Instant trusted account status: Steam accounts skip the trust ladder, so you can join trusted-only lobbies straight away and play games that anonymous griefers can't drop into

Linking doesn't create a second account: your stats, cosmetics and active subscription carry over from your existing OpenFront account to Steam, or the other way round if you start on Steam and later play in the browser.

On the roadmap: LAN servers, an in-game map editor, and Steam Workshop map support.

## ☢️ Gameplay & Balance {#Gameplay_Balance}

- Rebuilt attack loss around two ratios (troop ratio × defender density), so overwhelming stacks stop paying the full turtle tax and dense land stays expensive to take — **Evan**
- Smoothed the large-territory bonus with a log-space sigmoid, capped it, and anchored the density weight at a 3/4 stack; nothing under 100k tiles moves — **Evan**
- Pinned attack balance with golden tests and extreme-case scenario coverage, and made `Config.attackLogic` pure — **Evan**
- Simplified the attackLogic algebra without changing balance, and folded `attackTilesPerTick` into it — **Evan**
- Pinned the trade-ship and train economy with golden tests — **Evan**
- Replaced `Math.exp`/`log`/`pow`/`atan2` in the core with deterministic DetMath, with a lint guard to stop them creeping back — **Evan**
- New nation attack strategy, `juicy()`: Hard and Impossible nations now hunt the most valuable bordering rival they can safely beat — **FloPinguin**
- Fixed Hard/Impossible nations ignoring the troop cap when attacking TerraNullius or fallout — **FloPinguin**
- Smarter betrayals: Hard/Impossible nations now rank bordering allies by juiciness and betray only when the retaliation they'd face stays safely small — **FloPinguin**
- [SAMs](/SAM_Launcher) get dynamic range scaling on upgrade, with WebGL radius previews — **JB940**
- Normalized [MIRV](/MIRV) warhead speed and removed MIRV map-edge benefits — **JB940**
- Blocked nuke launches in the half-second after accepting an alliance — **JB940**
- Cancel in-flight MIRVs and warheads on alliance acceptance — **Berk**
- Fixed SAMs being unable to target warheads spawned too close — **JB940**
- Fixed the nuke-interception indicator when the target is inside SAM range — **JB940**
- Only [annex](/Annexation) territory that is actually enclosed: no more losing your whole empire in one tick to a neighbour without an attack landing — **Jish**
- [Team](/Teams) games now use the same 80% win threshold as FFA (was 95%) — **Ryan**
- Normalized attack troops to the amount actually deducted — **김준혁**
- Rejected spawn intents based on when they were issued, not when they land, closing the remaining spawn-teleport hole — **Jish**
- Fixed duo/trio/quad team forming so humans get placed together instead of scattered across bot teams — **Sam J Gunner**
- Fixed one-player teams on small public maps — **Aotumuri**
- Impassable [terrain](/Terrain) now acts like the map edge — **TKTK123456**
- [Rails](/Railroad) can no longer cross impassable terrain — **TKTK123456**
- Fixed water-nuke pathfinding — **FloPinguin**
- [Trade ship](/Trade_Ship) spawn rate is recalculated on each port level roll — **Berk**
- Fixed [trains](/Train) despawning when a track splits — **JB940**
- The game winner now deactivates the [Doomsday Clock](/Doomsday_Clock) — **JB940**
- Fixed edge cases in awarding wins and losses — **JB940**
- Fixed various disconnect / desync issues — **JB940**
- Fixed the factory rail preview path direction — **Nicolas Giuliani**
- Preserved null gold in DonateGoldExecution, and cleaned up dead-defender handling with a converge-until-stable loop — **Berk**
- Relaxed the minimum spawn distance after 750 retries on crowded maps — **FloPinguin**
- Re-tally winner votes when the electorate shrinks — **Evan**
- Added per-mode map rotation weights and per-map modifier overrides — **FloPinguin**
- Restored lost per-map team frequencies and fixed the special-lobby frequency fallback — **FloPinguin**
- Reduced [Labyrinth](/Labyrinth)'s public rotation frequency (6 → 2), and removed [Luna](/Luna) and [Chopping Block](/Chopping_Block) from public rotations — **Evan**

## 🚂 Steam & Desktop {#Steam_Desktop}

- Sign in with Steam on the web, and link Steam from the website — **Jish**
- Steam account linking: browser side, `/link` serving, and pending-link expiry — **Jish**
- Steam rich presence and invite handling for the Electron build — **Jish**
- Added an Invite Friends button to the desktop lobby, and gave the web lobby host one too — **Jish**
- Navigate on a mid-match Steam invite instead of leaving the lobby in place — **Jish**
- The Steam rail on the subscription panel and the store — **Jish**
- Custom plutonium amounts on Steam, seeded with the shortfall — **Jish**
- Client checkout on the rail-agnostic endpoint, and an honest subscription panel — **Jish**
- Stopped the subscription panel destroying a granted month — **Jish**
- Let Steam-only accounts through every identity gate, and keep Steam personas instead of discarding them — **Jish**
- Tell Steam players why they cannot sign in, instead of a Turnstile error — **Jish**
- Route desktop Discord/Google login through the browser link flow — **Jish**
- Publish the client capability level in the release descriptor, and make unrecognised update errors gate multiplayer — **Jish**
- Gate every join path (including Detailed View) while a Steam update is pending — **Jish**
- Steam rich presence status frames and map translation keys — **Jish**
- Show the Steam shell version beside the game version, and move the full version string to the footer — **Jish**
- Show the build's commit when it has no tagged version — **Jish**
- An Exit game control for the desktop build, placed in the nav — **Jish**
- Require a real account, not just a session, to link Steam — **Jish**
- Hide the Steam invite button in public FFA lobbies — **Evan**
- Keep the status bar action button clear of the Steam overlay — **Evan**
- Steam's locale is the default language, and the desktop gate's strings are translated — **Jish**

## 🛡️ Trust, Safety & Moderation {#Trust_Safety_Moderation}

- Added trusted-only lobbies gated on account trust tier, with lock indicators on lobby cards — **Evan**
- Every 4th scheduled public game is trusted-only, spaced so open lobbies are always available — **Evan**
- Tell signed-out players to sign in when blocked from a trusted lobby — **Evan**
- Name the required trust tiers in the public lobby listing messages — **Evan**
- Added a Report Player button to the player panel, feeding the moderation tools — **Evan**
- Show the ban reason to the banned player — **iamlewis**
- Updated the Terms of Service: purchases, subscriptions, consumer rights, refunds, chargebacks and fraudulent refund claims — **iamlewis**
- v0.34.1: Reduced the number of trusted lobbies, and improved the trusted lobby message on CrazyGames

## 🧑‍🤝‍🧑 Lobby & Social {#Lobby_Social}

- Added the Detailed View lobby browser: every advertised lobby, tabbed by mode, deep-linkable — **Ryan**
- Put the upcoming lobbies in a column under a heading on the homepage — **Ryan**
- Lobby card polish: map zoom on hover, no rim, aligned pills, and no map leaking past rounded corners — **Ryan**
- Made public lobby listing one-way for the host — **Evan**
- Standardized WebSocket close codes and stopped reconnect loops — **Neon**
- Show a friend marker in the lobby player list — **Neon**
- Close loudly on worker mismatch instead of hanging the client — **Evan**
- Reap games that have no connected clients — **Jish**
- Restored the menu after leaving a started game in place — **Jish**
- Show a spectator-specific message during the spawn phase — **FloPinguin**
- Optional territory sorting in the quick-chat player list — **Komyak**
- Focus the other player when a chat message is clicked — **Oscar Robert-Besle**
- Respect Anonymous Names in event messages that name another player — **Berk**
- [Clan](/Clan) tags as team names: majority clan, hybrid two-clan names, or normal teams — **JB940**
- Fixed Turnstile error 300030 on join: one challenge per widget — **Jish**

## 🏰 Clans {#Clans}

- Donate player currency to the [clan](/Clan) treasury — **Evan**
- Show clan currency balances inline — **Evan**
- Added Map and Donations tabs to the clan modal, with fullscreen clan map and signed-out UX — **Evan**
- A clan tag picker so you stop guessing your own tag, plus a clearer verified name — **Ryan**
- Fixed clan member search pagination — **Ryan**
- The clan Map tab shows Coming Soon in prod — **Evan**

## 👤 Accounts & Profiles {#Accounts_Profiles}

- Support a Creator: a profile panel and `openfront.io/c/CODE` share links that survive every sign-in flow — **iamlewis**
- Self-service [account](/Accounts) deletion in account settings, queued for 24 hours so you can change your mind — **Evan**
- Profile dropdown menu in the nav, a bell news button, and a mobile account icon — **Ryan**
- Verified name defaults on for eligible subscribers — **Jish**
- Warn players when their reserved name is running out — **Jish**
- Explain the suffixed name when a bare claim is unavailable — **Jish**
- Extracted name resolution into a pure `resolvePlayerName()` — **Jish**
- Shrunk the verified badge and moved it to the name's top-right corner — **Evan**
- Click the player name to copy it, and paste a full profile URL anywhere an ID is expected — **Ryan**
- Restored game ID copying and added a game link button to history cards — **Aotumuri**
- Toast notifications for copy feedback, including on game cards — **Aotumuri**
- Capture transport stats — **Ryan**
- Nudge long-time players to make a purchase; any purchase makes you ad-free for life — **Evan**

## 🎨 Cosmetics & Store {#Cosmetics_Store}

- Added a cosmetic inventory locker for everything you own, and redesigned the store around shared cosmetic cards — **Ryan**
- Live skin & effects preview: a stripped-down in-game scene right in the store — **JB940**
- Cosmetic packs are now sold as store bundles, and bundle pattern items can name the colour palette they grant — **Evan**
- Effect previews drawn as in-game scenes — **Evan**
- [Train](/Train) and [railroad](/Railroad) cosmetic effects (gradient/transition recolor) — **Evan**
- New "embers" nuke-explosion effect style — **iamlewis**
- Cosmetic selections are keyed by player id, so they're restored on login — **Evan**
- Numbered loadout slots and an Unequip All button — **Ryan**
- Deep-link the store cosmetics tab from inventory actions — **Ryan**, **ItsTimeTooSleep**
- An Effect Editor in the Render Debug GUI for live cosmetic-effect tuning — **Evan**
- Stopped rendering the logged-out store state while auth is pending — **Jish**
- Matched the custom amount card to the pack card layout — **Ryan**
- Clear the inventory search when switching category tabs — **Ryan**
- Fixed effects being out of view and unscrollable on mobile — **VariableVince**
- Removed the dead USD purchase path for cosmetics — **Evan**
- Inline Apple Pay / Google Pay checkout right on store tiles — **Evan**
- Removed direct dollar purchases of cosmetics and flares — **Evan**
- Let a subscriber with a granted month buy a subscription — **Jish**

## 🗺️ Maps {#Maps}

### New Maps {#New_Maps}

<table class="wikitable">
<tbody><tr>
<th>Map</th>
<th>Description</th>
<th>Author</th></tr>
<tr>
<td><b><a href="/Yangtze_River" title="Yangtze River">Yangtze River</a></b> 🏞️</td>
<td>Upside-down-U-shaped pipe river map</td>
<td><b>crunchybbb</b></td></tr>
<tr>
<td><b><a href="/Cape_Cod" title="Cape Cod">Cape Cod</a></b> 🦞</td>
<td>New map of the Massachusetts cape and islands</td>
<td><b>truffle383-byte</b></td></tr>
<tr>
<td><b><a href="/Channel_Islands" title="Channel Islands">Channel Islands</a></b> 🏝️</td>
<td>New map of the Southern California coast and Channel Islands</td>
<td><b>crunchybbb</b></td></tr>
<tr>
<td><b><a href="/Gulf_of_Mexico" title="Gulf of Mexico">Gulf of Mexico</a></b> 🌊</td>
<td>New map with 15 nations</td>
<td><b>LounNight</b></td></tr>
<tr>
<td><b><a href="/China" title="China">China</a></b> 🇨🇳</td>
<td>Updated to modern borders (with the Amur river mouth)</td>
<td><b>crunchybbb</b></td></tr>
<tr>
<td><b><a href="/Qing_China" title="Qing China">Qing China</a></b> 🏯</td>
<td>The classic v33 China map lives on under a new name</td>
<td><b>crunchybbb</b></td></tr></tbody></table>

### Map Improvements & Fixes {#Map_Improvements_Fixes}

- [Milky Way](/MilkyWay) map update — **RickD004**
- Small modifications to [Sol](/Sol) and [Archipelago](/ArchipelagoSea) — **RickD004**
- Connected the Rhine to the sea and added [Germany](/Germany) to the countries section — **RickD004**
- Fixed the US states of Minnesota and Georgia — **RickD004**
- Fixed river pixel errors in [Hecate Strait](/Hecate_Strait) and [Baltics](/Baltics) — **RickD004**
- Fixed typos in Baltics nation names — **Juhan Oskar Hennoste**
- Took v33 maps out of the New category — **RickD004**
- [Map generator](/Map_Making_Guide): per-layer alpha slider with manifest defaults — **FloPinguin**
- Map generator: use the majority neighbor type when removing small islands and lakes, and auto-format output with Prettier — **FloPinguin**
- Switched the map generator webp library to drop the C compiler requirement — **Juhan Oskar Hennoste**
- Added a map background color override — **Evan**

## ⚡ Performance {#Performance}

- Engine perf pass: −39% tick cost on a full 30k-tick World game, behaviour-preserving and hash-identical — **Josh Bradley**
- Batched water-nuke terrain deltas into row-span GPU uploads, and optimized the terrain finalize and water graph rebuild — **Evan**
- Reduced water-nuke terrain update spikes — **Aotumuri**
- Preload the map during the lobby so game start reuses it — **ItsTimeTooSleep**
- Nuke trajectory visuals perf — **JB940**
- Fixed nuke jitter and rubber-banding with lerped unit updates — **JB940**
- Fixed WebGL context loss detection in shader compilation — **Jish**

## 🎛️ Graphics, UI & Quality of Life {#Graphics_UI_Quality_of_Life}

- Added an in-game tutorial panel: 20 steps from spawn to MIRV, driven by real sim state — **Evan**
- Added the "Evan's Pick" built-in graphics preset — **Evan**
- Alt view now fills territory with translucent relation colors, and colors trade ships by self/ally involvement on either end — **Evan**
- Distinguished [tribes](/Tribes) from [nations](/Nations) by territory color: tribes share one near-neutral grey family, nations keep their muted palette — **Panindhra Tallapudi**
- Gave tribes the same flat team-game color in free-for-all — **Evan**
- Fixed nation flags colliding when two nations share a display name — **Panindhra Tallapudi**
- Show team name and territory share on spawn timer hover — **ItsTimeTooSleep**
- Show an [alliance](/Ally) expiry countdown in the player panel's alliances list — **FloPinguin**
- Leaderboard: live gold rate columns (Gold Income/min, Ship Trade Gold/min, Piracy Gold/min and Train Trade Gold/min) and a player type column — **FloPinguin**
- Replaced native browser dialogs with in-game UI — **Evan**
- Made the PlayerInfoPanel available in replays — **Mike Zaugg**
- Added F, R and box-select-warship to customizable [keybinds](/Controls), and let F/Escape cancel warship selection — **JB940**
- Fixed the "keybind already bound" display — **JB940**
- Fixed the loading bar on SAMs and silos at 0 ammo — **JB940**
- Player info name font scaling — **JB940**
- Added a border to the spawn timer — **JB940**
- Made the end-timer warnings more visible — **Rami Kronbi**
- Prevented iOS double-tap page zoom from softlocking the HUD — **Rami Kronbi**
- Blocked ctrl+wheel page zoom over HUD panels — **김준혁**
- Fixed the context menu blocking building — **Sam J Gunner**
- Play the build sound for Missile Silos like other buildings — **VariableVince**
- Converted trading icons from PNGs to SVGs — **VariableVince**
- Fixed the flag display in the player panel — **yanir**
- Fixed map hover in the create-lobby screen — **yanir**
- Made the in-game leaderboard and menu bar flush with the screen corners — **Evan**
- Fixed RTL rendering of Persian and Arabic text in the help and tutorial UI — **MRGhust**
- The overtime panel now shows first place (player or team) instead of your own share, so spectators and eliminated players get a full readout — **Evan**
- Solo games start offline: the starting overlay shows immediately without blocking on auth — **Evan**
- Matched structure night-glow brightness to cities — **Evan**
- Added a script-based flag for Traditional Chinese — **Jish**
- Treated account deletion as queued for 24 hours in the client — **Evan**
- Added missing multi-tab translation keys — **Berk**
- Fixed the loading screen copyright translation, deduplicated shared translations, and collapsed duplicate en.json strings — **Aotumuri**, **Ryan**
- Translation updates (mls v5.11–v5.16), Vietnamese as a new [language](/Languages), and Polish localization — **Aotumuri**, **Tomasz**

## 🔊 Audio {#Audio}

- Replaced all 16 wired sound effects with the new commissioned assets, and wired the new music: a looping menu theme on the home page and a looping gameplay track in game — **Evan**
- New cues for victory and defeat, spawn placement, the game-start drum, factory and transport builds, train-station capture, inbound-nuke warnings, and alliance responses — **Evan**
- An Audio settings tab with per-category volume sliders, mute on window blur, and test cues — **Jish**

## 🛠️ Server, Infra & Tooling {#Server_Infra_Tooling}

- Multi-server groundwork: an implementation plan in `docs/MultiServer.md`, `cluster.json` fleet topology, letter-prefixed game ids minted per server, and 8–10 char game id acceptance — **Evan**
- Keep mid-game tabs on their deployment across blue/green flips — **Evan**
- Client reads the server list from the API, falling back to the baked-in config — **Jish**
- Server-rendered pages are never "outdated" by the server list, stopping an update-reload loop — **Jish**
- A server-rendered page prefers its own server when it serves this build — **Jish**
- Client boots without per-server page values and opens each game at its server's version — **Jish**
- Game servers check in with the API, report which machine they run on, and can be drained from it — **Jish**
- Show backend reachability in the UI, fed by the server-list heartbeat — **Jish**
- Pipeline uploads an environment-only page and desktop descriptor per version, then flags it as latest — **Jish**
- Separate game hostnames via `GAME_DOMAIN`: nginx matches the upstream by game host, CORS allows each cluster member's page host, and `/link` no longer redirects to the internal blue/green host — **Jish**
- Deploy nightly builds to green and blue dev subdomains — **Jish**, **Evan**
- Broke GameServer apart behind tests: socket ingress, client roster, intent guards, lobby listing, match telemetry, desync detection, votes, name visibility and config patching each extracted, pinned by a golden wire transcript harness — **Evan**
- Released stale websocket references on the server — **Thomas Tschinkel**
- Deploy subdomain fixes for slash and underscore branch names, and stopped branch pushes evicting queued main deploys — **Evan**, **Jish**
- Route the game server's HTTP API through the configured host — **Jish**
- Nightly gets the same restart policy as main — **Jish**
- Reduced the staging timeout from 200 hours to 25 hours — **Evan**
- Check text files out as LF on every platform — **Jish**
- Added the Claude multi-agent code review to CI — **Evan**
- Fixed CI to install Claude Code from npm — **Evan**
- Adopted clean-room reimplementations for two sets of client code blocks — **Evan**
- Added client tests locking in transport, game-runner, HUD, boot, kick-player, replay-speed and events-display paths — **Evan**
- Global per-test DOM teardown so leaked Lit updates cannot outlive their jsdom — **Jish**
- The PR gate now accepts parenthesized issue references — **Evan**
- Updated the deprecated GitHub app-token action — **VariableVince**
- Dependency security bumps — **dependabot**

## 🌐 Translators {#Translators}

- **Arabic🇸🇦**: N0ur, Moha & SyntaxPM
- **Bengali🇧🇩**: sheikh
- **Brazilian Portuguese🇧🇷**: theskeleton4393, juliosilvaqwerty5 & Vincent
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
- **German🇩🇪**: Pilkey, jacks0n, floriankilian, Fibig, TNB & W4lle
- **German (Switzerland)🇨🇭**: originaloha
- **Greek🇬🇷**: pantelispantelidis
- **Hungarian🇭🇺**: ap.ms & Forsan
- **Hebrew🇮🇱**: Goblinon
- **Hindi🇮🇳**: sheikh
- **Italian🇮🇹**: frappa10 & Lollosean
- **Indonesian🇮🇩**: tronsar
- **Japanese🇯🇵**: Aotumuri, daimyo_panda2, gafunuko, kaywb & akisan
- **Korean🇰🇷**: Jinyoon
- **Macedonian🇲🇰**: Perdiccas
- **Polish🇵🇱**: zibi, RinkyDinky, Rulfam & Kris
- **Persian🇮🇷**: nobodyiran
- **Russian🇷🇺**: Rulfam, Redincon & Shomped
- **Serbo-Croatian🇷🇸🇭🇷🇧🇦🇲🇪**: Vekser & kw3rty
- **Slovak🇸🇰**: extraextra
- **Slovenian🇸🇮**: MotivatedMonkey
- **Spanish🇪🇸**: 6uzm4n
- **Swedish🇸🇪**: Moha, theangel2 & Keevee
- **Toki Pona**: Makonede
- **Turkish🇹🇷**: Toyatak & grassified
- **Ukrainian🇺🇦**: Rulfam
- **Vietnamese🇻🇳**: Hazun06VN

## 🙏 Contributors {#Contributors}

v34 took 30 people. Code, maps, perf, translations, the lot. Thank you:

**Aotumuri** · **Berk** · **crunchybbb** · **Evan** · **FloPinguin** · **iamlewis** · **ItsTimeTooSleep** · **JB940** · **Jish** · **Josh Bradley** · **Juhan Oskar Hennoste** · **Komyak** · **LounNight** · **Mike Zaugg** · **MRGhust** · **Neon** · **Nicolas Giuliani** · **Oscar Robert-Besle** · **Panindhra Tallapudi** · **Rami Kronbi** · **RickD004** · **Ryan** · **Sam J Gunner** · **Thomas Tschinkel** · **TKTK123456** · **Tomasz** · **truffle383-byte** · **VariableVince** · **yanir** · **김준혁**

## See also {#See_also}

- [Steam](/Steam)
- [Update 33.0](/Update_33.0)
- [Update History](/Update_History)
