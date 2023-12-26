const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const version = require('./package.json').version

module.exports = defineConfig({
  productionSourceMap: false,
  outputDir: `unpkg/${version}`,
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      return args
    })
    config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
  },
  configureWebpack: {
    entry: '/src/index.ts',
    output: {
      filename: 'index.js',
      libraryExport: 'default',
    },
    optimization: {
      minimize: ['gray', 'release'].includes(process.env.TYPE),
    },
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      axios: 'axios',
    },
  },
})
