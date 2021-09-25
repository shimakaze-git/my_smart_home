const axios = require('axios')

const getAppliances = async () => {
  const accessToken = process.env.ACCESS_TOKEN || ''
  const params = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  const apiUrl = 'https://api.nature.global/1/appliances'
  const appliances = await axios
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
  for (i in appliances) {
    data.push(appliances[i])
  }
  return data
}

const getApplianceId = async (id) => {
  const accessToken = process.env.ACCESS_TOKEN || ''
  const params = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }
  const apiUrl = 'https://api.nature.global/1/appliances'
  const appliances = await axios
    .get(apiUrl, params)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response
    })

  let data = {}
  for (i in appliances) {
    if (appliances[i].id === id) {
      data = appliances[i]
      break
    }
  }
  return data
}

const getAppliancesReq = async (req, res) => {
  let data = null
  if ('id' in req.query) {
    const id = req.query.id
    data = await getApplianceId(id)
  } else {
    data = await getAppliances()
  }
  return res.status(200).json(data)
}

module.exports = {
  getAppliancesReq,
  getAppliances
}
