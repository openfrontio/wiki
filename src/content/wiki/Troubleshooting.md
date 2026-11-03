---
title: "Troubleshooting"
section: "Guides"
cats: []
---
Fixes for the most common technical problems with [OpenFront](/OpenFront.io) in the browser. If none of these help, ask in the support channels on [Discord](/Discord).

## "You didn't join the game in time", Turnstile errors and connection drops {#Clock_synchronization}

An unsynchronised system clock makes Cloudflare Turnstile reject its token, which shows up as failed joins, dropped connections and the matchmaking error **"You didn't join the game in time"**. Resync your clock:

**Windows**

1. Open Settings › Time & Language › Date & Time.
2. Under _Additional settings_, click **Sync now**.
3. A tick appears next to _Last successful time synchronization_ showing the current time.

**Linux**

1. Open a terminal.
2. Run `sudo timedatectl set-ntp false && sudo timedatectl set-ntp true` (or `sudo chronyc makestep` on distributions that use chrony).
3. Check with `timedatectl status`: it should report _System clock synchronized: yes_ and _NTP service: active_.

**macOS**

1. Open System Settings › General › Date & Time, switch **Set time and date automatically** off, wait five seconds, and switch it back on.
2. Or, in a terminal, run `sudo sntp -sS time.apple.com`.
3. The menu-bar clock should match exact local time, and the terminal reports an offset close to ±0.000 s.

## Browser compatibility {#Browser_compatibility}

- **Chrome and Edge are recommended.**
- Brave, LibreWolf and Zen are not recommended.
- Firefox needs version 32 or newer. If you see **"WebGL2 not supported"**, update your graphics drivers and restart Firefox.
- Make sure **hardware acceleration** is turned on in your browser settings, and clear the browser cache and cookies now and then.

## Map goes black or graphics disappear mid-game {#Graphics_reset}

Press **Alt + R** to reset the graphics pipeline without leaving the game (see [Controls](/Controls)).

## White page or blank map after a few minutes {#Dedicated_GPU}

**Symptom:** the game runs for a few minutes, then the map goes blank while the UI stays visible.

**Cause:** the browser is rendering on the integrated graphics chip instead of your dedicated graphics card and runs out of memory.

**Fix (Windows):**

1. Open Windows Settings › System › Display › **Graphics**.
2. Click **Browse** and add your browser's executable (for example `chrome.exe` or `opera.exe`).
3. Click **Options** and choose **High performance** (your dedicated GPU).
4. Restart the browser and confirm in its GPU diagnostics page (`chrome://gpu`, `opera://gpu`) that _GL_RENDERER_ names your dedicated card.

## Regional and DNS problems {#Regional_and_DNS_problems}

- Players in **Spain** often need a VPN because some ISPs' sports/football firewalls block the game's hosts.
- If you get DNS errors, turn on **DNS over HTTPS** in your browser's privacy settings.

## See also {#See_also}

- [Controls](/Controls)
- [Game Link](/Game_Link)
- [Links Masterpost](/Links_Masterpost)
