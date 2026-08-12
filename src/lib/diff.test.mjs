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
