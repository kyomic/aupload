const serve = require('koa-static')
const Koa = require('koa')
const Router = require('koa-router')
const { koaBody } = require('koa-body')
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors')
const fs = require('fs')
const path = require('path')


const { getProcessParams } = require('./utils')
const app = new Koa()
const router = new Router()
/**
 * 不同的环境，启动不同的koa 端口
 */
const map = {
  dev: 8081,
}

let params = getProcessParams(process)

env = params['env'] || 'dev'
const port = map[env] || map['dev']

// 配置 koa-body 中间件，以便在请求中解析出文件上传数据
app.use(
  koaBody({
    multipart: true,
    formidable: {
      maxFieldsSize: 10 * 1024 * 1024, // 最大文件大小为 10MB
      multipart: true,
      keepExtensions: true, // 保持原始文件的扩展名
    },
  })
)



router.get('/upload', async (ctx, next) => {
  next()
  ctx.body = { message: 'work' }
})
// 处理文件上传请求
router.post('/upload', async (ctx, next) => {
  const file = ctx.request.files; // 获取上传的文件
  const body = ctx.request.body;
  const filepath = path.join(__dirname, 'uploads')
  if( !fs.existsSync(filepath)){
    fs.mkdirSync(filepath)
  }
  if( file ){
    // 打包为file对象
  }else{
    const requestBodyPromise = new Promise((resolve, reject) => {
      let chunks = [];
  
      // 监听数据事件
      ctx.req.on('data', (chunk) => {
        console.log('ondata===',chunk)
        chunks.push(chunk);
      });
  
      // 监听结束事件
      ctx.req.on('end', () => {
        // 将接收到的 Buffer 数组合并为一个 Buffer
        const requestBody = Buffer.concat(chunks);
        console.log('chunk',chunks)
        resolve(requestBody);
      });
  
      // 监听错误事件
      ctx.req.on('error', (error) => {
        reject(error);
      });
    });
  
    // 原始流解析
    const rawStream = ctx.req;
    const requestBody = await requestBodyPromise
    console.log('body',requestBody)
    const filePath = path.join(__dirname, 'uploads', 'uploadedfile.bin');
    // 创建可写流
    const writer = fs.createWriteStream(filePath);
   // writer.write(requestBody);
    rawStream.pipe(writer);
    console.log(`成功写入:`,filePath, requestBody.length)
  }
  // const reader = fs.createReadStream(file.path); // 创建可读流
  // const ext = file.name.split('.').pop(); // 获取文件后缀名
  // const fileName = `${Date.now()}.${ext}`; // 生成新文件名
  // const stream = fs.createWriteStream(`./uploads/${fileName}`); // 创建可写流
  // reader.pipe(stream); // 将可读流的数据写入可写流
  
  await next();
  ctx.body = { message: '文件上传成功' }
})

app.use(serve('./dist'))
app.use(router.routes())
app.use(
  cors({
    origin: function (ctx) {
      const requestOrigin = ctx.headers.origin;
      //设置允许来自指定域名请求
      if (ctx.url === '/test') {
        return '*' // 允许来自所有域名请求
      }
      return requestOrigin
      //return 'http://localhost:8080' //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'], //设置获取其他自定义字段
  })
)

app.listen(port, function () {
  console.log(`listening on port ${port}`)
})
