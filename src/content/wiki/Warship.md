---
title: "Warship"
section: "Units"
cats: []
---
<figure class="mw-default-size" typeof="mw:File/Thumb"><img src="/images/202px-Warship.png" decoding="async" width="202" height="200" class="mw-file-element" data-file-width="223" data-file-height="221"><figcaption>A <b>Warship</b>.</figcaption></figure>

# Description {#Description}

**Warships** are a type of [building](/Buildings) [Sub-type Boat] costing 250 000 [gold](/Gold) for the first bought, then increases by 250 000 for each ship owned, up to a maximum of 1 000 000.

# How to Spawn {#How_to_Spawn}

To spawn (buy) a **Warship**, right-click a water source, access the [build menu](/Buildings), and buy it. It will then appear at the nearest owned [Port](/Port) and will move to the targeted location.

# Properties {#Properties}

- **Hit Points**: 1000 HP
- **Cost**: Scales with number of warships owned, calculated with this formula:

<pre>cost = Math.min(1_000_000, (numWarships + 1) * 250_000)
</pre>

- **Movement**: Can move one tile per tick (100ms)
- **Territory Bound**: No (can move freely in water)

# Repair {#Repair}

**Warships** repair through two separate systems, both requiring a friendly [Port](/Port).

## Passive healing {#Passive_healing}

Any warship within 150 tiles of a friendly [Port](/Port) heals 1 HP per tick (100 ms) — 10 HP per second — regardless of the port's level.

## Docked repair {#Docked_repair}

A warship that retreats and docks at a [Port](/Port) also draws on that port's repair pool. The pool is 5 HP per tick for each port level, split evenly among the warships docked there, and a port repairs at most as many warships as its level. Combined with passive healing, each docked ship repairs at 1 + (5 × level ÷ docked ships) HP per tick.

<table class="wikitable">
<tbody><tr><th>Port level</th><th>Docked warships</th><th>Repair per ship</th></tr>
<tr><td>1</td><td>1</td><td>60 HP/s</td></tr>
<tr><td>2</td><td>1</td><td>110 HP/s</td></tr>
<tr><td>2</td><td>2</td><td>60 HP/s each</td></tr>
<tr><td>3</td><td>1</td><td>160 HP/s</td></tr>
<tr><td>3</td><td>2</td><td>85 HP/s each</td></tr>
<tr><td>3</td><td>3</td><td>60 HP/s each</td></tr></tbody></table>

So at full capacity every ship repairs at 60 HP/s regardless of port level; a higher-level port mainly lets more ships repair at once, while an under-capacity port concentrates its pool on fewer ships and heals them faster. A warship automatically retreats to repair when it drops below 75% of its (veterancy-adjusted) maximum health.

# Veterancy {#Veterancy}

As of [Update 33.0](/Update_33.0), **Warships** gain **veterancy** over their service life, up to a maximum of **level 3**, shown as gold stripes on the hull (one per level). A more experienced warship is both tougher and hits harder. Only warships gain veterancy.

## Gaining veterancy {#Gaining_veterancy}

- Destroying an enemy **Warship** grants a full veterancy level instantly (and clears any partial progress).
- Destroying [Transport Ships](/Transport_Ship) or capturing [Trade Ships](/Trade_Ship) fills a shared progress meter: **10** transport kills _or_ **25** trade captures earn one level. Each transport is worth 1/10 of a level and each capture 1/25, and mixed progress combines.
- Partial progress carries over past a level-up — except a warship kill, which resets it.

## Effects {#Veterancy_effects}

Each veterancy level adds **+20% maximum health** and **+20% shell damage**. The health boost raises the cap only — the ship does not instantly heal on level-up, it repairs toward the new maximum as normal. Veterancy affects only health and shell damage — not firing rate, range, movement speed, targeting or repair rate.

<table class="wikitable">
<tbody><tr>
<th>Veterancy</th>
<th>Max health</th>
<th>Shell damage</th></tr>
<tr><td>0 (base)</td><td>1,000</td><td>200–300</td></tr>
<tr><td>1</td><td>1,200</td><td>240–360</td></tr>
<tr><td>2</td><td>1,400</td><td>280–420</td></tr>
<tr><td>3 (max)</td><td>1,600</td><td>320–480</td></tr></tbody></table>

# Behavior {#Behavior}

<figure typeof="mw:File/Thumb"><img src="/images/122px-Selected_Warship.png" decoding="async" width="122" height="124" class="mw-file-element" data-file-width="245" data-file-height="248"><figcaption>A Selected <b>Warship</b>.</figcaption></figure>

Warships don't heal when their owning player has no [port](/Port), and — as of [Update 33.0](/Update_33.0) — can only capture [trade ships](/Trade_Ship) when their owner has a [port](/Port) in that same body of water.<sup id="cite_ref-1" class="reference"><a href="#cite_note-1"><span class="cite-bracket">[</span>1<span class="cite-bracket">]</span></a></sup>

[Warships](/Warship) will instantly reload after shooting a [Transport Ship](/Transport_Ship).<sup id="cite_ref-2" class="reference"><a href="#cite_note-2"><span class="cite-bracket">[</span>2<span class="cite-bracket">]</span></a></sup>

## Manual Moving {#Manual_Moving}

**Warships**, when left-clicked, will show a square highlight. If a water source is then left clicked, the selected **Warship** will move to the clicked location.

## Patrol {#Patrol}

Warships will:

- Patrol their assigned area when no targets are present
- Automatically engage enemy ships that enter their targeting range
- Chase and attempt to capture enemy [trade ships](/Trade_Ship)
- Return to patrol when targets are eliminated

## Fight {#Fight}

<figure typeof="mw:File/Thumb"><img src="/images/249px-Naval_Warfare.png" decoding="async" width="249" height="170" class="mw-file-element" data-file-width="569" data-file-height="389"><figcaption>A fleet of <b>Warships</b>, fighting the enemy.</figcaption></figure>

When encountering another **Warship** or [Transport Ship](/Transport_Ship) from another country, **Warships** will proceed to fight. While fighting, **Warships** will fire bullets at the target until it is destroyed.

- **Attack Rate**: One shell every 20 ticks (2 seconds)
- **Shell Damage**: 200–300 per hit (a random roll of 200/225/250/275/300), before veterancy
- **Shell Lifetime**: 20 ticks (2 seconds)
- **Shell Speed**: 3 tiles per tick
- **Targeting Range**:  130 tiles

## Target Priority {#Target_Priority}

Warships automatically prioritize targets in the following order:<sup id="cite_ref-3" class="reference"><a href="#cite_note-3"><span class="cite-bracket">[</span>3<span class="cite-bracket">]</span></a></sup>

1. [Transport Ships](/Transport_Ship)
2. Enemy Warships
3. [Trade Ships](/Trade_Ship)

## Capturing {#Capturing}

<figure typeof="mw:File/Thumb"><img src="/images/196px-Trade_Ship_Capturing.png" decoding="async" width="196" height="190" class="mw-file-element" data-file-width="314" data-file-height="305"><figcaption>A <a href="/Trade_Ship" title="Trade Ship">Trade Ship</a> being captured by a <b>Warship</b>.</figcaption></figure>

When a **warship** encounters a [trade ship](/Trade_Ship) that isn't heading to the **warship** owners [ports](/Port), it will rush towards it until it makes contact. The [trade ship](/Trade_Ship) will then be captured and will be assigned to the nation of the **warship.**

When chasing a [trade ship](/Trade_Ship), warships double their speed and move at 2 tiles per tick (20 tiles per second).

To determine if a [trade ship](/Trade_Ship) is able to be captured, it must:

1. Not belong to yourself or any of your allies
2. Not be heading towards your own [port](/Port)
3. Not belong to any player your ally is allied with
4. Not be near a coast, in which case it is not capturable.

_Note: to see which [trade ships](/Trade_Ship) are able to be captured, you can hold the "space" bar of your keyboard. [Trade ship](/Trade_Ship)s will appear in green if it belongs to you / heads towards one of your [ports](/Port), in yellow if it is uncapturable because of an [alliance](/Ally), and red if it is capturable._

# See Also {#See_Also}

- [Port](/Port)
- [Trade Ship](/Trade_Ship)
- [Transport Ship](/Transport_Ship)

<div class="mw-references-wrap"><ol class="references">
<li id="cite_note-1"><span class="mw-cite-backlink"><a href="#cite_ref-1" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text"><a href="/Update_20.0" class="" title="Update 0.20.0">Update 0.20.0</a></span>
</li>
<li id="cite_note-2"><span class="mw-cite-backlink"><a href="#cite_ref-2" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text"><a href="/Update_24.0" title="Update 24.0">Update 24.0#⚖️ Balance Changes</a></span>
</li>
<li id="cite_note-3"><span class="mw-cite-backlink"><a href="#cite_ref-3" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text"><a href="/Update_24.0" title="Update 24.0">Update 24.0#⚖️ Balance Changes</a></span>
</li>
</ol></div>
