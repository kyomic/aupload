import { UserConfigExport, defineConfig, loadEnv } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
//import viteCompression from 'vite-plugin-compression'

import path, { resolve } from 'path'
// npm i fast-glob
let dirname = __dirname
console.log('_dir', dirname)

// https://vitejs.dev/config/

const defaultConfig = {
  build: {
    minify: 'esbuild',
    rollupOptions: {
      manualChunks: undefined,
    },
  },
  plugins: [cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // css: {
  //   // css预处理器
  //   preprocessorOptions: {
  //     less: {
  //       charset: false,
  //       additionalData: '@import "./src/assets/style/global.less";',
  //     },
  //   },
  // },
}

const generateConfig = ({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('mode', mode)
  console.log('command', command)
  if (mode == 'production') {
    return {
      ...defaultConfig,
      plugins: [...defaultConfig.plugins],
      build: {
        ...(defaultConfig.build || {}),
        outDir: 'lib',
        lib: {
          // Could also be a dictionary or array of multiple entry points
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'aupload',
          // the proper extensions will be added
          fileName: 'index',
        },
      },
    }
  }

  if (command === 'serve') {
    return {
      ...defaultConfig,
    }
  } else {
    return defaultConfig
  }
}
const config = defineConfig(generateConfig as UserConfigExport)

export default config
