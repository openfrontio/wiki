---
title: "Combat"
section: "Combat & mechanics"
cats: []
---
**Combat** is Openfront's main mechanic, allowing players, [Bots](/Bots), and [Nations](/Nations) to spend [Troops](/Troops) and time in order to gain territory. Additionally, players and nations may use [Nukes](/Nuke) fired from [Missile Silos](/Missile_Silo) to destroy territory and [infrastructure](/Buildings).

## Ground combat {#Ground_combat}

Ground combat is the main form of attacking that a player may do. It is performed by left clicking on any territory your territory borders. This will send an attack towards all territory with the same owner you have borders with.

Players may decide how many troops they will send into combat with the Attack Ratio slider at the bottom left of the UI. Once an attack is launched, the number of attacking troops is immediately removed from the player's total troop count, usually changing the troop gain rate. By clicking on a territory you are already attacking, you may add more troops into the same attack. In almost all situations, it is ill advised to send 100% of your troops into any attack, as this will **significantly** decrease your troop gain rate, and a 3rd party attacker may take over your land while you are attacking the first defender.

When defending, all of your troops which are a part of your max troop count act as defenders. You may send troops from defending to counterattacking, resulting in an equal decrease of your troops as your attacker's. This is sometimes wanted, and sometimes unwanted.

if you conquer all tiles of an enemy, you will gain all of their gold as a reward.

The attack speed and attack efficiency (how many troops are lost on each side) depends on many factors, namely:

- Type of attacker and defender (player, bot, nation)
- Amount of [Tiles](/Tile) owned by attacker and defender
- [Difficulty](/Difficulty) of game (for nations)
- [Terrain](/Terrain)
- Presence of [Defense Posts](/Defense_Post)
- Presence of [Fallout](/Fallout)
- Ratio of attacking and defending troops
- Size of borders between attacker and defender (implicit)
- Defender's connection status (for players)
- Attacker's and defender's [Traitor](/Traitor) debuff
- AFK status of defender

The fastest and most efficient attack would be one by an extremely large player towards a traitor bot, with a 2x the amount of attackers over defenders, on the easiest terrain, without defense posts with extremely tiny borders.

### Calculation {#Calculation}

#### Attack efficiency {#Attack_efficiency}

The amount of attacking troops lost for each [Tile](/Tile) is calculated by the following function.

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{attackerTroopLoss(tileOwner)}}={\begin{cases}0.8*{\text{terrainDef}}*{\text{defensePost}}*{\text{botDebuff}}*{\text{largeAttackerBuff}}*{\text{largeDefenderDebuff}}*{\text{traitorDebuff}}*{\text{clampedTroopRatio}}&amp;{\text{if player or nation or bot}}&amp;\\{\frac {{\text{terrainDef}}*{\text{falloutDef}}}{\text{attackerTypeBuff}}}&amp;{\text{if wilderness}}\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>attackerTroopLoss(tileOwner)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>0.8</mn>
                      <mo>∗<!-- ∗ --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>terrainDef</mtext>
                      </mrow>
                      <mo>∗<!-- ∗ --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>defensePost</mtext>
                      </mrow>
                      <mo>∗<!-- ∗ --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>botDebuff</mtext>
                      </mrow>
                      <mo>∗<!-- ∗ --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>largeAttackerBuff</mtext>
                      </mrow>
                      <mo>∗<!-- ∗ --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>largeDefenderDebuff</mtext>
                      </mrow>
                      <mo>∗<!-- ∗ --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>traitorDebuff</mtext>
                      </mrow>
                      <mo>∗<!-- ∗ --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>clampedTroopRatio</mtext>
                      </mrow>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if player or nation or bot</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mfrac>
                          <mrow>
                            <mrow class="MJX-TeXAtom-ORD">
                              <mtext>terrainDef</mtext>
                            </mrow>
                            <mo>∗<!-- ∗ --></mo>
                            <mrow class="MJX-TeXAtom-ORD">
                              <mtext>falloutDef</mtext>
                            </mrow>
                          </mrow>
                          <mtext>attackerTypeBuff</mtext>
                        </mfrac>
                      </mrow>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if wilderness</mtext>
                      </mrow>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{attackerTroopLoss(tileOwner)}}={\begin{cases}0.8*{\text{terrainDef}}*{\text{defensePost}}*{\text{botDebuff}}*{\text{largeAttackerBuff}}*{\text{largeDefenderDebuff}}*{\text{traitorDebuff}}*{\text{clampedTroopRatio}}&amp;{\text{if player or nation or bot}}&amp;\\{\frac {{\text{terrainDef}}*{\text{falloutDef}}}{\text{attackerTypeBuff}}}&amp;{\text{if wilderness}}\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

Where:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{terrainDef(tileTerrainType)}}={\begin{cases}0.8&amp;{\text{if plains}}&amp;\\5&amp;{\text{if highlands}}&amp;\\1.2&amp;{\text{if mountains}}\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>terrainDef(tileTerrainType)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>0.8</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if plains</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>5</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if highlands</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>1.2</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if mountains</mtext>
                      </mrow>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{terrainDef(tileTerrainType)}}={\begin{cases}0.8&amp;{\text{if plains}}&amp;\\5&amp;{\text{if highlands}}&amp;\\1.2&amp;{\text{if mountains}}\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{defensePost(isDefensePostInRangeOfAttackedTile)}}={\begin{cases}5&amp;{\text{if yes}}&amp;\\1&amp;{\text{if no}}\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>defensePost(isDefensePostInRangeOfAttackedTile)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>5</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if yes</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>1</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if no</mtext>
                      </mrow>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{defensePost(isDefensePostInRangeOfAttackedTile)}}={\begin{cases}5&amp;{\text{if yes}}&amp;\\1&amp;{\text{if no}}\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{botDebuff(isDefenderBot)}}={\begin{cases}0.8&amp;{\text{if yes}}&amp;\\1&amp;{\text{if no}}\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>botDebuff(isDefenderBot)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>0.8</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if yes</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>1</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if no</mtext>
                      </mrow>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{botDebuff(isDefenderBot)}}={\begin{cases}0.8&amp;{\text{if yes}}&amp;\\1&amp;{\text{if no}}\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{largeAttackerBuff(attackerNumTilesOwned)}}={\begin{cases}1&amp;{\text{if }}{\text{numTilesOwned}}<100000\\[4pt]\left({\frac {100000}{\text{attackerNumTilesOwned}}}\right)^{0.7}&amp;{\text{if }}{\text{attackerNumTilesOwned}}\geq 100000\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>largeAttackerBuff(attackerNumTilesOwned)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing="0.6em 0.2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>1</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if&nbsp;</mtext>
                      </mrow>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>numTilesOwned</mtext>
                      </mrow>
                      <mo>&lt;</mo>
                      <mn>100000</mn>
                    </mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <msup>
                        <mrow>
                          <mo>(</mo>
                          <mrow class="MJX-TeXAtom-ORD">
                            <mfrac>
                              <mn>100000</mn>
                              <mtext>attackerNumTilesOwned</mtext>
                            </mfrac>
                          </mrow>
                          <mo>)</mo>
                        </mrow>
                        <mrow class="MJX-TeXAtom-ORD">
                          <mn>0.7</mn>
                        </mrow>
                      </msup>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if&nbsp;</mtext>
                      </mrow>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>attackerNumTilesOwned</mtext>
                      </mrow>
                      <mo>≥<!-- ≥ --></mo>
                      <mn>100000</mn>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{largeAttackerBuff(attackerNumTilesOwned)}}={\begin{cases}1&amp;{\text{if }}{\text{numTilesOwned}}&lt;100000\\[4pt]\left({\frac {100000}{\text{attackerNumTilesOwned}}}\right)^{0.7}&amp;{\text{if }}{\text{attackerNumTilesOwned}}\geq 100000\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{largeDefenderDebuff(numTilesOwned)}}=0.7+0.3*\left(1-{\frac {1}{1+e^{\left(-{\frac {\ln(2)}{50000}}*({\text{defenderNumTilesOwned}}-150000)\right)}}}\right)}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>largeDefenderDebuff(numTilesOwned)</mtext>
            </mrow>
            <mo>=</mo>
            <mn>0.7</mn>
            <mo>+</mo>
            <mn>0.3</mn>
            <mo>∗<!-- ∗ --></mo>
            <mrow>
              <mo>(</mo>
              <mrow>
                <mn>1</mn>
                <mo>−<!-- − --></mo>
                <mrow class="MJX-TeXAtom-ORD">
                  <mfrac>
                    <mn>1</mn>
                    <mrow>
                      <mn>1</mn>
                      <mo>+</mo>
                      <msup>
                        <mi>e</mi>
                        <mrow class="MJX-TeXAtom-ORD">
                          <mrow>
                            <mo>(</mo>
                            <mrow>
                              <mo>−<!-- − --></mo>
                              <mrow class="MJX-TeXAtom-ORD">
                                <mfrac>
                                  <mrow>
                                    <mi>ln</mi>
                                    <mo>⁡<!-- ⁡ --></mo>
                                    <mo stretchy="false">(</mo>
                                    <mn>2</mn>
                                    <mo stretchy="false">)</mo>
                                  </mrow>
                                  <mn>50000</mn>
                                </mfrac>
                              </mrow>
                              <mo>∗<!-- ∗ --></mo>
                              <mo stretchy="false">(</mo>
                              <mrow class="MJX-TeXAtom-ORD">
                                <mtext>defenderNumTilesOwned</mtext>
                              </mrow>
                              <mo>−<!-- − --></mo>
                              <mn>150000</mn>
                              <mo stretchy="false">)</mo>
                            </mrow>
                            <mo>)</mo>
                          </mrow>
                        </mrow>
                      </msup>
                    </mrow>
                  </mfrac>
                </mrow>
              </mrow>
              <mo>)</mo>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{largeDefenderDebuff(numTilesOwned)}}=0.7+0.3*\left(1-{\frac {1}{1+e^{\left(-{\frac {\ln(2)}{50000}}*({\text{defenderNumTilesOwned}}-150000)\right)}}}\right)}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{traitorDebuff(isDefenderTraitor)}}={\begin{cases}0.8&amp;{\text{if yes}}&amp;\\1&amp;{\text{if no}}\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>traitorDebuff(isDefenderTraitor)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>0.8</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if yes</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>1</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if no</mtext>
                      </mrow>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{traitorDebuff(isDefenderTraitor)}}={\begin{cases}0.8&amp;{\text{if yes}}&amp;\\1&amp;{\text{if no}}\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{ratio(defenderTroops, attackerTroops)}}={\frac {\text{defenderTroops}}{\text{attackerTroops}}},{\text{clampedTroopRatio(ratio)}}={\begin{cases}0.6&amp;{\text{if }}{\text{ratio}}\leq 0.6&amp;\\2&amp;{\text{if }}{\text{ratio}}\geq 2&amp;\\{\text{ratio}}&amp;{\text{if }}0.6<{\text{ratio}}<2\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>ratio(defenderTroops, attackerTroops)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mtext>defenderTroops</mtext>
                <mtext>attackerTroops</mtext>
              </mfrac>
            </mrow>
            <mo>,</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>clampedTroopRatio(ratio)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>0.6</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if&nbsp;</mtext>
                      </mrow>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>ratio</mtext>
                      </mrow>
                      <mo>≤<!-- ≤ --></mo>
                      <mn>0.6</mn>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>2</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if&nbsp;</mtext>
                      </mrow>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>ratio</mtext>
                      </mrow>
                      <mo>≥<!-- ≥ --></mo>
                      <mn>2</mn>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>ratio</mtext>
                      </mrow>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if&nbsp;</mtext>
                      </mrow>
                      <mn>0.6</mn>
                      <mo>&lt;</mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>ratio</mtext>
                      </mrow>
                      <mo>&lt;</mo>
                      <mn>2</mn>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{ratio(defenderTroops, attackerTroops)}}={\frac {\text{defenderTroops}}{\text{attackerTroops}}},{\text{clampedTroopRatio(ratio)}}={\begin{cases}0.6&amp;{\text{if }}{\text{ratio}}\leq 0.6&amp;\\2&amp;{\text{if }}{\text{ratio}}\geq 2&amp;\\{\text{ratio}}&amp;{\text{if }}0.6&lt;{\text{ratio}}&lt;2\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{attackerTypeBuff(attackerType)}}={\begin{cases}10&amp;{\text{if bot}}&amp;\\5&amp;{\text{if player or nation}}\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>attackerTypeBuff(attackerType)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>10</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if bot</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>5</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if player or nation</mtext>
                      </mrow>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{attackerTypeBuff(attackerType)}}={\begin{cases}10&amp;{\text{if bot}}&amp;\\5&amp;{\text{if player or nation}}\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{fallutRatio}}={\frac {\text{numAllFalloutTiles}}{\text{numAllTiles}}},{\text{falloutDef(isTileFallout)}}={\begin{cases}5-{\text{falloutRatio}}*2&amp;{\text{if yes}}&amp;\\1&amp;{\text{if no}}\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>fallutRatio</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mtext>numAllFalloutTiles</mtext>
                <mtext>numAllTiles</mtext>
              </mfrac>
            </mrow>
            <mo>,</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>falloutDef(isTileFallout)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>5</mn>
                      <mo>−<!-- − --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>falloutRatio</mtext>
                      </mrow>
                      <mo>∗<!-- ∗ --></mo>
                      <mn>2</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if yes</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>1</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if no</mtext>
                      </mrow>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{fallutRatio}}={\frac {\text{numAllFalloutTiles}}{\text{numAllTiles}}},{\text{falloutDef(isTileFallout)}}={\begin{cases}5-{\text{falloutRatio}}*2&amp;{\text{if yes}}&amp;\\1&amp;{\text{if no}}\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

The amount of defending troops lost for each tile is calculated by the following function.

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{defenderTroopLoss(tileOwner)}}={\begin{cases}{\frac {\text{defenderTroops}}{\text{defnderNumTilesOwned}}}&amp;{\text{if player or bot or nation}}&amp;\\0&amp;{\text{if wilderness}}\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>defenderTroopLoss(tileOwner)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mfrac>
                          <mtext>defenderTroops</mtext>
                          <mtext>defnderNumTilesOwned</mtext>
                        </mfrac>
                      </mrow>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if player or bot or nation</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>0</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if wilderness</mtext>
                      </mrow>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{defenderTroopLoss(tileOwner)}}={\begin{cases}{\frac {\text{defenderTroops}}{\text{defnderNumTilesOwned}}}&amp;{\text{if player or bot or nation}}&amp;\\0&amp;{\text{if wilderness}}\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

If a player has left the game (is AFK) and is on the same team as the attacker, no troops are lost by the attacker when attacking them.

#### Attack speed {#Attack_speed}

Attack speed is expressed as [Ticks](/Tick) per tile used, meaning that the lower the number, the faster the attack goes.

Generally, players want their attacks to be as fast as possible, however, in certain situations, it can be useful to have a very slow attack, as this allows you to put in more troops into an attack than your maximum population.

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{speed(tileOwner)}}={\begin{cases}{\text{terrainSpeed}}*{\text{largeDefenderSpeedDebuff}}*{\text{largeAttackerSpeedBuff}}*{\text{defensePostSpeedDebuff}}*{\text{traitorSpeedBuff}}*{\text{clampedSpeedAttackRatio}}&amp;{\text{if player or nation or bot}}&amp;\\{\text{clampedWildernessSpeed}}&amp;{\text{if wilderness}}\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>speed(tileOwner)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>terrainSpeed</mtext>
                      </mrow>
                      <mo>∗<!-- ∗ --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>largeDefenderSpeedDebuff</mtext>
                      </mrow>
                      <mo>∗<!-- ∗ --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>largeAttackerSpeedBuff</mtext>
                      </mrow>
                      <mo>∗<!-- ∗ --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>defensePostSpeedDebuff</mtext>
                      </mrow>
                      <mo>∗<!-- ∗ --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>traitorSpeedBuff</mtext>
                      </mrow>
                      <mo>∗<!-- ∗ --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>clampedSpeedAttackRatio</mtext>
                      </mrow>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if player or nation or bot</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>clampedWildernessSpeed</mtext>
                      </mrow>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if wilderness</mtext>
                      </mrow>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{speed(tileOwner)}}={\begin{cases}{\text{terrainSpeed}}*{\text{largeDefenderSpeedDebuff}}*{\text{largeAttackerSpeedBuff}}*{\text{defensePostSpeedDebuff}}*{\text{traitorSpeedBuff}}*{\text{clampedSpeedAttackRatio}}&amp;{\text{if player or nation or bot}}&amp;\\{\text{clampedWildernessSpeed}}&amp;{\text{if wilderness}}\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

Where:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{terrainSpeed(tileTerrainType)}}={\begin{cases}16.5&amp;{\text{if plains}}&amp;\\20&amp;{\text{if highlands}}&amp;\\25&amp;{\text{if mountains}}\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>terrainSpeed(tileTerrainType)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>16.5</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if plains</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>20</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if highlands</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>25</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if mountains</mtext>
                      </mrow>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{terrainSpeed(tileTerrainType)}}={\begin{cases}16.5&amp;{\text{if plains}}&amp;\\20&amp;{\text{if highlands}}&amp;\\25&amp;{\text{if mountains}}\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{largeDefenderSpeedDebuff(numTilesOwned)}}=0.7+0.3*\left(1-{\frac {1}{1+e^{\left(-{\frac {\ln(2)}{50000}}*({\text{defenderNumTilesOwned}}-150000)\right)}}}\right)}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>largeDefenderSpeedDebuff(numTilesOwned)</mtext>
            </mrow>
            <mo>=</mo>
            <mn>0.7</mn>
            <mo>+</mo>
            <mn>0.3</mn>
            <mo>∗<!-- ∗ --></mo>
            <mrow>
              <mo>(</mo>
              <mrow>
                <mn>1</mn>
                <mo>−<!-- − --></mo>
                <mrow class="MJX-TeXAtom-ORD">
                  <mfrac>
                    <mn>1</mn>
                    <mrow>
                      <mn>1</mn>
                      <mo>+</mo>
                      <msup>
                        <mi>e</mi>
                        <mrow class="MJX-TeXAtom-ORD">
                          <mrow>
                            <mo>(</mo>
                            <mrow>
                              <mo>−<!-- − --></mo>
                              <mrow class="MJX-TeXAtom-ORD">
                                <mfrac>
                                  <mrow>
                                    <mi>ln</mi>
                                    <mo>⁡<!-- ⁡ --></mo>
                                    <mo stretchy="false">(</mo>
                                    <mn>2</mn>
                                    <mo stretchy="false">)</mo>
                                  </mrow>
                                  <mn>50000</mn>
                                </mfrac>
                              </mrow>
                              <mo>∗<!-- ∗ --></mo>
                              <mo stretchy="false">(</mo>
                              <mrow class="MJX-TeXAtom-ORD">
                                <mtext>defenderNumTilesOwned</mtext>
                              </mrow>
                              <mo>−<!-- − --></mo>
                              <mn>150000</mn>
                              <mo stretchy="false">)</mo>
                            </mrow>
                            <mo>)</mo>
                          </mrow>
                        </mrow>
                      </msup>
                    </mrow>
                  </mfrac>
                </mrow>
              </mrow>
              <mo>)</mo>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{largeDefenderSpeedDebuff(numTilesOwned)}}=0.7+0.3*\left(1-{\frac {1}{1+e^{\left(-{\frac {\ln(2)}{50000}}*({\text{defenderNumTilesOwned}}-150000)\right)}}}\right)}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{largeAttackerSpeedBuff(attackerNumTilesOwned)}}={\begin{cases}1&amp;{\text{if }}{\text{numTilesOwned}}<100000\\[4pt]\left({\frac {100000}{\text{attackerNumTilesOwned}}}\right)^{0.6}&amp;{\text{if }}{\text{attackerNumTilesOwned}}\geq 100000\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>largeAttackerSpeedBuff(attackerNumTilesOwned)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing="0.6em 0.2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>1</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if&nbsp;</mtext>
                      </mrow>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>numTilesOwned</mtext>
                      </mrow>
                      <mo>&lt;</mo>
                      <mn>100000</mn>
                    </mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <msup>
                        <mrow>
                          <mo>(</mo>
                          <mrow class="MJX-TeXAtom-ORD">
                            <mfrac>
                              <mn>100000</mn>
                              <mtext>attackerNumTilesOwned</mtext>
                            </mfrac>
                          </mrow>
                          <mo>)</mo>
                        </mrow>
                        <mrow class="MJX-TeXAtom-ORD">
                          <mn>0.6</mn>
                        </mrow>
                      </msup>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if&nbsp;</mtext>
                      </mrow>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>attackerNumTilesOwned</mtext>
                      </mrow>
                      <mo>≥<!-- ≥ --></mo>
                      <mn>100000</mn>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{largeAttackerSpeedBuff(attackerNumTilesOwned)}}={\begin{cases}1&amp;{\text{if }}{\text{numTilesOwned}}&lt;100000\\[4pt]\left({\frac {100000}{\text{attackerNumTilesOwned}}}\right)^{0.6}&amp;{\text{if }}{\text{attackerNumTilesOwned}}\geq 100000\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{traitorSpeedBuff(isDefenderTraitor)}}={\begin{cases}0.8&amp;{\text{if yes}}&amp;\\1&amp;{\text{if no}}\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>traitorSpeedBuff(isDefenderTraitor)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>0.8</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if yes</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>1</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if no</mtext>
                      </mrow>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{traitorSpeedBuff(isDefenderTraitor)}}={\begin{cases}0.8&amp;{\text{if yes}}&amp;\\1&amp;{\text{if no}}\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{ratio(defenderTroops, attackerTroops)}}={\frac {\text{defenderTroops}}{5*{\text{attackerTroops}}}},{\text{clampedTroopRatio(ratio)}}={\begin{cases}0.2&amp;{\text{if }}{\text{ratio}}\leq 0.2&amp;\\1.5&amp;{\text{if }}{\text{ratio}}\geq 1.5&amp;\\{\text{ratio}}&amp;{\text{if }}0.2<{\text{ratio}}<1.5\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>ratio(defenderTroops, attackerTroops)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mtext>defenderTroops</mtext>
                <mrow>
                  <mn>5</mn>
                  <mo>∗<!-- ∗ --></mo>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mtext>attackerTroops</mtext>
                  </mrow>
                </mrow>
              </mfrac>
            </mrow>
            <mo>,</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>clampedTroopRatio(ratio)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>0.2</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if&nbsp;</mtext>
                      </mrow>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>ratio</mtext>
                      </mrow>
                      <mo>≤<!-- ≤ --></mo>
                      <mn>0.2</mn>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>1.5</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if&nbsp;</mtext>
                      </mrow>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>ratio</mtext>
                      </mrow>
                      <mo>≥<!-- ≥ --></mo>
                      <mn>1.5</mn>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>ratio</mtext>
                      </mrow>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if&nbsp;</mtext>
                      </mrow>
                      <mn>0.2</mn>
                      <mo>&lt;</mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>ratio</mtext>
                      </mrow>
                      <mo>&lt;</mo>
                      <mn>1.5</mn>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{ratio(defenderTroops, attackerTroops)}}={\frac {\text{defenderTroops}}{5*{\text{attackerTroops}}}},{\text{clampedTroopRatio(ratio)}}={\begin{cases}0.2&amp;{\text{if }}{\text{ratio}}\leq 0.2&amp;\\1.5&amp;{\text{if }}{\text{ratio}}\geq 1.5&amp;\\{\text{ratio}}&amp;{\text{if }}0.2&lt;{\text{ratio}}&lt;1.5\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{wildSpeed}}={\frac {2000*\max({\text{terrainSpeed}}*{\text{defensePostSpeedDebuff}}*{\text{falloutSpeedDebuff}},10)}{\text{attackerTroops}}},{\text{clampedWildernessSpeed(wildSpeed)}}={\begin{cases}5&amp;{\text{if }}{\text{wildSpeed}}\leq 5&amp;\\100&amp;{\text{if }}{\text{wildSpeed}}\geq 100&amp;\\{\text{wildSpeed}}&amp;{\text{if }}5<{\text{wildSpeed}}<100\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>wildSpeed</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mrow>
                  <mn>2000</mn>
                  <mo>∗<!-- ∗ --></mo>
                  <mo movablelimits="true" form="prefix">max</mo>
                  <mo stretchy="false">(</mo>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mtext>terrainSpeed</mtext>
                  </mrow>
                  <mo>∗<!-- ∗ --></mo>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mtext>defensePostSpeedDebuff</mtext>
                  </mrow>
                  <mo>∗<!-- ∗ --></mo>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mtext>falloutSpeedDebuff</mtext>
                  </mrow>
                  <mo>,</mo>
                  <mn>10</mn>
                  <mo stretchy="false">)</mo>
                </mrow>
                <mtext>attackerTroops</mtext>
              </mfrac>
            </mrow>
            <mo>,</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>clampedWildernessSpeed(wildSpeed)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>5</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if&nbsp;</mtext>
                      </mrow>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>wildSpeed</mtext>
                      </mrow>
                      <mo>≤<!-- ≤ --></mo>
                      <mn>5</mn>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>100</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if&nbsp;</mtext>
                      </mrow>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>wildSpeed</mtext>
                      </mrow>
                      <mo>≥<!-- ≥ --></mo>
                      <mn>100</mn>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>wildSpeed</mtext>
                      </mrow>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if&nbsp;</mtext>
                      </mrow>
                      <mn>5</mn>
                      <mo>&lt;</mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>wildSpeed</mtext>
                      </mrow>
                      <mo>&lt;</mo>
                      <mn>100</mn>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{wildSpeed}}={\frac {2000*\max({\text{terrainSpeed}}*{\text{defensePostSpeedDebuff}}*{\text{falloutSpeedDebuff}},10)}{\text{attackerTroops}}},{\text{clampedWildernessSpeed(wildSpeed)}}={\begin{cases}5&amp;{\text{if }}{\text{wildSpeed}}\leq 5&amp;\\100&amp;{\text{if }}{\text{wildSpeed}}\geq 100&amp;\\{\text{wildSpeed}}&amp;{\text{if }}5&lt;{\text{wildSpeed}}&lt;100\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{fallutRatio}}={\frac {\text{numAllFalloutTiles}}{\text{numAllTiles}}},{\text{falloutSpeedDebuff(isTileFallout)}}={\begin{cases}5-{\text{falloutRatio}}*2&amp;{\text{if yes}}&amp;\\1&amp;{\text{if no}}\end{cases}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>fallutRatio</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mtext>numAllFalloutTiles</mtext>
                <mtext>numAllTiles</mtext>
              </mfrac>
            </mrow>
            <mo>,</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>falloutSpeedDebuff(isTileFallout)</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mrow>
                <mo>{</mo>
                <mtable columnalign="left left" rowspacing=".2em" columnspacing="1em" displaystyle="false">
                  <mtr>
                    <mtd>
                      <mn>5</mn>
                      <mo>−<!-- − --></mo>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>falloutRatio</mtext>
                      </mrow>
                      <mo>∗<!-- ∗ --></mo>
                      <mn>2</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if yes</mtext>
                      </mrow>
                    </mtd>
                    <mtd></mtd>
                  </mtr>
                  <mtr>
                    <mtd>
                      <mn>1</mn>
                    </mtd>
                    <mtd>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>if no</mtext>
                      </mrow>
                    </mtd>
                  </mtr>
                </mtable>
                <mo fence="true" stretchy="true" symmetric="true"></mo>
              </mrow>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{fallutRatio}}={\frac {\text{numAllFalloutTiles}}{\text{numAllTiles}}},{\text{falloutSpeedDebuff(isTileFallout)}}={\begin{cases}5-{\text{falloutRatio}}*2&amp;{\text{if yes}}&amp;\\1&amp;{\text{if no}}\end{cases}}}}</annotation>
  </semantics>
</math></span></span>

### Retreat {#Retreat}

A retreat is ordered immediately when requested by clicking the X next to the attack. The attack enters a retreating state and stops conquering further tiles, but the actual return of troops only executes after 20 ticks (about 2 seconds at the standard rate). Survivors are returned to the attacker's main troop pool.

A retreat from an attack against another player applies a 25% retreat penalty to the surviving troops.

### Annexation {#Annexation}

If you fully surround a territory, or if you split a territory into two disconnected parts where at least one doesn't have coastal borders, you get all of the surrounded territory instantly and with 0 defender troop loss.

<div role="note" class="hatnote navigation-not-searchable">See also: <a href="/Annexation" title="Annexation">Annexation</a></div>

## Naval combat {#Naval_combat}

Player may send up to 3 [Transport Ships](/Transport_Ship) to any territory. It is usually advised to send as few troops as possible per ship, as if a transport ship is sunk by a [Warship](/Warship), all troops on board are lost.

Naval attacks may be sent against territories you have borders with, which can help speed up attacks by focusing on important parts of the territory (such as easy territory with easy terrain, or many buildings), or by making [Annexation](/Annexation) possible for territories with coastal borders.

If a boat was headed for a territory, which then changes owners (even to an ally), you do not attack with all of your troops, however a single Tile gets conquered, which allows you to launch surprise attacks, as these small territories may be quite difficult to spot.

As of v26.16 there is a strategy colloquially named "boat stacking", which abuses the fact that troops in boats do not count towards your maximum population, allowing you to send with many troops a boat to a far-off land land, and then retreat it, to effectively increase your troop count way above your maximum.

### Retreat {#Retreat_2}

You may retreat a transport ship by clicking "X" next to the attack in the events panel. The ship will return to the tile it started at. There is no troop loss.

## Nuclear combat {#Nuclear_combat}

Players may launch [Nukes](/Nuke) using [Missile Silos](/Missile_Silo), and the may defend against nukes using [SAM Launchers](/SAM_Launcher). If a nuke lands, it will turn land in an area around the impact site into [Fallout.](/Fallout)

Nukes can destroy [Trade Ships](/Trade_Ship), [Transport Ships](/Transport_Ship), and [Warships](/Warship), and all land [Buildings](/Buildings), and units.

## Alliances {#Alliances}

Players in alliances may not conquer each other's land. If an ally launches a nuke into their ally's territory, they will automatically get the [Traitor](/Traitor) debuff, as long as they destroy 100 or more tiles of the ally's territory. As of v26.16 this grace amount of 100 tiles can be abused to destroy an ally's buildings on the coast (without becoming a traitor), particularly ports, by aiming an [Atom Bomb](/Atom_Bomb) in a way as to just barely graze the ally's port.

Nukes can destroy any units, including warships, without breaking alliances, as long as they do not destroy enough ally land.

You may conquer a single ally pixel without becoming a traitor by sending a transport ship into territory, which gets conquered by an ally while your ship is on its way.

## Teams {#Teams}

In a team game, teammates cannot conquer each other's land, unless the defender is AFK.

Players cannot launch nukes directly into teammates' territories, however, if a nuke's impact site is outside of teammates' territories, it may destroy the surrounding territory. This can be used to get borders with an opposing team, if you are blocked by your teammates, though it should be used with caution.
