<template>
  <v-row>
    <v-container>
      <v-row>
        <v-col cols="12" md="12"> </v-col>
        <v-row>
          <v-col cols="12" md="12">
            <div v-if="!loading" class="circle" @click="push">KEY OPEN</div>
            <div v-if="loading" class="loader">Loading...</div>

            <!-- <Sensor /> -->
          </v-col>
        </v-row>
      </v-row>
    </v-container>
  </v-row>
</template>
<script>
import axios from 'axios'
// import Sensor from '@/components/Sensor.vue'

// tuya-cli link --api-key "pcey9jfxb026qvqrs95b" --api-secret "218e4af6b77a46d2abee9b33da885f75" --schema "shimakazesoftsmartlife" --ssid "801ZTa-C6752F" --password "0382214a" --region us

export default {
  components: {
    // Sensor,
  },
  data() {
    return {
      loading: false,
    }
  },
  // computed: {},
  // created() {},
  mounted() {},
  methods: {
    push() {
      console.log('this.$config.WEB_HOST', this.$config.WEB_HOST)
      this.loading = true
      const url = this.$config.WEB_HOST + '/.netlify/functions/app/key'
      axios.post(url).then((res) => {
        console.log('res', res.status)
        if (res.status === 200) {
          this.loading = false
        }
      })
    },
  },
}
</script>

<style scoped>
.circle,
.circle::after {
  border-radius: 50%;
  width: 20em;
  height: 20em;
  cursor: pointer;
}
.circle {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  background: rgba(255, 255, 255, 0.2);
  text-align: center;
  line-height: 200px;
}

.loader,
.loader::after {
  border-radius: 50%;
  width: 20em;
  height: 20em;
}
.loader {
  margin: 60px auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: 1.1em solid rgba(255, 255, 255, 0.2);
  border-right: 1.1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1.1em solid rgba(255, 255, 255, 0.2);
  border-left: 1.1em solid #fff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}

@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
</style>
