const { getProcessParams,execCommand } = require('./utils')
let params = getProcessParams(process)
console.log('params',params)

execCommand('vue-cli-service serve')
