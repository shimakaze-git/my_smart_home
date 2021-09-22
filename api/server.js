const express = require('express')
const cors = require('cors')
const serverless = require('serverless-http')

const { router } = require('./router')
const logger = require('./common/logger')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// ロガーを登録
app.use(logger)

app.use(
  // '/',
  '/.netlify/functions/server',
  (req, _, next) => {
    console.log('Request URL API:', req.originalUrl)
    next()
  },
  router
)

module.exports = app
module.exports.handler = serverless(app)
