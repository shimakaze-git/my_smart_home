// import axios from 'axios'
const axios = require('axios')
// const { clientId } = require('../config')

const {
  discomfortIndex
} = require('./calculation')
const {
  nowDate,
  convertToJst
} = require('../common/date')

// 季節毎の最適な温度と湿度を求める
const OptimalTemperatureHumidity = () => {

  // 夏場	25～28度	45～60%
  // 冬場	18～22度	55～65%
  // https://magazine.aruhi-corp.co.jp/0000-1541/

  // 室内の適正温度・湿度
  // 春・秋 温度 19 ~ 23度 湿度 50%
  // 夏 温度 24 ~ 27度 湿度 60%
  // 冬 温度 18 ~ 21度 湿度 40%

  const config = {}

  // 春
  for (let i=3; i <= 5; i++) {
    config[i] = {
      temperature: {
        min: 19,
        max: 23,
      },
      humidity: {
        min: 45,
        max: 55,
      }
    }
  }

  // 夏
  for (let i=6; i <= 8; i++) {
    config[i] = {
      temperature: {
        min: 24,
        max: 27,
      },
      humidity: {
        min: 45,
        max: 60,
      }
    }
  }

  // 秋
  for (let i=9; i <= 11; i++) {
    config[i] = {
      temperature: {
        min: 19,
        max: 23,
      },
      humidity: {
        min: 45,
        max: 55,
      }
    }
  }

  // 冬
  config[12] = {
    temperature: {
      min: 18,
      max: 22,
    },
    humidity: {
      min: 50,
      max: 60,
    }
  }
  for (let i=1; i <= 2; i++) {
    config[i] = {
      temperature: {
        min: 18,
        max: 22,
      },
      humidity: {
        min: 50,
        max: 60,
      }
    }
  }

  for (let key in config) {
    let min = 0
    let max = 0
    let median = 0
    const temperature = config[key].temperature
    const humidity = config[key].humidity

    // 温度の平均を求める
    min = temperature.min
    max = temperature.max
    median = (min + max) / 2
    temperature.median = median

    // 湿度の平均を求める
    min = humidity.min
    max = humidity.max
    median = (min + max) / 2
    humidity.median = median
  }

  return config
}

const getDevices = async () => {
  const accessToken = process.env.ACCESS_TOKEN || ''
  const params = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const apiUrl = 'https://api.nature.global/1/devices'
  const devices = await axios
    .get(apiUrl, params)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response
    })

  // hu 湿度
  // il 照度
  // te 気温
  // mo 人感センサー

  let data = []
  for (i in devices) {
    // 湿度
    devices[i].newest_events.humidity = devices[i].newest_events.hu
    devices[i].newest_events.humidity.created_at = convertToJst(devices[i].newest_events.humidity.created_at)
    delete devices[i].newest_events.hu

    // 照度
    devices[i].newest_events.Illuminance = devices[i].newest_events.il
    devices[i].newest_events.Illuminance.created_at = convertToJst(devices[i].newest_events.Illuminance.created_at)
    delete devices[i].newest_events.il

    // 気温
    devices[i].newest_events.temperature = devices[i].newest_events.te
    devices[i].newest_events.temperature.created_at = convertToJst(devices[i].newest_events.temperature.created_at)
    delete devices[i].newest_events.te

    // 人感センサー
    devices[i].newest_events.motion = devices[i].newest_events.mo
    devices[i].newest_events.motion.created_at = convertToJst(devices[i].newest_events.motion.created_at)
    delete devices[i].newest_events.mo

    // 不快指数を計算する
    const temperature = devices[i].newest_events.temperature.val
    const humidity = devices[i].newest_events.humidity.val
    const di = discomfortIndex(temperature, humidity)
    devices[i].discomfort_index = di

    // UTC → JST 変換
    const createdAt = convertToJst(devices[i].created_at)
    devices[i].created_at = createdAt

    // UTC → JST 変換
    const updatedAt = convertToJst(devices[i].updated_at)
    devices[i].updated_at = updatedAt

    // 最適な温度と湿度を月毎で求める
    const OptimalTEconfig = await OptimalTemperatureHumidity()
    const date = await nowDate()

    const month = date[1]
    const temperatureHumidity = OptimalTEconfig[month]
    devices[i].optimal_temperature_humidity = temperatureHumidity

    // Optimal temperature and humidity
    data.push(devices[i])
  }

  return data
}

const getDevicesReq = async (req, res) => {
  const data = await getDevices()
  return res.status(200).json(data)
}

const deviceCommandsReq = async (req, res) => {
  // const data = await getDevices()
  // return res.status(200).json(data)

  let data = {}
  try {
    const deviceId = req.params.deviceId
    // const type = req.body.type

    console.log('req.body', req.body)
    console.log('deviceId', deviceId)

    const params = {
      command: req.body.commands.command,
      parameter: req.body.commands.parameter,
      commandType: req.body.commands.commandType
    }
    const accessToken = req.body.auth.accessToken

    console.log('params', params)
    console.log('accessToken', accessToken)

    // const accessToken = process.env.ACCESS_TOKEN || ''
    // const params = {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // }

    // const apiUrl = 'https://api.nature.global/1/devices'
    // const devices = await axios
    //   .get(apiUrl, params)
    //   .then((res) => {
    //     return res.data
    //   })
    //   .catch((error) => {
    //     return error.response
    //   })

    // if(type === 'AC') {
    //   const appliance = await sendAirCon(appliance_id, req.body)
    //   data = appliance
    // } else if (type === 'LIGHT') {
    //   const light = await sendLight(appliance_id, req.body)
    //   data = light
    // }

    const url = 'https://api.switch-bot.com/v1.0/devices/' + deviceId + '/commands'
    const headers = {
      headers: {
        'Content-Type': 'application/json; charset: utf8',
        Authorization: accessToken,
      },
    }
    const response = await axios.post(url, params, headers)
    console.log('response', response.data)

    return res.status(200).json(data)
  } catch (error) {
    console.log('error', error)
    return res.status(500)
  }
}

module.exports = {
  getDevicesReq,
  getDevices,
  deviceCommandsReq
}
