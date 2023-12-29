import { AUploadOption, IUpload, UploadTask } from "typings";
import { AbstractPlugins } from ".";
import { ajax } from "@/utils";
import { JSWorker } from "@/utils/worker";
import { FileEncoder } from "@/utils/encoder";
import AUpload from "..";


export class PluginsAutoService extends AbstractPlugins {
  static pluginName = 'autoservice'
  /**
   * 编码方式
   * file: 将文件流打包为File对象，通过Form Boundary进行封装
   * binrary: 直接将文件流发送至服务器，相关的参数会通过query传输
   * base64: 将文件编码为base64，参数打包为JSON，效率较低，不建议使用
   */
  static encoding: 'file' | 'binary' | 'base64' = 'binary'
  static url:string =''

  /**
   *  多线程实例
   */
  private _worker: JSWorker = new JSWorker()
  private _evtWorker
  private _isWorkerInitialized: boolean = false;
  constructor() {
    super()
    this.type = 'service'
  }

  setup(context: IUpload) {
    super.setup(context)
  }


  /**
   * 将任务根据option.chunkSize大小进行切片
   * @param {UploadTask} task - 指定被切片的文件任务 
   * @returns 
   */
  async splitChunk( task:UploadTask, continuousTask:UploadTask | null ):Promise<Array<UploadTask>>{
    let tasks:Array<UploadTask>=[]
    const option:AUploadOption = this.uploader.option
    const chunkSize = option.chunkSize ?? -1;
    const fileId = option.fileId?? function(file:File){
      return ''
    };
    const encoder = new FileEncoder()
    if( chunkSize >-1){
      let size = 0;
      const filePrototype:any = File.prototype
      const blobSlice = filePrototype.slice || filePrototype.mozSlice || filePrototype.webkitSlice
      const file = task.file;
      if( file instanceof File ){
        size = file.size
        let chunksLength = Math.ceil( size / chunkSize );
        let start = (continuousTask ? continuousTask.chunk_index:0 )||0
        let hash = '';
        try{
          hash = await fileId( file );
        }catch(err){
          throw new Error(`AUploadOption.fileId 执行出错：`+err)
        }
        console.log('chunksLength==',chunksLength)
        for(let i= start ;i<chunksLength;i++){
          let start = i* chunkSize;
          let end = Math.min( size, i*chunkSize + chunkSize)
          let blob = blobSlice.apply(file, [start, end]);
          tasks.push({
            name:file.name,
            chunk_index:i,
            chunk_count:chunksLength,
            //file: await encoder.blob2File(blob, file.name),
            file:blob,
            hash,
          })
        }
        console.log("task",tasks)
        
      }else if( file instanceof ArrayBuffer){

      }
    }else{
      tasks = []
    }
    return tasks;
  }

  /**
   * 根据encoding方式，生成不同的上传url参数
   * @param task 
   * @returns 
   */
  generateUrl( task:UploadTask ){
    const option = this.uploader.option;
    const originUrl = PluginsAutoService.url || option.url;
    const encoding: string = PluginsAutoService.encoding as string;
    let url = originUrl ?? ''
    if( encoding =='binary'){
      // 二制流编码时，会将任务(除file)参数拼接至地址栏
      const params: string[] = []
      const customParams = option?.config?.data;
      for (let i in task) {
        if (i != 'file' && i !='config') {
          params.push(`${i}=${task[i]}`)
        }
      }
      if( customParams ){
        for(let i in customParams ){
          params.push(`${i}=${customParams[i]}`)
        }
      }
      if (params.length) {
        url += url.indexOf("?") == -1 ? `?${params.join('&')}` : `&${params.join('&')}`
      }
    }
    return url;
  }


  async exec(tasks: Array<UploadTask>) {
    const option = this.uploader.option;
    // 上传地址
    let url = PluginsAutoService.url || option.url ||''
    let chunkTasks:Array<UploadTask>=[]
    for(let task of tasks ){
      // 处理续传
      const start = option.start;
      let continuousTask:UploadTask | null = null;
      if( start ){
        continuousTask = await start( task.file as File, this.uploader ) as UploadTask
      }
      chunkTasks = chunkTasks.concat (await this.splitChunk( task, continuousTask ))
    }
    //throw new Error('test')
    chunkTasks = chunkTasks.map((item:UploadTask)=>{
      item.config = {
        encoding:PluginsAutoService.encoding as string,
        url:this.generateUrl( item ),
        headers:option.config?.headers ?? {},
        data:option.config?.data??{}
      }
      return item;
    })
    
    console.log(`找到任务：${chunkTasks.length} chunks`, chunkTasks)
    if (option.worker) {
      if (!this._isWorkerInitialized) {
        const code = `
        self.addEventListener('message', function (evt) {
          console.log('[in worker]', evt)
          let data = evt.data.data
          let config = {...(data.config||{})}
          delete data.config;
          let type = evt.data.type
          let encoding = config.encoding
          let url = config.url
          let headers = config.headers || {}
          let payload
          console.log('config',config)
          switch(encoding){
            case 'binary':
              const file = data.file;
              payload = file.slice(0, file.size);
              break;
            default:
              const form = new FormData();
              for(let i in data ){
                form.append(i, data[i])
              }
              payload = form;
              break;
          }
          let option ={
            "body": payload,
            "method": "POST",
            "headers":headers,
          }
          fetch(url,option).then(res=>{
            console.log('请求成功',res)
            self.postMessage({type:'queue_complete'})
          })
        });
        self.postMessage({type:'init'})
      `
        this._evtWorker = this.onWorkerEvent.bind(this);
        this._worker.addEventListener('message', this._evtWorker.bind(this))
        this._worker.addEventListener('complete', this._evtWorker.bind(this))
        this._worker.exec(code);
        this._isWorkerInitialized = true;
      }
      this._worker.addQueue(chunkTasks);
    } else {
      // For 循环执行
      for (let i = 0; i < chunkTasks.length; i++) {
        let task = chunkTasks[i];
        let file = task.file;
        let payload;
        let headers = {}
        if( task.config ){
          if( task.config.url ){
            url = task.config.url;
          }
          if( task.config.headers ){
            headers = {...headers, ...task.config.headers }
          }
        }
        console.log(`文件块:`, file)
        //TODO
        const encoding: string = PluginsAutoService.encoding as string;
        switch (encoding) {
          case 'binary':
            payload = file.slice(0, task.size);
            break;
          default:
            const form = new FormData();
            if (file instanceof File) {
              // 未配置文件大小时，大小由File对象获取
              task.size = file.size;
            }

            for(let i in task ){
              form.append(i, task[i])
            }
            payload = form;
            break
        }
        await new Promise((resolve) => {
          setTimeout(async () => {
            const data = await ajax({
              url,
              method: "POST",
              headers,
              payload: payload
            })
            resolve(1)
          }, 1000)
        })

      }
    }
  }

  public onWorkerEvent(e: Event) {
    console.log('worker event:', e)
  }


  destroy(): void {
    super.destroy();
    this._isWorkerInitialized = false;
    this._worker.terminate();
    this._worker.destroy();
  }
}
