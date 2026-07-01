// Minimal inline-SVG stand-ins for the FontAwesome classes Liquipedia uses.
// Add more as new fa- classes appear in fetched pages. 16x16, currentColor.
const svg = (p) => `<svg class="liq-icon" viewBox="0 0 512 512" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="${p}"/></svg>`;
export const ICONS = {
  "fa-book": svg("M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H448a32 32 0 0 0 0-64V32a32 32 0 0 0-32-32H96zm0 384H384v64H96a32 32 0 0 1 0-64z"),
  "fa-hammer": svg("M413 32l67 67c17 17 17 45 0 62l-51 51-129-129 51-51c17-17 45-17 62 0zM271 154l129 129L177 506a48 48 0 0 1-68 0L6 403a48 48 0 0 1 0-68z"),
  "fa-project-diagram": svg("M384 320H256c-18 0-32 14-32 32v128c0 18 14 32 32 32H384c18 0 32-14 32-32V352c0-18-14-32-32-32zM192 32C192 14 178 0 160 0H32C14 0 0 14 0 32V160c0 18 14 32 32 32H160c18 0 32-14 32-32V32z"),
  "fa-tasks": svg("M139 11a25 25 0 0 1 0 35L59 126a25 25 0 0 1-35 0L-1 100a25 25 0 0 1 35-35l7 7 63-62a25 25 0 0 1 35 0zM512 96a32 32 0 0 1-32 32H256a32 32 0 0 1 0-64H480a32 32 0 0 1 32 32z"),
  "fa-wrench": svg("M78 32C121 4 178 8 216 46c34 34 42 84 24 126l230 230a48 48 0 0 1-68 68L172 240C130 258 80 250 46 216 8 178 4 121 32 78z"),
};
