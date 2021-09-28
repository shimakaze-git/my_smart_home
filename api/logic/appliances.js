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

const sendAirCon = async (appliance_id, data) => {
  const accessToken = process.env.ACCESS_TOKEN || 'T2CbsheEXZaP3tekP1R1vGPzZEtDXpzSKDWU9LhgxtA.NZ0nm3_tvcllnbdhCMXXQW0GQMf-7okSqO9PRECyeVY'
  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  let params = new URLSearchParams()
  params.append('temperature', data.temperature)
  params.append('operation_mode', data.operation_mode)
  params.append('air_volume', data.air_volume)
  params.append('air_direction', '')
  params.append('button', data.button)

  // console.log('params', headers)
  // console.log('params', params)
  // console.log('data', data)

  let apiUrl = 'https://api.nature.global/1/appliances/'
  apiUrl += appliance_id + '/aircon_settings'
  const appliance = await axios
    .post(apiUrl, params, headers)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response
    })
  return appliance
}

const sendLight = async (appliance_id, data) => {
  const accessToken = process.env.ACCESS_TOKEN || 'T2CbsheEXZaP3tekP1R1vGPzZEtDXpzSKDWU9LhgxtA.NZ0nm3_tvcllnbdhCMXXQW0GQMf-7okSqO9PRECyeVY'
  const headers = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  let params = new URLSearchParams()
  params.append('button', data.button)

  let apiUrl = 'https://api.nature.global/1/appliances/'
  apiUrl += appliance_id + '/light'
  const appliance = await axios
    .post(apiUrl, params, headers)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response
    })
  return appliance
}

const sendAppliancesReq = async (req, res) => {
  let data = {}
  try {
    const appliance_id = req.params.appliance_id

    const type = req.body.type
    if(type === 'AC') {
      const appliance = await sendAirCon(appliance_id, req.body)
      data = appliance
    } else if (type === 'LIGHT') {
      const light = await sendLight(appliance_id, req.body)
      data = light
    }
    return res.status(200).json(data)
  } catch (error) {
    return res.status(500)
  }
}

module.exports = {
  getAppliancesReq,
  getAppliances,
  sendAppliancesReq
}
