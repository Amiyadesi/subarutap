# Subaru Tap

菜月昴惨叫音阶应援器。借鉴 Mikutap 的全屏触控形式，横屏为 3 种音色 x 4 个固定音阶，竖屏自动重排；支持触控、拖动和 QWER / ASDF / ZXCV 键盘输入。

## Audio

音效来自本地 `8月10日.FLAC` 的三个短段，经过单声道转换、淡入淡出和限幅后嵌入 `audio-data.js`。运行时用 Web Audio `playbackRate` 将三个音色分别映射到 G4、E4、C4、A3，避免随机点击出现半音冲突。

本项目不提交原始 FLAC。

## Credits

- 交互骨架参考 [MarkCup-Official/Dagou-Tap-New](https://github.com/MarkCup-Official/Dagou-Tap-New)。
- 原作角色属于其权利人；本仓库是非商业同人应援项目。

## Run

```powershell
python -m http.server 4173
```

打开 `http://127.0.0.1:4173/`。
