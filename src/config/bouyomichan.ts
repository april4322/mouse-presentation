export const defaultSetting = {
  speed: 100, // 速度50-200。-1を指定すると本体設定
  pitch: 100, // ピッチ50-200。-1を指定すると本体設定
  volume: 100, // ボリューム0-100。-1を指定すると本体設定
  type: 1, // 声質(0.本体設定/1.女性1/2.女性2/3.男性1/4.男性2/5.中性/6.ロボット/7.機械1/8.機械2)
  isEnabled: false  //0:棒読みちゃん無効, 1:棒読みちゃん有効
}

export const types = [
  { value: 1, name: '女性1' },
  { value: 2, name: '女性2' },
  { value: 3, name: '男性1' },
  { value: 4, name: '男性2' },
  { value: 5, name: '中性' },
  { value: 6, name: 'ロボット' },
  { value: 7, name: '機械1' },
  { value: 8, name: '機械2' },
]