// import axios from 'axios'
const axios = require('axios')
// const { clientId } = require('../config')

const {
  discomfortIndex
} = require('./calculation')

// // LINEからアクセストークンを取得する.
// const createAccessToken = (requestBody) => {
//   return new Promise((resolve, reject) => {
//     const params = new URLSearchParams()
//     for (let i = 0; i < Object.keys(requestBody).length; i++) {
//       const key = Object.keys(requestBody)[i]
//       const data = requestBody[key]
//       params.append(key, data)
//     }

//     const apiUrl = 'https://api.line.me/oauth2/v2.1/token'
//     axios
//       .post(apiUrl, params)
//       .then((res) => {
//         resolve(res.data)
//       })
//       .catch((error) => {
//         reject(error.response)
//       })
//   })
// }

// const getUserProfile = async (accessToken, idToken) => {
//   const params = {
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   }

//   const apiUrl = 'https://api.line.me/v2/profile'
//   const profile = await axios
//     .get(apiUrl, params)
//     .then((res) => {
//       return res.data
//     })
//     .catch((error) => {
//       return error.response
//     })

//   return new Promise((resolve, reject) => {
//     let apiUrl = 'https://api.line.me/oauth2/v2.1/verify'
//     apiUrl += '?id_token=' + idToken + '&client_id=' + clientId

//     axios
//       .post(apiUrl)
//       .then((res) => {
//         const userProfileData = Object.assign(profile, res.data)
//         resolve(userProfileData)
//       })
//       .catch((error) => {
//         reject(error.response)
//       })
//   })
// }

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
    delete devices[i].newest_events.hu

    // 照度
    devices[i].newest_events.Illuminance = devices[i].newest_events.il
    delete devices[i].newest_events.il

    // 気温
    devices[i].newest_events.temperature = devices[i].newest_events.te
    delete devices[i].newest_events.te

    // 人感センサー
    devices[i].newest_events.motion = devices[i].newest_events.mo
    delete devices[i].newest_events.mo

    // 不快指数を計算する
    const temperature = devices[i].newest_events.temperature.val
    const humidity = devices[i].newest_events.humidity.val
    const di = discomfortIndex(temperature, humidity)
    devices[i].discomfort_index = di

    data.push(devices[i])
  }
  return data
}

const getDevicesReq = async (req, res) => {
  const data = await getDevices()
  return res.status(200).json(data)
}

module.exports = {
  getDevicesReq,
  getDevices
}
