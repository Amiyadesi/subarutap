# Subaru Tap

菜月昴惨叫音阶应援器。借鉴 Mikutap 与 Dagou Tap 的全屏触控形式，使用 3 种原版惨叫 x 4 个固定音阶；支持触控和 QWER / ASDF / ZXCV 键盘输入。

## Audio

惨叫音效来自用户提供的纯人声 `audio [vocals].wav`，从原文件中挑选 3 个自然“啊”片段，保持原始双声道 PCM 波形。每个片段运行时固定映射到 D5、C5、A4、G4；不合成新惨叫、不循环。原始长音频不提交，运行时片段嵌入 `audio-data.js`。

BGM 使用 Web Audio 实时生成的 128 BPM 节奏，和弦为 C-G-Am-F，无音频循环接缝。

## Credits

- 交互骨架参考 [MarkCup-Official/Dagou-Tap-New](https://github.com/MarkCup-Official/Dagou-Tap-New)。
- 原作角色属于其权利人；本仓库是非商业同人应援项目。

## Run

```powershell
python -m http.server 4173
```

打开 `http://127.0.0.1:4173/`。
