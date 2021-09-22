const nowDate = () => {
  // 現在時刻の取得
  const japanStandardTime = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' })
  let dt = new Date(japanStandardTime)

  // 日本の時間に修正
  // dt.setTime(dt.getTime() + (1000 * 60 * 60 * 9)) // 1000 * 60 * 60 * 9(hour)

  // 日付を数字として取り出す
  let year = dt.getFullYear()
  let month = dt.getMonth()+1
  let day = dt.getDate()
  let hour = dt.getHours()
  let min = dt.getMinutes()
  let second = dt.getSeconds()

  // 値が1桁であれば '0'を追加
  if (month < 10) {
    month = '0' + month;
  }

  if (day   < 10) {
    day   = '0' + day
  }

  if (hour   < 10) {
    hour  = '0' + hour
  }

  if (min   < 10) {
    min   = '0' + min
  }

  if (second   < 10) {
    second   = '0' + second
  }

  return [
    year + '',
    month + '',
    day + '',
    hour + '',
    min + '',
    second + ''
  ]
}

module.exports = {
  nowDate,
}
