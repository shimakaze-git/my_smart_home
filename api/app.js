const express = require('express')
const cors = require('cors')
const ApiRouter = require('./router')
const logger = require('./common/logger')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// ロガーを登録
app.use(logger)

app.use(
  '/',
  (req, _, next) => {
    console.log('Request URL API:', req.originalUrl)

    next()
  },
  ApiRouter
)

module.exports = app
