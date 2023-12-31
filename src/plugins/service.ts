import { AUploadOption, IUpload, UploadTask } from "typings";
import { AbstractPlugins } from ".";
import { AjaxOption, ajax } from "@/utils";
import { JSWorker } from "@/utils/worker";
import { FileEncoder } from "@/utils/encoder";
import AUpload from "..";
import { AUploadEvent } from "@/core/event";
import { getFileType } from "@/utils/mime";


export class PluginsAutoService extends AbstractPlugins {
  static pluginName = 'autoservice'
  /**
   * 编码方式
   * file: 将文件流打包为File对象，通过Form Boundary进行封装
   * binrary: 直接将文件流发送至服务器，相关的参数会通过query传输
   * base64: 将文件编码为base64，参数打包为JSON，效率较低，不建议使用
   */
  static encoding: 'file' | 'binary' | 'base64' = 'binary'
  static url: string = ''

  /**
   *  多线程实例
   */
  private _worker: JSWorker = new JSWorker()
  private _evtWorker
  private _isWorkerInitialized: boolean = false;
  private _hashs: Record<string, string> = {}
  /**
   * 当前文件列表
   */
  private _files: Record<string, { task: UploadTask, continuous: UploadTask, chunks: Array<UploadTask> }> = {}
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
  async splitChunk(task: UploadTask, continuousTask: UploadTask | null): Promise<Array<UploadTask>> {
    let tasks: Array<UploadTask> = []
    const option: AUploadOption = this.uploader.option
    const chunkSize = option.chunkSize ?? -1;
    const fileId = option.fileId ?? function (file: File) {
      return ''
    };
    const encoder = new FileEncoder()
    if (chunkSize > -1) {
      let size = 0;
      const filePrototype: any = File.prototype
      const blobSlice = filePrototype.slice || filePrototype.mozSlice || filePrototype.webkitSlice
      const file = task.file;
      if (file instanceof File) {
        size = file.size
        let chunksLength = Math.ceil(size / chunkSize);
        let start = (continuousTask ? continuousTask.chunk_index : 0) || 0
        if (start > chunksLength) {
          // 错误的分片起点，重新上传
          start = 0
        }
        for (let i = start; i < chunksLength; i++) {
          let start = i * chunkSize;
          let end = Math.min(size, i * chunkSize + chunkSize)
          let blob = blobSlice.apply(file, [start, end]);
          tasks.push({
            name: file.name,
            chunk_index: i,
            chunk_count: chunksLength,
            //file: await encoder.blob2File(blob, file.name),
            file: blob,
            hash:task.hash
          })
        }
      } else if (file instanceof ArrayBuffer) {

      }
    } else {
      tasks = []
    }
    return tasks;
  }

  /**
   * 根据encoding方式，生成不同的上传url参数
   * @param task 
   * @returns 
   */
  generateUrl(task: UploadTask) {
    const option = this.uploader.option;
    const originUrl = PluginsAutoService.url || option.url;
    const encoding: string = PluginsAutoService.encoding as string;
    let url = originUrl ?? ''
    if (encoding == 'binary') {
      // 二制流编码时，会将任务(除file)参数拼接至地址栏
      const params: string[] = []
      const customParams = option?.config?.data;
      for (let i in task) {
        if (i != 'file' && i != 'config') {
          params.push(`${i}=${task[i]}`)
        }
      }
      if (customParams) {
        for (let i in customParams) {
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
    let url = PluginsAutoService.url || option.url || ''
    let chunkTasks: Array<UploadTask> = []
    for (let task of tasks) {
      let hash = task.hash??'';
      let file = task.file as File;
      let currentChunkTasks: Array<UploadTask> = []
      // 处理续传
      const start = option.start;
      let continuousTask: UploadTask | null = null;
      if (start) {
        continuousTask = await start(task.file as File, this.uploader) as UploadTask
        if (continuousTask && continuousTask.chunk_index) {
          if (task.file instanceof File) {
            if (continuousTask.chunk_index * (option.chunkSize ?? 0) > task.file.size) {
              // 不可用的续传数据
              console.warn(`不正确的续传点:chunk_index:${continuousTask?.chunk_index},byte_offset=${continuousTask.chunk_index * (option.chunkSize ?? 0)}`)
              continuousTask = null;
            }
          }
        }
      }
      try {
        currentChunkTasks = chunkTasks.concat(await this.splitChunk(task, continuousTask))
        if( !this._files[hash]){
          this._files[hash] = {
            task, continuous: continuousTask as UploadTask, chunks: currentChunkTasks
          }
        }else{
          throw new Error(`存在同样的文件：${file.name}`)
        }
      } catch (err) {
        console.error(err)
        continue
      }


      chunkTasks = chunkTasks.concat(currentChunkTasks)
    }
    //throw new Error('test')
    chunkTasks = chunkTasks.map((item: UploadTask) => {
      item.config = {
        encoding: PluginsAutoService.encoding as string,
        url: this.generateUrl(item),
        headers: option.config?.headers ?? {},
        data: option.config?.data ?? {}
      }
      return item;
    })
    console.log('文件集：', this._files)
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
        let chunk = chunkTasks[i];
        let file = chunk.file;
        let payload;
        let headers = {}
        if (chunk.config) {
          if (chunk.config.url) {
            url = chunk.config.url;
          }
          if (chunk.config.headers) {
            headers = { ...headers, ...chunk.config.headers }
          }
        }
        console.log(`文件块:`, file)
        //TODO
        const encoding: string = PluginsAutoService.encoding as string;
        switch (encoding) {
          case 'binary':
            payload = file.slice(0, chunk.size);
            break;
          default:
            const form = new FormData();
            if (file instanceof File) {
              // 未配置文件大小时，大小由File对象获取
              chunk.size = file.size;
            }
            for (let i in chunk) {
              form.append(i, chunk[i])
            }
            payload = form;
            break
        }
        let config = {
          url,
          method: "POST" as any,
          headers,
          payload: payload,
          onUploadStart: (event) => {
            chunk.progress = { total: 0, loaded: 0, duration: 0, start: new Date().valueOf() }
            this.onTaskEvent({ type: 'uploadstart' }, chunk)
          },
          onUploadProgress: (event) => {
            const { loaded, total } = event;
            const progress = chunk.progress || { total: 0, loaded: 0, duration: 0 };
            progress.total = total;
            progress.loaded = loaded
            if (progress.start) {
              progress.duration = new Date().valueOf() - progress.start;
            } else {
              progress.duration = 0
            }
            console.log('event--progress:', loaded, total)
            chunk.progress = progress;
            this.onTaskEvent({ type: 'uploadprogress' }, chunk)
          }
        }
        await new Promise(async (resolve, reject) => {
          const callback = ajax(config)
          let data
          try {
            if (callback instanceof Promise) {
              data = await callback
            } else {
              data = callback
            }
          } catch (err) { }
          //resolve(true)
          let error_test = false;
          if (chunk.name.indexOf('百度开发者工具-') != -1) {
            error_test = true;

          }
          if (chunk?.chunk_index && chunk.chunk_index > 20 && error_test) {
            this.onTaskEvent({
              type: 'chunk_error'
            }, chunk)
            reject('error')
          } else {
            resolve(true)
          }

        })

      }
    }

  }

  /**
   * 计算一个文件序列的进度
   * @param file 
   * @returns 
   */
  private getFileProgress(file: UploadTask) {
    let progress = file.progress || { total: 0, loaded: 0, duration: 0, start: 0 }
    let loaded = 0;
    let duration = 0
    if (file.hash) {
      const current = this._files[file.hash ?? 'unkonw']
      if (current) {
        if (current.continuous) {
          // 补上续传数据
          const index = current.continuous.chunk_index ?? 0
          if (this.uploader) {
            loaded += index * (this.uploader.option?.chunkSize ?? 0)
          }
        }
        if (!progress.start) {
          progress.start = new Date().valueOf()
        }
        const reference: File = current.task.file as File;
        current.chunks.forEach(item => {
          duration += Number(item.progress?.duration ?? 0)
          loaded += Number(item.progress?.loaded ?? 0)
        })
        progress.duration = new Date().valueOf() - (progress?.start ?? 0)
        if (progress.duration <= 0) {
          progress.duration = duration
        }
        progress.loaded = loaded
        if (reference) { progress.total = reference.size }
        file.progress = progress
      }
    }
    console.log('progress', progress)
    return progress
  }

  private onTaskEvent(e, chunk: UploadTask) {
    const hash = chunk.hash ?? ''
    if (hash) {
      console.log('task', this._files[hash], hash)
      if (this._files[hash]) {
        const task = this._files[hash].task
        switch (e.type) {
          case 'uploadstart':
            break;
          case 'uploadprogress':
            task.progress = this.getFileProgress(task)
            this.uploader.dispatch(AUploadEvent.PROGRESS, task)
            break;
          case 'chunk_error':
            this.uploader.dispatch(AUploadEvent.CHUNK_ERROR, task, chunk)
            break
        }
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
