<template>
  <div id="app">
    <div ref="aupload"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
//import AUpload from '../../../src/index'
import { AUpload } from 'aupload'
import { PluginsAliOSS } from '../../../src/index'

export default Vue.extend({
  name: 'App',
  components: {},
  mounted() {
    if (window['instance']) {
      window['instance'].destroy()
    }

    window['instance'] = new AUpload()
    // AUpload.Service = PluginsAliOSS
    console.log('Auplad', AUpload)
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
