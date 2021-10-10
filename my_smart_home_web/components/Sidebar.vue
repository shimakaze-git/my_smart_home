<template>
  <div>
    <Slide>
      <a id="home" href="/">
        <span>HOME</span>
      </a>
      <a
        v-for="(item, i) in appliances"
        :key="i"
        :href="'/' + typeList[item.type] + '?id=' + item.id"
      >
        <span>{{ item.name }}</span>
      </a>
    </Slide>
  </div>
</template>
<script>
import { Slide } from 'vue-burger-menu'

export default {
  components: {
    Slide,
  },
  props: {
    appliances: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      typeList: {
        AC: 'aircon',
        LIGHT: 'light',
      },
    }
  },
}
</script>
