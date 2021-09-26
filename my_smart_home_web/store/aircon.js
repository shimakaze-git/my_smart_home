export const strict = false

export const state = () => ({
  appliance: {},
  settings: {},
  devices: [],
})

export const getters = {
  getAppliance(state) {
    return state.appliance
  },
  getSettings(state) {
    return state.settings
  },
}

export const mutations = {
  async getAirConMutation(state, data) {
    const id = data.id

    // 取得先のURL
    let url = this.$config.WEB_HOST + '/.netlify/functions/app/appliances'
    url += '?id=' + id
    const response = await this.$axios.$get(url)
    state.appliance = response
  },
  async sendAirConMutation(state, data) {
    const id = data.id

    const params = {
      type: 'AC',
      button: data.button,
      temperature: data.temperature,
      air_volume: data.airVolume,
      operation_mode: data.operationMode,
    }

    // 取得先のURL
    // this.$config.WEB_HOST
    const WEB_HOST = this.$config.WEB_HOST || 'http://localhost:9000'
    let url = WEB_HOST + '/.netlify/functions/app/appliances/'
    url += id + '/send'

    const response = await this.$axios.$post(url, params)
    state.settings = response
  },
}

// store/index.js
export const actions = {
  getAirCon({ commit }, { id }) {
    commit('getAirConMutation', { id })
  },
  sendAirCon(
    { commit },
    { id, button, temperature, airVolume, operationMode }
  ) {
    commit('sendAirConMutation', {
      id,
      button,
      temperature,
      airVolume,
      operationMode,
    })
  },
}
