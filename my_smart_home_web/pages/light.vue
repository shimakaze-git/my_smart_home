<template>
  <v-row>
    <v-col v-if="appliance" class="text-center">
      <template>
        <v-form>
          <v-container>
            <v-row v-if="model">
              <v-col cols="12" md="4">
                <v-text-field v-model="model.id" label="id" required disabled />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="appliance.type"
                  label="Type"
                  required
                  disabled
                />
              </v-col>

              <v-col cols="12" md="4" />
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="model.manufacturer"
                  label="メーカー"
                  required
                  disabled
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="model.country"
                  label="製造国"
                  required
                  disabled
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="model.remote_name"
                  label="リモコン"
                  required
                  disabled
                />
              </v-col>
            </v-row>

            <!-- 輝度 -->
            <v-row v-if="light">
              <v-col cols="12" md="4">
                <v-subheader>輝度</v-subheader>
              </v-col>

              <v-col cols="12" md="8">
                <v-text-field
                  v-model="brightness"
                  label="輝度"
                  required
                  disabled
                />
              </v-col>
            </v-row>

            <v-row v-if="light">
              <v-col cols="12" md="4">
                <v-subheader>運転状態</v-subheader>
              </v-col>

              <v-col cols="12" md="4">
                <v-switch v-model="power" label="OFF/ON" />
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  v-model="buttonValue"
                  label="現在の状態"
                  required
                  disabled
                />
              </v-col>
            </v-row>

            <v-row v-if="light">
              <v-col cols="12" md="4">
                <v-subheader> ボタン </v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-select
                  v-model="buttonValue"
                  :items="items"
                  label="ボタンの操作"
                  dense
                  outlined
                />
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" md="12">
                <v-btn block @click="send"> 送信 </v-btn>
              </v-col>
            </v-row>

            <!-- snackbar -->
            <v-snackbar v-model="snackbar" :top="true">
              {{ message }}
            </v-snackbar>
          </v-container>
        </v-form>
      </template>
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      id: '',
      nickname: '',
      model: {},
      light: {},
      state: {},
      button: '',
      buttonValue: '',
      buttons: [],
      items: [],
      power: true,
      brightness: 0,
      last_button: '',
      snackbar: false,
      message: '',
    }
  },
  computed: {
    ...mapGetters({
      appliance: 'light/getAppliance',
    }),
  },
  watch: {
    light(val) {
      if (val.state.power === 'off') {
        this.power = false
      }

      this.brightness = val.state.brightness
      this.last_button = val.state.last_button

      const buttons = {
        on: '照明を付ける（全灯）',
        off: '照明を消す（消灯）',
        'on-100': '照明を付ける',
        'on-favorite': 'お気に入り',
        night: '常夜灯',
        'bright-up': '明るくなる',
        'bright-down': '暗くなる',
      }

      this.items = Object.values(buttons)
      this.buttonValue = buttons[this.last_button]

      const keys = Object.keys(buttons)
      this.buttons = keys
    },
    buttonValue(val) {
      const buttons = {}
      for (let i = 0; i < this.buttons.length; i++) {
        buttons[this.items[i]] = this.buttons[i]
      }

      this.button = buttons[val]
    },
  },
  async mounted() {
    if ('id' in this.$route.query) {
      this.id = this.$route.query.id
      await this.$store.dispatch('light/getLight', {
        id: this.id,
      })
    }
  },
  async updated() {
    if (this.appliance) {
      // モデル情報
      this.model = await this.appliance.model

      // ライトの情報
      this.light = await this.appliance.light
    }
  },
  methods: {
    async send() {
      const params = {
        id: this.id,
        button: this.button,
      }

      await this.$store.dispatch('light/sendLight', params)
      setTimeout(() => {
        const light = this.$store.getters['light/getLight']
        this.message = '送信が失敗しました'
        if (Object.keys(light).includes('last_button')) {
          this.message = '送信が成功しました'
        }
        this.snackbar = true
      }, 1000)
    },
  },
}
</script>
