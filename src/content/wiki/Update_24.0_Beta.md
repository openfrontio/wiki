---
title: "Update 24.0 Beta"
section: "Updates"
cats: []
---
[OpenFront](/OpenFront.io) 24.0 Open Beta was published on Github 27th of may.

[Link to Github release](https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.24.0)

It contains an updated meta<sup id="cite_ref-1" class="reference"><a href="#cite_note-1"><span class="cite-bracket">[</span>1<span class="cite-bracket">]</span></a></sup><sup id="cite_ref-2" class="reference"><a href="#cite_note-2"><span class="cite-bracket">[</span>2<span class="cite-bracket">]</span></a></sup><sup id="cite_ref-3" class="reference"><a href="#cite_note-3"><span class="cite-bracket">[</span>3<span class="cite-bracket">]</span></a></sup> and it changes how attacks work.

### Commit [6b13522](https://github.com/openfrontio/OpenFrontIO/commit/6b13522ad5f4ee7c4f9aeb321415189f20495a25) - use newer attack, delete existing attack {#Commit_6b13522_-_use_newer_attack,_delete_existing_attack}

"Also when a new attack is sent when there's an existing attack, have the new attack delete the existing attack. This causes attack to "reset" and use the entire border when a new attack is sent."<sup id="cite_ref-4" class="reference"><a href="#cite_note-4"><span class="cite-bracket">[</span>4<span class="cite-bracket">]</span></a></sup>

### Commit [9a17bc1](https://github.com/openfrontio/OpenFrontIO/commit/9a17bc1553fc0622d6725bcd697add0081c985f5) - counter attack doesn't cancel out attack {#Commit_9a17bc1_-_counter_attack_doesn't_cancel_out_attack}

"Instead of a counter attack cancelling out the initial attack, both attacks run concurrently. This results in a more dynamic frontline."<sup id="cite_ref-5" class="reference"><a href="#cite_note-5"><span class="cite-bracket">[</span>5<span class="cite-bracket">]</span></a></sup>

# See also {#See_also}

- [Update 23.0](/Update_23.0)
- [Minor Updates of 23.x](/Minor_Updates_of_23.x)

<div class="mw-references-wrap"><ol class="references">
<li id="cite_note-1"><span class="mw-cite-backlink"><a href="#cite_ref-1" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text"><a rel="noopener noreferrer" class="external free" href="https://github.com/openfrontio/OpenFrontIO/commit/9eb275be0f87cee5579e6688e6101ec2ad0a8904" target="_blank">https://github.com/openfrontio/OpenFrontIO/commit/9eb275be0f87cee5579e6688e6101ec2ad0a8904</a></span>
</li>
<li id="cite_note-2"><span class="mw-cite-backlink"><a href="#cite_ref-2" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text"><a rel="noopener noreferrer" class="external free" href="https://github.com/openfrontio/OpenFrontIO/commit/a32e9e48ef175309eca5a55f790c420e59b75967" target="_blank">https://github.com/openfrontio/OpenFrontIO/commit/a32e9e48ef175309eca5a55f790c420e59b75967</a></span>
</li>
<li id="cite_note-3"><span class="mw-cite-backlink"><a href="#cite_ref-3" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text"><a rel="noopener noreferrer" class="external free" href="https://github.com/openfrontio/OpenFrontIO/commit/a32e9e48ef175309eca5a55f790c420e59b75967" target="_blank">https://github.com/openfrontio/OpenFrontIO/commit/a32e9e48ef175309eca5a55f790c420e59b75967</a></span>
</li>
<li id="cite_note-4"><span class="mw-cite-backlink"><a href="#cite_ref-4" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text"><a rel="noopener noreferrer" class="external free" href="https://github.com/openfrontio/OpenFrontIO/commit/6b13522ad5f4ee7c4f9aeb321415189f20495a25" target="_blank">https://github.com/openfrontio/OpenFrontIO/commit/6b13522ad5f4ee7c4f9aeb321415189f20495a25</a></span>
</li>
<li id="cite_note-5"><span class="mw-cite-backlink"><a href="#cite_ref-5" aria-label="Jump up" title="Jump up">↑</a></span> <span class="reference-text"><a rel="noopener noreferrer" class="external free" href="https://github.com/openfrontio/OpenFrontIO/commit/9a17bc1553fc0622d6725bcd697add0081c985f5" target="_blank">https://github.com/openfrontio/OpenFrontIO/commit/9a17bc1553fc0622d6725bcd697add0081c985f5</a></span>
</li>
</ol></div>
