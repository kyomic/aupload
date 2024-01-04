const path = require('path')
const { defineConfig } = require('@vue/cli-service')
const version = require('./package.json').version
console.log('root config is load')
let config = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  publicPath: './',
  assetsDir: './examples/vue/public/static/',
  pages: {
    index: {
      // 修改入口
      entry: 'examples/vue/src/main.ts',
      template: 'examples/vue/public/index.html',
      filename: 'index.html',
    },
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add(path.resolve(__dirname, 'packages'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  },
  configureWebpack: config => {
    // // 覆盖webpack默认配置的都在这里
    // // if (process.env.NODE_ENV === 'production') {
    // config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
    // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    // config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
    // config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs =
    //   ['console.log']
    // // }
  },
})

module.exports = config

// const amuiConfig = {
//   productionSourceMap: PUBLISH_ENV === 'release' ? false : true,
//   outputDir: `unpkg/${amui_version}/lib`,
//   transpileDependencies: ['@babel/parser'],
//   chainWebpack: config => {
//     config.plugin('define').tap(args => {
//       args[0]['process.env'].DOMAIN_CONFIG = `"${
//         env_config[env] || env_config['local']
//       }"`
//       return args
//     })
//     config.resolve.alias.set('@', path.resolve(__dirname, 'src'))
//   },
//   css: {
//     extract: true,
//   },
//   configureWebpack: {
//     entry: '/src/amui-entry.ts',
//     output: {
//       filename: 'index.js',
//     },
//     externals: {
//       vue: 'Vue',
//       vuex: 'Vuex',
//       'vue-router': 'VueRouter',
//       axios: 'axios',
//       'vue-i18n': 'VueI18n',
//       'yxt-pc': 'YXTPC',
//       'yxt-biz-pc': 'YXTBIZ',
//       lowcode: 'lowcode',
//     },
//   },
// }

/*
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

*/
