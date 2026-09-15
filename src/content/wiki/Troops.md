---
title: "Troops"
section: "Units"
cats: []
---
**Troops** are one of the two main resources in [OpenFront](/OpenFront.io), the second being [gold](/Gold). They are used to attack and defend territory, they crew [transport ships](/Transport_Ship), and they are what [nukes](/Nuke) and the [Doomsday Clock](/Doomsday_Clock) take away from you.

_Formulas on this page come from the game's configuration as of [Update 34.0](/Update_34.0)._

## Starting troops {#Starting_troops}

Every human player spawns with **25,000** troops. [Bots](/Bots) start with 10,000, and [nations](/Nations) start with 12,500 / 18,750 / 25,000 / 31,250 on Easy / Medium / Hard / Impossible [difficulty](/Difficulty). With the **Infinite Troops** setting on, humans start with 1,000,000.

## Gaining troops {#Gaining_troops}

Troops are gained every [tick](/Tick) (a tenth of a second). The amount added per tick is:

```
toAdd = (10 + currentTroops^0.73 / 4) × (1 − currentTroops / maxTroops)
```

The first factor grows with your army, the second shrinks as you approach your cap, so the gain rate rises and then falls. Working through the formula, the **fastest growth happens at about 42% of your maximum troops**: below that you are growing into your capacity, above it growth tails off, and at max troops you gain nothing. This is why experienced players keep their troop count around the middle of the bar rather than sitting at the cap, and why sending troops into an attack (which lowers your count) often _increases_ your gain rate.

Your current gain per second is shown in brackets after your troop count in the UI.

Bots gain troops at **half** this rate. Nations gain 0.9× on Easy, 0.95× on Medium, 1× on Hard and 1.05× on Impossible.

## Maximum troops {#Maximum_troops}

Your troop cap depends on how much land you own and how many [city](/City) levels you have:

```
maxTroops = 2 × (numTilesOwned^0.6 × 1000 + 50,000) + totalCityLevels × 250,000
```

Land gives diminishing returns (the 0.6 power), so past the early game cities are the main lever: every city level adds a flat 250,000. Cities still under construction do not count.

- Bots have a third of this cap.
- Nations have 0.5× / 0.75× / 1× / 1.25× the cap on Easy / Medium / Hard / Impossible.
- The **Infinite Troops** setting (single player and private lobbies) sets the cap to 1,000,000,000, shown in game as 100M.

## Spending troops {#Spending_troops}

- **Attacks** — the Attack Ratio slider decides what share of your troops each land attack sends; the troops leave your count immediately and are consumed tile by tile according to the [combat](/Combat) formula. Bots attack with 5% of their troops, nations and humans use the slider (default 20%).
- **Transport ships** — a boat attack carries up to 20% of your troops.
- **Donations** — you can send troops to an [ally](/Ally).
- **Nukes** — an [atom](/Atom_Bomb) or [hydrogen bomb](/Hydrogen_Bomb) kills troops in proportion to how densely they are spread over your land; [MIRV](/MIRV) warheads instead strip you down towards 3% of your cap.
- **Doomsday Clock** — doomed sides bleed troops down to a 5% floor.

## See also {#See_also}

- [Combat](/Combat)
- [City](/City)
- [Transport Ship](/Transport_Ship)
- [Gold](/Gold)
