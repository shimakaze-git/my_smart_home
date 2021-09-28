<template>
  <div>
    {{ devices.length }}
    <v-row v-if="devices.length !== 0">
      <v-col cols="12" md="3">
        <a
          href="#"
          class="temperature-circle-border-double btn-circle-border-double"
        >
          {{ devices[0].newest_events.temperature.val }} ℃
        </a>
      </v-col>
      <v-col cols="12" md="3">
        <a
          href="#"
          class="humidity-circle-border-double btn-circle-border-double"
        >
          {{ devices[0].newest_events.humidity.val }} %
        </a>
      </v-col>
      <v-col cols="12" md="3">
        <a
          href="#"
          class="illuminance-circle-border-double btn-circle-border-double"
        >
          {{ devices[0].newest_events.Illuminance.val }}
        </a>
      </v-col>
      <v-col cols="12" md="3"> </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      devices: 'getDevices',
    }),
  },
  mounted() {
    this.$store.dispatch('getDevices')
  },
}
</script>

<style scoped>
.temperature-circle-border-double {
  display: inline-block;
  text-decoration: none;
  color: #f5f5f5;
  width: 120px;
  height: 120px;
  line-height: 120px;
  border-radius: 50%;
  border: double 4px #dc143c;
  text-align: center;
  overflow: hidden;
  transition: 0.6s;
}

.humidity-circle-border-double {
  display: inline-block;
  text-decoration: none;
  color: #f5f5f5;
  width: 120px;
  height: 120px;
  line-height: 120px;
  border-radius: 50%;
  border: double 4px #668ad8;
  text-align: center;
  overflow: hidden;
  transition: 0.6s;
}

.illuminance-circle-border-double {
  display: inline-block;
  text-decoration: none;
  color: #f5f5f5;
  width: 120px;
  height: 120px;
  line-height: 120px;
  border-radius: 50%;
  border: double 4px #ffd700;
  text-align: center;
  overflow: hidden;
  transition: 0.6s;
}

.btn-circle-border-double {
  display: inline-block;
  color: #f5f5f5;
}

.btn-circle-border-double:hover {
  -webkit-transform: rotateY(360deg);
  transform: rotateY(360deg);
}
</style>
