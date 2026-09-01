import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const musicUrl = new URL("../assets/calikusu-jenerik.m4a", import.meta.url);

test("luxury invitation preserves all supplied event details", () => {
  assert.match(html, /Feruzbek/);
  assert.match(html, /Odina/);
  assert.match(html, /27 SENTABR 2026/);
  assert.match(html, /Visol oqshomi/);
  assert.match(html, /Boshlanishi · 18:00/);
  assert.match(html, /Malika to‘yxonasi/);
  assert.match(html, /28/);
  assert.match(html, /Nahor oshi/);
  assert.match(html, /2026-09-27T18:00:00\+05:00/);
});

test("location button opens the supplied Google Maps pin", () => {
  assert.match(html, /https:\/\/maps\.google\.com\/maps\?q=38\.921835,67\.027932&amp;ll=38\.921835,67\.027932&amp;z=16/);
  assert.match(html, /class="loc-btn"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/);
});

test("background music starts from the invitation gesture and remains controllable", () => {
  assert.ok(existsSync(musicUrl));
  const audioHeader = readFileSync(musicUrl).subarray(0, 32).toString("latin1");
  assert.match(audioHeader, /ftyp/);
  assert.match(html, /<audio id="background-music"[^>]*src="assets\/calikusu-jenerik\.m4a"[^>]*loop/);
  assert.match(html, /musicControl\.classList\.add\('visible'\);\s*startMusic\(\);/s);
  assert.match(html, /musicControl\.addEventListener\('click'/);
  assert.match(html, /music\.volume = 0\.48/);
});

test("mobile layout uses one page scroll and accounts for safe-area controls", () => {
  assert.match(html, /width=device-width, initial-scale=1, viewport-fit=cover/);
  assert.match(html, /bottom:max\(18px, env\(safe-area-inset-bottom\)\)/);
  assert.doesNotMatch(html, /<br\s*\/?\s*>/i);
  assert.doesNotMatch(html, /overflow-y:\s*(auto|scroll)/);
});
