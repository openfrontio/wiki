---
title: "Train"
section: "Units"
cats: []
---
Trains are an experimental feature that was added in [24.0](/Update_24.0) for private lobbies and [single player](/Single_Player).

<figure typeof="mw:File/Thumb"><img src="/images/291px-T_R_A_I_N.png" decoding="async" width="291" height="113" class="mw-file-element" data-file-width="465" data-file-height="180"><figcaption>A <b>Train</b>, on a <a href="/Railroad" title="Railroad">railroad</a>.</figcaption></figure>

[Factories](/Factory) spawn trains and [railroads](/Railroad) automatically when two or more [buildings](/Buildings) have been placed within a reasonable distance on land.

For each building the train visits, you get [gold,](/Gold) 10,000 for owned/unallied or 35,000 if allied.

Trains are spawned according to a probabilistic mechanism that is influenced by the number of available stations in the connected cluster. The probability to spawn a train increases with the number of eligible stations within the cluster according to this function:

<figure typeof="mw:File/Thumb"><img src="/images/200px-Factory_port_trains.png" decoding="async" width="200" height="149" class="mw-file-element" data-file-width="457" data-file-height="340"><figcaption><a href="/Factory" class="" title="Factories">Factories</a> and <a href="/Port" title="Port">ports</a> connected by <a href="/Railroad" title="Railroad">Railroads</a> with a <span class="wiki-deadlink">Train</span> on the tracks</figcaption></figure>

<div class="mw-highlight mw-highlight-lang-typescript mw-content-ltr" dir="ltr"><pre><span></span><span class="nx">trainSpawnRate</span><span class="p">(</span><span class="nx">numberOfStations</span><span class="o">:</span><span class="w"> </span><span class="kt">number</span><span class="p">)</span><span class="o">:</span><span class="w"> </span><span class="kt">number</span><span class="w"> </span><span class="p">{</span>
<span class="w">  </span><span class="k">return</span><span class="w"> </span><span class="nb">Math</span><span class="p">.</span><span class="nx">min</span><span class="p">(</span><span class="mf">1400</span><span class="p">,</span><span class="w"> </span><span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span><span class="mf">20</span><span class="w"> </span><span class="o">*</span><span class="w"> </span><span class="nb">Math</span><span class="p">.</span><span class="nx">pow</span><span class="p">(</span><span class="nx">numberOfStations</span><span class="p">,</span><span class="w"> </span><span class="mf">0.5</span><span class="p">)));</span>
<span class="p">}</span>
</pre></div>

## See also {#See_also}

- [Factory](/Factory)
- [Railroad](/Railroad)
- [Update 24.0](/Update_24.0)
