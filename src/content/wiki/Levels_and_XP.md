---
title: "Levels and XP"
section: "Meta & community"
cats: []
---
**Levels and XP** are the player progression system added in [Update 35.0](/Update_35.0). Every eligible game earns **XP**, shown source by source on the end-of-game screen, and XP raises your **level**. Level badges appear in the lobby list, the in-game player panel, the [ranked](/Ranked) leaderboard and [clan](/Clan) member lists.

<div class="panel-box">
<div class="panel-box-heading">At a glance</div>

- **Most XP from one game:** 2,775 (see [Examples](#Examples))
- **Minimum to earn anything:** 2 minutes alive and at least one action
- **Time Alive cap:** 30 minutes (510 XP)
- **Biggest multipliers:** Ranked 1.25×, Sovereign 2×
- **Level 1 → 100:** 44,690 XP, then Prestige
- **Daily resets:** 00:00 UTC

</div>

## Levels and prestige {#Levels_and_prestige}

- Levels run from 1 to 100. Since v35, level 1 to 100 takes **44,690 XP** in total (about 20% more than the 37,300 of the first v35 builds; nobody lost a level when it changed).
- At level 100 you can **Prestige**: a hold-to-confirm screen, then a full-screen ceremony, and you start the level track again one prestige rank higher. Ranks run **P1 to P10, then Legend**.
- Each prestige rank has its own unit icon, tier colour and rim gauge (Iron up to Champion, then Legend). P5, P10 and Legend badges glow, and P8 and above sparkle.
- Your profile's **Progression** tab holds the reward track (with **Claim all**), your prestige history and milestone dates (levels 10, 25, 50, 75 and 100 in each run). The reward track pays Plutonium every 25 levels; level Plutonium is held until your [account](/Accounts) is trusted.
- In privacy settings you can hide your level from other players.
- The ranked leaderboard only shows badges for prestiged players and Legends.

When you are eliminated before the game ends you see a **provisional** XP figure straight away, worked out in your browser with a copy of the server's formula. The server's figure replaces it once the game ends, and since [Update 36.0](/Update_36.0) a provisional figure that never gets scored expires after 3.5 hours. Your level counts XP from games still being scored, marked provisional, and it stacks across back-to-back games until each one is confirmed.

## How XP is calculated {#How_XP_is_calculated}

A game's XP is the sum of six sources, multiplied by a game-type multiplier and a subscription multiplier:

<pre>XP = (Played + Time Alive + Placement + Win + First Game of the Day + Feats)
     × Game-type multiplier
     × Subscription multiplier</pre>

The final figure is rounded to the nearest whole XP (halves round up). Time Alive, Placement and Win are each rounded down first.

### Sources {#Sources}

<table class="wikitable">
<tr><th>Source</th><th style="white-space:nowrap">Max XP</th><th>How it's earned</th></tr>
<tr><td>Played</td><td>50</td><td>Stay in the game until you are eliminated or it ends.</td></tr>
<tr><td>Time Alive</td><td>510</td><td>17 XP per minute alive, up to 30 minutes. Counted from ticks (10 per second) and rounded down at the end.</td></tr>
<tr><td>Placement</td><td>150</td><td><b>FFA only.</b> 150 × (opponents outlasted ÷ total opponents) × <a href="#Lobby_scale">lobby scale</a>.</td></tr>
<tr><td>Win</td><td>300</td><td><b>FFA:</b> 300 × <a href="#Lobby_scale">lobby scale</a>.<br><b>Humans vs Nations:</b> 100.<br><b>Other team games:</b> 150, if you were alive for at least 50% of the game.</td></tr>
<tr><td>First Game of the Day</td><td>100</td><td>Your first public or ranked game of the UTC day, win or lose. Not scaled by lobby size. Private and singleplayer games don't pay it or use it up. Resets at 00:00 UTC.</td></tr>
<tr><td>Feats</td><td>0</td><td>Up to 3 feats per game are tracked, but they don't pay any XP yet.</td></tr>
</table>

Played, Placement, Win and First Game of the Day are all lost if you [leave early](#Leaving_early).

**Opponents** for Placement are the other *humans* who spawned; [nations](/Nations), [bots](/Bots) and [tribes](/Tribes) don't count. You outlast a player if they were eliminated (or left) strictly before you; players still alive at the end tie with each other.

### Lobby scale {#Lobby_scale}

<pre>Lobby scale = min(1, spawned humans ÷ 20)</pre>

FFA lobbies with fewer than 20 humans who spawned pay proportionally less Placement and Win XP. A full 150 Placement and 300 Win needs at least 20 spawned humans and the win.

### Game-type multiplier {#Game-type_multiplier}

<table class="wikitable">
<tr><th>Game type</th><th>Multiplier</th></tr>
<tr><td>Public</td><td>1×</td></tr>
<tr><td><a href="/Ranked">Ranked</a></td><td>1.25×</td></tr>
<tr><td>Private</td><td>0.5×</td></tr>
<tr><td><a href="/Single_Player">Singleplayer</a></td><td>0.25×</td></tr>
</table>

### Subscription multiplier {#Subscription_multiplier}

<table class="wikitable">
<tr><th>Subscription</th><th>Multiplier</th></tr>
<tr><td>None</td><td>1×</td></tr>
<tr><td>Vanguard</td><td>1.25× (+25%)</td></tr>
<tr><td>Warlord</td><td>1.5× (+50%)</td></tr>
<tr><td><a href="/Steam">Steam Plus</a></td><td>1.5× (+50%)</td></tr>
<tr><td>Sovereign</td><td>2× (+100%)</td></tr>
</table>

## When you get no XP {#When_you_get_no_XP}

A game pays **0 XP** if any of these is true:

- You were alive for less than **2 minutes** (120 seconds).
- You took no action. An action is any of: sending an attack, launching a boat, building a structure, or a conquest (eliminating a player, nation or tribe).
- It was a private or singleplayer game with custom settings: infinite gold, infinite troops, instant build, a changed starting gold or gold multiplier, or host cheats that grant any of these.
- It was a private game with fewer than **4** humans who spawned.
- You have hit the daily cap for that game type (below).

Multiplayer games are only scored when the end-of-game vote agreed on the game's stats.

### Daily cap {#Daily_cap}

- **Private:** 10 scored games per day
- **Singleplayer:** 5 scored games per day
- Public and ranked games have no cap. The cap resets at **00:00 UTC**.

### Leaving early {#Leaving_early}

"Leaving early" means leaving the game while you are still alive, before it ends. Leaving after you've been eliminated costs nothing.

<table class="wikitable">
<tr><th>When you leave</th><th>What you get</th></tr>
<tr><td>Within your first 2 minutes alive</td><td><b>0 XP</b></td></tr>
<tr><td>After 2 minutes, once you've been eliminated</td><td><b>Every source</b> you earned</td></tr>
<tr><td>After 2 minutes, still alive, before the game ends</td><td><b>Time Alive only</b>, still multiplied as usual</td></tr>
</table>

## Examples {#Examples}

**A typical game.** Public FFA with 10 humans, no subscription, your first game of the day. You survive 15 minutes and are eliminated after outlasting 5 of your 9 opponents.

<table class="wikitable">
<tr><th>Source</th><th>Working</th><th>XP</th></tr>
<tr><td>Played</td><td></td><td>50</td></tr>
<tr><td>Time Alive</td><td>15 min × 17</td><td>255</td></tr>
<tr><td>Placement</td><td>150 × 5/9 × 10/20, rounded down</td><td>41</td></tr>
<tr><td>Win</td><td>eliminated</td><td>0</td></tr>
<tr><td>First Game of the Day</td><td></td><td>100</td></tr>
<tr><td><b>Total (no subscription)</b></td><td>446 × 1</td><td><b>446</b></td></tr>
<tr><td><b>Total with Vanguard</b></td><td>446 × 1.25 = 557.5, rounded</td><td><b>558</b></td></tr>
</table>

**The maximum.** A ranked FFA win in a lobby of 20+ humans, alive for 30+ minutes, as your first game of the day, with Sovereign.

<table class="wikitable">
<tr><th>Source</th><th>XP</th></tr>
<tr><td>Played</td><td>50</td></tr>
<tr><td>Time Alive (30 min cap)</td><td>510</td></tr>
<tr><td>Placement</td><td>150</td></tr>
<tr><td>Win</td><td>300</td></tr>
<tr><td>First Game of the Day</td><td>100</td></tr>
<tr><td>Subtotal</td><td>1,110</td></tr>
<tr><td><b>× 1.25 (Ranked) × 2 (Sovereign)</b></td><td><b>2,775</b></td></tr>
</table>

## See also {#See_also}

- [Accounts](/Accounts)
- [Ranked](/Ranked)
- [Steam](/Steam)
- [Update 35.0](/Update_35.0)

<div role="note" class="hatnote navigation-not-searchable">Values from the OpenFront v0.35.2 game client's copy of the server XP formula (<a href="https://github.com/openfrontio/OpenFrontIO/blob/v0.35.2/src/client/ProvisionalXp.ts" target="_blank" rel="noopener noreferrer">ProvisionalXp.ts</a>) and its reference rules. The server can change these values without a client update.</div>
