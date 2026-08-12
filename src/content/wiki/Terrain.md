---
title: "Terrain"
section: "Combat & mechanics"
cats: []
---
<figure class="mw-default-size" typeof="mw:File/Thumb"><img src="/images/300px-Terrain-types.png" decoding="async" width="300" height="212" class="mw-file-element" data-file-width="5912" data-file-height="4184"><figcaption>Examples of the different terrain types.</figcaption></figure>

In Openfront, there are three types of passable terrain, plus **impassable terrain** introduced in [Update 33.0](/Update_33.0).

1. **Plains**: Plains are the easiest terrain type to conquer. Great for early-game expansion as you take over a lot of land at a low troop cost; however provides less defense when being attacked. Visually, plains appear as a light-green terrain in the map.
2. **Deserts or Highlands**: Deserts (and Highlands) are harder to take over than plains, but still allows for decent expansion in the early-game. Can defend you a bit from attacks, however can’t hold for long without support from [defense posts](/Defense_Post). Visually, deserts and highlands are khaki or tan in color.
3. **Mountains**: Mountains are the most difficult type of terrain to conquer, being somewhat time consuming to take and wasting a lot of troops in the process. However they are extremely good for defense, especially when combined with defense posts. Visually, mountains are white in color.
4. **Impassable terrain**: Introduced in [Update 33.0](/Update_33.0), impassable terrain is placed by map makers and cannot be entered, crossed or conquered, letting them wall off regions and enable new kinds of map design. Several v33 maps use it, including **United States** and **Tierra del Fuego**.

## Strategies Involving Terrain {#Strategies_Involving_Terrain}

Mountains and highlands take out a lot of your troops & time when conquering. This also applies to players, players over mountainous territory are significantly harder to take over than players over a normal plains.

1. When choosing an enemy to attack, do not only check troop number and buildings, but also the terrain on their territory. This will help you know if conquering the territory is worth it, as trying to take over mountains and highlands will not only waste your time, but also troops in the process.
2. If you spawn on mountains or highlands, you will end up taking over less land, however you are more protected from threats that might attempt to take you over otherwise.

<div role="note" class="hatnote navigation-not-searchable">See also: <a href="/Combat" title="Combat">Combat</a></div>

# Terrain types and modifiers {#Terrain_types_and_modifiers}

The speed of claiming depends on the amount of troops used.

<table class="wikitable" border="1">
<caption>
</caption>
<tbody><tr>
<th>Terrain
</th>
<th>Troop Loss
</th>
<th>Speed Penalty
</th></tr>
<tr>
<td><b>Plains</b>
</td>
<td>0.80
</td>
<td>16.5
</td></tr>
<tr>
<td><b>Deserts or Highlands</b>
</td>
<td>1.00
</td>
<td>20
</td></tr>
<tr>
<td><b>Mountains</b>
</td>
<td>1.20
</td>
<td>25
</td></tr></tbody></table>

When attacking a tile, the attacker's regular amount of troops lost is multiplied by the the Troop Loss modifier (called "mag" in the source code). Additionally, the base speed at which they capture tiles is defined by the Speed Penalty (called "speed" in the source code), meaning higher values are captured slower.
