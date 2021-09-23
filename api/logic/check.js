// const { authentication } = require('../common/auth')
const { nowDate } = require('../common/date')

// const {
//   getDevices
// } = require('./devices')
// const {
//   getAppliances
// } = require('./appliances')

const executeCheck = async (req, res) => {
  // const devices = await getDevices()

  const spreadsheetId = process.env.spreadsheetId || '1t68tFh6j3QVzo_l6HjyzWTifbN1I0mJxY6no4cRtZkY'
  // const service = await authentication(spreadsheetId)

  // const appliances = await getAppliances()
  // console.log('appliances', appliances)
  // appliances

  // for (i in appliances) {
  //   console.log('appliances[i]', appliances[i].aircon)
  // }

  let data = {}
  try {
    let humidity = 0.0
    let Illuminance = 0.0
    let temperature = 0.0
    let motion = 0.0

    // newest_events
    // console.log('service', await service.getRows(0))
    // console.log('devices', devices)

    // for (const device of devices) {
    //   const newestEvents = device.newest_events

    //   humidity = newestEvents.humidity.val
    //   Illuminance = newestEvents.Illuminance.val
    //   temperature = newestEvents.temperature.val
    //   motion = newestEvents.motion.val
    // }

    const nDate = nowDate()

    const year = nDate[0]
    const month = nDate[1]
    const day = nDate[2]
    const hour = nDate[3]
    const min = nDate[4]
    const second = nDate[5]

    let now = year + '/' + month + '/' + day + ' '
    now += hour + ':' + min + ':' + second

    let formatNow = year + month + day + hour + min + second

    // hu 湿度
    // il 照度
    // te 気温
    // mo 人感センサー
    data = {
      '日時': now,
      // '温度': temperature,
      // '湿度': humidity,
      // '照度': Illuminance,
      // '人感': motion,
      '日時(補正)': formatNow
    }
    // await service.insert(data)

    return res.status(200).json(data)
  } catch (e) {
    console.log('e', e)
    res.status(500).send()
  }

  // エアコン電源 ON/OFF
  // $ curl -X POST "https://api.nature.global/1/appliances/<Appliance ID>/aircon_settings" -d "button=" -H "Authorization: Bearer gyYP(略)"
  // POST で button= を送信していますが、空文字を指定すると電源ON、button=power-off を指定すると電源OFFらしい

  // 温度調整、風量調整、モード変更
  // temperature=23 で温度を23度に設定、air_volume=1 で風量を1に設定できます。
  // $ curl -X POST "https://api.nature.global/1/appliances/<確認した ID>/aircon_settings" -d "temperature=23&air_volume=1" -H "Authorization: Bearer gyYP(略)"
  // operation_mode で冷房・暖房・ドライ運転なども切り替えられます

  // 照明をつけてみる
  // "https://api.nature.global/1/signals/{$電気のid(xxxxx_light)}/send"

  // https://qiita.com/t-chi/items/01b9a9b98fbccef880c3#%E5%8F%82%E8%80%83

  // 埋め込み用のiframe
  // <iframe width="600" height="450" src="https://datastudio.google.com/embed/reporting/8a6a092e-ff0a-415f-a002-f81ba21b45f5/page/YLyaC" frameborder="0" style="border:0" allowfullscreen></iframe>
}

module.exports = {
  executeCheck,
}
