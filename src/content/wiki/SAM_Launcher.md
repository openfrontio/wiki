---
title: "SAM Launcher"
section: "Buildings"
cats: ["Buildings"]
---
<figure typeof="mw:File/Thumb"><img src="/images/197px-SAM_from_upclose.png" decoding="async" width="197" height="197" class="mw-file-element" data-file-width="420" data-file-height="421"><figcaption>A <b>SAM Launcher</b> viewed from up close when built</figcaption></figure>

The SAM (Surface-to-Air Missile system) is a [Building](/Buildings) that has the ability to shoot down nearby nukes in a 75 pixel radius around the building. It can intercept [Atom Bombs](/Atom_Bomb) and [Hydrogen Bombs](/Hydrogen_Bomb). As of [Update 33.0](/Update_33.0), it also intercepts [MIRV](/MIRV) warheads, which now fly as standard nukes.

It can be [upgraded](/Upgrading) as of [update 24.0](/Update_24.0), increasing it's range. As of [Update 34.0](/Update_34.0) the range scales dynamically with each upgrade level, and the game shows a preview of the SAM's coverage radius; SAMs can also now target warheads that spawn very close to them, and the nuke-interception indicator is correct when the target is inside SAM range.

## Launching an Intercepting Missile {#Launching_an_Intercepting_Missile}

<figure class="mw-default-size" typeof="mw:File/Thumb"><img src="/images/300px-SAM_Radius_New.png" decoding="async" width="300" height="301" class="mw-file-element" data-file-width="788" data-file-height="790"><figcaption>The range of the SAM Launcher, plotted in Desmos</figcaption></figure>

The [SAM](/SAM_Launcher) will only intercept a missile headed for your territory. When intercepting, the SAM prioritizes [Hydrogen Bombs](/Hydrogen_Bomb) over [Atom Bombs](/Atom_Bomb). It will prioritize missiles that are closer to it too, but will always prioritize [Hydrogen Bombs](/Hydrogen_Bomb) over [Atom Bombs](/Atom_Bomb). The SAM has a 7.5 second cooldown<sup id="cite_ref-1" class="reference"><a href="#cite_note-1"><span class="cite-bracket">[</span>1<span class="cite-bracket">]</span></a></sup>, in which while it is reloading the icon of the SAM will turn red indicating that it can not intercept a missile at that time.<sup id="cite_ref-2" class="reference"><a href="#cite_note-2"><span class="cite-bracket">[</span>2<span class="cite-bracket">]</span></a></sup>

## Price {#Price}

The player's first SAM launcher costs 1.5M gold, all subsequent launchers cost 3M gold.

## Intercepting Missile {#Intercepting_Missile}

Once a SAM detects an Atom Bomb or Hydrogen Bomb in it's range, it will launch a intercepting missile to try to stop it. The intercepting missile will move towards the target missile until it has reached it. As of update 28.0 the SAM missile no longer has a 75% chance to successfully intercept a target missile<sup id="cite_ref-3" class="reference"><a href="#cite_note-3"><span class="cite-bracket">[</span>3<span class="cite-bracket">]</span></a></sup>. Previous to the update it had a 75% chance<sup id="cite_ref-4" class="reference"><a href="#cite_note-4"><span class="cite-bracket">[</span>4<span class="cite-bracket">]</span></a></sup> to successfully intercept the target missile.

# See also {#See_also}

- [Missile Silo](/Missile_Silo)
- [Atom Bomb](/Atom_Bomb)
- [Hydrogen Bomb](/Hydrogen_Bomb)
- [MIRV](/MIRV)
- [Fallout](/Fallout)

## Sources {#Sources}

<div class="mw-references-wrap"><ol class="references">
<li id="cite_note-1"><span class="mw-cite-backlink"><a href="#cite_ref-1" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text"><a rel="noopener noreferrer" class="external free" href="https://github.com/openfrontio/OpenFrontIO/blob/e4686642a0f341b5b3eb17c03f64d22f8a7b9a8a/src/core/execution/SAMLauncherExecution.ts#L25" target="_blank">https://github.com/openfrontio/OpenFrontIO/blob/e4686642a0f341b5b3eb17c03f64d22f8a7b9a8a/src/core/execution/SAMLauncherExecution.ts#L25</a></span>
</li>
<li id="cite_note-2"><span class="mw-cite-backlink"><a href="#cite_ref-2" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text"><a rel="noopener noreferrer" class="external free" href="https://github.com/openfrontio/OpenFrontIO/commit/24f25d677a6f43089fb7aa50c1509a84bf8839a1" target="_blank">https://github.com/openfrontio/OpenFrontIO/commit/24f25d677a6f43089fb7aa50c1509a84bf8839a1</a></span>
</li>
<li id="cite_note-3"><span class="mw-cite-backlink"><a href="#cite_ref-3" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text">Remove RNG from SAM launchers by Lavodan · Pull Request #2665 · openfrontio/OpenFrontIO</span>
</li>
<li id="cite_note-4"><span class="mw-cite-backlink"><a href="#cite_ref-4" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text"><a rel="noopener noreferrer" class="external free" href="https://github.com/openfrontio/OpenFrontIO/blob/e4686642a0f341b5b3eb17c03f64d22f8a7b9a8a/src/core/execution/SAMMissileExecution.ts#L27" target="_blank">https://github.com/openfrontio/OpenFrontIO/blob/e4686642a0f341b5b3eb17c03f64d22f8a7b9a8a/src/core/execution/SAMMissileExecution.ts#L27</a></span>
</li>
</ol></div>
