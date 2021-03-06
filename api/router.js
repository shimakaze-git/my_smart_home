const express = require('express')

// require('encoding')
// const {
//   oauthSocialLineState,
//   oauthSocialLineCallback,
//   oauthSocialLineSignup,
// } = require('./logic/oauth')

const {
  getDevicesReq,
  deviceCommandsReq
} = require('./logic/devices')
const {
  getAppliancesReq,
  sendAppliancesReq
} = require('./logic/appliances')
const {
  executeCheck
} = require('./logic/check')
const {
  KeyOpenReq
} = require('./logic/key')

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

router.get('/devices', getDevicesReq)
router.post('/devices/:deviceId/commands', deviceCommandsReq)

router.get('/appliances', getAppliancesReq)
router.post('/appliances/:appliance_id/send', sendAppliancesReq)

router.post('/key', KeyOpenReq)

// const url = this.$config.WEB_HOST + '/.netlify/functions/app/appliances'

// router.post('/oauth/social/line/callback', oauthSocialLineCallback)
// router.post('/oauth/social/line/signup', oauthSocialLineSignup)

// ログイン関連処理
// router.post('/auth/signin', SignIn)
// router.post('/auth/signup', SignUp)
// router.post('/auth/logout', Logout)

// 定期的なチェック
// router.post('check', executeCheck)
router.get('/check', executeCheck)

module.exports = {
  router
}
