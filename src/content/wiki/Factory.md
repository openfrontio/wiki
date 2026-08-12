---
title: "Factory"
section: "Buildings"
cats: ["Buildings"]
---
Factories are a [Building](/Buildings) that allows players to earn [Gold](/Gold) by connecting with other non-military buildings.

<figure typeof="mw:File/Thumb"><img src="/images/197px-Factory_from_upclose.png" decoding="async" width="197" height="182" class="mw-file-element" data-file-width="438" data-file-height="405"><figcaption>A <b>Factory</b>, viewed from upclose.</figcaption></figure>

## Mechanics {#Mechanics}

Factories spawn [trains](/Train) and [railroads](/Railroad) automatically when two or more connectable buildings have been placed within range on land. The connectable buildings are: **Factory**, [Port](/Port), and [City](/City), though only Port and City train stations pay out gold. The railroads can currently only travel directly in cardinal directions.

The distance within which a factory and another building can connect in is between 15 and 100 units, with each individual railroad connection having a maximum distance of 120 units.

Once a train reaches a station that pays out gold, both the station owner and the train owner receive the gold reward (unless a single player owns both, then they will get the reward just once). The amount of gold a train gives upon visiting a station depends on the relationship between train owner and the owner of the territory in which the train station's building is built at:

<figure typeof="mw:File/Thumb"><img src="/images/199px-Factory_stuff.png" decoding="async" width="199" height="165" class="mw-file-element" data-file-width="796" data-file-height="660"><figcaption>A <b>Factory</b> and <a href="/Port" title="Port">ports</a> connected by <a href="/Railroad" title="Railroad">Railroads</a> with a <a href="/Train" title="Train">Train</a> on the tracks</figcaption></figure>

<table class="wikitable">
<caption>Gold reward based on relationship
</caption>
<tbody><tr>
<th>Owner
</th>
<th>Gold Reward
</th></tr>
<tr>
<td>Allies
</td>
<td>50,000
</td></tr>
<tr>
<td>Neutral / Teammates
</td>
<td>25,000
</td></tr>
<tr>
<td>Self
</td>
<td>10,000
</td></tr>
<tr>
<td>Enemies / Embargoed
</td>
<td>0
</td></tr></tbody></table>

The probability of a train spawning during every tick is dictated by how many factories the player owns, given by the formula

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle spawnChance={\frac {1}{(numFactories+10)*20}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>s</mi>
            <mi>p</mi>
            <mi>a</mi>
            <mi>w</mi>
            <mi>n</mi>
            <mi>C</mi>
            <mi>h</mi>
            <mi>a</mi>
            <mi>n</mi>
            <mi>c</mi>
            <mi>e</mi>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mn>1</mn>
                <mrow>
                  <mo stretchy="false">(</mo>
                  <mi>n</mi>
                  <mi>u</mi>
                  <mi>m</mi>
                  <mi>F</mi>
                  <mi>a</mi>
                  <mi>c</mi>
                  <mi>t</mi>
                  <mi>o</mi>
                  <mi>r</mi>
                  <mi>i</mi>
                  <mi>e</mi>
                  <mi>s</mi>
                  <mo>+</mo>
                  <mn>10</mn>
                  <mo stretchy="false">)</mo>
                  <mo>∗<!-- ∗ --></mo>
                  <mn>20</mn>
                </mrow>
              </mfrac>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle spawnChance={\frac {1}{(numFactories+10)*20}}}}</annotation>
  </semantics>
</math></span></span>

This means that the more factories a player owns, the less likely it is **each individual one** will will spawn a train. The **overall** chance of a train spawning in your network, however, increases. The expected amount of trains is given by the formula

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle expectedOverallSpawnChance={\frac {numFactories}{(numFactories+10)*20}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>e</mi>
            <mi>x</mi>
            <mi>p</mi>
            <mi>e</mi>
            <mi>c</mi>
            <mi>t</mi>
            <mi>e</mi>
            <mi>d</mi>
            <mi>O</mi>
            <mi>v</mi>
            <mi>e</mi>
            <mi>r</mi>
            <mi>a</mi>
            <mi>l</mi>
            <mi>l</mi>
            <mi>S</mi>
            <mi>p</mi>
            <mi>a</mi>
            <mi>w</mi>
            <mi>n</mi>
            <mi>C</mi>
            <mi>h</mi>
            <mi>a</mi>
            <mi>n</mi>
            <mi>c</mi>
            <mi>e</mi>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mrow>
                  <mi>n</mi>
                  <mi>u</mi>
                  <mi>m</mi>
                  <mi>F</mi>
                  <mi>a</mi>
                  <mi>c</mi>
                  <mi>t</mi>
                  <mi>o</mi>
                  <mi>r</mi>
                  <mi>i</mi>
                  <mi>e</mi>
                  <mi>s</mi>
                </mrow>
                <mrow>
                  <mo stretchy="false">(</mo>
                  <mi>n</mi>
                  <mi>u</mi>
                  <mi>m</mi>
                  <mi>F</mi>
                  <mi>a</mi>
                  <mi>c</mi>
                  <mi>t</mi>
                  <mi>o</mi>
                  <mi>r</mi>
                  <mi>i</mi>
                  <mi>e</mi>
                  <mi>s</mi>
                  <mo>+</mo>
                  <mn>10</mn>
                  <mo stretchy="false">)</mo>
                  <mo>∗<!-- ∗ --></mo>
                  <mn>20</mn>
                </mrow>
              </mfrac>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle expectedOverallSpawnChance={\frac {numFactories}{(numFactories+10)*20}}}}</annotation>
  </semantics>
</math></span></span>

## Trivia {#Trivia}

The game's code keeps track of how many wagons each train is carrying, with a function for loading cargo, and managing where the locomotive is, but as of writing, there is no known gameplay usage of this data.

## See also {#See_also}

- [Train](/Train)
- [Railroad](/Railroad)
- [Update 24.0](/Update_24.0)
- [Update 25.0](/Update_25.0)
