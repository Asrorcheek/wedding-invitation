import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../styles.css", import.meta.url), "utf8");
const script = readFileSync(new URL("../script.js", import.meta.url), "utf8");

test("double scrollbar regression: page owns one vertical scroll surface", () => {
  assert.match(css, /html\s*\{[^}]*overflow-x:\s*clip/s);
  assert.match(css, /\.experience\s*\{[^}]*overflow-x:\s*clip[^}]*overflow-y:\s*visible/s);
  assert.doesNotMatch(css, /html\s*,\s*body\s*\{[^}]*overflow-x:\s*hidden/s);
  assert.doesNotMatch(css, /\.is-open\s*\{[^}]*overflow-/s);
});

test("Feruzbek and Odina event details stay consistent", () => {
  assert.match(html, /Feruzbek &amp; Odina/);
  assert.match(html, /Visol oqshomi/);
  assert.match(html, /Nahor oshi/);
  assert.match(html, /Malika to‘yxonasi/);
  assert.match(script, /2026-09-27T18:00:00\+05:00/);
  assert.ok(existsSync(new URL("../assets/invitation-feruzbek-odina.png", import.meta.url)));
});
