const axios = require('axios')

const getSwitchBotDevices = async () => {
  let switchBotAccessToken = process.env.SWITCH_BOT_ACCESS_TOKEN || ''
  let params = {
    headers: {
      Authorization: `${switchBotAccessToken}`,
      'Content-Type': 'application/json; charset: utf8',
    }
  }

  let apiUrl = 'https://api.switch-bot.com/v1.0/devices'
  try {
    let devices = []

    const switchBotDevices = await axios
    .get(apiUrl, params)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return error.response
    })
    const body = switchBotDevices.body
    const deviceList = body.deviceList
    const infraredRemoteList = body.infraredRemoteList

    for (i in deviceList) {
      devices.push(deviceList[i])
    }

    for (i in infraredRemoteList) {
      devices.push(infraredRemoteList[i])
    }
    // devices.push(deviceList)
    // devices.push(infraredRemoteList)

    // console.log('deviceList', deviceList)
    // console.log('infraredRemoteList', infraredRemoteList)

    return devices
  } catch (error) {
    console.log('error', error)
    return
  }
}

const getAppliances = async () => {
  let accessToken = process.env.ACCESS_TOKEN || ''
  let params = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }

  let apiUrl = 'https://api.nature.global/1/appliances'
  let appliances = await axios
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

  // switchBot系のデバイス
  const switchBotDevices = await getSwitchBotDevices()
  // data.push({
  //   switchBot: switchBotDevices
  // })
  for (i in switchBotDevices) {
    data.push(switchBotDevices[i])
  }
  // console.log('switchBotDevices', switchBotDevices[0])
  // data.push(switchBotDevices)

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
