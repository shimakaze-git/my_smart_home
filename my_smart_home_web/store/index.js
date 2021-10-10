export const strict = false

export const state = () => ({
  appliances: [],
  devices: [],
})

export const getters = {
  getAppliances(state) {
    return state.appliances
  },
  getDevices(state) {
    return state.devices
  },
}

export const mutations = {
  async getAppliancesMutation(state) {
    console.log('getAppliancesMutation')
    // 取得先のURL
    const url = this.$config.WEB_HOST + '/.netlify/functions/app/appliances'
    const response = await this.$axios.$get(url)
    for (const res of response) {
      // deviceId
      if (Object.keys(res).includes('id')) {
        state.appliances.push({
          name: res.nickname,
          type: res.type,
          id: res.id,
        })
      }

      if (Object.keys(res).includes('deviceId')) {
        const data = {}
        if (Object.keys(res).includes('deviceType')) {
          res.type = res.deviceType
        }

        if (Object.keys(res).includes('remoteType')) {
          res.type = res.remoteType
        }

        data.name = res.deviceName
        data.id = res.deviceId

        state.appliances.push(data)
      }
    }
  },
  async getDevices(state) {
    // 取得先のURL
    const url = this.$config.WEB_HOST + '/.netlify/functions/app/devices'
    const response = await this.$axios.$get(url)
    state.devices = response
  },
}

// store/index.js
export const actions = {
  // nuxtServerInit({ commit }) {
  nuxtClientInit({ commit, state }, { app }) {
    console.log('nuxtServerInit')
    commit('getAppliancesMutation')
    commit('getDevices')
  },
  getDevices({ commit }) {
    commit('getDevices')
  },
}
