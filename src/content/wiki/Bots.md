---
title: "Bots"
section: "Combat & mechanics"
cats: []
---
<div role="note" class="hatnote navigation-not-searchable">Not to be confused with <a href="/Nations" title="Nations">Nations</a>.</div>

Bots, previously known as Elves before Update 0.28.0, before are one of the two types of non-player countries that spawn in [OpenFront](/OpenFront.io); The other being [nations](/Nations). Every (public) game, 400 bots spawn into the map. Bots are used as filler in the game, stopping players from progressing too quickly by taking a lot of unclaimed land really fast.

## Behavior {#Behavior}

Bots will always send out extremely small-scale attacks to their neighbors, slowly and gradually taking a few pixels of land at a time. This isn’t a real problem though, unless you decide to full-send, or allow nearby bots to build up too many troops. Each bot spawns somewhere random in the [map](/Maps), staying a fair distance away from other bots and never moving from their location until the game starts. Bots usually have two randomly-generated words in their country name and no flag, though as of [Update 33.0](/Update_33.0) bot tribes in public games can instead show custom purchased tribe names or a map's themed tribe names. Finally, bots never try to build any kind of [building](/Buildings), or send out [transport boats](/Transport_Ship). If a bot does somehow have a [building](/Buildings), then it either isn’t a bot, or a bot simply conquered it from a different country.

# [Single Player](/Single_Player) {#Single_Player}

In [single player](/Single_Player), you can control how many bots you want to spawn, the max (and also the default) for [single player](/Single_Player) is 400. You can use the slider

to go for a lower bot number, and bringing it down all the way will disable bots in general, only leaving [nations](/Nations) and players in the game. There also may or may not be a correlation between the game [difficulty](/Difficulty) and the bot behavior.

# [Combat](/Combat) Against Bots {#Combat_Against_Bots}

[Combat](/Combat) against bots has special rules to balance gameplay and provide appropriate challenge levels.

## Bot [Combat](/Combat) Mechanics {#Bot_Combat_Mechanics}

When fighting against bots, several special modifiers apply:

### Human vs Bot Advantage {#Human_vs_Bot_Advantage}

When a human player attacks a bot:

<pre>if (attacker.type() == PlayerType.Human &amp;&amp; defender.type() == PlayerType.Bot) {
  mag *= 0.8;
}
</pre>

This means humans get a 20% reduction in troop losses when attacking bots.

### Bot Attack Power {#Bot_Attack_Power}

Bots use different attack amounts compared to human players:

<pre>if (attacker.type() == PlayerType.Bot) {
  return attacker.troops() / 20;  // Bots use 5% of their troops
} else {
  return attacker.troops() / 5;   // Humans use 20% of their troops
}
</pre>

### Bot Population Mechanics {#Bot_Population_Mechanics}

Bots have several limitations on their population and growth:

- Maximum Population: Bots are limited to half the normal maximum population

<pre>if (player.type() == PlayerType.Bot) {
  return maxPop / 2;
}
</pre>

- Population Growth: Bots grow 30% slower than human players

<pre>if (player.type() == PlayerType.Bot) {
  toAdd *= 0.7;
}
</pre>

### Bot Starting Resources {#Bot_Starting_Resources}

Bots start with different initial resources:

<pre>if (playerInfo.playerType == PlayerType.Bot) {
  return 10_000;  // Bots start with 10,000 troops
}
</pre>

Compare this to human players who start with 25,000 troops (or 1,000,000 if infinite troops is enabled).

## Combat Calculation Examples {#Combat_Calculation_Examples}

### Example 1: Human Attacking Bot {#Example_1:_Human_Attacking_Bot}

Let's calculate losses for a human player attacking a bot in highlands:

- Scenario:

<pre>Human Attacker Troops = 1000
Bot Defender Troops = 2000
Terrain = Highland (mag = 100)
Has Defense Post = false
</pre>

- Calculations:

<pre>Base Magnitude = 100
Human vs Bot Bonus = 100 * 0.8 = 80
Troop Ratio = 2000/1000 = 2 (capped at 2)
Base Reduction = 0.8
Size Penalty = 1 (assuming &lt; 100,000 tiles)
</pre>

- Results:

<pre>Attacker Troop Loss = 2 * 80 * 0.8 * 1 = 128 troops lost per tick
Defender Troop Loss = 2000/tiles_owned troops lost per tick
</pre>

### Example 2: Bot Attacking Human {#Example_2:_Bot_Attacking_Human}

When a bot attacks a human player:

- The bot will only commit 5% of its troops to the attack (vs 20% for humans)
- The bot follows the same [combat](/Combat) mechanics as human attackers
- The bot has no special attack bonuses against humans

## Bot Difficulty Levels {#Bot_Difficulty_Levels}

Bots can be configured with different [difficulty](/Difficulty) levels that affect their gameplay:

- Easy: 50% of normal maximum population
- Medium: Normal maximum population
- Hard: 150% of normal maximum population
- Impossible: 200% of normal maximum population

### Population Growth by [Difficulty](/Difficulty) {#Population_Growth_by_Difficulty}

Bot population growth also varies by [difficulty](/Difficulty):

- Easy: 90% of normal growth rate
- Medium: Normal growth rate
- Hard: 110% of normal growth rate
- Impossible: 120% of normal growth rate

## See also {#See_also}

- [Nations](/Nations)
- [Difficulty](/Difficulty)
- [Single Player](/Single_Player)
