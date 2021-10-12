const axios = require('axios')

const KeyOpen = async () => {
  try {
    const params = {
      command: 'press',
      // parameter: 'default',
      // commandType: 'command',
      // command: 'turnOn',
      parameter: 'default',
      commandType: 'command'
    }
    console.log('params', params)
    let switchBotAccessToken = process.env.SWITCH_BOT_ACCESS_TOKEN
    console.log('switchBotAccessToken', switchBotAccessToken)

    console.log('SWITCH_BOT_ACCESS_TOKEN', process.env.SWITCH_BOT_ACCESS_TOKEN)
    console.log('BOT_SWITCH_ONE_DEVICE_ID', process.env.BOT_SWITCH_ONE_DEVICE_ID)

    const headers = {
      headers: {
        'Content-Type': 'application/json; charset: utf8',
        Authorization: switchBotAccessToken,
      },
    }
    let oneDeviceId = process.env.BOT_SWITCH_ONE_DEVICE_ID
    console.log('oneDeviceId', oneDeviceId)
    let oneUrl = 'https://api.switch-bot.com/v1.0/devices/' + oneDeviceId + '/commands'
    console.log('oneUrl', oneUrl)
    console.log('params', params)
    console.log('headers', headers)
    let res = await axios.post(oneUrl, params, headers)
    console.log('res1', res.data)

    let twoDeviceId = process.env.BOT_SWITCH_TWO_DEVICE_ID
    let twoUrl = 'https://api.switch-bot.com/v1.0/devices/' + twoDeviceId + '/commands'
    res = await axios.post(twoUrl, params, headers)
    console.log('res2', res.data)

    res = await axios.post(oneUrl, params, headers)
    console.log('res3', res.data)

    return
  } catch (error) {
    return error
  }
}

const KeyOpenReq = async (req, res) => {
  let data = {}
  try {
    await KeyOpen()
    return res.status(200).json(data)
  } catch (error) {
    console.log('error', error)
    return res.status(500)
  }
}

module.exports = {
  KeyOpenReq,
  KeyOpen
}
