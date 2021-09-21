module.exports = (req, res, next) => {
  // ipアドレス
  const ipaddress =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    (req.socket && req.socket.remoteAddress) ||
    (req.connection.socket && req.connection.socket.remoteAddress) ||
    '0.0.0.0'

  // 日付
  const date = new Date().toISOString()

  // リクエストメソッド
  const method = req.method

  // リクエストURL
  const url = req.url

  // リクエストユーザーーエージェント
  const ua = req.headers['user-agent']

  // ログ出力
  console.log(`${ipaddress} [${date}] "${method} ${url}" - ${ua}`)

  // 次のミドルウェアを呼ぶ
  next()
}
