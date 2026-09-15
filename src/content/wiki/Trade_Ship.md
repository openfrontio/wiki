---
title: "Trade Ship"
section: "Units"
cats: []
---
<figure class="mw-default-size" typeof="mw:File/Thumb"><img src="/images/Trade_Ship.png" decoding="async" width="148" height="148" class="mw-file-element" data-file-width="148" data-file-height="148"><figcaption>A <b>Trade Ship</b>.</figcaption></figure>

The **Trade Ship** is a type of boat that automatically spawns from [Ports](/Port). When a **Trade Ship** spawns, it will travel to another [Nation](/Nations)'s [Port](/Port).

In terms of appearance, they have a bright outline with a dark center.

# Trade Ship Spawning {#Trade_Ship_Spawning}

[Ports](/Port) check every 10 ticks if they should spawn a trade ship, until the cap of 150 is reached<sup id="cite_ref-1" class="reference"><a href="#cite_note-1"><span class="cite-bracket">[</span>1<span class="cite-bracket">]</span></a></sup>.

Spawn chance was originally calculated from the total number of [ports](/Port) in the game:

<pre>tradeShipSpawnRate(numberOfPorts) = {round(10 * Math.pow(numberOfPorts, 0.6))}
</pre>

More [ports](/Port) = higher spawn rate, but with diminishing returns due to the 0.6 power.

As of [Update 34.0](/Update_34.0) the spawn chance is instead throttled by how many trade ships already exist in the world, with a pity timer for ports that keep missing their roll:

<pre>spawnChance = 1 / max(1, floor(100 / (rejections + 1) / saturation(numTradeShips)))

saturation(n) = (1 + 0.45 * e^(-n / 120)) * max(1 - sigmoid(n, ln2/50, 230), 0.25 * (1 - sigmoid(n, ln2/100, 800)))
</pre>

While the world fleet is small there is a mild (~1.45×) boost to the odds, so the early trading minutes ramp up faster; the boost crosses the old un-boosted curve around 110 ships. Past the ~230-ship midpoint spawning is damped, flattening onto a 0.25 plateau beyond ~310 ships (roughly half cadence per port), so heavy port investment keeps scaling income linearly until a global hard cap far beyond any normal game (~800 ships at sea). The spawn rate is recalculated on each port level roll.

# Trade Route Selection {#Trade_Route_Selection}

[Ports](/Port) will only trade with other players (not their own [ports](/Port)). Trade partners are prioritized in this order:

- Closer [ports](/Port) get double chance of being selected (proximity bonus)
- [Allied](/Ally) [ports](/Port) get double chance of being selected

Trade ships are free to build and don't count against unit limits.

# [Gold](/Gold) Generation {#Gold_Generation}

[Gold](/Gold) earned is based on _Manhattan distance_ (which means the sum of the absolute differences in x and y coordinates) between [port](/Port)s:

<pre>Gold earned = {10000 + 150 * Math.pow(dist, 1.1)}
</pre>

Both the source and destination [port](/Port) owners receive the full amount.

Longer trade routes are more profitable (superlinear scaling with distance)

- Example 1 - Close Trade:

Let's say two [ports](/Port) are 20 tiles apart:

<pre>Base gold: 10,000
Distance bonus: 150 * (20^1.1) = 150 * 24.53 = 3,680
Total gold earned: 13,680
</pre>

Both [ports](/Port) receive 13,680 [gold](/Gold) each when the trade completes

- Example 2 - Long Distance Trade:

Let's say the [ports](/Port) are 200 tiles apart:

<pre>Base gold: 10,000
Distance bonus: 150 * (200^1.1) = 150 * 316.23 = 47,434
Total gold earned: 57,434
</pre>

Both [ports](/Port) receive 57,434 [gold](/Gold) each when the trade completes

This shows how the superlinear scaling (power of 1.1) makes long-distance trade routes much more profitable:

- The far [port](/Port) is 10x further (200 vs 20 tiles)
- But it generates about 4.2x more gold (57,434 vs 13,680)
- The distance bonus portion is about 13x larger (47,434 vs 3,680)

Each [port](/Port) you own increases the [gold](/Gold) per trade, counterbalancing the cap of 150 trade ships.<sup id="cite_ref-2" class="reference"><a href="#cite_note-2"><span class="cite-bracket">[</span>2<span class="cite-bracket">]</span></a></sup>

<table class="plainlinks metadata ambox mbox-small-left ambox-notice" role="presentation"><tbody><tr><td class="mbox-image"><span typeof="mw:File"><span><img alt="" src="/images/Information_icon4.svg" decoding="async" width="20" height="20" class="mw-file-element" data-file-width="620" data-file-height="620"></span></span></td><td class="mbox-text"><div class="mbox-text-span"><span class="hide-when-compact"> How is this calculated?</span></div></td></tr></tbody></table>

# Piracy Protection {#Piracy_Protection}

Trade ships become "safe from pirates" when near shoreline. This is checked every time they move.

[Warships](/Warship) cannot capture trade ships that are marked as "safe from pirates".

# Trade Ship Behavior {#Trade_Ship_Behavior}

Trade ships automatically path to their destination [port](/Port). They are deleted if:

- Their destination [port](/Port) is captured by the source [port](/Port) owner
- Their destination [port](/Port) is destroyed
- The trade relationship between source and destination is broken
- They can't find a path to their destination

# Capture/Destruction Mechanics {#Capture/Destruction_Mechanics}

<figure typeof="mw:File/Thumb"><img src="/images/215px-Trade_Ship_Capturing.png" decoding="async" width="215" height="209" class="mw-file-element" data-file-width="314" data-file-height="305"><figcaption>A <b>Trade Ship</b> being captured.</figcaption></figure>

If a trade ship is captured:

- The capturing player gets all the [gold](/Gold) instead of it being split
- The ship is redirected to the closest [port](/Port) owned by the capturing player
- If the capturing player has no [ports](/Port), the ship is deleted

For a **trade ship** to be destroyed:

- It falls within the blast radius of an [atomic explosion](/Atom_Bomb).
- It is impacted by a bullet from a [warship](/Warship).

# Trade Relationships {#Trade_Relationships}

Players must be able to trade with each other for trade ships to spawn.

Trade is automatically broken if:

- One of the [ports](/Port) is destroyed
- Players become enemies
- [Alliance](/Ally) is broken

# See also {#See_also}

- [Port](/Port)
- [Warship](/Warship)
- [Transport Ship](/Transport_Ship)

<div class="mw-references-wrap"><ol class="references">
<li id="cite_note-1"><span class="mw-cite-backlink"><a href="#cite_ref-1" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text"><a href="/Update_24.0" title="Update 24.0">Update 24.0#⚖️ Balance Changes</a></span>
</li>
<li id="cite_note-2"><span class="mw-cite-backlink"><a href="#cite_ref-2" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text"><a href="/Update_24.0" title="Update 24.0">Update 24.0#⚖️ Balance Changes</a></span>
</li>
</ol></div>
