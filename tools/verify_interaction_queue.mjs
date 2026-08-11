#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const main = fs.readFileSync(path.join(root, 'main.js'), 'utf8');

assert.match(main, /stage\.addEventListener\('pointerdown'/);
assert.match(main, /window\.addEventListener\('keydown'/);
assert.doesNotMatch(main, /pointermove|mousemove|touchmove/);
assert.match(main, /function quantizedTapTime\(\)/);
assert.match(main, /lastTapSlots\.get\(index\) === slot/);
assert.match(main, /source\.start\(time\);/);
assert.doesNotMatch(main, /source\.loop\s*=\s*true/);
assert.doesNotMatch(main, /setInterval\([^)]*triggerZone/);
assert.match(main, /const S8 = SPB \/ 2;/);

console.log('Interaction verified: one one-shot sample per tap, eighth-note quantized.');
