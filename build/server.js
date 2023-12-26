const serve = require('koa-static')
const Koa = require('koa')
const app = new Koa()
const { getProcessParams } = require('./utils')

/**
 * 不同的环境，启动不同的koa 端口
 */
const map = {
  dev: 8001,
}

let params = getProcessParams(process)

env = params['env'] || 'dev'
const port = map[env] || map['dev']
app.use(serve('./dist'))
app.listen(port, function () {
  console.log(`listening on port ${port}`)
})
