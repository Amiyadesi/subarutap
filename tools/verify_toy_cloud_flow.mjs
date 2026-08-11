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
assert.match(html, /main\.js\?v=12/);
assert.match(html, /audio-data\.js\?v=12/);
assert.match(html, /\.avatar-frame\.is-hit \.avatar/);
assert.match(html, /main \{[^}]*z-index: 6/);
assert.match(html, /width: min\(52vw, 520px\)/);
assert.match(html, /scale: var\(--avatar-pulse\)/);
assert.doesNotMatch(html, /avatar-twitch|\.94s/);
assert.match(html, /id="about-button"[^>]*>关于<\/button>/);
assert.match(html, /href="https:\/\/sayori\.org"[^>]*>Amiya_desi<\/a>/);
assert.match(html, /MarkCup-Official\/Dagou-Tap-New/);
assert.match(html, /BV1n1qVY3EmT/);
assert.match(main, /function openAbout\(\)/);
assert.match(html, /rotate\(var\(--corpse-start-rotate\)\)/);
assert.match(html, /68% \{ opacity: 1; transform: translate\(var\(--corpse-x\).*--corpse-end-rotate/);
assert.match(main, /corpseLaunchIndex = \(corpseLaunchIndex \+ 5\) % 24/);
assert.match(main, /Math\.min\(innerWidth, innerHeight\) \* 0\.42/);
assert.match(main, /function avatarRotation\(\)/);
assert.match(main, /new DOMMatrixReadOnly\(transform\)/);
assert.match(main, /--corpse-start-rotate/);
assert.match(main, /--avatar-pulse/);
assert.match(main, /function kick\(time\)/);
assert.match(main, /function snare\(time/);
assert.match(main, /function chord\(time/);
assert.match(main, /const CHORDS = Object\.freeze/);
assert.doesNotMatch(main, /bgm_rhythm|fetch\('audio\/bgm/);
assert.doesNotMatch(main, /\bname:\s*'被|\bname:\s*'多兔/);
assert.deepEqual(
  [...main.matchAll(/^  '(rings|poly|spiral|rays|confetti|zigzag|pop|cross|orbit|wave|stars|grid)',?$/gm)].map((match) => match[1]),
  ['rings', 'poly', 'spiral', 'rays', 'confetti', 'zigzag', 'pop', 'cross', 'orbit', 'wave', 'stars', 'grid'],
);
assert.match(main, /const BUILD = \{/);
assert.match(main, /const DRAW = \{/);
assert.match(main, /function spawnEffect\(zi, when\)/);
assert.doesNotMatch(main, /PIECE_COUNTS|drawRabbit|drawKnife|drawHand|drawDeathPiece|spawnDeathEffect|drawDeathEffect/);
assert.match(main, /const FX_LIFE = 0\.72/);
assert.match(main, /t >= FX_LIFE/);
assert.match(main, /while \(fxList\.length > 4\)/);

console.log('Flow verified: original Dagou geometry, beat-synced idle spin, inherited corpse rotation, voices, synth BGM.');
