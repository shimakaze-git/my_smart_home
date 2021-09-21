const axios = require('axios')

const getAppliances = async (req, res) => {
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
    console.log('appliances', appliances[i])

    // // 湿度
    // devices[i].newest_events.humidity = devices[i].newest_events.hu
    // delete devices[i].newest_events.hu

    // // 照度
    // devices[i].newest_events.Illuminance = devices[i].newest_events.il
    // delete devices[i].newest_events.il

    // // 気温
    // devices[i].newest_events.temperature = devices[i].newest_events.te
    // delete devices[i].newest_events.te

    // // 人感センサー
    // devices[i].newest_events.motion = devices[i].newest_events.mo
    // delete devices[i].newest_events.mo

    data.push(appliances[i])
  }
  return res.status(200).json(data)
}

module.exports = {
  getAppliances,
}
