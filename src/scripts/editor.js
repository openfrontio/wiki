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
