<template>
  <!-- style="background-color: red" -->
  <v-row justify="center" align="center" style="background-color: red">
    <v-col cols="12" sm="12" md="10" style="background-color: green">
      <!-- style="background-color: green" -->

      <!-- <div class="text-center">
        <logo />
        <vuetify-logo />
      </div> -->

      <v-card>
        <v-card-title class="headline"> メインルーム 環境ログ </v-card-title>
        <div class="iframe-wrap">
          <iframe
            width="720"
            height="640"
            src="https://datastudio.google.com/embed/reporting/8a6a092e-ff0a-415f-a002-f81ba21b45f5/page/YLyaC"
            frameboader="0"
            style="border: 0"
            allowfullscreen
          />
        </div>
        <!-- <iframe
          width="720"
          height="640"
          src="https://datastudio.google.com/embed/reporting/8a6a092e-ff0a-415f-a002-f81ba21b45f5/page/YLyaC"
          frameborder="0"
          style="border: 0"
          allowfullscreen
        /> -->
        allowfullscreen

        <v-data-table
          :headers="headers"
          :items="desserts"
          :items-per-page="5"
          class="elevation-1"
        />

        <!-- <v-card-text>
          <p>
            Vuetify is a progressive Material Design component framework for
            Vue.js. It was designed to empower developers to create amazing
            applications.
          </p>
          <p>
            For more information on Vuetify, check out the
            <a
              href="https://vuetifyjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              documentation </a
            >.
          </p>
          <p>
            If you have questions, please join the official
            <a
              href="https://chat.vuetifyjs.com/"
              target="_blank"
              rel="noopener noreferrer"
              title="chat"
            >
              discord </a
            >.
          </p>
          <p>
            Find a bug? Report it on the github
            <a
              href="https://github.com/vuetifyjs/vuetify/issues"
              target="_blank"
              rel="noopener noreferrer"
              title="contribute"
            >
              issue board </a
            >.
          </p>
          <p>
            Thank you for developing with Vuetify and I look forward to bringing
            more exciting features in the future.
          </p>
          <div class="text-xs-right">
            <em><small>&mdash; John Leider</small></em>
          </div>
          <hr class="my-3" />
          <a
            href="https://nuxtjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt Documentation
          </a>
          <br />
          <a
            href="https://github.com/nuxt/nuxt.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            Nuxt GitHub
          </a>
        </v-card-text> -->

        <!-- <v-card-actions>
          <v-spacer />
          <v-btn color="primary" nuxt to="/inspire"> Continue </v-btn>
        </v-card-actions> -->

        <!-- eeeee -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import VuetifyLogo from '~/components/VuetifyLogo.vue'

// import axios from 'axios'

export default {
  components: {
    // Logo,
    // VuetifyLogo,
  },
  data() {
    return {
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: '8%',
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: '16%',
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: '45%',
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: '22%',
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
        },
      ],
    }
  },
  async mounted() {
    // 取得先のURL
    const url = this.$config.WEB_HOST + '/.netlify/functions/app/appliances'
    console.log('this.$config.HOST', this.$config.HOST)
    console.log('url', url)
    // リクエスト（Get）
    const response = await this.$axios.$get(url)
    console.log('response', response)
    // 配列で返ってくるのでJSONにして返却
    // return {
    //   posts: response,
    // }
  },
}
// padding-top: 56.25%;
</script>
<style scoped>
.iframe-wrap {
  position: relative;
  width: 100%;
  padding-top: 76.25%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border: 2px solid #ccc;
}

.iframe-wrap iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}
</style>
