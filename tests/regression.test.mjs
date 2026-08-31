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

test("mobile invitation keeps a stable full-width scale while browser chrome changes height", () => {
  assert.match(css, /\.invitation-shell\s*\{[^}]*width:\s*min\(430px,\s*100vw\)/s);
  assert.doesNotMatch(css, /\.invitation-shell[^}]*100s?vh/s);
  assert.doesNotMatch(css, /@media\s*\(max-height:/s);
  assert.match(css, /-webkit-text-size-adjust:\s*100%/);
});

test("floral background and falling petals cover the complete landing page", () => {
  assert.match(html, /<div class="petal-field" id="petals"[^>]*><\/div>[\s\S]*<section class="invitation-shell"/);
  assert.match(css, /\.petal-field\s*\{[^}]*position:\s*fixed[^}]*inset:\s*0/s);
  assert.match(css, /url\("assets\/page-floral-background\.png"\)/);
  assert.match(css, /background-repeat:\s*repeat-y/);
  assert.ok(existsSync(new URL("../assets/page-floral-background.png", import.meta.url)));
});

test("decorative ambience cannot create a phantom blank footer", () => {
  assert.match(css, /\.ambient\s*\{[^}]*position:\s*fixed/s);
  assert.doesNotMatch(css, /\.ambient\s*\{[^}]*position:\s*absolute/s);
});

test("Feruzbek and Odina event details stay consistent", () => {
  assert.match(html, /Feruzbek &amp; Odina/);
  assert.match(html, /Visol oqshomi/);
  assert.match(html, /Nahor oshi/);
  assert.match(html, /Malika to‘yxonasi/);
  assert.match(script, /2026-09-27T18:00:00\+05:00/);
  assert.ok(existsSync(new URL("../assets/invitation-feruzbek-odina.png", import.meta.url)));
});
