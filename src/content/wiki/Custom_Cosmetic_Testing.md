---
title: "Custom Cosmetic Testing"
section: "Guides"
cats: []
---
Community creators can preview their own **skins** (patterns and colours) and **crowns** in the browser before submitting them, using a few developer-console settings. Nothing here is visible to other players; it only changes how the game renders on your machine.

Submissions go through the artist channels on [Discord](/Discord) — see [Community Roles](/Community_Roles#Community_Artist).

## Testing a custom skin (pattern and colours) {#Testing_a_custom_skin}

1. Open your browser's developer tools (press **F12**, or right-click the page and choose **Inspect**).
2. Switch to the **Console** tab.
3. Paste and run the following, replacing `Your pattern json` with your pattern data and the two hex values with your colours:

```js
localStorage.setItem("dev-pattern", "Your pattern json");
localStorage.setItem("dev-primary", "#ffffff");
localStorage.setItem("dev-secondary", "#000000");
```

4. Refresh the page. Your skin is now used in game.

To remove the custom skin, run this in the console and refresh:

```js
localStorage.removeItem("dev-pattern");
localStorage.removeItem("dev-primary");
localStorage.removeItem("dev-secondary");
```

The community-made [Openfront Utility](/Unofficial_Projects) tool can generate and preview pattern data in the format the game expects.

## Testing a custom crown {#Testing_a_custom_crown}

1. Upload your crown PNG to [Imgur](https://imgur.com/).
2. Right-click the uploaded image and choose **Open image in new tab**.
3. Copy the direct URL from the address bar — it must end in `.png`.
4. Go to [main.openfront.dev](https://main.openfront.dev/).
5. Open the developer tools (**F12**) and switch to the **Console** tab.
6. Run the following with your image URL:

```js
localStorage.setItem("dev-crown", "YOUR_PNG_URL");
```

7. Refresh the page and start a [single player](/Single_Player) game to see the crown above your name.

To change or remove it:

- **Replace:** `localStorage.setItem("dev-crown", "NEW_PNG_URL");`
- **Remove:** `localStorage.removeItem("dev-crown");` then refresh.

## See also {#See_also}

- [Community Roles](/Community_Roles)
- [Unofficial Projects](/Unofficial_Projects)
- [Links Masterpost](/Links_Masterpost)
