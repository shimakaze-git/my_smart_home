<template>
  <v-row>
    <v-container>
      <v-row>
        <v-col cols="12" md="12">
          <v-btn block @click="push"> Key Push </v-btn>
        </v-col>
        <v-row>
          <v-col cols="12" md="12">
            <!-- <Sensor /> -->
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </v-row>
</template>
<script>
// import Sensor from '@/components/Sensor.vue'

export default {
  components: {
    // Sensor,
  },
  data() {
    return {
      apiBaseUrl: '',
      deviceId: '',
      accessToken: '',
    }
  },
  // computed: {},
  created() {},
  mounted() {
    this.apiBaseUrl = this.$config.WEB_HOST
    this.deviceId = 'CF2FE2035C97'
    this.accessToken = this.$config.SWITCH_BOT_ACCESS_TOKEN
  },
  methods: {
    async push() {
      if (this.accessToken && this.deviceId) {
        const params = {
          commands: {
            // 操作内容
            command: 'press',
            // parameter: 'default',
            // commandType: 'command',
            // command: 'turnOn',
            parameter: 'default',
            commandType: 'command',
          },
          auth: {
            accessToken: this.accessToken,
          },
        }
        // console.log('params', params)

        const url =
          this.$config.WEB_HOST +
          '/.netlify/functions/app/devices/' +
          this.deviceId +
          '/commands'
        // const headers = {
        //   headers: {
        //     'Content-Type': 'application/json; charset: utf8',
        //   },
        // }
        const response = await this.$axios.$post(url, params)
        console.log('response', response)

        // const url =
        //   this.apiBaseUrl + '/v1.0/devices/' + this.deviceId + '/commands'

        // const headers = {
        //   headers: {
        //     'Content-Type': 'application/json; charset: utf8',
        //     Authorization: this.accessToken,
        //     withCredentials: true,
        //   },
        // }
        // const response = await axios.$post(url, params, headers)
        // console.log('response', response)
      }
    },
  },
}
</script>
