---
title: "Attacking Guide"
section: "Guides"
cats: []
---
<table class="box-Update plainlinks metadata ambox ambox-content ambox-Update" role="presentation"><tbody><tr><td class="mbox-image"><div class="mbox-image-div"><span typeof="mw:File"><span><img alt="" src="/images/Red_clock.svg" decoding="async" width="42" height="42" class="mw-file-element" data-file-width="512" data-file-height="512"></span></span></div></td><td class="mbox-text"><div class="mbox-text-span">This article's factual accuracy may be compromised due to out-of-date information<b>.<span class="hide-when-compact"> Please help update this article to reflect recent events or newly available information. <br><small>Last update: v23.0</small></span></b></div></td></tr></tbody></table>

# Introduction {#Introduction}

Attacking in OpenFront.io - A Complete Guide _(for version v23)_

# Maximum Population {#Maximum_Population}

The maximum population in OpenFrontIO determines the upper limit of troops or resources a player can accumulate. It is influenced by several factors, including:

1. **Number of Tiles Owned**: The more tiles a player controls, the higher their maximum population.
2. **City Levels**: Higher-level cities contribute additional population capacity.
3. **Game Difficulty**: The difficulty setting modifies the maximum population for certain players (e.g., bots or "FakeHuman" players).
4. **Player Type**: Human players and bots have different scaling factors applied to their maximum population.

The formula for calculating the maximum population for human players (unless in "infinite troops" mode) is as follows:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{maxPop}}=2\cdot ({\text{basePop}})+{\text{cityBonus}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>maxPop</mtext>
            </mrow>
            <mo>=</mo>
            <mn>2</mn>
            <mo>⋅<!-- ⋅ --></mo>
            <mo stretchy="false">(</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>basePop</mtext>
            </mrow>
            <mo stretchy="false">)</mo>
            <mo>+</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>cityBonus</mtext>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{maxPop}}=2\cdot ({\text{basePop}})+{\text{cityBonus}}}}</annotation>
  </semantics>
</math></span></span>

Where:

- <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\textstyle {\text{basePop}}={\text{numTilesOwned}}^{0.6}\cdot 1000+50000000}"> <semantics> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="false" scriptlevel="0"> <mrow class="MJX-TeXAtom-ORD"> <mtext>basePop</mtext> </mrow> <mo>=</mo> <msup> <mrow class="MJX-TeXAtom-ORD"> <mtext>numTilesOwned</mtext> </mrow> <mrow class="MJX-TeXAtom-ORD"> <mn>0.6</mn> </mrow> </msup> <mo>⋅<!-- ⋅ --></mo> <mn>1000</mn> <mo>+</mo> <mn>50000000</mn> </mstyle> </mrow> <annotation encoding="application/x-tex">{\textstyle {\text{basePop}}={\text{numTilesOwned}}^{0.6}\cdot 1000+50000000}</annotation> </semantics> </math></span></span>
- <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\textstyle {\text{cityBonus}}={\text{sumOfCityLevels}}\cdot {\text{cityPopulationIncrease}}}"> <semantics> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="false" scriptlevel="0"> <mrow class="MJX-TeXAtom-ORD"> <mtext>cityBonus</mtext> </mrow> <mo>=</mo> <mrow class="MJX-TeXAtom-ORD"> <mtext>sumOfCityLevels</mtext> </mrow> <mo>⋅<!-- ⋅ --></mo> <mrow class="MJX-TeXAtom-ORD"> <mtext>cityPopulationIncrease</mtext> </mrow> </mstyle> </mrow> <annotation encoding="application/x-tex">{\textstyle {\text{cityBonus}}={\text{sumOfCityLevels}}\cdot {\text{cityPopulationIncrease}}}</annotation> </semantics> </math></span></span>

Currently, `cityPopulationIncrease` is defined at 25,000, meaning that for each city added, an additional 25,000 troops is added to the maximum population capacity. This maximum population formula ensures that players who control more territory and build higher-level cities can sustain larger populations, encouraging strategic expansion and resource management.

We can also see that players with minimum land and/or cities will still be provided some base value of capacity.

# Population Growth Formula {#Population_Growth_Formula}

In the game mechanics of OpenFrontIO, population growth is governed by a formula that balances the current population against the maximum population. This formula may change over time, but is currently defined in the `/src/core/configuration/DefaultConfig.ts` file in the OpenFrontIO repository ([[|OpenFrontIO GitHub Repository](https://github.com/openfrontio/OpenFrontIO)]).

The population growth per tick is given by:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{toAdd}}=\left(10+{\frac {{\text{currentPopulation}}^{0.73}}{4}}\right)\cdot \left(1-{\frac {\text{currentPopulation}}{\text{maxPopulation}}}\right)}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>toAdd</mtext>
            </mrow>
            <mo>=</mo>
            <mrow>
              <mo>(</mo>
              <mrow>
                <mn>10</mn>
                <mo>+</mo>
                <mrow class="MJX-TeXAtom-ORD">
                  <mfrac>
                    <msup>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mtext>currentPopulation</mtext>
                      </mrow>
                      <mrow class="MJX-TeXAtom-ORD">
                        <mn>0.73</mn>
                      </mrow>
                    </msup>
                    <mn>4</mn>
                  </mfrac>
                </mrow>
              </mrow>
              <mo>)</mo>
            </mrow>
            <mo>⋅<!-- ⋅ --></mo>
            <mrow>
              <mo>(</mo>
              <mrow>
                <mn>1</mn>
                <mo>−<!-- − --></mo>
                <mrow class="MJX-TeXAtom-ORD">
                  <mfrac>
                    <mtext>currentPopulation</mtext>
                    <mtext>maxPopulation</mtext>
                  </mfrac>
                </mrow>
              </mrow>
              <mo>)</mo>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{toAdd}}=\left(10+{\frac {{\text{currentPopulation}}^{0.73}}{4}}\right)\cdot \left(1-{\frac {\text{currentPopulation}}{\text{maxPopulation}}}\right)}}</annotation>
  </semantics>
</math></span></span>

Let:

1. <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle x={\text{currentPopulation}}}}"> <semantics> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="true" scriptlevel="0"> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="true" scriptlevel="0"> <mi>x</mi> <mo>=</mo> <mrow class="MJX-TeXAtom-ORD"> <mtext>currentPopulation</mtext> </mrow> </mstyle> </mrow> </mstyle> </mrow> <annotation encoding="application/x-tex">{\displaystyle {\displaystyle x={\text{currentPopulation}}}}</annotation> </semantics> </math></span></span>,
2. <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle M={\text{maxPopulation}}}}"> <semantics> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="true" scriptlevel="0"> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="true" scriptlevel="0"> <mi>M</mi> <mo>=</mo> <mrow class="MJX-TeXAtom-ORD"> <mtext>maxPopulation</mtext> </mrow> </mstyle> </mrow> </mstyle> </mrow> <annotation encoding="application/x-tex">{\displaystyle {\displaystyle M={\text{maxPopulation}}}}</annotation> </semantics> </math></span></span>,
3. <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle r={\frac {x}{M}}}}"> <semantics> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="true" scriptlevel="0"> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="true" scriptlevel="0"> <mi>r</mi> <mo>=</mo> <mrow class="MJX-TeXAtom-ORD"> <mfrac> <mi>x</mi> <mi>M</mi> </mfrac> </mrow> </mstyle> </mrow> </mstyle> </mrow> <annotation encoding="application/x-tex">{\displaystyle {\displaystyle r={\frac {x}{M}}}}</annotation> </semantics> </math></span></span>, where <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle r}}"> <semantics> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="true" scriptlevel="0"> <mrow class="MJX-TeXAtom-ORD"> <mstyle displaystyle="true" scriptlevel="0"> <mi>r</mi> </mstyle> </mrow> </mstyle> </mrow> <annotation encoding="application/x-tex">{\displaystyle {\displaystyle r}}</annotation> </semantics> </math></span></span> is the fraction of the maximum population.

Rewriting the formula in terms of <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle r}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>r</mi>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle r}}</annotation>
  </semantics>
</math></span></span>, we have:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle f(r)=\left(10+{\frac {(M\cdot r)^{0.73}}{4}}\right)\cdot (1-r)}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>f</mi>
            <mo stretchy="false">(</mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
            <mo>=</mo>
            <mrow>
              <mo>(</mo>
              <mrow>
                <mn>10</mn>
                <mo>+</mo>
                <mrow class="MJX-TeXAtom-ORD">
                  <mfrac>
                    <mrow>
                      <mo stretchy="false">(</mo>
                      <mi>M</mi>
                      <mo>⋅<!-- ⋅ --></mo>
                      <mi>r</mi>
                      <msup>
                        <mo stretchy="false">)</mo>
                        <mrow class="MJX-TeXAtom-ORD">
                          <mn>0.73</mn>
                        </mrow>
                      </msup>
                    </mrow>
                    <mn>4</mn>
                  </mfrac>
                </mrow>
              </mrow>
              <mo>)</mo>
            </mrow>
            <mo>⋅<!-- ⋅ --></mo>
            <mo stretchy="false">(</mo>
            <mn>1</mn>
            <mo>−<!-- − --></mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle f(r)=\left(10+{\frac {(M\cdot r)^{0.73}}{4}}\right)\cdot (1-r)}}</annotation>
  </semantics>
</math></span></span>

This formula is optimized at roughly 42%. The full derivation is below.

# Population Growth Derivation {#Population_Growth_Derivation}

Our goal is to find the value of <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle r}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>r</mi>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle r}}</annotation>
  </semantics>
</math></span></span> that maximizes <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle f(r)}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>f</mi>
            <mo stretchy="false">(</mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle f(r)}}</annotation>
  </semantics>
</math></span></span>, which corresponds to the optimal fraction of the maximum population for maximum growth.

Expanding <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle f(r)}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>f</mi>
            <mo stretchy="false">(</mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle f(r)}}</annotation>
  </semantics>
</math></span></span>, we get:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle f(r)=\left(10+{\frac {M^{0.73}\cdot r^{0.73}}{4}}\right)\cdot (1-r)}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>f</mi>
            <mo stretchy="false">(</mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
            <mo>=</mo>
            <mrow>
              <mo>(</mo>
              <mrow>
                <mn>10</mn>
                <mo>+</mo>
                <mrow class="MJX-TeXAtom-ORD">
                  <mfrac>
                    <mrow>
                      <msup>
                        <mi>M</mi>
                        <mrow class="MJX-TeXAtom-ORD">
                          <mn>0.73</mn>
                        </mrow>
                      </msup>
                      <mo>⋅<!-- ⋅ --></mo>
                      <msup>
                        <mi>r</mi>
                        <mrow class="MJX-TeXAtom-ORD">
                          <mn>0.73</mn>
                        </mrow>
                      </msup>
                    </mrow>
                    <mn>4</mn>
                  </mfrac>
                </mrow>
              </mrow>
              <mo>)</mo>
            </mrow>
            <mo>⋅<!-- ⋅ --></mo>
            <mo stretchy="false">(</mo>
            <mn>1</mn>
            <mo>−<!-- − --></mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle f(r)=\left(10+{\frac {M^{0.73}\cdot r^{0.73}}{4}}\right)\cdot (1-r)}}</annotation>
  </semantics>
</math></span></span>

Distribute <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle (1-r)}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mo stretchy="false">(</mo>
            <mn>1</mn>
            <mo>−<!-- − --></mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle (1-r)}}</annotation>
  </semantics>
</math></span></span>:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle f(r)=10\cdot (1-r)+{\frac {M^{0.73}\cdot r^{0.73}}{4}}\cdot (1-r)}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>f</mi>
            <mo stretchy="false">(</mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
            <mo>=</mo>
            <mn>10</mn>
            <mo>⋅<!-- ⋅ --></mo>
            <mo stretchy="false">(</mo>
            <mn>1</mn>
            <mo>−<!-- − --></mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
            <mo>+</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mrow>
                  <msup>
                    <mi>M</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                      <mn>0.73</mn>
                    </mrow>
                  </msup>
                  <mo>⋅<!-- ⋅ --></mo>
                  <msup>
                    <mi>r</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                      <mn>0.73</mn>
                    </mrow>
                  </msup>
                </mrow>
                <mn>4</mn>
              </mfrac>
            </mrow>
            <mo>⋅<!-- ⋅ --></mo>
            <mo stretchy="false">(</mo>
            <mn>1</mn>
            <mo>−<!-- − --></mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle f(r)=10\cdot (1-r)+{\frac {M^{0.73}\cdot r^{0.73}}{4}}\cdot (1-r)}}</annotation>
  </semantics>
</math></span></span>

Simplify further:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle f(r)=10-10r+{\frac {M^{0.73}\cdot r^{0.73}}{4}}-{\frac {M^{0.73}\cdot r^{1.73}}{4}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>f</mi>
            <mo stretchy="false">(</mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
            <mo>=</mo>
            <mn>10</mn>
            <mo>−<!-- − --></mo>
            <mn>10</mn>
            <mi>r</mi>
            <mo>+</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mrow>
                  <msup>
                    <mi>M</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                      <mn>0.73</mn>
                    </mrow>
                  </msup>
                  <mo>⋅<!-- ⋅ --></mo>
                  <msup>
                    <mi>r</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                      <mn>0.73</mn>
                    </mrow>
                  </msup>
                </mrow>
                <mn>4</mn>
              </mfrac>
            </mrow>
            <mo>−<!-- − --></mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mrow>
                  <msup>
                    <mi>M</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                      <mn>0.73</mn>
                    </mrow>
                  </msup>
                  <mo>⋅<!-- ⋅ --></mo>
                  <msup>
                    <mi>r</mi>
                    <mrow class="MJX-TeXAtom-ORD">
                      <mn>1.73</mn>
                    </mrow>
                  </msup>
                </mrow>
                <mn>4</mn>
              </mfrac>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle f(r)=10-10r+{\frac {M^{0.73}\cdot r^{0.73}}{4}}-{\frac {M^{0.73}\cdot r^{1.73}}{4}}}}</annotation>
  </semantics>
</math></span></span>

To find the critical points, compute the derivative of <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle f(r)}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>f</mi>
            <mo stretchy="false">(</mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle f(r)}}</annotation>
  </semantics>
</math></span></span> with respect to <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle r}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>r</mi>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle r}}</annotation>
  </semantics>
</math></span></span> and set it equal to zero:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle f'(r)={\frac {d}{dr}}\left(10-10r+{\frac {M^{0.73}\cdot r^{0.73}}{4}}-{\frac {M^{0.73}\cdot r^{1.73}}{4}}\right)}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <msup>
              <mi>f</mi>
              <mo>′</mo>
            </msup>
            <mo stretchy="false">(</mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mi>d</mi>
                <mrow>
                  <mi>d</mi>
                  <mi>r</mi>
                </mrow>
              </mfrac>
            </mrow>
            <mrow>
              <mo>(</mo>
              <mrow>
                <mn>10</mn>
                <mo>−<!-- − --></mo>
                <mn>10</mn>
                <mi>r</mi>
                <mo>+</mo>
                <mrow class="MJX-TeXAtom-ORD">
                  <mfrac>
                    <mrow>
                      <msup>
                        <mi>M</mi>
                        <mrow class="MJX-TeXAtom-ORD">
                          <mn>0.73</mn>
                        </mrow>
                      </msup>
                      <mo>⋅<!-- ⋅ --></mo>
                      <msup>
                        <mi>r</mi>
                        <mrow class="MJX-TeXAtom-ORD">
                          <mn>0.73</mn>
                        </mrow>
                      </msup>
                    </mrow>
                    <mn>4</mn>
                  </mfrac>
                </mrow>
                <mo>−<!-- − --></mo>
                <mrow class="MJX-TeXAtom-ORD">
                  <mfrac>
                    <mrow>
                      <msup>
                        <mi>M</mi>
                        <mrow class="MJX-TeXAtom-ORD">
                          <mn>0.73</mn>
                        </mrow>
                      </msup>
                      <mo>⋅<!-- ⋅ --></mo>
                      <msup>
                        <mi>r</mi>
                        <mrow class="MJX-TeXAtom-ORD">
                          <mn>1.73</mn>
                        </mrow>
                      </msup>
                    </mrow>
                    <mn>4</mn>
                  </mfrac>
                </mrow>
              </mrow>
              <mo>)</mo>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle f'(r)={\frac {d}{dr}}\left(10-10r+{\frac {M^{0.73}\cdot r^{0.73}}{4}}-{\frac {M^{0.73}\cdot r^{1.73}}{4}}\right)}}</annotation>
  </semantics>
</math></span></span>

After differentiating term by term and combining the results:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle f'(r)=-10+{\frac {M^{0.73}}{4}}\cdot 0.73\cdot r^{-0.27}-{\frac {M^{0.73}}{4}}\cdot 1.73\cdot r^{0.73}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <msup>
              <mi>f</mi>
              <mo>′</mo>
            </msup>
            <mo stretchy="false">(</mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
            <mo>=</mo>
            <mo>−<!-- − --></mo>
            <mn>10</mn>
            <mo>+</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <msup>
                  <mi>M</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mn>0.73</mn>
                  </mrow>
                </msup>
                <mn>4</mn>
              </mfrac>
            </mrow>
            <mo>⋅<!-- ⋅ --></mo>
            <mn>0.73</mn>
            <mo>⋅<!-- ⋅ --></mo>
            <msup>
              <mi>r</mi>
              <mrow class="MJX-TeXAtom-ORD">
                <mo>−<!-- − --></mo>
                <mn>0.27</mn>
              </mrow>
            </msup>
            <mo>−<!-- − --></mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <msup>
                  <mi>M</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mn>0.73</mn>
                  </mrow>
                </msup>
                <mn>4</mn>
              </mfrac>
            </mrow>
            <mo>⋅<!-- ⋅ --></mo>
            <mn>1.73</mn>
            <mo>⋅<!-- ⋅ --></mo>
            <msup>
              <mi>r</mi>
              <mrow class="MJX-TeXAtom-ORD">
                <mn>0.73</mn>
              </mrow>
            </msup>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle f'(r)=-10+{\frac {M^{0.73}}{4}}\cdot 0.73\cdot r^{-0.27}-{\frac {M^{0.73}}{4}}\cdot 1.73\cdot r^{0.73}}}</annotation>
  </semantics>
</math></span></span>

We now solve for the critical points: Set <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle f'(r)=0}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <msup>
              <mi>f</mi>
              <mo>′</mo>
            </msup>
            <mo stretchy="false">(</mo>
            <mi>r</mi>
            <mo stretchy="false">)</mo>
            <mo>=</mo>
            <mn>0</mn>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle f'(r)=0}}</annotation>
  </semantics>
</math></span></span>:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle -10+{\frac {M^{0.73}}{4}}\cdot 0.73\cdot r^{-0.27}-{\frac {M^{0.73}}{4}}\cdot 1.73\cdot r^{0.73}=0}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mo>−<!-- − --></mo>
            <mn>10</mn>
            <mo>+</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <msup>
                  <mi>M</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mn>0.73</mn>
                  </mrow>
                </msup>
                <mn>4</mn>
              </mfrac>
            </mrow>
            <mo>⋅<!-- ⋅ --></mo>
            <mn>0.73</mn>
            <mo>⋅<!-- ⋅ --></mo>
            <msup>
              <mi>r</mi>
              <mrow class="MJX-TeXAtom-ORD">
                <mo>−<!-- − --></mo>
                <mn>0.27</mn>
              </mrow>
            </msup>
            <mo>−<!-- − --></mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <msup>
                  <mi>M</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mn>0.73</mn>
                  </mrow>
                </msup>
                <mn>4</mn>
              </mfrac>
            </mrow>
            <mo>⋅<!-- ⋅ --></mo>
            <mn>1.73</mn>
            <mo>⋅<!-- ⋅ --></mo>
            <msup>
              <mi>r</mi>
              <mrow class="MJX-TeXAtom-ORD">
                <mn>0.73</mn>
              </mrow>
            </msup>
            <mo>=</mo>
            <mn>0</mn>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle -10+{\frac {M^{0.73}}{4}}\cdot 0.73\cdot r^{-0.27}-{\frac {M^{0.73}}{4}}\cdot 1.73\cdot r^{0.73}=0}}</annotation>
  </semantics>
</math></span></span>

Factor out <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\frac {M^{0.73}}{4}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <msup>
                  <mi>M</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mn>0.73</mn>
                  </mrow>
                </msup>
                <mn>4</mn>
              </mfrac>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\frac {M^{0.73}}{4}}}}</annotation>
  </semantics>
</math></span></span>:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle -10+{\frac {M^{0.73}}{4}}\left(0.73\cdot r^{-0.27}-1.73\cdot r^{0.73}\right)=0}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mo>−<!-- − --></mo>
            <mn>10</mn>
            <mo>+</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <msup>
                  <mi>M</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mn>0.73</mn>
                  </mrow>
                </msup>
                <mn>4</mn>
              </mfrac>
            </mrow>
            <mrow>
              <mo>(</mo>
              <mrow>
                <mn>0.73</mn>
                <mo>⋅<!-- ⋅ --></mo>
                <msup>
                  <mi>r</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mo>−<!-- − --></mo>
                    <mn>0.27</mn>
                  </mrow>
                </msup>
                <mo>−<!-- − --></mo>
                <mn>1.73</mn>
                <mo>⋅<!-- ⋅ --></mo>
                <msup>
                  <mi>r</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mn>0.73</mn>
                  </mrow>
                </msup>
              </mrow>
              <mo>)</mo>
            </mrow>
            <mo>=</mo>
            <mn>0</mn>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle -10+{\frac {M^{0.73}}{4}}\left(0.73\cdot r^{-0.27}-1.73\cdot r^{0.73}\right)=0}}</annotation>
  </semantics>
</math></span></span>

Rearrange:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\frac {M^{0.73}}{4}}\left(0.73\cdot r^{-0.27}-1.73\cdot r^{0.73}\right)=10}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <msup>
                  <mi>M</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mn>0.73</mn>
                  </mrow>
                </msup>
                <mn>4</mn>
              </mfrac>
            </mrow>
            <mrow>
              <mo>(</mo>
              <mrow>
                <mn>0.73</mn>
                <mo>⋅<!-- ⋅ --></mo>
                <msup>
                  <mi>r</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mo>−<!-- − --></mo>
                    <mn>0.27</mn>
                  </mrow>
                </msup>
                <mo>−<!-- − --></mo>
                <mn>1.73</mn>
                <mo>⋅<!-- ⋅ --></mo>
                <msup>
                  <mi>r</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mn>0.73</mn>
                  </mrow>
                </msup>
              </mrow>
              <mo>)</mo>
            </mrow>
            <mo>=</mo>
            <mn>10</mn>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\frac {M^{0.73}}{4}}\left(0.73\cdot r^{-0.27}-1.73\cdot r^{0.73}\right)=10}}</annotation>
  </semantics>
</math></span></span>

Multiply through by <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\frac {4}{M^{0.73}}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mn>4</mn>
                <msup>
                  <mi>M</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mn>0.73</mn>
                  </mrow>
                </msup>
              </mfrac>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\frac {4}{M^{0.73}}}}}</annotation>
  </semantics>
</math></span></span>:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle 0.73\cdot r^{-0.27}-1.73\cdot r^{0.73}={\frac {40}{M^{0.73}}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mn>0.73</mn>
            <mo>⋅<!-- ⋅ --></mo>
            <msup>
              <mi>r</mi>
              <mrow class="MJX-TeXAtom-ORD">
                <mo>−<!-- − --></mo>
                <mn>0.27</mn>
              </mrow>
            </msup>
            <mo>−<!-- − --></mo>
            <mn>1.73</mn>
            <mo>⋅<!-- ⋅ --></mo>
            <msup>
              <mi>r</mi>
              <mrow class="MJX-TeXAtom-ORD">
                <mn>0.73</mn>
              </mrow>
            </msup>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mn>40</mn>
                <msup>
                  <mi>M</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mn>0.73</mn>
                  </mrow>
                </msup>
              </mfrac>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle 0.73\cdot r^{-0.27}-1.73\cdot r^{0.73}={\frac {40}{M^{0.73}}}}}</annotation>
  </semantics>
</math></span></span>

For large <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle M}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>M</mi>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle M}}</annotation>
  </semantics>
</math></span></span>, <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\frac {40}{M^{0.73}}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mn>40</mn>
                <msup>
                  <mi>M</mi>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mn>0.73</mn>
                  </mrow>
                </msup>
              </mfrac>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\frac {40}{M^{0.73}}}}}</annotation>
  </semantics>
</math></span></span> becomes negligible, so:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle 0.73\cdot r^{-0.27}-1.73\cdot r^{0.73}=0}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mn>0.73</mn>
            <mo>⋅<!-- ⋅ --></mo>
            <msup>
              <mi>r</mi>
              <mrow class="MJX-TeXAtom-ORD">
                <mo>−<!-- − --></mo>
                <mn>0.27</mn>
              </mrow>
            </msup>
            <mo>−<!-- − --></mo>
            <mn>1.73</mn>
            <mo>⋅<!-- ⋅ --></mo>
            <msup>
              <mi>r</mi>
              <mrow class="MJX-TeXAtom-ORD">
                <mn>0.73</mn>
              </mrow>
            </msup>
            <mo>=</mo>
            <mn>0</mn>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle 0.73\cdot r^{-0.27}-1.73\cdot r^{0.73}=0}}</annotation>
  </semantics>
</math></span></span>

Multiplying this by <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle r^{0.27}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <msup>
              <mi>r</mi>
              <mrow class="MJX-TeXAtom-ORD">
                <mn>0.27</mn>
              </mrow>
            </msup>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle r^{0.27}}}</annotation>
  </semantics>
</math></span></span>and performing some basic algebra, one determines that the optimal proportion <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle r}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mi>r</mi>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle r}}</annotation>
  </semantics>
</math></span></span> is <span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\frac {0.73}{1.73}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mn>0.73</mn>
                <mn>1.73</mn>
              </mfrac>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\frac {0.73}{1.73}}}}</annotation>
  </semantics>
</math></span></span>, which is about 0.422.

## Troop vs. Worker Roles {#Troop_vs._Worker_Roles}

Population is divided between defending troops and workers.

Workers reproduce approximately 30% faster than defending troops and generate gold, but do not contribute to defense.

Troops committed to an attack (by land or boat) do not contribute to defense or population growth.

This creates a strategic tradeoff:

- Workers boost your economy and help grow your population faster.
- Troops are necessary for defense and conquest but reduce your shield and slow growth when deployed.

# The Shield Icon (Troop Density Indicator) {#The_Shield_Icon_(Troop_Density_Indicator)}

The shield icon shows defending troop density per tile, scaled by 10 and rounded:

<pre>3 troops/tile -&gt; Shield = 30
1.5 troops/tile -&gt; Shield = 15
</pre>

Players with few tiles or cities may exceed 30 due to higher population per tile.

Only defending troops are shown in the shield. Launching attacks reduces your shield as committed troops are no longer considered defenders.

# How Attacks Work {#How_Attacks_Work}

## Target Selection {#Target_Selection}

<pre>When attacking, tiles are chosen based on:
</pre>

- Terrain: Plains > Highlands > Mountains
- Connectivity: Tiles adjacent to multiple owned tiles are prioritized.

## Combat Resolution {#Combat_Resolution}

The defender loses troops equal to their shield value ÷ 10.

The attacker loses troops proportional to the defender's losses, modified by:

- Terrain type:
- Plains: attacker loses 10% fewer troops
- Highlands: attacker loses 10% more troops
- Mountains: attacker loses 30% more troops
- Presence of a defense post
- Whether the defender is a traitor

A small fixed attrition cost per tile is also applied.

If the attacker has remaining troops, the process repeats for the next tile.

## Betrayal Effect {#Betrayal_Effect}

- Betraying an ally flags you as a traitor.
- For 30 seconds, attackers lose 50% fewer troops per tile when attacking you.

# Defense Posts {#Defense_Posts}

- Range: 40 tiles, measured as a circle (Euclidean distance).
- If a conquered tile is within range of a defense post:
- Attacker troop losses are multiplied by 6 (i.e., +500%)
- Attack speed is reduced by 66%
- Attackers lose 2× more troops per unit of time
- Only one post applies per tile — effects do not stack.

# Attack Speed (Processing Rate) {#Attack_Speed_(Processing_Rate)}

Attack speed is influenced by multiple factors, combined multiplicatively:

Base Modifiers:

- Plains: +10% speed
- Highlands: no speed effect
- Mountains: -25% speed

Elasticities: Defender Shield Density:

- For every 1% increase in defender shield value (between 30 and 100), attack speed is reduced by 0.2%.
- Shield values above 100 do not slow down attackers further.

Attacker Army Size:

- For every 1% increase in attacker size (relative to defender troops), attack speed increases by:
- 0.5% per 1% increase, if attacker is between 5% and 10× the defender's size
- 0.1% per 1% increase, if attacker exceeds 10× defender's size
- No speed bonus is given if the attacker is smaller than 5% of the defender's size.

# Tips {#Tips}

- Use 50% of your population for attacks early in the game, and 20% later on.
- Attacking at ~50% of your max population maximizes growth.

_--Made by 1brucben_
