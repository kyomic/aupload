# 摘要 

浏览器界的文件上传模块众多，乘着躺平的日子来一个大全面的（Allin Uploader）通用上传组件，整体以(view)，插件(plugins),数据管（service)三层架构管理，结构简单，纯原生，绿色。
功能包括：

1.多种上传操作体验，如：点击上传，拖拽文件上传，剪贴板粘帖上传，API接口调用

2.多样的文件上处理，如：切片、秒传、多线程、离线上传

3.自定义文件编码，如：multipart/form-data,Base64,Binray

4.原生JS开发、兼容Vue、React等多种主流框架（不入流的IE9除外)

5.插件式架构，支持各种云（目前仅开发了PluginsAliOSS, ...）


# 使用说明

## 安装

```javascript
npm install aupload
```

### Vue的示例
```javascript
import { AUpload } from 'aupload'
...
mounted(){
  if (window['instance']) window['instance'].destroy()
  window['instance'] = new AUpload()
}
...
```
## 参数 AUploadOption


```javascript
  // 接受文件数据的服务
  url?: string,
  // 配置上传请求的参数信息，如自定义请求头、参数,
  config?: { headers?: Record<string, any>, data?: Record<string, any> },
  //当前上传组件显示的目标容器位置
  root?: Element | string,
  // 是否启动worker
  worker?: boolean
  // 是否开启多选，默认为true
  multiple?: boolean
  // 当您需要支持分片、续传时，配置的最小分块大小，默诵为-1，即不分片
  chunkSize?: number
  // 允许的文件大小，单位字节，默认为:-1，无限制
  allowedFileSize?: number
  // 允许的文件类型，支持:image/*、video/*等通用写法
  allowedMimeType?: Array<string>
  // 生成文件的唯一ID的处理函数（用于前后端秒传校验，默认为文件前1MB以内的64位SHA-256串)
  fileId?: (file: File) => Promise<string>
  // 计算开始上传位置
  start?: (file: File, context: IUpload) => Promise<UploadTask | null>
  // 浏览器缓存的大小，默认为500MB
  cachedFileSize?: number
  }
```


## 示例

### 1. 自定义界面上传

```javascript
const instance = new AUpload({url:'your server api'})
document.querySelector('input[type=file]').onchange(e=>{
  instance.upload( Array.from(evt.target.files).map(item=>{
    return {name:item.name, size:item.size, blob: item }
  }))
})

```

### 2. 文件大小限制
以中间件的能力演示，当然也可以通过AUploadConfig配置 allowedMimeType，限制允许的文件类型

```javascript
const instance = new AUpload()
instance.middleware.onAppendFile((task)=>{
  const file = task.file;
  const extensions =['.mp3,.mp4'];
  const ext = file.name.substring(file.name.lastIndexOf('.'))
  if( !extensions.include(ext) ){
    throw new ERROR(`不支持的文件类型，请选择:`, extensions.join(''))
  }
})
```

### 2. 自定义界面

```javascript
const instance = new AUpload()
// 自定义View 实现了 `IAUploadPlugin` 接口
instance.View = new YourCustomView()
```

### 3. 修改服务的编码方式
AUpload默认使用FormData进行包装
示例如下：
```
const task = {name:'a.txt',size:1024, file:File },
会编码为:
------WebKitFormBoundary3AMiXnWD8WjBsiAx
Content-Disposition: form-data; name="name"

a.txt
------WebKitFormBoundary3AMiXnWD8WjBsiAx
Content-Disposition: form-data; name="size"

1024
------WebKitFormBoundary3AMiXnWD8WjBsiAx
Content-Disposition: form-data; name="file"; filename="a.txt"
Content-Type: application/octet-stream


------WebKitFormBoundary3AMiXnWD8WjBsiAx--
```

如果要修改包装方式，您可以这么做
```
const instance = new AUpload();
AUpload.Service.encode='json'
```
您会得到如下结果：
```
 {name:'a.txt',size:1024, file:'xfsef1' }
```

### 3. 自定义文件处理器
```javascript
const instance = new AUpload();
# 添加阿里云OSS上传模块，前提需要引入plugins
instance.Service = new AUpload.AliOSS()
```
## 文档
### 1. 接口
``` javascript
/**
     * 返回上传组件所在的容器
     */
    readonly container: Element

    /**
     * 添加一个上传任务
     * @param {UploadTask} task - 任务
     * @param {boolean} auto - 是否自动执行 
     */
    append(task: UploadTask, auto: boolean = false)

    /**
     * 移除一个上传任务
     * @param {UploadTask} task - 任务
     */
    remove(task: UploadTask)

    /**
     * 暂停一个上传任务
     * @param {UploadTask} task - 任务
     */
    pause(task: UploadTask)

    /**
     * 暂停的上传任务恢复上传
     * @param {UploadTask} task - 任务
     */
    resume(task: UploadTask)

    /**
     * 添加上传任务，并开始上传
     * @param tasks - 任务列表
     * @returns 
     */
    async upload: (tasks?: Array<UploadTask>) => void;

    /**
     * 返回当前组件所有的中间件列表
     */
    readonly middleware: IUploadMiddleware,

    /**
     * 返回上传配置
     */
    readonly option: AUploadOption

```

### 2. 事件

```javascript
/**
     * 上传组件准备好，可以进行 upload操作
     */
    static READY: string = 'ready'
    /**
     * 上传组件成功添加文件时触发（完成文件hash计算）
     */
    static APPEND: string = 'append'
    /**
     * 上传的文件从上传队列中移除后触发
     */
    static REMOVE: string = 'remove'
    /**
     * 上传组件成功添加文件出错时触发，如hash计算出错，文件不合法（文件类型、大小中间件处理出错）
     */
    static ERROR_APPEND: string = 'error_append'
    /**
     * 上传进度变化时触发，会响应 task 和 chunk分片信息
     */
    static PROGRESS: string = 'progress'
    /**
     * 上传出错时触发
     */
    static ERROR: string = 'error'
    /**
     * 一个File文件上传完毕
     */
    static COMPLETE: string = 'complete'
    /**
     * 上传分片出错时触发
     */
    static CHUNK_ERROR: 'chunk_error'
```
