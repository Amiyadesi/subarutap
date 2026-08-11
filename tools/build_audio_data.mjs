#!/usr/bin/env node

// Rebuild the production base64 bundle from the explicitly supported samples.
// Keeping the list explicit prevents unrelated work-in-progress audio files from
// silently increasing the published payload.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const toolsDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.dirname(toolsDir);
const audioDir = path.join(rootDir, 'audio');
const outputPath = path.join(rootDir, 'audio-data.js');
const sampleFiles = Object.freeze({
  voice_01: 'voice_01.wav',
  voice_02: 'voice_02.wav',
  voice_03: 'voice_03.wav',
  voice_04: 'voice_04.wav',
  voice_05: 'voice_05.wav',
  voice_06: 'voice_06.wav',
  voice_07: 'voice_07.wav',
  voice_08: 'voice_08.wav',
  voice_09: 'voice_09.wav',
  voice_10: 'voice_10.wav',
  voice_11: 'voice_11.wav',
  voice_12: 'voice_12.wav',
});

const entries = Object.entries(sampleFiles).map(([sampleName, relativePath]) => {
  const audioPath = path.join(audioDir, ...relativePath.split('/'));
  if (!fs.existsSync(audioPath)) {
    throw new Error(`Missing runtime sample: ${audioPath}`);
  }
  return `  ${sampleName}: '${fs.readFileSync(audioPath).toString('base64')}',`;
});

const source = [
  '/* 自动生成的音频数据（base64），来源：audio 文件夹中的运行时 WAV */',
  'window.AUDIO_B64 = {',
  ...entries,
  '};',
  '',
].join('\n');

fs.writeFileSync(outputPath, source, 'utf8');
console.log(`Embedded ${Object.keys(sampleFiles).length} samples in ${outputPath}`);
