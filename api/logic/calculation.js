// 不快指数
const discomfortIndex = (temperature, humidity) => {

  // 日本人では、不快指数75で約9％の人が、77で約65％の人が不快に感じるようです
  // DI = 0.81T + 0.01H × (0.99T − 14.3) +46.3
  // https://keisan.casio.jp/exec/system/1202883065

  // 夏場	25～28度	45～60%
  // 冬場	18～22度	55～65%
  // https://magazine.aruhi-corp.co.jp/0000-1541/

  // 室内の適正温度・湿度
  // 春・秋 温度 19 ~ 23度 湿度 50%
  // 夏 温度 24 ~ 27度 湿度 60%
  // 冬 温度 18 ~ 21度 湿度 40%
  // https://image.rakuten.co.jp/ajaxmart/cabinet/ssls3_01_03.jpg

  // 高湿で危険性が増すもの
  // カビ	 20〜30℃/70%以上で繁殖（60%から活発化）
  // ダニ	25〜30℃/60〜85%で繁殖（55%から活発化）

  // 低湿で危険性が増すもの
  // 湿度20%以下では死なない
  // （22℃以上/50％以上で激減、65%で生存率ほぼ0）

  // 肌によいのは60〜65%。50%を下回ると肌が乾燥し始めます。
  // https://hitori-life.com/ondo/#toc7

  let di = null
  let rank = null
  try {

    // 不快指数の計算式
    di = (0.81 * temperature) + (0.01 * humidity) * (0.99 * temperature - 14.3) + 46.3

    // 不快指数のrankを求める.
    let rank_list = [50, 55, 60, 65, 70, 75, 80, 85, 90]
    for (var i = 0;  i < 9;  i++) {
      rank += 1
      if (di < rank_list[i]) {
        break
      }
    }

    // rank
    // 1: 〜50	寒くてたまらない
    // 2: 50〜55	寒い
    // 3: 55〜60	肌寒い
    // 4: 60〜65	何も感じない
    // 5: 65〜70	快適
    // 6: 70〜75	不快感を持つ人が出始める
    // 7: 75〜80	半数以上が不快に感じる
    // 8: 80〜85	全員が不快に感じる
    // 9: 85〜	暑くてたまらない
  } catch (error) {
    console.log('error', error)
  }

  return {
    val: di,
    rank: rank
  }
}

module.exports = {
  discomfortIndex
}
