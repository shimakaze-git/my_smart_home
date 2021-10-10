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
    return {}
  },
  // computed: {},
  // created() {},
  mounted() {},
  methods: {
    async push() {
      const url = this.$config.WEB_HOST + '/.netlify/functions/app/key'
      const response = await this.$axios.$post(url)
      console.log('response', response)
    },
  },
}
</script>
