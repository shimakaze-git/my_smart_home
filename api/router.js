const express = require('express')
// const {
//   oauthSocialLineState,
//   oauthSocialLineCallback,
//   oauthSocialLineSignup,
// } = require('./logic/oauth')

const {
  getDevices
} = require('./logic/devices')
const {
  getAppliances
} = require('./logic/appliances')

// const { SignIn, SignUp, Logout } = require('./logic/auth')

const router = express.Router()

// routerに関わらず、アクセス日時を出力するミドルウェア
router.use((req, res, next) => {
  // console.log(new Date().toISOString())
  next()
})

router.get('/', (req, res) => {
  console.log('req', req.headers)
  res.json({ route: req.originalUrl })
})

router.get('/devices', getDevices)
router.get('/appliances', getAppliances)

// router.post('/oauth/social/line/callback', oauthSocialLineCallback)
// router.post('/oauth/social/line/signup', oauthSocialLineSignup)

// ログイン関連処理
// router.post('/auth/signin', SignIn)
// router.post('/auth/signup', SignUp)
// router.post('/auth/logout', Logout)

module.exports = router
