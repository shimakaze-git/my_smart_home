// const { createAccessToken, getUserProfile } = require('./user')

const SignUp = (req, res) => {
  return res.json({
    state: '',
  })
}

const SignIn = (req, res) => {
  console.log('req.body', req.body)
  if (req.body.authUser) {
    // セッションにつめる
    // req.session.authUser = req.body.authUser

    console.log('req.body.authUser', req.body.authUser)

    // レスポンスはそのまま返す
    // return res.json(req.body.authUser)
    return res.json()
  }
  return res.status(401).json({ message: 'Bad credentials' })
}

const Logout = (req, res) => {
  // セッションの削除
  delete req.session.authUser
  return res.json({ ok: true })
}

module.exports = { SignIn, SignUp, Logout }
