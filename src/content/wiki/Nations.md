---
title: "Nations"
section: "Combat & mechanics"
cats: []
---
Nations are the other type of [bots](/Bots) in an [OpenFront](/OpenFront.io) match. They can be considered more "complex" or more "human-like". The main difference is that Nations are named after a real-life nation, such as Bulgaria or Estonia. They will use the flag of their nation and spawn near their nation's territory.

## Information {#Information}

Nations are commonly encountered adversaries in Openfront. Often considered as the intelligent relatives of the widespread cannon-fodder [Bots](/Bots), they possess characteristics closer to a human player, including the following: Requesting [alliances](/Ally), Constructing Buildings and [trading](/Port). Another capability in the naval space is sending transports (also known as ships). Nations can also send emojis on special occasions. For example: if you **attack a nation**, they have a chance to send out clown or angry emojis. 
Nations can have inaccurate territory in the game. This is either because it is too small to be more than a pixel, or because the borders are too hard to draw. There is a very small chance it gets accurate borders, with high chances of  the territory being bigger or smaller on the [map](/Maps).

### Combatting Nations {#Combatting_Nations}

Nations are quite a peculiar entity in [OpenFront](/OpenFront.io). Nations are placed second in the purview of intelligence, with [bots](/Bots) being last at third and human players placed at first. Nations are quite hard to beat if you aren't sufficiently prepared for them, due to their ability to act closer to humans than [bots](/Bots). It can be very hard to get rid of a nation bot when they commence an attack, but they ineffectively throw their troops at you and significantly reduce their ability to launch a second wave. Use these weaknesses to your advantage and start a noticeable invasion to call other nations around you to help eliminate them. You can also attack when they launch on a player or a fellow nation. If you are prepared, attack a nation after they build infrastructure like [ports](/Port).

### Actions performed by nations {#Actions_performed_by_nations}

Nations can:

- Send ships
- [Build](/Buildings)  ([cities](/City), [ports](/Port), [missile silos](/Missile_Silo))
- Launch [nukes](/Atom_Bomb)
- Send emojis (mostly angry emojis when you attack them or clown emojis. This means they will fullsend or almost fullsend you (clown) or attack you continuously (angry). You can attempt to [ally](/Ally) them to get them off you, and sometimes they accept.)

### Trivia {#Trivia}

- Nations can [nuke](/Atom_Bomb) each other, but in multiplayer games, they rarely get the chance since they are often wiped out by the midgame phase.

## Alliances {#Alliances}

### Relations {#Relations}

Numeric relations range from -100 to +100 and map to four named tiers visible on the info screen:

<table class="wikitable">
<caption>
</caption>
<tbody><tr>
<th>Relationship Value Range
</th>
<th>Tier
</th></tr>
<tr>
<td>Less than -50
</td>
<td>Hostile
</td></tr>
<tr>
<td>-50 to less than 0
</td>
<td>Distrustful
</td></tr>
<tr>
<td>0 to less than 50
</td>
<td>Neutral
</td></tr>
<tr>
<td>50 or greater
</td>
<td>Friendly
</td></tr></tbody></table>

Any value below Neutral is a hard rejection signal and a value at or above Friendly is a strong accept signal. Relations shift through gameplay events: targeting a nation applies -40, requesting assistance from an ally costs -20 with that ally, nuking applies -100, and various emoji interactions adjust relations in smaller increments.

### Sending alliance requests {#Sending_alliance_requests}

When a nation's attack logic runs and bordering enemies are present (not when the nation is only expanding into unclaimed territory), the nation considers sending an alliance request to each bordering enemy. The process is a 1/30 roll per enemy per attack pulse, combined with a check that the player type is acceptable (bots only qualify on Easy difficulty), a check that no cooldown or duplicate-request condition blocks the attempt, and a successful evaluation of the alliance decision tree.

The requirements on whether a request can be sent at all requires that alliances are enabled, the target is not the nation itself, the target is connected and alive, the two are not already friendly, no outgoing pending request to the same player exists, and either an incoming request from that player exists (allowing the nation to respond) or the last outgoing request to that player was at least 300 ticks ago.

If a request is sent while the player already has an outgoing request to the nation, the two requests automatically resolve as accepted, both relations are set to +100, temporary embargoes are cleared, and any in-flight nukes that would otherwise break the new alliance are cancelled.

### Alliance decision tree {#Alliance_decision_tree}

The core decision routine evaluates ten steps in strict order, with the first matching step determining the outcome. The same routine is used both when considering whether to send a request and when responding to an incoming one.

#### Confusion {#Confusion}

A small chance per evaluation that the nation acts erratically. The probability depends on difficulty: 10% on Easy, 5% on Medium, 2.5% on Hard, and never on Impossible. When confused, the nation makes a 50% random accept/reject decision and everything else is skipped.

#### Traitor partner {#Traitor_partner}

If the other player carries the traitor flag, the nation rejects roughly 90% of the time.

#### Partner has too many alliances {#Partner_has_too_many_alliances}

Applies only on Hard and Impossible difficulties. The nation counts non-bot players in the game and rejects if the other player's current alliance count exceeds a threshold: 50% of non-bot players on Hard, or 25% on Impossible.

#### Threat partner {#Threat_partner}

If the other player is significantly stronger, the nation accepts the alliance as protection if:

- In **Medium** difficulty, if the other has more than 2.5 times the nation's troops.
- In **Hard** difficulty, if both current troops and maximum troop capacity exceed twice the nation's own.
- In **Impossible** difficulty: if any of three conditions hold: troops greater than 1.5x the nation's, or more troops combined with maximum capacity 1.5x higher, or more troops combined with 1.5x the territory.

On **Easy** difficulty, nations do not recognize threats.

#### Team games {#Team_games}

In team game modes, nations are increasingly unwilling to ally with non-teammates. Rejection probabilities are 25% on Easy, 50% on Medium, 75% on Hard, and 100% on Impossible.

#### Bad relation {#Bad_relation}

A numeric relation below zero (Hostile or Distrustful) triggers immediate rejection.

#### Friendly partner {#Friendly_partner}

A Friendly relation (value of 50 or higher) triggers acceptance. Harder difficulties introduce a random rejection chance even when the relation is Friendly: Hard accepts 83% of the time when friendly, Impossible accepts 67% of the time.

#### Nation has too many alliances {#Nation_has_too_many_alliances}

The nation checks its own alliance count against difficulty-dependent caps. **Easy** nations have no cap. **Medium** nations reject once their alliance count reaches a random value between 4 and 5 (inclusive). On **Hard** and **Impossible**, two checks apply: if the nation has at least two bordering non-bot neighbors and the other player is one of them, the nation rejects if accepting would mean nearly all border neighbors become allies. Additionally, Hard caps total alliances at a random 3 or 4, and Impossible caps at a random 2 or 3.

#### Early game {#Early_game}

If still undecided, the nation may accept based on game age. The window and acceptance probability both narrow with difficulty:

<table class="wikitable">
<caption>
</caption>
<tbody><tr>
<th>Difficulty
</th>
<th>Window (ticks past spawn)
</th>
<th>Accept Probability
</th></tr>
<tr>
<td>Easy
</td>
<td>&lt; 3,000 (~5 minutes)
</td>
<td>90%
</td></tr>
<tr>
<td>Medium
</td>
<td>&lt; 1,800 (~3 minutes)
</td>
<td>70%
</td></tr>
<tr>
<td>Hard
</td>
<td>&lt; 1,800
</td>
<td>50%
</td></tr>
<tr>
<td>Impossible
</td>
<td>&lt; 600 (~1 minute)
</td>
<td>30%
</td></tr></tbody></table>

#### Similarly strong {#Similarly_strong}

The final fallback compares effective troop pools (current troops plus any troops in outgoing attacks) and tile counts against difficulty-dependent randomized thresholds. The nation accepts if either condition holds:

- Comparable troops: the other player's total troops exceed the nation's total troops multiplied by a random percentage. The range is 60-70% on Easy, 70-80% on Medium, 75-85% on Hard, and 80-90% on Impossible.
- Comparable tiles: the other player's tile count exceeds the nation's by a random percentage (70-80% on Easy, 80-90% on Medium, 85-95% on Hard, 90-100% on Impossible) and the other player's total troops exceed 50% of the nation's

If neither condition holds, the request is rejected.

### Betrayal {#Betrayal}

Before the normal attack target search runs, nations consider whether to betray any of their bordering allies. The checks run in this exact order, and the first match results in an immediate alliance break followed by a forced attack on the former ally. [Update 34.0](/Update_34.0) replaced the old "weak ally" trigger with a juiciness-based one that only fires when retaliation would be small.

1. **Juiciest Ally** (Hard and Impossible mode only): The nation ranks its bordering allies by _juiciness_ (see [Attack target selection](#Attack_target_selection)) and betrays the juiciest one — typically a MIRVed or otherwise hollowed-out ally — but only if it is **safe**: the combined troops (including outgoing attacks) of the target, every non-allied bordering neighbour and the nation's other bordering allies must stay below one third of the nation's own troops. If the target is already a traitor, the other allies are not counted, since betraying a traitor does not make the nation one.
2. **Overwhelming Strength** (Easy and Medium mode only): The nation has at least 10 times the ally's troops. Easy nations never betray human players this way.
3. **Traitor Ally** (Medium mode and up): The ally currently holds the traitor flag and the ally's troops are below 1.2 times the nation's troops.
4. **Sole Neighbor** (Medium mode and up): The ally is the nation's only bordering player, and the ally's troops multiplied by 3 are still less than the nation's troops.

### Attack target selection {#Attack_target_selection}

On each attack tick a nation walks a difficulty-ordered list of strategies and uses the first one that produces a target. The strategies are: attacking bordering [bots](/Bots), retaliating against attackers, assisting allies, betrayal (above), pushing into territory that nukes have turned to wilderness, punishing [traitors](/Traitor), picking off disconnected (AFK) players, attacking players it hates, and finally the weakest bordering enemy, the nearest enemy reachable by [transport ship](/Transport_Ship), or donating troops to an ally. In [Free for All](/Free_for_All) nations avoid targets with far more troops than themselves; in [team](/Teams) games they will attack stronger enemies, since teammates can donate.

Hard and Impossible nations have three extra strategies, and [Update 34.0](/Update_34.0) added the **juicy** one:

- **Very weak** — a bordering enemy with under 15% of its maximum troops (and, in FFA, less than 1.2× the nation's troops).
- **Juicy** — the most valuable bordering enemy the nation can plausibly beat (enemy troops at most 75% of the nation's). _Juiciness_ ranks candidates by the sum of three normalized scores: the level-weighted count of their structures (ignoring [defense posts](/Defense_Post) and [missile silos](/Missile_Silo), which are not a prize worth capturing), their troop-cap headroom (how far below max troops they are), and their tile count.
- **Victim** — a bordering enemy already under heavy attack from others (incoming attacks worth 50% or more of their troops) who is not much stronger than the nation.

Impossible nations try the very-weak, betrayal and victim strategies early and the juicy strategy before AFK and hated targets; Hard nations run the very-weak and juicy strategies only after the distracting "hated" strategy, deliberately leaving them weaker than Impossible. Update 34.0 also fixed Hard and Impossible nations ignoring the troop cap when attacking wilderness or fallout.

### Embargoes and Emojis {#Embargoes_and_Emojis}

On Hard and Impossible difficulty in team games, nations apply embargoes against all non-teammate non-bot players. Outside team mode, embargoes are placed in response to the relationship status Hostile. Embargoes are lifted when relationships reach 0 or higher (Neutral) on Easy/Medium, 50 or higher (Friendly) on Hard, and embargoes will never auto-lift in Impossible.

When a neighbor places an embargo on the nation, the nation applies a one-time -20 relation penalty. Removing the embargo reverses this penalty.

Insult emojis received from a player apply -100 relation and trigger a response emoji. Peace emojis on Easy difficulty grant +15 relation and may produce a love reply.

## Construction {#Construction}

The construction system runs on every nation's main AI tick and twice more between main ticks (at one-third and two-thirds of the attack rate interval). Each call attempts at most one meaningful action (either placing or upgrading a single structure) with defense posts handled on a separate fast path that does not count against normal pacing limits.

### Decision branches {#Decision_branches}

When a construction call begins, the AI first checks whether a defense post is needed in response to a land invasion. If the nation has already placed at least one normal structure and is under sufficient attack, this branch fires; if it determines a post is needed but cannot place one, the entire economy build for that call is skipped. Otherwise, the AI checks two pacing gates: a cooldown specific to nations that began the game with high gold, and an off-phase window used in team games to let nuke spending proceed without interference. If neither gate blocks, the AI proceeds to the main structure logic.

The main structure logic considers a few special-case openers, then iterates through ports, factories, SAM launchers, and missile silos in that order, building the first one whose quota is unmet. If no structure was built during this loop, a city attempt follows.

### Defense posts {#Defense_posts}

When a nation is under land attack and has already placed at least one structure, the system may change to building defense posts before considering any economic construction. The threshold that triggers this is an attacking troop count of at least **35%** of the nation's own troops. Defense posts are an emergency response **separate** from the economic build order. They are never the first structure a nation places, and boat invasions do not trigger them, only land attacks.

<table class="wikitable">
<caption>
</caption>
<tbody><tr>
<td><b>Nation Difficulty</b>
</td>
<td><b>Action in Land Attack</b>
</td></tr>
<tr>
<td>Easy
</td>
<td>Will never construct a defense post when under attack.
</td></tr>
<tr>
<td>Medium
</td>
<td>50% chance per call, 1 post maximum near the front.
</td></tr>
<tr>
<td>Hard/Impossible
</td>
<td>Number of posts scales with attack, up to <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle \left\lceil {\frac {\text{Ratio of incoming troops}}{0.4}}\right\rceil }}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow>
              <mo>⌈</mo>
              <mrow class="MJX-TeXAtom-ORD">
                <mfrac>
                  <mtext>Ratio of incoming troops</mtext>
                  <mn>0.4</mn>
                </mfrac>
              </mrow>
              <mo>⌉</mo>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle \left\lceil {\frac {\text{Ratio of incoming troops}}{0.4}}\right\rceil }}</annotation>
  </semantics>
</math></span></span> (ie. 80% incoming troops leads to 2 maximum posts)
</td></tr></tbody></table>

The front is defined as tiles on the nation's border that **touch an attacker's territory**. Candidate placement tiles are sampled from up to 25 tiles in a depth ring between 0.75 and 1.5 times the standard border spacing, where border spacing equals the outer blast radius of an atom bomb. If the nation's territory is too small for this ring, the requirement is relaxed and falls back to random territory samples.

If the defense threshold is met but placement fails such as no valid tiles or insufficient gold, the system blocks all other structure-building for that tick.

### Pacing Events {#Pacing_Events}

#### High starting gold {#High_starting_gold}

The following only applies to nations with at least 3 million starting gold. On **Hard** and **Impossible** difficulty, if nukes, silos, and SAM launchers are all enabled in the lobby, the first structure such a nation builds is a SAM launcher rather than economic infrastructure. This is intended to spread SAM coverage before structures cluster within a single nuclear blast radius.

After the opener, these nations apply a cooldown between successive placements. The first two structures incur no wait; the third requires 250 ticks (about 25 seconds) after the previous placement; the fourth requires 150 ticks; and the fifth and beyond require 100 ticks each.

#### Post save-up {#Post_save-up}

In team games with missile silos enabled, once a nation's gold reaches its **save-up target**, construction enters an oscillating pattern of 15 seconds on and 15 seconds off (150 ticks each). The oscillation is synchronized with the nuke AI.

### City scaling and quotas {#City_scaling_and_quotas}

Nation construction quotas are mainly derived from city count. When cities are enabled in the lobby, the AI uses the actual number of cities owned. When cities are disabled, it substitutes a rough estimate based on territory, computed as

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle \max {(1,\left\lfloor {\frac {\text{Tiles Owned}}{2000}}\right\rfloor )}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mo movablelimits="true" form="prefix">max</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mo stretchy="false">(</mo>
              <mn>1</mn>
              <mo>,</mo>
              <mrow>
                <mo>⌊</mo>
                <mrow class="MJX-TeXAtom-ORD">
                  <mfrac>
                    <mtext>Tiles Owned</mtext>
                    <mn>2000</mn>
                  </mfrac>
                </mrow>
                <mo>⌋</mo>
              </mrow>
              <mo stretchy="false">)</mo>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle \max {(1,\left\lfloor {\frac {\text{Tiles Owned}}{2000}}\right\rfloor )}}}</annotation>
  </semantics>
</math></span></span>

The target count for each structure type is <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle \lfloor {\text{Cities}}\times r\rfloor }}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mo fence="false" stretchy="false">⌊<!-- ⌊ --></mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>Cities</mtext>
            </mrow>
            <mo>×<!-- × --></mo>
            <mi>r</mi>
            <mo fence="false" stretchy="false">⌋<!-- ⌋ --></mo>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle \lfloor {\text{Cities}}\times r\rfloor }}</annotation>
  </semantics>
</math></span></span>, where r is a type-specific ratio:

<table class="wikitable">
<caption>
</caption>
<tbody><tr>
<th>Structure
</th>
<th>Ratio per city
</th>
<th>Notes
</th></tr>
<tr>
<td>Port
</td>
<td>0.75
</td>
<td>Requires costal access.
</td></tr>
<tr>
<td>Factory
</td>
<td>0.75
</td>
<td>Multiplies by 0.33 if costal and ports are enabled.
</td></tr>
<tr>
<td>SAM Launcher
</td>
<td>0.15 to 0.30
</td>
<td>Scales with difficulty.
</td></tr>
<tr>
<td>Missile Silo
</td>
<td>0.20
</td>
<td>First silo has a 0.40 ratio. Hard cap of 3 silos.
</td></tr>
<tr>
<td>City
</td>
<td>
</td>
<td>No quota; always attempted as a fallback once other quotas are fulfilled.
</td></tr></tbody></table>

The SAM ratio increases with difficulty: 0.15 on Easy, 0.20 on Medium, 0.25 on Hard, and 0.30 on Impossible. Cities are handled specially. They are not part of the quota-driven loop and have no upper limit other than gold availability and the perceived-cost mechanism. After the loop runs, if no other structure was built, the AI always attempts a city placement, provided cities are enabled.

Any structure type disabled in the lobby is skipped.

### Perceived cost {#Perceived_cost}

Construction is linked to nuclear weapon saving through a perceived-cost mechanism that inflates the apparent price of structures until the nation has banked enough gold for its preferred nuclear load out.

<table class="wikitable">
<tbody><tr>
<th>Lobby Setup
</th>
<th>Target Gold
</th></tr>
<tr>
<td>Missile Silos Disabled
</td>
<td>The cost of 1x SAM
</td></tr>
<tr>
<td>Team Mode
</td>
<td>The cost of 1x Hydrogen Bomb
</td></tr>
<tr>
<td>MIRV-enabled (FFA style)
</td>
<td>The cost of 1x MIRV + 1x Hydrogen
</td></tr>
<tr>
<td>Hydrogen Bombs Only
</td>
<td>The cost of 5x Hydrogen Bombs
</td></tr>
<tr>
<td>Atom Bombs Only
</td>
<td>The cost of 20x Atom Bombs
</td></tr>
<tr>
<td>No Nukes
</td>
<td>The cost of 1x SAM
</td></tr></tbody></table>

While the nation's gold is below their target, the perceived cost of a structure is <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{Perceived Cost}}=\lceil {\text{Real Cost}}\times (1+k\cdot n)\rceil }}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>Perceived Cost</mtext>
            </mrow>
            <mo>=</mo>
            <mo fence="false" stretchy="false">⌈<!-- ⌈ --></mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>Real Cost</mtext>
            </mrow>
            <mo>×<!-- × --></mo>
            <mo stretchy="false">(</mo>
            <mn>1</mn>
            <mo>+</mo>
            <mi>k</mi>
            <mo>⋅<!-- ⋅ --></mo>
            <mi>n</mi>
            <mo stretchy="false">)</mo>
            <mo fence="false" stretchy="false">⌉<!-- ⌉ --></mo>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{Perceived Cost}}=\lceil {\text{Real Cost}}\times (1+k\cdot n)\rceil }}</annotation>
  </semantics>
</math></span></span> where <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle n}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>n</mi>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle n}}</annotation>
  </semantics>
</math></span></span> is the number of that structure type already owned and <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle k}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>k</mi>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle k}}</annotation>
  </semantics>
</math></span></span> is a type-specific inflation rate:

- Most structures use <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle k=1}}"> <semantics> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="true" scriptlevel="0"> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="true" scriptlevel="0"> <mi>k</mi> <mo>=</mo> <mn>1</mn> </mstyle> </mrow> </mstyle> </mrow> <annotation encoding="application/x-tex">{\displaystyle {\displaystyle k=1}}</annotation> </semantics> </math></span></span> meaning each existing city effectively doubles the marginal cost of building another.
- SAM launchers use <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle k=0.3}}"> <semantics> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="true" scriptlevel="0"> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="true" scriptlevel="0"> <mi>k</mi> <mo>=</mo> <mn>0.3</mn> </mstyle> </mrow> </mstyle> </mrow> <annotation encoding="application/x-tex">{\displaystyle {\displaystyle k=0.3}}</annotation> </semantics> </math></span></span>.

Once gold reaches the save-up target, perceived cost equals real cost, and the nation can build at normal prices. After a large purchase depletes the bank, inflation returns.

### Building and upgrading {#Building_and_upgrading}

When a nation's total structure count divided by tiles owned exceeds approximately one per 1,500 tiles the AI considers upgrading an existing structure of the target type rather than building a new one, provided the type supports upgrades. If at least one upgradable structure of that type exists, the AI selects an upgrade target.

On Easy, a random eligible structure is chosen 70% of the time, versus on Hard and Impossible, the AI scores candidates by SAM coverage weighted by SAM level and picks the best, with a 50% chance of selecting the second or third best instead. Upgrade percentages vary with difficulty: roughly 70%/40%/25%/10% from Easy to Impossible reflect how often randomness overrides scoring.

If structures of the target type exist but all are currently upgrading, the AI waits rather than building new ones, except when zero of that type exist.

### Tile selection {#Tile_selection}

The AI samples up to 25 candidate tiles, evaluates each against type-specific scoring criteria, and selects the highest-scoring tile that passes the standard build validity check.

For ports, candidates are random shore tiles on water that shares an ocean or lake component with at least one other player; isolated water bodies do not qualify, since ports there cannot generate trade. As of [Update 33.0](/Update_33.0), the AI also avoids placing ports on small lakes. For all other structures, candidates are random owned tiles within the territory's bounding box, with up to 100 attempts per sample to find a valid owned tile.

Scoring uses two distance constants derived from nuclear configuration: the border spacing equals the outer atom bomb blast radius, and the structure spacing is twice that value. These caps prevent scoring from continuing to reward distance indefinitely.

<table class="wikitable">
<caption>
</caption>
<tbody><tr>
<th>Structure Type
</th>
<th>Scoring Summary
</th></tr>
<tr>
<td>Missile Silo + City
</td>
<td>
<ul><li>Terrain magnitude, rewarding higher ground.</li>
<li>Distance from the border up to the border spacing cap.</li>
<li>Distance from another same-type structure up to the same-type structure cap.</li>
<li><b>City only</b>: Distance from factories.</li></ul>
</td></tr>
<tr>
<td>Ports
</td>
<td>
<ul><li>Distance from other ports (encourages spread).</li></ul>
</td></tr>
<tr>
<td>Factory
</td>
<td>
<ul><li>Terrain magnitude, rewarding higher ground.</li>
<li>Distance from the border up to the border spacing cap.</li>
<li>Distance from another same-type structure up to the same-type structure cap.</li>
<li>Distance from cities.</li>
<li>Costal nations build fewer factories due to 0.33 ratio.</li></ul>
</td></tr>
<tr>
<td>SAM Launcher
</td>
<td>
<ul><li>Terrain magnitude, rewarding higher ground.</li>
<li>Distance from the border up to the border spacing cap.</li>
<li>Distance from another same-type structure up to the same-type structure cap.</li>
<li><b>Medium and above:</b> Bonus scoring for every city, factory, port or silo within SAM range.</li>
<li><b>Hard/Impossible:</b>  25% chance that AI shifts to covering <b>under-protected</b> structures, weighing by <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\frac {w}{(1+{\text{Existing Coverage}})}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mi>w</mi>
                <mrow>
                  <mo stretchy="false">(</mo>
                  <mn>1</mn>
                  <mo>+</mo>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mtext>Existing Coverage</mtext>
                  </mrow>
                  <mo stretchy="false">)</mo>
                </mrow>
              </mfrac>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\frac {w}{(1+{\text{Existing Coverage}})}}}}</annotation>
  </semantics>
</math></span></span></li></ul>
</td></tr></tbody></table>

### Rail Connectivity {#Rail_Connectivity}

On harder difficulties, factory and city placement also considers the rail network. The chance that connectivity scoring applies on a given call depends on difficulty: never on Easy, roughly 60% on Medium, roughly 75% on Hard, and always on Impossible.

When active, the AI builds a list of reachable train stations once per call. Each station is weighted by its source: the nation's own city, port, or factory stations receive a weight equivalent to the ratio of self-trade gold to ally-trade gold, approximately 0.29. Stations belonging to teammates weigh 1.0; stations belonging to allies or other tradeable players weigh 0.71. Bot stations and embargoed players are excluded.

For a candidate tile, the AI looks at stations within the train range, which is between 15 and 100 tiles by squared distance, groups them by cluster, and takes the maximum weight in range from each cluster. Isolated stations contribute their weight individually. The sum is multiplied by the structure spacing constant and added to the tile's existing score.

The effect is that nations on harder difficulties place factories and cities to connect into profitable rail networks, particularly favoring proximity to ally infrastructure, rather than placing them on terrain considerations alone.

## See also {#See_also}

- [Bots](/Bots)
