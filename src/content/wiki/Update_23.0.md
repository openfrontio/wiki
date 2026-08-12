---
title: "Update 23.0"
section: "Updates"
cats: ["Updates"]
---
[OpenFront](/OpenFront.io) 23.0 was released late May, early june 2025.

See [minor updates](/Minor_Updates_of_23.x).

## New Features {#New_Features}

### Teams & Account System {#Teams_&_Account_System}

- [Discord](/Discord) login integration (FakeNeo)
- Prevent the same account from joining a game more than once (FakeNeo)
- [Clan](/Clan) tags can now have lowercase characters (Théodore Léon)
- Stats tracking system implemented (record only for now) (FakeNeo)

### Gameplay {#Gameplay}

- Overhauled attack mechanics, including speed and loss effects from [terrain](/Terrain), [defense](/Defense_Post), and other factors (1brucben)
- Revised population dynamics and [gold](/Gold) income (1brucben)
- Changed port ship spawn function (1brucben)
- Donate the attack-ratio% instead of always 1/3 (troops only) (PilkeySEK)
- [Transport ships](/Transport_Ship) arriving at allied shores now conquer the tile without betrayal (FakeNeo)
- Launching offensive weapons at allies causes immediate betrayal, allowing [SAM](/SAM_Launcher) interception (FakeNeo)
- [SAM](/SAM_Launcher) interception (FakeNeo)
- [Bots](/Bots) and [nations](/Nations) save up for larger attacks and counter-attack (FakeNeo)
- [Gold](/Gold) value of [trade ships](/Trade_Ship) calculated by actual traveled distance (Koranir)
- End automatically set embargoes after a cooldown (Léo-21)

### Visual Effects & [Combat](/Combat) {#Visual_Effects_&_Combat}

- Added special effects: [Nuke](/Nuke) explosions, [SAM](/SAM_Launcher) interceptions, Naval [combat](/Combat) (IngloriousTom)
- [Nukes](/Nuke) now follow a curved trajectory (IngloriousTom)
- Defended borders highlighted with checkered pattern (IngloriousTom)

### UI {#UI}

- Added overlay showing combined team [gold](/Gold), troops & owned territory (Killersoren)
- [Warships](/Warship) count, betrayal count, and alliance expiration timer added to player panel (Dovg)
- Focus boats, bombs and attacks when clicking warnings in chat (Léo-21)
- MLS 4 Game integration with quick chat system (Aotumuri)
- Added keybinding configuration (Aotumuri)
- Added custom disable settings (Aotumuri)
- Display team count option added (Aotumuri)
- Minor alignment improvements to main menu UI (Demonessica)
- Use monospace font for lobby code (ImDarkTom)
- Add team labels in Teams mode (Marto)
- Add duration to defense debuff messages (walker)
- Updated UI text: 'Embargo against you' → 'Stopped trading with you' (tryout33)
- Improved build menu port description and instructions layout (tryout33)
- Add boat retreat (Vivacious Box),
- Fix troops not added back if boat can't leave (Vivacious Box)
- Improved build menu port description, updated instructions text and layout (tryout33)
- Can pause on replays (evan)
- Show defense under player name (evan)

### Performance {#Performance}

Precompute TileRef <-> (x,y) conversion tables for improved performance (FakeNeo)

## [Maps](/Maps) & Territories {#Maps_&_Territories}

### Revised [Maps](/Maps) {#Revised_Maps}

- Pangaea: Added rivers (Greymald)
- Black Sea: Fixed reversed topography (Nikola123)

### [New Maps](/Map_Updates) {#New_Maps}

- Deglaciated Antarctica: Uncover Antarctica ice-free and raw (Nikola123, Backn)
- Falkland Islands: A compact island in the South Atlantic (Nikola123)
- Baikal: Central part of Lake Baikal in Siberia (Nikola123)
- Halkidiki: Greece's iconic trident-shaped peninsula (Nikola123)
- Giant World: A massive map of Earth (N0ur, 1brucben)

- Updated lobby sizes (FakeNeo, Nikola123)

## Localizations {#Localizations}

### [Flag Table](/Flag_Table) {#Flag_Table}

- +150 new flags added (N0ur)

### Translations {#Translations}

Updated translations by our dedicated translator community:

<table class="wikitable">
<caption>
</caption>
<tbody><tr>
<th>Language
</th>
<th>Translator(s)
</th></tr>
<tr>
<td>Bulgarian
</td>
<td>Nikola123 &amp; NewHappyRabbit
</td></tr>
<tr>
<td>Japanese
</td>
<td>Aotumuri, daimyo_panda2 &amp; gafunuko
</td></tr>
<tr>
<td>French
</td>
<td>cldprv, gx21 &amp; r3ms
</td></tr>
<tr>
<td>Dutch
</td>
<td>cldprv &amp; tryout33
</td></tr>
<tr>
<td>German
</td>
<td>Pilkey, jacks0n
</td></tr>
<tr>
<td>Spanish
</td>
<td>6uzm4n
</td></tr>
<tr>
<td>Russian
</td>
<td>Rulfam
</td></tr>
<tr>
<td>Ukrainian
</td>
<td>Rulfam
</td></tr>
<tr>
<td>Polish
</td>
<td>zibi, RinkyDinky &amp; Rulfam
</td></tr>
<tr>
<td>Serbo-Croatian
</td>
<td>Vekser
</td></tr>
<tr>
<td>Italian
</td>
<td>frappa10 &amp; Lollosean
</td></tr>
<tr>
<td>Brazilian Portuguese
</td>
<td>theskeleton4393
</td></tr>
<tr>
<td>Turkish
</td>
<td>Toyatak
</td></tr>
<tr>
<td>Hindi
</td>
<td>sheikh
</td></tr>
<tr>
<td>Bengali
</td>
<td>sheikh
</td></tr>
<tr>
<td>Esperanto
</td>
<td>r3ms
</td></tr>
<tr>
<td>Toki Pona
</td>
<td>Makonede
</td></tr>
<tr>
<td>Czech
</td>
<td>Xaelor &amp; erinthegirl
</td></tr>
<tr>
<td>Hebrew
</td>
<td>Goblinon
</td></tr></tbody></table>

## Bug Fixes {#Bug_Fixes}

- Fixed emoji exploit (PilkeySEK)
- Fixed unit sprites drawing order (Vivacious Box)
- Fixed isolated clusters being captured when surrounded by empty or allied tiles (Vivacious Box)
- Fixed [MIRV](/MIRV) targeting the same tiles (Vivacious Box)
- Fixed flags not loading properly (tryout33)
- Fixed error popup being too wide and unclosable (tryout33)
- Fixed Player Info Panel being partly out of view (tryout33)
- Fixed Light and Dark Mode buttons overlap (Nilsfram)

## Contributors {#Contributors}

Thanks to all these people for making this update:

- Goblinon
- Xaelor
- erinthegirl
- Makonede
- r3ms
- sheikh
- N0ur
- Moha
- SyntaxPM
- Toyatak
- theskeleton4393
- Lollosean
- frappa10
- Vekser
- Rulfam
- RinkyDinky
- zibi
- 6uzm4n
- jacks0n
- Pilkey
- cldprv
- gx21
- gafunuko
- daimyo_panda2
- Aotumuri
- NewHappyRabbit
- Nikola123
- FakeNeo
- 1brucben
- Backn
- Greymald
- evan
- Vivacious Box
- walker
- Marto
- ImDarkTom
- Demonessica
- Léo-21
- Dovg
- Killersoren
- IngloriousTom
- Koranir
- Théodore Léon

## See also {#See_also}

- [Update 22.0](/Update_22.0)
- [Minor Updates of 23.x](/Minor_Updates_of_23.x)
- [Update 24.0 Open Beta](/Update_24.0_Beta)
