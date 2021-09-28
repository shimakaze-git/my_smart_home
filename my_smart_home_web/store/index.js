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
      state.appliances.push({
        name: res.nickname,
        type: res.type,
        id: res.id,
      })
    }
    // console.log('state', state)
    // console.log('state.appliances', state.appliances)
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
