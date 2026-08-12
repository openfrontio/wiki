---
title: "Gold"
section: "Economy"
cats: []
---
**Gold** is one of the two main resources in OpenFront, the second being [Troops](/Troops).

The player slowly generates gold over time at a flat rate.

Gold is used to build [structures/units](/Buildings):

<table class="wikitable">
<caption>Building prices
</caption>
<tbody><tr>
<th>Unit
</th>
<th>Price (formula)
</th>
<th>Maximum price
</th></tr>
<tr>
<td><a href="/Warship" title="Warship">Warship</a>
</td>
<td>250,000 * (warship count + 1)
</td>
<td>1,000,000
</td></tr>
<tr>
<td><a href="/Port" title="Port">Port</a>
</td>
<td>125,000 * 2^(port count)
</td>
<td>1,000,000
</td></tr>
<tr>
<td><a href="/Factory" title="Factory">Factory</a>
</td>
<td>125,000 * 2^(factory count)
</td>
<td>1,000,000
</td></tr>
<tr>
<td><a href="/Defense_Post" title="Defense Post">Defense Post</a>
</td>
<td>50,000 * (defense post count + 1)
</td>
<td>250,000
</td></tr>
<tr>
<td><a href="/SAM_Launcher" title="SAM Launcher">SAM Launcher</a>
</td>
<td>1,500,000 * (SAM count + 1)
</td>
<td>3,000,000
</td></tr>
<tr>
<td><a href="/City" title="City">City</a>
</td>
<td>125,000 * 2^(city count)
</td>
<td>1,000,000
</td></tr>
<tr>
<td><a href="/Missile_Silo" title="Missile Silo">Missile Silo</a>
</td>
<td>1,000,000
</td>
<td>1,000,000
</td></tr>
<tr>
<td><a href="/Atom_Bomb" title="Atom Bomb">Atom Bomb</a>
</td>
<td>750,000
</td>
<td>750,000
</td></tr>
<tr>
<td><a href="/Hydrogen_Bomb" title="Hydrogen Bomb">Hydrogen Bomb</a>
</td>
<td>5,000,000
</td>
<td>5,000,000
</td></tr>
<tr>
<td><a href="/MIRV" title="MIRV">MIRV</a>
</td>
<td>25,000,000
</td>
<td>25,000,000
</td></tr></tbody></table>

If you choose **infinite gold** in **options** (only available in [singleplayer](/Single_Player) and private lobbies), all buildings have a cost of 0 gold.

# Base Gold Generation {#Base_Gold_Generation}

Players gain a flat rate of 100 gold per tick (1000 gold per second), whereas [bots](/Bots) gain 50 gold per tick (500 gold per second).

# Additional Gold Sources {#Additional_Gold_Sources}

Additional gold sources are:

- Conquering players, bots, and [nations](/Nations)
- Donations
- [Trading](/Trade) (Ports, Factories)
