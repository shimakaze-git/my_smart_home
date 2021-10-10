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
    let switchBotAccessToken = process.env.SWITCH_BOT_ACCESS_TOKEN || ''

    const headers = {
      headers: {
        'Content-Type': 'application/json; charset: utf8',
        Authorization: switchBotAccessToken,
      },
    }
    let oneDeviceId = BOT_SWITCH_ONE_DEVICE_ID | ''
    let oneUrl = 'https://api.switch-bot.com/v1.0/devices/' + oneDeviceId + '/commands'
    await axios.post(oneUrl, params, headers)

    let twoDeviceId = BOT_SWITCH_TWO_DEVICE_ID | ''
    let twoUrl = 'https://api.switch-bot.com/v1.0/devices/' + twoDeviceId + '/commands'
    await axios.post(twoUrl, params, headers)

    await axios.post(oneUrl, params, headers)
  } catch (error) {
    return error
  }
}

const KeyOpenReq = async (req, res) => {
  let data = {}
  try {
    await KeyOpen()
    console.log('KeyOpen')

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
