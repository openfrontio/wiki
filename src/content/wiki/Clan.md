---
title: "Clan"
section: "Combat & mechanics"
cats: []
---
<div role="note" class="hatnote navigation-not-searchable">Not to be confused with <a href="/Ally" title="Ally">Ally</a> or <a href="/Ally" class="" title="Alliance">Alliance</a>.</div>

A **Clan** is a group of players in [OpenFront](/OpenFront.io) who display a common tag. It is set by putting a tag in your username (for example, “[TAG] Player”). As of [Update 34.0](/Update_34.0) a **clan tag picker** lets you pick your own clan's tag instead of guessing it.

### Mechanics {#Mechanics}

Members of the same clan are automatically placed on the same [team](/Teams) in [team](/Teams)-based modes. Since [Update 34.0](/Update_34.0), clan tags can also be used as the team's name: a team that is mostly one clan takes that clan's tag, and a team split between two clans gets a hybrid two-clan name.

### Exception {#Exception}

In [Free for All (FFA)](/Free_for_All) mode, clan tags do not confer any team affiliation; all participants compete individually, regardless of clan membership.

## Clan modal {#Clan_modal}

Clans have their own modal in the game client, with a searchable, paginated member list and game history, and each player's profile has a Clans tab (see [Accounts](/Accounts)). [Update 34.0](/Update_34.0) added:

- **Donations** — members can donate player currency to the clan treasury, and clan currency balances are shown inline. A Donations tab lists them.
- **Map** — a fullscreen [clan map](#Clan_map) tab, now labelled **Map (ALPHA)**.

## Clan map {#Clan_map}

The **clan map** is one persistent world map shared by every clan, where clans claim territory pixel by pixel, r/place style. It is the real [Giant World Map](/Giant_World_Map) (4108 × 1948 pixels, 2,335,403 of them land), drawn with the game's own terrain colours. It is meant to be slow: the map takes weeks to fill, and a border fight between two clans can last days.

The map is in **alpha**, so the numbers below may change.

### Viewing the map {#Viewing_the_map}

Anyone can view the map, signed in or not. You can pan, zoom, fit the whole world and go fullscreen. Hovering a pixel shows who owns it. Each clan has a colour taken from its tag, and its tag and name are drawn over its territory. The legend lists the biggest clans by pixels held, with their share of the land. Clicking a clan zooms to its territory and dims everyone else. The map updates every few seconds.

### Claiming land {#Claiming_land}

Only clan **leaders and officers** can claim land. Plain members see the same read-only map as everyone else. Leaders and officers get a side panel: select pixels (click, Shift+drag, or the Brush toggle on touch screens) and claim up to 100 in one go. If you lead several clans, a picker chooses which one you are painting for.

- A pixel must touch your clan's land on one of its four sides. Diagonal doesn't count. A clan with no land yet can start anywhere.
- Water can never be owned.
- Enemy pixels can be taken under the same rules.
- A pixel that changed hands in the last **5 minutes** can't be taken again. This stops two clans flipping the same pixel back and forth.
- Losing pixels can cut a clan's territory into separate pieces, called [encirclements](#Encirclement). Each one keeps growing from its own edge.

### Troops and caps {#Troops_and_caps}

Claiming costs **troops**, and troops are bought with **caps** from the clan treasury (the balance members [donate](#Clan_modal) to). Leaders and officers buy them. Troops never turn back into caps.

<table class="wikitable">
<tr><th>Action</th><th>Cost</th></tr>
<tr><td>Buy troops</td><td>1 cap = 100 troops</td></tr>
<tr><td>Claim unowned land</td><td>1,000 troops (10 caps) per pixel</td></tr>
<tr><td>Take an enemy pixel</td><td>2,000 troops + the defender's garrison per pixel</td></tr>
</table>

A clan has a single troop pool, with no limit on its size. Its **defence** is that pool spread over its land:

<pre>Garrison per pixel = clan troops ÷ pixels held (rounded up)</pre>

When you take an enemy pixel, the defender loses that pixel's garrison. A clan with a big pool is expensive to attack all the way down, so the best response to a stockpiling neighbour is for several clans to gang up on it. Every clan's troop count is public, so attackers can size up a target first.

**Income:** every pixel a clan holds earns **1 cap per day**, paid in 24 hourly installments into the clan treasury. Land captured during an hour starts paying from the next one. A new unowned pixel costs about ten days of one pixel's income, so territory grows by roughly 10% a day if its officers keep claiming.

### Transport ships {#Transport_ships}

Because claims must touch your land, a clan can't cross water by claiming alone. Leaders and officers use **transport ships** to reach islands and other continents, much like [Transport Ships](/Transport_Ship) in a game.

- Switch the panel to **Ship** and click a land pixel your clan doesn't hold. The map picks your nearest coast and shows the route, the sailing time and the landing price. Load at least 1,000 troops; they leave the pool when the ship sails.
- The ship takes the shortest sea route and sails at **20 pixels a minute**. A short hop takes about a minute, an Atlantic crossing about half an hour.
- A clan can have at most **3 ships** at sea at once.
- Ships are visible to everyone with their troop count, so a defender can see one coming and buy troops before it lands.

On arrival the ship tries to take its target at the normal price, worked out when it lands rather than when it set off, and paid from the troops aboard:

<table class="wikitable">
<tr><th>Outcome</th><th>When</th><th>Troops</th></tr>
<tr><td>Captured</td><td>Enough troops aboard</td><td>The pixel becomes a beachhead that grows normally; leftover troops rejoin the pool.</td></tr>
<tr><td>Repelled</td><td>Too few troops aboard</td><td>All troops aboard are lost.</td></tr>
<tr><td>Returned</td><td>Your clan already holds the target, or it changed hands in the last 5 minutes</td><td>All troops rejoin the pool.</td></tr>
</table>

### Encirclement {#Encirclement}

As with [Annexation](/Annexation) in a game, a clan's land that is walled in by other clans, with no way out to water or the map edge, is taken by the clans around it. On the clan map this happens slowly, from the outside in, so a clan can't seize a continent just by drawing a wall around it:

- **10 minutes** after the wall closes, and every 10 minutes after that, the outer layer of the pocket goes to the clan bordering it.
- A pocket one pixel thick falls in 10 minutes. One 300 pixels across takes about a day.
- Breaking the wall (retaking a wall pixel, or opening a path to water or open land) stops the siege. Pixels already taken stay taken.
- Territory touching water, the map edge or impassable mountains can't be encircled. Very large enclosed areas count as open.
- A clan's **main** territory can only be encircled by a single clan, with no unclaimed land touching it.
- Unclaimed land inside the pocket stays unclaimed, and the encircled clan keeps all its troops (spread over less land).

The map doesn't mark sieges. You see them as a pocket shrinking.

## Clan Wars and the clan browser {#Clan_Wars_and_the_clan_browser}

[Update 35.0](/Update_35.0) added **Ranked Clan Wars** (see [Ranked](/Ranked)): clan-sized team games, 2–5 a side and up to four clans, where the clan gains or loses rating.

- The clan leaderboard has a sortable **ELO** column.
- The Members list shows each member's clan wars ELO contribution, with a sort for it.
- The clan wars queue shows how many from your clan are waiting.
- The clan browser lists clans in a fair per-player random order by default (no more "AAA" clans at the top). You can sort by Oldest, Richest or Lowest win score, filter to open or invite-only clans, and paid clan boosts give featured placement.
- Clan member lists show each member's [level](/Levels_and_XP) badge.
- Since v0.35.1, profile cards show the clan tag from your latest game instead of your first clan alphabetically.

## See also {#See_also}

- [Free for All](/Free_for_All)
- [Teams](/Teams)
- [Ally](/Ally)
- [Ranked](/Ranked)
- List of Clans
