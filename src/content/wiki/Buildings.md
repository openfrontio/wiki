---
title: "Buildings"
section: "Buildings"
cats: []
---
<figure typeof="mw:File/Thumb"><img src="/images/481px-Build_Menu_-_Higher_resolution.png" decoding="async" width="481" height="387" class="mw-file-element" data-file-width="677" data-file-height="544"><figcaption>The Build Menu.</figcaption></figure>

**Buildings** (also called structures or buildables) are the things you spend [gold](/Gold) on in [OpenFront](/OpenFront.io). They are placed on individual [tiles](/Tile) of the [map](/Maps) and range from economic structures that grow your [troops](/Troops) and income, to defences, to the nukes and ships that the same build menu sells.

_Prices and figures on this page come from the game's configuration as of [Update 34.0](/Update_34.0)._

## Building {#Building}

Right-click (or long-press on mobile) a tile to open the radial menu and pick a building, or use the number-key shortcuts listed on the [Controls](/Controls) page. A structure takes a few seconds to construct and shows a progress bar while it does; the **Instant Build** lobby setting removes the delay. Structures must be at least 15 tiles apart, and some have placement rules of their own — [ports](/Port) need a coastal tile, [warships](/Warship) are launched onto water.

Most structures can be [upgraded](/Upgrading) by building the same structure on top of an existing one, which raises its **level**. Higher levels make the structure more effective (bigger troop cap, larger SAM radius, more silo ammo and so on) and count towards the [nations](/Nations) AI's idea of how "juicy" a target you are.

If the **Infinite Gold** setting is on (single player and private lobbies), every structure costs 0 for human players.

There are four broad kinds of buildable:

- **Economic structures** (round icon, land only) — [City](/City), [Factory](/Factory), [Port](/Port)
- **Military structures** (square icon, land only) — [Defense Post](/Defense_Post), [Missile Silo](/Missile_Silo), [SAM Launcher](/SAM_Launcher)
- **Ships** (water only) — [Warship](/Warship); [transport ships](/Transport_Ship) and [trade ships](/Trade_Ship) are free and are not built from the menu
- **Missiles** (triangle icon) — [Atom Bomb](/Atom_Bomb), [Hydrogen Bomb](/Hydrogen_Bomb), [MIRV](/MIRV), all launched from a [Missile Silo](/Missile_Silo)

## Price summary {#Price_summary}

Prices scale with how many of that structure you already own (counting only ones that have finished construction), so they reset when you lose structures.

<table class="wikitable">
<tbody><tr>
<th>Building</th>
<th>1st</th>
<th>2nd</th>
<th>3rd</th>
<th>4th</th>
<th>5th+</th>
<th>Build time</th>
<th>Upgradable</th></tr>
<tr><td><a href="/City">City</a></td><td>125,000</td><td>250,000</td><td>500,000</td><td>1,000,000</td><td>1,000,000</td><td>2 s</td><td>Yes</td></tr>
<tr><td><a href="/Factory">Factory</a> *</td><td>125,000</td><td>250,000</td><td>500,000</td><td>1,000,000</td><td>1,000,000</td><td>2 s</td><td>Yes</td></tr>
<tr><td><a href="/Port">Port</a> *</td><td>125,000</td><td>250,000</td><td>500,000</td><td>1,000,000</td><td>1,000,000</td><td>5 s</td><td>Yes</td></tr>
<tr><td><a href="/Defense_Post">Defense Post</a></td><td>50,000</td><td>100,000</td><td>150,000</td><td>200,000</td><td>250,000</td><td>5 s</td><td>No</td></tr>
<tr><td><a href="/Missile_Silo">Missile Silo</a></td><td>1,000,000</td><td>1,000,000</td><td>1,000,000</td><td>1,000,000</td><td>1,000,000</td><td>10 s</td><td>Yes</td></tr>
<tr><td><a href="/SAM_Launcher">SAM Launcher</a></td><td>1,500,000</td><td>3,000,000</td><td>3,000,000</td><td>3,000,000</td><td>3,000,000</td><td>~10 s</td><td>Yes</td></tr>
<tr><td><a href="/Warship">Warship</a></td><td>250,000</td><td>500,000</td><td>750,000</td><td>1,000,000</td><td>1,000,000</td><td>—</td><td>No</td></tr>
<tr><td><a href="/Atom_Bomb">Atom Bomb</a></td><td colspan="5">750,000</td><td>—</td><td>—</td></tr>
<tr><td><a href="/Hydrogen_Bomb">Hydrogen Bomb</a></td><td colspan="5">5,000,000</td><td>—</td><td>—</td></tr>
<tr><td><a href="/MIRV">MIRV</a></td><td colspan="5">25,000,000 + 15,000,000 per MIRV already launched by anyone in the game</td><td>—</td><td>—</td></tr></tbody></table>

\* Factories and ports share one price ladder: your third port-or-factory costs 500,000 whichever it is.

## Economic structures {#Economic_structures}

### [City](/City) {#City}

Raises your maximum [troops](/Troops) by **250,000 per level**. Cities are the main way to grow your army beyond what your land alone supports, and are usually the first thing to build. Cities are not counted by the nations AI as a limited "quota" structure — nations keep building them whenever they can afford to.

### [Factory](/Factory) {#Factory}

Connects to nearby cities and ports with [railroads](/Railroad) and spawns [trains](/Train) that carry gold between stations. Factories and ports share the same price ladder.

### [Port](/Port) {#Port}

Must be built on a coastal tile. Spawns [trade ships](/Trade_Ship) that sail to other players' ports and earn gold for both sides — more the further they travel — and is required before you can build [warships](/Warship). Ports also act as rail stations for [trains](/Train). Other players' warships can capture your trade ships.

## Military structures {#Military_structures}

### [Defense Post](/Defense_Post) {#Defense_Post}

Strengthens your border within a **30-tile** radius: attackers inside that radius lose **5×** as many troops per tile and advance **3×** slower. It is the only structure that cannot be upgraded, and its price grows in 50,000 steps to a 250,000 cap.

### [Missile Silo](/Missile_Silo) {#Missile_Silo}

Required to launch [Atom Bombs](/Atom_Bomb), [Hydrogen Bombs](/Hydrogen_Bomb) and [MIRVs](/MIRV). Each launch puts the silo on a cooldown of about 9 seconds (90 [ticks](/Tick)), including MIRV launches since [Update 33.0](/Update_33.0). Upgrading a silo gives it more ammunition.

### [SAM Launcher](/SAM_Launcher) {#SAM_Launcher}

Shoots down incoming nukes — atom bombs, hydrogen bombs and, since Update 33.0, MIRV warheads — that would land within its radius, with a cooldown of about 9 seconds between interceptions. The radius grows with level: **70** tiles at level 1, then roughly 81, 90, 97 and 102 at levels 2–5, approaching a cap of 150. As of [Update 34.0](/Update_34.0) the radius grows smoothly during the upgrade and the game previews it on the map.

## Ships {#Ships}

### [Warship](/Warship) {#Warship}

Built from a [port](/Port) and launched onto water. Warships have **1,000 HP**, fire shells doing **250** damage, patrol an area, attack enemy [transport ships](/Transport_Ship) and warships, and capture enemy [trade ships](/Trade_Ship). They gain veterancy over their service life (Update 33.0).

### [Transport Ship](/Transport_Ship) and [Trade Ship](/Trade_Ship) {#Transport_and_Trade_Ships}

Neither is bought from the build menu. Transport ships are launched by attacking across water and carry up to 20% of your troops; trade ships spawn from ports automatically.

## Missiles {#Missiles}

### [Atom Bomb](/Atom_Bomb) {#Atom_Bomb}

750,000 gold. Destroys a small area — inner radius 12, outer radius 30 — good for taking out a cluster of enemy structures or opening a hole in a defended border.

### [Hydrogen Bomb](/Hydrogen_Bomb) {#Hydrogen_Bomb}

5,000,000 gold. Destroys a huge area (inner radius 80, outer radius 100) and everything in it.

### [MIRV](/MIRV) {#MIRV}

25,000,000 gold for the first one launched in a game, then 15,000,000 more for each MIRV any player has already launched. Flies to the top of the map and splits into up to 350 warheads that carpet the targeted player's whole territory. Since Update 33.0 the warheads fly as normal nukes and can be intercepted by SAMs.

## Planned or tested {#Planned_or_tested}

### Airport {#Airport}

An air-trade structure that was prototyped but never shipped; it is believed to have been dropped in favour of the [Factory](/Factory) and rail network.

# See also {#See_also}

- [Upgrading](/Upgrading)
- [City](/City)
- [Factory](/Factory)
- [Port](/Port)
- [Defense Post](/Defense_Post)
- [Missile Silo](/Missile_Silo)
- [SAM Launcher](/SAM_Launcher)
- [Warship](/Warship)
- [Trade](/Trade)
- [Gold](/Gold)
