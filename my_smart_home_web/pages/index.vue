<template>
  <v-row justify="center" align="center">
    <!-- style="background-color: red" -->

    <v-col cols="12" sm="12" md="10">
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

        <div v-if="desserts">
          <v-data-table
            :headers="headers"
            :items="desserts"
            :items-per-page="5"
            class="elevation-1"
          />
        </div>

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

        <v-btn block> Key Push </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {},
  data() {
    return {
      headers: [
        {
          text: '名称',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'タイプ', value: 'type' },
        { text: 'id', value: 'id' },
      ],
      desserts: [],
    }
  },
  computed: {
    ...mapGetters({
      appliances: 'getAppliances',
    }),
  },
  mounted() {
    // beforeUpdate() {
    // 取得先のURL
    // console.log('appliances', this.appliances)
    this.desserts = this.appliances
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
