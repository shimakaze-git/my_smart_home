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

            <v-row v-if="settings">
              <v-col cols="12" md="4">
                <v-subheader>運転状態</v-subheader>
              </v-col>
              <!-- <v-col cols="12" md="4">
                <v-text-field
                  v-if="settings.button === 'power-off'"
                  :value="OFF"
                  required
                  disabled
                  >test</v-text-field
                >
                <v-text-field
                  v-else
                  v-model="settings.button"
                  :value="ON"
                  required
                  disabled
                  >eeee</v-text-field
                >
                {{ power }}
              </v-col> -->

              <v-col cols="12" md="8">
                <v-switch v-model="power" label="OFF/ON" />
              </v-col>
            </v-row>

            <v-row v-if="settings">
              <v-col cols="12" md="4">
                <v-subheader> 設定温度 / モード </v-subheader>
              </v-col>
              <v-col cols="12" md="4">
                <v-select
                  v-model="temp"
                  :items="tempList"
                  label="設定温度"
                  dense
                  outlined
                />
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  v-model="modeValue"
                  :items="modeList"
                  label="モード"
                  dense
                  outlined
                />
              </v-col>
            </v-row>

            <v-row v-if="settings">
              <v-col cols="12" md="4">
                <v-subheader> 風量 </v-subheader>
              </v-col>
              <v-col cols="12" md="8">
                <v-select
                  v-model="vol"
                  :items="volList"
                  label="風量"
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
      settings: {},
      aircon: {},
      power: true,
      mode: '',
      modeValue: '',
      modeList: ['送風', '冷房', '除湿', '暖房'],
      temp: 0,
      tempList: [],
      vol: '',
      volList: [],
      snackbar: false,
      message: '',
    }
  },
  computed: {
    ...mapGetters({
      appliance: 'aircon/getAppliance',
    }),
  },
  watch: {
    settings(val) {
      const modeList = {
        blow: '送風',
        cool: '冷房',
        dry: '除湿',
        warm: '暖房',
      }

      this.modeValue = modeList[val.mode]
      this.temp = val.temp
      this.vol = val.vol

      if (val.button === 'power-off') {
        this.power = false
      }
    },
    modeValue(val) {
      const modeList = {
        送風: 'blow',
        冷房: 'cool',
        除湿: 'dry',
        暖房: 'warm',
      }
      this.mode = modeList[val]
    },
    mode(val) {
      this.tempList = this.aircon.range.modes[val].temp
      this.volList = this.aircon.range.modes[val].vol
    },
  },
  async mounted() {
    if ('id' in this.$route.query) {
      this.id = this.$route.query.id
      await this.$store.dispatch('aircon/getAirCon', {
        id: this.id,
      })
    }
  },
  async updated() {
    // モデル情報
    this.model = await this.appliance.model

    // エアコンの操作一覧
    this.aircon = await this.appliance.aircon

    // 設定情報
    this.settings = await this.appliance.settings
  },
  methods: {
    async send() {
      const button = this.power === true ? '' : 'power-off'
      const params = {
        id: this.id,
        button,
        temperature: this.temp,
        airVolume: this.vol,
        operationMode: this.mode,
      }
      await this.$store.dispatch('aircon/sendAirCon', params)

      setTimeout(() => {
        const settings = this.$store.getters['aircon/getSettings']
        this.message = '送信が失敗しました'

        if (Object.keys(settings).includes('button')) {
          this.message = '送信が成功しました'
        }
        this.snackbar = true
      }, 1000)
    },
  },
}
</script>
