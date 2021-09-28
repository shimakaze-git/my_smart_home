export const strict = false

export const state = () => ({
  appliance: {},
  light: {},
})

export const getters = {
  getAppliance(state) {
    return state.appliance
  },
  getLight(state) {
    return state.light
  },
}

export const mutations = {
  async getLightMutation(state, data) {
    const id = data.id

    // 取得先のURL
    let url = this.$config.WEB_HOST + '/.netlify/functions/app/appliances'
    url += '?id=' + id
    const response = await this.$axios.$get(url)
    state.appliance = response
  },
  async sendLightMutation(state, data) {
    const id = data.id
    const params = {
      type: 'LIGHT',
      button: data.button,
    }

    // 取得先のURL
    // this.$config.WEB_HOST
    const WEB_HOST = this.$config.WEB_HOST || 'http://localhost:9000'
    let url = WEB_HOST + '/.netlify/functions/app/appliances/'
    url += id + '/send'
    const response = await this.$axios.$post(url, params)
    state.light = response
  },
}

// store/index.js
export const actions = {
  getLight({ commit }, { id }) {
    commit('getLightMutation', { id })
  },
  sendLight({ commit }, { id, button }) {
    commit('sendLightMutation', {
      id,
      button,
    })
  },
}
