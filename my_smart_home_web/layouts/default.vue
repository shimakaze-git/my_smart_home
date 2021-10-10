<template>
  <v-app dark>
    <v-main>
      <v-container>
        <Sidebar :appliances="applianceList" />
        <nuxt />
      </v-container>
    </v-main>

    <!-- <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

    <!-- <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Sidebar,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      applianceList: 'getAppliances',
    }),
  },
}
</script>
