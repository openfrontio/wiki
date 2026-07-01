// Generate src/data/liquipedia-icons.js from FontAwesome Free (solid).
// FA Free icons are CC BY 4.0 (see LICENSING.md). Regenerate after new fa- classes
// appear in fetched Liquipedia content:  node scripts/gen-liquipedia-icons.mjs
import fs from "fs";
import * as FA from "@fortawesome/free-solid-svg-icons";

// map the fa- classes Liquipedia uses -> FontAwesome export names
const MAP = {
  "fa-trophy": "faTrophy",
  "fa-trophy-alt": "faTrophy",
  "fa-circle": "faCircle",
  "fa-chevron-up": "faChevronUp",
  "fa-chevron-down": "faChevronDown",
  "fa-chevron-left": "faChevronLeft",
  "fa-chevron-right": "faChevronRight",
  "fa-chevron-double-up": "faAngleDoubleUp",
  "fa-arrows-alt-v": "faArrowsAltV",
  "fa-caret-left": "faCaretLeft",
  "fa-caret-right": "faCaretRight",
  "fa-check": "faCheck",
  "fa-skull": "faSkull",
  "fa-users": "faUsers",
  "fa-star": "faStar",
  "fa-list-ol": "faListOl",
  "fa-hashtag": "faHashtag",
  "fa-eye": "faEye",
  "fa-eye-slash": "faEyeSlash",
  "fa-link": "faLink",
};

const out = {};
for (const [cls, name] of Object.entries(MAP)) {
  const ic = FA[name];
  if (!ic) { console.error("MISSING FA icon:", name); continue; }
  const [w, h, , , d] = ic.icon;
  const path = Array.isArray(d) ? d.join("") : d;
  out[cls] = `<svg class="liq-icon" viewBox="0 0 ${w} ${h}" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="${path}"/></svg>`;
}

fs.writeFileSync(
  "src/data/liquipedia-icons.js",
  "// Generated from @fortawesome/free-solid-svg-icons (icons: CC BY 4.0).\n" +
    "// Regenerate: node scripts/gen-liquipedia-icons.mjs\n" +
    "export const ICONS = " + JSON.stringify(out, null, 2) + ";\n",
);
console.log("wrote", Object.keys(out).length, "icons to src/data/liquipedia-icons.js");
