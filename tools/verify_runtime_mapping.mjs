#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const main = fs.readFileSync(path.join(root, 'main.js'), 'utf8');
const audioData = fs.readFileSync(path.join(root, 'audio-data.js'), 'utf8');

assert.match(main, /const BPM = 128;/);
assert.match(main, /const PITCH_TIERS = Object\.freeze\(\[74, 72, 69, 67\]\);/);


const sourceMidiBlock = main.match(
	/const SOURCE_MIDI = Object\.freeze\(\{([\s\S]*?)\}\);/,
);
assert.ok(sourceMidiBlock, "SOURCE_MIDI declaration");
const sourceMidi = Object.fromEntries(
	[...sourceMidiBlock[1].matchAll(/\b(voice_[abc]): ([\d.]+),/g)].map((match) => [
    match[1],
    Number(match[2]),
  ]),
);
assert.deepEqual(sourceMidi, {
  voice_a: 69.056,
  voice_b: 70.156,
  voice_c: 67.960,
});

const sampleBlock = main.match(
  /const VOICE_SAMPLES = Object\.freeze\(\[([\s\S]*?)\]\);/,
);
assert.ok(sampleBlock, 'VOICE_SAMPLES declaration');
const samples = [...sampleBlock[1].matchAll(/'(voice_[abc])'/g)].map(
  (match) => match[1],
);
assert.deepEqual(samples, [
  'voice_a', 'voice_a', 'voice_a', 'voice_a',
  'voice_b', 'voice_b', 'voice_b', 'voice_b',
  'voice_c', 'voice_c', 'voice_c', 'voice_c',
]);

const targets = [74, 72, 69, 67];
for (const [row, sample] of ['voice_a', 'voice_b', 'voice_c'].entries()) {
  for (let column = 0; column < targets.length; column += 1) {
    const rate = 2 ** ((targets[column] - sourceMidi[sample]) / 12);
    assert.ok(rate > 0.82 && rate < 1.43, 'row ' + row + ' tier ' + column + ' rate ' + rate);
  }
}

const sandbox = { window: {} };
vm.runInNewContext(audioData, sandbox);
assert.deepEqual(
  Object.keys(sandbox.window.AUDIO_B64).sort(),
  ['voice_a', 'voice_b', 'voice_c'],
);
for (const name of Object.keys(sourceMidi)) {
  assert.ok(sandbox.window.AUDIO_B64[name].length > 300000, name + ' embedded');
  assert.ok(fs.existsSync(path.join(root, 'audio', name + '.wav')), name + '.wav exists');
}

console.log('Subaru voice map verified: 3 original cries x D5/C5/A4/G4.');
