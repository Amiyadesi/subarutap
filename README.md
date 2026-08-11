# Subaru Tap

菜月昴惨叫音阶应援器。借鉴 Mikutap 的全屏触控形式，横屏为 3 种音色 x 4 个固定音阶，竖屏自动重排；支持触控、拖动和 QWER / ASDF / ZXCV 键盘输入。

## Audio

惨叫音效来自用户提供的纯人声 `audio [vocals].wav`，从原文件中挑选 12 个不同高能片段，保持原始双声道 PCM 波形；运行时不做变调、不合成新惨叫，只做每段响度平衡。原始长音频不提交，运行时片段嵌入 `audio-data.js`。

BGM 使用仓库内原创 `audio/bgm_rhythm.wav`，120 BPM、A 小调暗色节奏循环，无外部素材授权依赖。

## Credits

- 交互骨架参考 [MarkCup-Official/Dagou-Tap-New](https://github.com/MarkCup-Official/Dagou-Tap-New)。
- 原作角色属于其权利人；本仓库是非商业同人应援项目。

## Run

```powershell
python -m http.server 4173
```

打开 `http://127.0.0.1:4173/`。
