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
