# Phase 2: Inline Edit UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an inline "Edit this page" experience to editable wiki pages: a lazy-loaded EasyMDE Markdown editor (toolbar + syntax highlighting + live preview) pre-loaded from each page's embedded raw Markdown, with a stubbed submit (diff + Copy Markdown) since the backend is Phase 3.

**Architecture:** Each editable page (`kind === "wiki"` in `[slug].astro`) embeds its raw Markdown in an inert JSON `<script>` block and shows an "Edit this page" button. A tiny loader script (in the reading bundle) lazy-imports the editor controller only on click; the controller mounts EasyMDE in place of the article and, on Save, shows a line diff + Copy button + a "goes live in Phase 3" note. Two pure helpers (safe source encode/decode, line diff) are unit-tested; the interactive controller and wiring are verified by build assertions + manual check.

**Tech Stack:** Astro 5.6 (client `<script>`, dynamic `import()` code-splitting), `easymde` (bundled, no CDN), `cheerio` (test assertions), Node `node --test` (`*.test.mjs`).

## Global Constraints

- Repo: `C:\Users\lewis\dev\openfront-wiki` (never OneDrive). Build with `export PATH="/c/Program Files/nodejs:$PATH"` then `corepack pnpm build`. Bash cwd resets between calls — `cd` each time. Windows.
- **Adding npm deps: use `npm install <pkg>` (NOT `pnpm add`).** The deploy uses `package-lock.json`; a stray `pnpm-lock.yaml` must never be created/committed.
- Static site, no external hosts: EasyMDE and its CSS are bundled, never loaded from a CDN.
- Editor code (EasyMDE) must NOT be in the reading-page bundle — it loads only via the dynamic `import()` triggered on Edit click.
- The Edit control, embedded source, and editor root render ONLY for `kind === "wiki"` pages — never for OpenFront Masters (`kind === "masters"`).
- `entry.body` is the page's raw Markdown source (available in `[slug].astro` frontmatter for wiki pages).
- Saving is a Phase-2 STUB — no network, no commit, no auth. It shows a diff + Copy Markdown + a note. The `onSave` path is the seam Phase 3 replaces.
- Tests: Node's built-in runner, files `*.test.mjs`, run `node --test`.
- One commit per task; messages end with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`. Do NOT push (a human pushes after review).

---

### Task 1: Pure editor helpers (safe source encode/decode + line diff)

**Files:**
- Create: `src/lib/edit-source.js`
- Test: `src/lib/edit-source.test.mjs`
- Create: `src/lib/diff.js`
- Test: `src/lib/diff.test.mjs`

**Interfaces:**
- Produces: `encodePageSource(markdown: string): string` (JSON string with `<` escaped to `\u003c`, safe to place inside a `<script>` element) and `decodePageSource(text: string): string` (inverse: `JSON.parse`). Round-trip: `decodePageSource(encodePageSource(x)) === x`.
- Produces: `lineDiff(original: string, edited: string): Array<{type: "same"|"add"|"del", text: string}>` — line-level diff via LCS.

- [ ] **Step 1: Write failing tests for edit-source**

Create `src/lib/edit-source.test.mjs`:
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { encodePageSource, decodePageSource } from "./edit-source.js";

test("round-trips plain markdown", () => {
  const md = "# Title\n\nSome **text** with a [link](/Nations).";
  assert.equal(decodePageSource(encodePageSource(md)), md);
});

test("round-trips content containing a closing script tag and raw HTML", () => {
  const md = 'before <table class="wikitable"><tr><td>x</td></tr></table> </script> after';
  assert.equal(decodePageSource(encodePageSource(md)), md);
});

test("encoded output contains no literal '<' (cannot terminate a script element)", () => {
  const md = "a <b> c </script> d";
  assert.ok(!encodePageSource(md).includes("<"));
});

test("round-trips unicode and quotes", () => {
  const md = 'emoji 🗺️ and "quotes" and \\backslash';
  assert.equal(decodePageSource(encodePageSource(md)), md);
});
```

- [ ] **Step 2: Run the edit-source tests to confirm they fail**

Run: `export PATH="/c/Program Files/nodejs:$PATH" && node --test src/lib/edit-source.test.mjs`
Expected: FAIL — `Cannot find module './edit-source.js'`.

- [ ] **Step 3: Implement edit-source**

Create `src/lib/edit-source.js`:
```js
// Safely embed a page's raw Markdown inside an inline <script type="application/json">
// block and read it back on the client. JSON.stringify handles quotes/newlines/unicode;
// escaping "<" to its JSON unicode form guarantees a "</script>" or raw-HTML "<" in the
// body can never terminate the surrounding <script> element early.
export function encodePageSource(markdown) {
  return JSON.stringify(markdown).replace(/</g, "\\u003c");
}

export function decodePageSource(text) {
  return JSON.parse(text);
}
```

- [ ] **Step 4: Run the edit-source tests to confirm they pass**

Run: `node --test src/lib/edit-source.test.mjs`
Expected: PASS (4/4).

- [ ] **Step 5: Write failing tests for diff**

Create `src/lib/diff.test.mjs`:
```js
import { test } from "node:test";
import assert from "node:assert/strict";
import { lineDiff } from "./diff.js";

test("identical text is all 'same'", () => {
  const d = lineDiff("a\nb\nc", "a\nb\nc");
  assert.deepEqual(d.map((x) => x.type), ["same", "same", "same"]);
});

test("a changed line shows as del then add", () => {
  const d = lineDiff("a\nb\nc", "a\nB\nc");
  assert.deepEqual(d, [
    { type: "same", text: "a" },
    { type: "del", text: "b" },
    { type: "add", text: "B" },
    { type: "same", text: "c" },
  ]);
});

test("an added line shows as add", () => {
  const d = lineDiff("a\nc", "a\nb\nc");
  assert.deepEqual(d.filter((x) => x.type === "add"), [{ type: "add", text: "b" }]);
  assert.equal(d.filter((x) => x.type === "del").length, 0);
});

test("a removed line shows as del", () => {
  const d = lineDiff("a\nb\nc", "a\nc");
  assert.deepEqual(d.filter((x) => x.type === "del"), [{ type: "del", text: "b" }]);
  assert.equal(d.filter((x) => x.type === "add").length, 0);
});
```

- [ ] **Step 6: Run the diff tests to confirm they fail**

Run: `node --test src/lib/diff.test.mjs`
Expected: FAIL — `Cannot find module './diff.js'`.

- [ ] **Step 7: Implement diff**

Create `src/lib/diff.js`:
```js
// Line-level diff (LCS-based) for the Phase-2 submit stub: shows which lines the
// edit added/removed relative to the original. Not a full Myers diff — enough to
// preview a change set.
export function lineDiff(original, edited) {
  const a = original.split("\n");
  const b = edited.split("\n");
  const m = a.length;
  const n = b.length;
  const lcs = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }
  const out = [];
  let i = 0;
  let j = 0;
  while (i < m && j < n) {
    if (a[i] === b[j]) {
      out.push({ type: "same", text: a[i] });
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      out.push({ type: "del", text: a[i] });
      i++;
    } else {
      out.push({ type: "add", text: b[j] });
      j++;
    }
  }
  while (i < m) out.push({ type: "del", text: a[i++] });
  while (j < n) out.push({ type: "add", text: b[j++] });
  return out;
}
```

- [ ] **Step 8: Run the diff tests to confirm they pass**

Run: `node --test src/lib/diff.test.mjs`
Expected: PASS (4/4).

- [ ] **Step 9: Commit**

```bash
git add src/lib/edit-source.js src/lib/edit-source.test.mjs src/lib/diff.js src/lib/diff.test.mjs
git commit -m "$(printf 'Add editor helpers: safe page-source encode/decode + line diff\n\nCo-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>')"
```

---

### Task 2: Editor controller + EasyMDE dependency + theme CSS

**Files:**
- Modify: `package.json` / `package-lock.json` (add `easymde` via npm)
- Create: `src/scripts/editor.js`
- Modify: `src/styles/global.css` (append editor theme rules)

**Interfaces:**
- Consumes: `lineDiff` from `src/lib/diff.js` (Task 1).
- Produces: `mountEditor({ article: HTMLElement, root: HTMLElement, source: string, title: string }): void` — hides `article`, mounts EasyMDE (initial value = `source`) inside `root`, wires Cancel (restore article) and Save (stub: render diff + Copy). This is the ONLY module importing `easymde`, so it lands in a lazy chunk.

- [ ] **Step 1: Install EasyMDE with npm (not pnpm)**

Run:
```bash
cd /c/Users/lewis/dev/openfront-wiki && export PATH="/c/Program Files/nodejs:$PATH" && npm install easymde
```
Expected: `easymde` added to `package.json` dependencies and to `package-lock.json`. Confirm no pnpm lockfile appeared: `test ! -f pnpm-lock.yaml && echo ok-no-pnpm-lock`.

- [ ] **Step 2: Create the editor controller**

Create `src/scripts/editor.js`:
```js
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import { lineDiff } from "../lib/diff.js";

// Swap a rendered article for an inline EasyMDE editor. Saving is a Phase-2 STUB:
// it shows a line diff + Copy Markdown + a note. Phase 3 replaces the save handler
// with a real submit (edited Markdown + slug -> backend).
export function mountEditor({ article, root, source, title }) {
  article.hidden = true;
  root.hidden = false;
  root.innerHTML = `
    <div class="edit-bar">
      <strong class="edit-bar-title">Editing: ${escapeHtml(title)}</strong>
      <span class="edit-actions">
        <button type="button" class="edit-btn" data-edit-cancel>Cancel</button>
        <button type="button" class="edit-btn edit-btn-primary" data-edit-save>Save / Suggest edit</button>
      </span>
    </div>
    <textarea data-edit-textarea></textarea>
    <div data-edit-result hidden></div>`;

  const easymde = new EasyMDE({
    element: root.querySelector("[data-edit-textarea]"),
    initialValue: source,
    autoDownloadFontAwesome: false,
    spellChecker: false,
    status: false,
    previewClass: ["editor-preview", "wiki-content"],
    toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "code", "|", "preview", "side-by-side", "guide"],
  });

  const close = () => {
    easymde.toTextArea();
    root.hidden = true;
    root.innerHTML = "";
    article.hidden = false;
  };
  root.querySelector("[data-edit-cancel]").addEventListener("click", close);
  root.querySelector("[data-edit-save]").addEventListener("click", () => {
    showStubResult(root.querySelector("[data-edit-result]"), source, easymde.value());
  });
}

function showStubResult(el, original, edited) {
  const diff = lineDiff(original, edited);
  const changed = diff.some((d) => d.type !== "same");
  el.hidden = false;
  if (!changed) {
    el.innerHTML = `<p class="edit-note">No changes to save.</p>`;
    return;
  }
  el.innerHTML = `
    <p class="edit-note">Editing isn't live yet — Phase 3 adds Discord sign-in and review so this can be saved/suggested. For now, copy your Markdown:</p>
    <button type="button" class="edit-btn" data-edit-copy>Copy Markdown</button>
    <pre class="edit-diff">${diff.map(renderDiffLine).join("\n")}</pre>`;
  el.querySelector("[data-edit-copy]").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    Promise.resolve(navigator.clipboard && navigator.clipboard.writeText(edited))
      .then(() => { btn.textContent = "Copied!"; })
      .catch(() => { btn.textContent = "Copy failed"; });
  });
}

function renderDiffLine(d) {
  const cls = d.type === "add" ? "diff-add" : d.type === "del" ? "diff-del" : "diff-same";
  const sign = d.type === "add" ? "+" : d.type === "del" ? "-" : " ";
  return `<span class="${cls}">${sign} ${escapeHtml(d.text)}</span>`;
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
```

- [ ] **Step 3: Append editor theme CSS**

Append to `src/styles/global.css`:
```css
/* --- Inline editor (EasyMDE) — lazy-loaded on "Edit this page" --- */
.edit-page-btn,
.edit-btn {
  border: 1px solid rgb(255 255 255 / 0.15);
  border-radius: 0.45rem;
  padding: 0.3rem 0.75rem;
  font-size: 0.8rem;
  color: #fff;
  background: rgb(255 255 255 / 0.05);
  cursor: pointer;
}
.edit-page-btn:hover,
.edit-btn:hover { background: rgb(255 255 255 / 0.1); }
.edit-btn-primary { background: var(--color-malibu); border-color: transparent; }
.edit-bar { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin: 1rem 0 0.5rem; }
.edit-actions { display: inline-flex; gap: 0.5rem; }
.edit-note { font-size: 0.85rem; color: var(--color-dawn); margin: 0.75rem 0 0.5rem; }
.edit-diff { overflow-x: auto; background: var(--color-navy-700); border: 1px solid rgb(255 255 255 / 0.1); border-radius: 0.5rem; padding: 0.6rem 0.8rem; font-size: 0.8rem; line-height: 1.5; }
.edit-diff .diff-add { display: block; color: #7ee787; }
.edit-diff .diff-del { display: block; color: #ff9492; }
.edit-diff .diff-same { display: block; color: var(--color-dawn); opacity: 0.55; }
/* EasyMDE dark theme + preview uses the site's article look */
.EasyMDEContainer .CodeMirror { background: var(--color-navy-700); color: #e8eef7; border-color: rgb(255 255 255 / 0.12); }
.EasyMDEContainer .CodeMirror-cursor { border-color: #fff; }
.EasyMDEContainer .editor-toolbar { background: var(--color-navy-600); border-color: rgb(255 255 255 / 0.12); opacity: 1; }
.EasyMDEContainer .editor-toolbar button { color: #cdd7e6 !important; }
.EasyMDEContainer .editor-toolbar button.active,
.EasyMDEContainer .editor-toolbar button:hover { background: rgb(255 255 255 / 0.08); border-color: transparent; }
.EasyMDEContainer .editor-preview.wiki-content { background: var(--color-navy); padding: 1rem; }
```

- [ ] **Step 4: Verify the module builds and EasyMDE resolves**

The controller is DOM/interactive (no unit test). Verify it compiles and its import resolves by type-checking the build path:
```bash
export PATH="/c/Program Files/nodejs:$PATH" && corepack pnpm build 2>&1 | grep -E "Complete!|error"
```
Expected: `Complete!`, no `error`. (The controller is not yet imported anywhere, so this only confirms the project still builds and `easymde` installed cleanly; Task 3 wires and exercises it.)

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/scripts/editor.js src/styles/global.css
git commit -m "$(printf 'Add lazy EasyMDE editor controller + dark theme (stub save)\n\nCo-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>')"
```

---

### Task 3: Wire the Edit UI into the wiki route + build verification

**Files:**
- Modify: `src/pages/[slug].astro`
- Test: build assertions (run inline; no new test file)

**Interfaces:**
- Consumes: `encodePageSource` from `src/lib/edit-source.js`, `decodePageSource` from same, `mountEditor` from `src/scripts/editor.js` (lazy). `entry.body` (raw Markdown).
- Produces: the live Edit affordance on wiki pages.

- [ ] **Step 1: Add the source encode import + compute the encoded source (wiki only)**

In `src/pages/[slug].astro` frontmatter, add to the imports (line 8 area):
```js
import { encodePageSource } from "../lib/edit-source.js";
```
And after the `isWiki`/normalisation block (after line 54), add:
```js
// Phase 2: embed the raw Markdown so the inline editor can load it (wiki pages only).
const pageSource = isWiki ? encodePageSource(entry.body) : null;
```

- [ ] **Step 2: Add the "Edit this page" button to the title row (wiki only)**

In the title row (currently lines 101-112, the `<div class="flex flex-wrap items-center gap-3">` containing the `<h1>` and stub badge), add the button as the last child, before the closing `</div>`:
```astro
        {
          isWiki && (
            <button id="edit-page-btn" type="button" class="edit-page-btn ml-auto" data-title={title}>
              ✎ Edit this page
            </button>
          )
        }
```
(The `ml-auto` pushes it to the right of the title row.)

- [ ] **Step 3: Add the editor root + embedded source to the wiki article branch**

Replace the wiki branch of the article render (currently lines 128-131, the `isWiki ?` arm) so it also renders the editor mount point and the embedded source. The full ternary becomes:
```astro
      {isWiki ? (
        <>
          <article id="wiki-article" class="wiki-content mt-6" data-pagefind-body data-pagefind-meta={`title:${title}`}>
            <Content />
          </article>
          <div id="wiki-editor-root" class="mt-6" hidden></div>
          <script type="application/json" id="wiki-page-source" set:html={pageSource}></script>
        </>
      ) : (
        <article class="wiki-content mt-6" set:html={contentHtml} data-pagefind-body data-pagefind-meta={`title:${title}`} />
      )}
```

- [ ] **Step 4: Add the loader script (lazy-imports the editor on click)**

At the end of the file (after the existing toggle-area `<script>` block, i.e. after line 236), add a new script:
```astro
<script>
  // Phase 2: lazy-load the inline editor only when "Edit this page" is clicked,
  // so EasyMDE never ships in the reading bundle. No-op on Masters pages.
  import { decodePageSource } from "../lib/edit-source.js";
  const btn = document.getElementById("edit-page-btn");
  const article = document.getElementById("wiki-article");
  const root = document.getElementById("wiki-editor-root");
  const srcEl = document.getElementById("wiki-page-source");
  if (btn && article && root && srcEl) {
    btn.addEventListener("click", async () => {
      btn.disabled = true;
      try {
        const { mountEditor } = await import("../scripts/editor.js");
        mountEditor({
          article,
          root,
          source: decodePageSource(srcEl.textContent || "\"\""),
          title: btn.getAttribute("data-title") || document.title,
        });
      } catch (err) {
        btn.disabled = false;
        btn.textContent = "Editor failed to load";
        console.error(err);
      }
    });
  }
</script>
```

- [ ] **Step 5: Build and verify the wiki wiring**

Run:
```bash
export PATH="/c/Program Files/nodejs:$PATH" && corepack pnpm build 2>&1 | grep -E "Complete!|error"
```
Expected: `Complete!`.

Then verify a wiki page has the button + a source block that decodes to the page's Markdown, and matches the collection body:
```bash
node -e '
const fs=require("fs");
const {decodePageSource}=require("./src/lib/edit-source.js");
const html=fs.readFileSync("dist/Warship/index.html","utf8");
console.log("has edit button:", html.includes("id=\"edit-page-btn\""));
const m=html.match(/<script type=\"application\/json\" id=\"wiki-page-source\">([\s\S]*?)<\/script>/);
const decoded=decodePageSource(m[1]);
const body=fs.readFileSync("src/content/wiki/Warship.md","utf8").replace(/^---[\s\S]*?---\n/,"");
console.log("source decodes and matches entry body:", decoded.trim()===body.trim());
'
```
Expected: both print `true`. (`edit-source.js` uses ESM `export`; if `require` fails under the repo's module type, run the check with `node --input-type=module -e` or a tiny `.mjs` scratch file instead — the assertion is what matters.)

- [ ] **Step 6: Verify Masters pages have NO edit UI**

```bash
node -e '
const h=require("fs").readFileSync("dist/OpenFront_Masters/index.html","utf8");
console.log("masters has NO edit button:", !h.includes("id=\"edit-page-btn\""));
console.log("masters has NO source block:", !h.includes("id=\"wiki-page-source\""));
'
```
Expected: both `true`.

- [ ] **Step 7: Verify EasyMDE is a lazy chunk, not in the reading bundle**

```bash
echo "easymde chunk present:" && grep -rl "EasyMDE" dist/_astro/*.js | head -1
echo "reading-page scripts do NOT statically reference the easymde chunk:"
node -e '
const fs=require("fs");
const chunk=fs.readdirSync("dist/_astro").find(f=>f.endsWith(".js")&&fs.readFileSync("dist/_astro/"+f,"utf8").includes("EasyMDE"));
const html=fs.readFileSync("dist/Warship/index.html","utf8");
console.log("easymde chunk:", chunk);
console.log("not eagerly loaded on the page:", chunk ? !html.includes(chunk) : "NO CHUNK FOUND");
'
```
Expected: an easymde chunk file exists and is NOT referenced by a `<script src>` in the page HTML (it is fetched only via dynamic import on click).

- [ ] **Step 8: Run the full test suite**

```bash
node --test src/lib/*.test.mjs scripts/lib/*.test.mjs
```
Expected: all pass (Task 1's new tests included).

- [ ] **Step 9: Manual check (report in the task report)**

Serve the build (`corepack pnpm preview`) and, on a wiki page (e.g. `/Warship`): click "Edit this page" → EasyMDE opens with the page's Markdown, toolbar + preview/side-by-side work, Cancel restores the article, editing a line then Save shows the diff (added/removed lines) + a working Copy Markdown button + the Phase-3 note. Confirm `/OpenFront_Masters` shows no Edit button.

- [ ] **Step 10: Commit**

```bash
git add src/pages/[slug].astro
git commit -m "$(printf 'Wire inline Edit UI into wiki pages (lazy editor, stub save)\n\nEdit button + embedded Markdown source on kind==="wiki" pages only; a tiny\nloader lazy-imports the EasyMDE controller on click. Masters pages unchanged.\n\nCo-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>')"
```

---

## Notes for the implementer

- **Astro `<script>` + dynamic import:** Astro processes `<script>` tags with Vite; `await import("../scripts/editor.js")` code-splits `editor.js` (and its `easymde` import + CSS) into a separate chunk fetched on demand. The static `import { decodePageSource }` in the loader is tiny and fine in the reading bundle.
- **`set:html={pageSource}`** injects the already-safe encoded JSON (no literal `<`) as the script element's text; the client reads `srcEl.textContent` and `decodePageSource`s it.
- **Do not** add the Edit button, source block, or editor root to the Masters (`set:html`) branch — Masters stay read-only mirrors.
- The stub `showStubResult` save path is deliberately a self-contained seam; Phase 3 swaps it for `POST edited + slug → backend` without touching the editor mount or the wiring.
