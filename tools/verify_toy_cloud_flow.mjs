#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const main = fs.readFileSync(path.join(root, 'main.js'), 'utf8');

assert.match(html, /id="start-button"[^>]*>开始游戏<\/button>/);
assert.match(html, /Image\/subaru_entry\.png/);
assert.match(main, /avatar\.src = 'Image\/subaru_cat\.png';/);
assert.match(main, /function spawnCorpse\(type\)/);
assert.match(html, /@keyframes corpse-drop/);
assert.match(html, /grayscale\(1\)/);
assert.match(html, /main\.js\?v=8/);
assert.match(main, /function kick\(time\)/);
assert.match(main, /function snare\(time/);
assert.match(main, /function chord\(time/);
assert.match(main, /const CHORDS = Object\.freeze/);
assert.doesNotMatch(main, /bgm_rhythm|fetch\('audio\/bgm/);
assert.doesNotMatch(main, /\bname:\s*'被|\bname:\s*'多兔/);

const counts = [...main.matchAll(/^\s{2}\w+: (\d+),$/gm)].map((match) => Number(match[1]));
assert.ok(counts.length >= 12);
assert.ok(Math.min(...counts.slice(-12)) >= 16);

console.log('Flow verified: explicit start, cat swap, corpse fall, full-screen themed pieces, synth BGM.');
