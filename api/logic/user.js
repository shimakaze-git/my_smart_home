import axios from 'axios'
const { clientId } = require('../config')

// LINEからアクセストークンを取得する.
const createAccessToken = (requestBody) => {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams()
    for (let i = 0; i < Object.keys(requestBody).length; i++) {
      const key = Object.keys(requestBody)[i]
      const data = requestBody[key]
      params.append(key, data)
    }

    const apiUrl = 'https://api.line.me/oauth2/v2.1/token'
    axios
      .post(apiUrl, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((error) => {
        reject(error.response)
      })
  })
}

const getUserProfile = async (accessToken, idToken) => {
  const params = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const apiUrl = 'https://api.line.me/v2/profile'
  const profile = await axios
    .get(apiUrl, params)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response
    })

  return new Promise((resolve, reject) => {
    let apiUrl = 'https://api.line.me/oauth2/v2.1/verify'
    apiUrl += '?id_token=' + idToken + '&client_id=' + clientId

    axios
      .post(apiUrl)
      .then((res) => {
        const userProfileData = Object.assign(profile, res.data)
        resolve(userProfileData)
      })
      .catch((error) => {
        reject(error.response)
      })
  })
}

module.exports = {
  createAccessToken,
  getUserProfile,
}
