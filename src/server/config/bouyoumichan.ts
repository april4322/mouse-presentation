export const bouyomiPort: number = 50002

export const defaultSetting = {
  delim: "<bouyomi>",
  speed: 100, // 速度50-200。-1を指定すると本体設定
  pitch: 100, // ピッチ50-200。-1を指定すると本体設定
  volume: 100, // ボリューム0-100。-1を指定すると本体設定
  type: 0, // 声質(0.本体設定/1.女性1/2.女性2/3.男性1/4.男性2/5.中性/6.ロボット/7.機械1/8.機械2)
  isEnabled: false  //0:棒読みちゃん無効, 1:棒読みちゃん有効
}