<template>
  <div>HomeView.vue ===</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  name: 'HomeView',
})
export default class HomeView extends Vue {
  static componentName = 'HomeView'
}
</script>
<style lang="scss" scoped></style>
