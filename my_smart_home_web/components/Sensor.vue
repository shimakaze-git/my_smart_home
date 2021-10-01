<template>
  <div>
    <v-row v-if="devices.length !== 0">
      <v-col cols="12" md="3">
        <a
          href="#"
          class="temperature-circle-border-double btn-circle-border-double"
        >
          {{ devices[0].newest_events.temperature.val }} ℃ /
          {{ optimal_temperature_median }} ℃
        </a>
      </v-col>
      <v-col cols="12" md="3">
        <a
          href="#"
          class="humidity-circle-border-double btn-circle-border-double"
        >
          {{ devices[0].newest_events.humidity.val }} % /
          {{ optimal_humidity_median }} %
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
      <v-col cols="12" md="3">
        <a
          href="#"
          class="discomfort-index-circle-border-double btn-circle-border-double"
        >
          {{ discomfort_index_val }} / {{ discomfort_index_rank }}
        </a>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      discomfort_index_val: 0,
      discomfort_index_rank: 0,
      optimal_humidity_median: 0,
      optimal_temperature_median: 0,
    }
  },
  computed: {
    ...mapGetters({
      devices: 'getDevices',
    }),
  },
  mounted() {
    this.$store.dispatch('getDevices')
  },
  updated() {
    if (this.devices) {
      // 不快指数を取り出す
      this.discomfort_index_val = this.devices[0].discomfort_index.val
      this.discomfort_index_rank = this.devices[0].discomfort_index.rank

      console.log(
        'this.devices[0]',
        this.devices[0].optimal_temperature_humidity
      )

      const optimalTemperatureHumidity =
        this.devices[0].optimal_temperature_humidity

      this.optimal_humidity_median = optimalTemperatureHumidity.humidity.median
      this.optimal_temperature_median =
        optimalTemperatureHumidity.temperature.median

      // humidity: Object
      // temperature
    }
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

.discomfort-index-circle-border-double {
  display: inline-block;
  text-decoration: none;
  color: #f5f5f5;
  width: 120px;
  height: 120px;
  line-height: 120px;
  border-radius: 50%;
  border: double 4px #90ce9c;
  text-align: center;
  overflow: hidden;
  transition: 0.6s;
}

.btn-circle-border-double {
  display: inline-block;
  color: #f5f5f5;
  width: 180px;
  height: 180px;
  line-height: 180px;
}

.btn-circle-border-double:hover {
  -webkit-transform: rotateY(360deg);
  transform: rotateY(360deg);
}
</style>
