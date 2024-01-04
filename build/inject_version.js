const { inject_version } = require('./utils')

const file = './src/core/env.ts'
const version = require('../package.json').version
inject_version(file, version)
