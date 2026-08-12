---
title: "Port"
section: "Buildings"
cats: ["Buildings"]
---
<figure typeof="mw:File/Thumb"><img src="/images/197px-Port_from_upclose.png" decoding="async" width="197" height="181" class="mw-file-element" data-file-width="387" data-file-height="356"><figcaption>A <b>Port</b> when it's built, from upclose.</figcaption></figure>

This [building](/Buildings) spawns [trade ships](/Trade_Ship) and allows you to build [Warships](/Warship).

The first **port** built costs 125,000, then the cost doubles for each one you buy until the price reaches 1,000,000.

[Trade ships](/Trade_Ship) sent out make more [gold](/Gold) the farther they have traveled from their ports.

# Trade Ship Spawning {#Trade_Ship_Spawning}

Ports check every 10 ticks if they should spawn a [trade ship](/Trade_Ship)

Spawn chance is calculated based on number of owned ports, number of owned trade ships, and number of all trade ships

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{spawnChance}}={\frac {1}{\left\lfloor {\frac {25}{\sqrt {{\text{baseChance}}*{\text{portMultiplier}}}}}\right\rfloor }}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>spawnChance</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mn>1</mn>
                <mrow>
                  <mo>⌊</mo>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mfrac>
                      <mn>25</mn>
                      <msqrt>
                        <mrow class="MJX-TeXAtom-ORD">
                          <mtext>baseChance</mtext>
                        </mrow>
                        <mo>∗<!-- ∗ --></mo>
                        <mrow class="MJX-TeXAtom-ORD">
                          <mtext>portMultiplier</mtext>
                        </mrow>
                      </msqrt>
                    </mfrac>
                  </mrow>
                  <mo>⌋</mo>
                </mrow>
              </mfrac>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{spawnChance}}={\frac {1}{\left\lfloor {\frac {25}{\sqrt {{\text{baseChance}}*{\text{portMultiplier}}}}}\right\rfloor }}}}</annotation>
  </semantics>
</math></span></span>

Where $\text{baseChance}$ is equal to 1 when you own less than 3 trade ships (exclusive), otherwise it is:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{baseChance}}=1-{\frac {1}{1+e^{\left(-{\frac {\ln(2)}{10}}*({\text{numOfShips}}-55)\right)}}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>baseChance</mtext>
            </mrow>
            <mo>=</mo>
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
                              <mn>10</mn>
                            </mfrac>
                          </mrow>
                          <mo>∗<!-- ∗ --></mo>
                          <mo stretchy="false">(</mo>
                          <mrow class="MJX-TeXAtom-ORD">
                            <mtext>numOfShips</mtext>
                          </mrow>
                          <mo>−<!-- − --></mo>
                          <mn>55</mn>
                          <mo stretchy="false">)</mo>
                        </mrow>
                        <mo>)</mo>
                      </mrow>
                    </mrow>
                  </msup>
                </mrow>
              </mfrac>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{baseChance}}=1-{\frac {1}{1+e^{\left(-{\frac {\ln(2)}{10}}*({\text{numOfShips}}-55)\right)}}}}}</annotation>
  </semantics>
</math></span></span>

<figure class="mw-default-size" typeof="mw:File/Thumb"><img alt="A graph" src="/images/300px-Desmos_port_baseChance_v26.png" decoding="async" width="300" height="200" class="mw-file-element" data-file-width="2400" data-file-height="1600"><figcaption>The relationship between the total number of ships and baseChance</figcaption></figure>

In short, this means that the more ships there are on the map, the less likely more ships are to spawn, with a small number having only a very small effect. At 25 ships, the chance is 88%, at 55 it's 50%, at 100, it's just 4%.

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{portMultiplier}}={\frac {1}{1+{\frac {\text{portsOwned}}{10}}}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>portMultiplier</mtext>
            </mrow>
            <mo>=</mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mn>1</mn>
                <mrow>
                  <mn>1</mn>
                  <mo>+</mo>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mfrac>
                      <mtext>portsOwned</mtext>
                      <mn>10</mn>
                    </mfrac>
                  </mrow>
                </mrow>
              </mfrac>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{portMultiplier}}={\frac {1}{1+{\frac {\text{portsOwned}}{10}}}}}}</annotation>
  </semantics>
</math></span></span>

More ports = lower spawn rate **per port**. Gradual decay prevents scenario where more ports => fewer ships **overall**.

There is no spawn cap.

# Trade Route Selection {#Trade_Route_Selection}

Ports will only trade with other players (not their own ports). Trade partners are prioritized in this order:

- Closer ports get double chance of being selected (proximity bonus)
- Allied ports get double chance of being selected

[Trade ships](/Trade_Ship) are free to build and don't count against unit limits.

# [Gold](/Gold) Generation {#Gold_Generation}

<table class="box-Update plainlinks metadata ambox ambox-content ambox-Update" role="presentation"><tbody><tr><td class="mbox-image"><div class="mbox-image-div"><span typeof="mw:File"><span><img alt="" src="/images/Red_clock.svg" decoding="async" width="42" height="42" class="mw-file-element" data-file-width="512" data-file-height="512"></span></span></div></td><td class="mbox-text"><div class="mbox-text-span">This article's factual accuracy may be compromised due to out-of-date information<b>.<span class="hide-when-compact"> Please help update this article to reflect recent events or newly available information.</span></b></div></td></tr></tbody></table>

[Gold](/Gold) earned is based on _Manhattan distance_ (which means the sum of the absolute differences in x and y coordinates) between ports and the number of ports you own:

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{gold}}=(100000+100*{\text{distance}})*{\text{bonus}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>gold</mtext>
            </mrow>
            <mo>=</mo>
            <mo stretchy="false">(</mo>
            <mn>100000</mn>
            <mo>+</mo>
            <mn>100</mn>
            <mo>∗<!-- ∗ --></mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>distance</mtext>
            </mrow>
            <mo stretchy="false">)</mo>
            <mo>∗<!-- ∗ --></mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>bonus</mtext>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{gold}}=(100000+100*{\text{distance}})*{\text{bonus}}}}</annotation>
  </semantics>
</math></span></span>

Bonus is a value which is dependent on the number of ports you own. The more ports you own, the smaller the increase, the medium point is at 4 ports with a bonus of approx. 1.9. The bonus is an example of hyperbolic decay.

<span class="mwe-math-element mwe-math-element-inline"><span class="mwe-math-mathml-inline mwe-math-mathml-a11y"><math xmlns="http://www.w3.org/1998/Math/MathML" alttext="{\displaystyle {\displaystyle {\text{bonus}}=1+2*{\frac {{\text{portsOwned}}-1}{{\text{portsOwned}}+4}}}}">
  <semantics>
    <mrow class="MJX-TeXAtom-ORD">
      <mstyle displaystyle="true" scriptlevel="0">
        <mrow class="MJX-TeXAtom-ORD">
          <mstyle displaystyle="true" scriptlevel="0">
            <mrow class="MJX-TeXAtom-ORD">
              <mtext>bonus</mtext>
            </mrow>
            <mo>=</mo>
            <mn>1</mn>
            <mo>+</mo>
            <mn>2</mn>
            <mo>∗<!-- ∗ --></mo>
            <mrow class="MJX-TeXAtom-ORD">
              <mfrac>
                <mrow>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mtext>portsOwned</mtext>
                  </mrow>
                  <mo>−<!-- − --></mo>
                  <mn>1</mn>
                </mrow>
                <mrow>
                  <mrow class="MJX-TeXAtom-ORD">
                    <mtext>portsOwned</mtext>
                  </mrow>
                  <mo>+</mo>
                  <mn>4</mn>
                </mrow>
              </mfrac>
            </mrow>
          </mstyle>
        </mrow>
      </mstyle>
    </mrow>
    <annotation encoding="application/x-tex">{\displaystyle {\displaystyle {\text{bonus}}=1+2*{\frac {{\text{portsOwned}}-1}{{\text{portsOwned}}+4}}}}</annotation>
  </semantics>
</math></span></span>

Both the source and destination port owners receive the full amount.

Longer trade routes are more profitable (linear scaling with distance).

# See also {#See_also}

- [Buildings](/Buildings)
- [Warship](/Warship)
- [Trade Ship](/Trade_Ship)
- [Transport Ship](/Transport_Ship)
