const axios = require('axios')

const getAppliances = async () => {
  const accessToken = 'pYCoDaoVuRe73kkHW-ZNnJ3t4KE1vLI5NFd57rY5jv4.If-5fT043ck_yqWqMAviKS25s4AOtE9hPx99iv6oT4s'
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
  const accessToken = 'pYCoDaoVuRe73kkHW-ZNnJ3t4KE1vLI5NFd57rY5jv4.If-5fT043ck_yqWqMAviKS25s4AOtE9hPx99iv6oT4s'
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
