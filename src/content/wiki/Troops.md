---
title: "Troops"
section: "Units"
cats: ["All stub articles","Stubs"]
---
<div role="note" class="metadata plainlinks asbox stub"><table role="presentation"><tbody><tr class="noresize"><td><p class="asbox-body">This article is a stub. You can help the wiki by <a rel="nofollow" class="external text" href="/Troops">expanding it</a>.</p></td></tr></tbody></table><div class="navbar plainlinks hlist navbar-mini"><ul><li class="nv-view"><abbr title="View this template">v</abbr></li><li class="nv-talk"><span class="wiki-deadlink"><abbr title="Discuss this template">t</abbr></span></li><li class="nv-edit"><span class="wiki-deadlink"><abbr title="Edit this template">e</abbr></span></li></ul></div></div>

**Troops** are one of the two main resources in OpenFront, the second being [gold](/Gold). They are used to attack and defend territory.

## Gaining Troops {#Gaining_Troops}

Troops are gained every tick (1/10th of a second) with the formula

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle toAdd=(10+{\frac {currentTroops^{0.73}}{4}})*(1-{\frac {currentTroops}{maxTroops}})}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>t</mi>
            <mi>o</mi>
            <mi>A</mi>
            <mi>d</mi>
            <mi>d</mi>
            <mo>=</mo>
            <mo stretchy="false">(</mo>
            <mn>10</mn>
            <mo>+</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mrow>
                  <mi>c</mi>
                  <mi>u</mi>
                  <mi>r</mi>
                  <mi>r</mi>
                  <mi>e</mi>
                  <mi>n</mi>
                  <mi>t</mi>
                  <mi>T</mi>
                  <mi>r</mi>
                  <mi>o</mi>
                  <mi>o</mi>
                  <mi>p</mi>
                  <msup>
                    <mi>s</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                      <mn>0.73</mn>
                    </mrow>
                  </msup>
                </mrow>
                <mn>4</mn>
              </mfrac>
            </mrow>
            <mo stretchy="false">)</mo>
            <mo>∗<!-- ∗ --></mo>
            <mo stretchy="false">(</mo>
            <mn>1</mn>
            <mo>−<!-- − --></mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mrow>
                  <mi>c</mi>
                  <mi>u</mi>
                  <mi>r</mi>
                  <mi>r</mi>
                  <mi>e</mi>
                  <mi>n</mi>
                  <mi>t</mi>
                  <mi>T</mi>
                  <mi>r</mi>
                  <mi>o</mi>
                  <mi>o</mi>
                  <mi>p</mi>
                  <mi>s</mi>
                </mrow>
                <mrow>
                  <mi>m</mi>
                  <mi>a</mi>
                  <mi>x</mi>
                  <mi>T</mi>
                  <mi>r</mi>
                  <mi>o</mi>
                  <mi>o</mi>
                  <mi>p</mi>
                  <mi>s</mi>
                </mrow>
              </mfrac>
            </mrow>
            <mo stretchy="false">)</mo>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle toAdd=(10+{\frac {currentTroops^{0.73}}{4}})*(1-{\frac {currentTroops}{maxTroops}})}}</annotation>
  </semantics>
</math></span></span>

If you are at max troops, you will not gain any more.

Deriving this formula tells us that the maximum troop gain rate is achieved at **42%**, meaning that after this point, troop gain starts slowing down.

You can see your current troop gain in the UI in brackets after your maximum troop count.

[Bots](/Bots) and [Nations](/Nations) modify their troop gain by a modifier based on their type and the game's difficulty.

## Gaining Max Troops {#Gaining_Max_Troops}

Maximum troops are calculated based on territory land mass (owned tile count), and city count. And is given by the formula

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle maxTroops=2*(numTilesOwned^{0.6}*1000+50000)+numCitiesOwned*250000}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>m</mi>
            <mi>a</mi>
            <mi>x</mi>
            <mi>T</mi>
            <mi>r</mi>
            <mi>o</mi>
            <mi>o</mi>
            <mi>p</mi>
            <mi>s</mi>
            <mo>=</mo>
            <mn>2</mn>
            <mo>∗<!-- ∗ --></mo>
            <mo stretchy="false">(</mo>
            <mi>n</mi>
            <mi>u</mi>
            <mi>m</mi>
            <mi>T</mi>
            <mi>i</mi>
            <mi>l</mi>
            <mi>e</mi>
            <mi>s</mi>
            <mi>O</mi>
            <mi>w</mi>
            <mi>n</mi>
            <mi>e</mi>
            <msup>
              <mi>d</mi>
              <mrow class="MJX-TeXAtom-ORD">
                <mn>0.6</mn>
              </mrow>
            </msup>
            <mo>∗<!-- ∗ --></mo>
            <mn>1000</mn>
            <mo>+</mo>
            <mn>50000</mn>
            <mo stretchy="false">)</mo>
            <mo>+</mo>
            <mi>n</mi>
            <mi>u</mi>
            <mi>m</mi>
            <mi>C</mi>
            <mi>i</mi>
            <mi>t</mi>
            <mi>i</mi>
            <mi>e</mi>
            <mi>s</mi>
            <mi>O</mi>
            <mi>w</mi>
            <mi>n</mi>
            <mi>e</mi>
            <mi>d</mi>
            <mo>∗<!-- ∗ --></mo>
            <mn>250000</mn>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle maxTroops=2*(numTilesOwned^{0.6}*1000+50000)+numCitiesOwned*250000}}</annotation>
  </semantics>
</math></span></span>

The **Infinite Troops** setting (available in [Singleplayer](/Single_Player) and private lobbies) sets the maximum to 1000000000 (though in game, it is only shown as 100M).

Bots and Nations modify their max troops based on their type and the game's difficulty.

## See also {#See_also}

- [Combat](/Combat)
- [Transport Ship](/Transport_Ship)
