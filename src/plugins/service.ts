import { AUploadOption, IAUploadServicePlugin, IUpload, UploadTask } from "aupload";
import { AbstractPlugins } from ".";
import { AjaxOption, ajax } from "@/utils";
import { JSWorker, VirsualWorker } from "@/utils/worker";
import { FileEncoder } from "@/utils/encoder";
import AUpload from "..";
import { AUploadEvent } from "@/core/event";

export class PluginsAutoService extends AbstractPlugins implements IAUploadServicePlugin {
  static pluginName = 'autoservice'
  /**
   * 编码方式
   * file: 将文件流打包为File对象，通过Form Boundary进行封装
   * binrary: 直接将文件流发送至服务器，相关的参数会通过query传输
   * base64: 将文件编码为base64，参数打包为JSON，效率较低，不建议使用
   */
  static encoding: 'file' | 'binary' | 'base64' = 'file'
  static url: string = ''

  /**
   *  多线程实例
   */
  private _worker: JSWorker = new JSWorker()
  private _evtWorker
  private _isWorkerInitialized: boolean = false;
  /**
   * 当前文件列表
   */
  private _files: Record<string, { task: UploadTask, continuous: UploadTask, chunks: Array<UploadTask> }> = {}

  private _tasks: Array<UploadTask> = []
  /**
   * 所有切片任务
   */
  private _chunks: Array<UploadTask> = []
  /**
   * 每个chunk对应的xhr缓存，用于获取请求实例，方便取消请求
   * xhr: 一般为xmlhttp实例
   * config，为请求配置
   */
  private _chunksXHR: Record<string, { hash: string, chunk_index: number, xhr: any, config: AjaxOption }> = {}
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
            hash: task.hash
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


  async pause(task: UploadTask) {
    //debugger
    const hash = task.hash ?? ''
    const xhr_ids = Object.keys(this._chunksXHR);
    const xhr_id = xhr_ids.find(item => item.indexOf(hash) > -1);
    if (xhr_id) {
      const xhr_object = this._chunksXHR[xhr_id];
      if (xhr_object) {
        try {
          xhr_object.xhr.abort();
        } catch (err) { }
      }
    }

  }
  async resume(task: UploadTask) {
    //debugger
    await this.resumeTask(task)
  }
  async remove(task: UploadTask) {
    //debugger
    const index = this._tasks.findIndex(item => item.hash == task.hash);
    await this.pause(task);
    if (index > -1) {
      const hash = this._tasks[index].hash ?? ''
      try {
        delete this._files[hash];
      } catch (err) { }
      const xhr_ids = Object.keys(this._chunksXHR);
      const xhr_id = xhr_ids.find(item => item.indexOf(hash) > -1);
      if (xhr_id) {
        try {
          delete xhr_ids[xhr_id]
        } catch (err) { }
      }
      this._chunks = this._chunks.filter(item => item.hash != hash);
      this._tasks.splice(index, 1)
    }
  }

  /**
   * AUpload 调用Service层，添加上传任务
   * @param tasks 
   */
  async exec(tasks: Array<UploadTask>) {
    const option = this.uploader.option;
    let chunkTasks: Array<UploadTask> = []
    this._tasks = this._tasks.concat(tasks);
    for (let task of tasks) {
      let hash = task.hash ?? '';
      let file = task.file as File;
      let currentChunkTasks: Array<UploadTask> = []
      // 处理续传
      const start = option.start;
      let continuousTask: UploadTask | null = null;
      if (start) {
        // 计算开始位置 
        if (task.progress && task.progress.chunks) {
          // 在localStorage中找到起始位置
          let chunk_index = task.progress.chunks.findIndex(item => item == 0)
          if (chunk_index == -1) {
            chunk_index = task.progress.chunks.length
          }
          continuousTask = { chunk_index, chunk_count: task.progress.chunks.length, name: task.name, file: task.file }
        } else {
          // 通过服务端响应起始位置 
          continuousTask = await start(task.file as File, this.uploader) as UploadTask
        }
        if (continuousTask && continuousTask.chunk_index) {
          if (continuousTask.chunk_count && continuousTask.chunk_count <= continuousTask.chunk_index) {

            console.warn(`好像传完了`, this._files)
            if (!this._files[hash]) {
              this._files[hash] = {
                task, continuous: continuousTask as UploadTask, chunks: currentChunkTasks
              }
              this.uploader.dispatch(new AUploadEvent(AUploadEvent.APPEND, { task }))
            } else {
              throw new Error(`存在同样的文件：${file.name}`)
            }
            this.getFileProgress(task);
            this.uploader.dispatch(new AUploadEvent(AUploadEvent.COMPLETE, { task }))
            continue;
          } else {
            if (task.file instanceof File) {
              if (continuousTask.chunk_index * (option.chunkSize ?? 0) > task.file.size) {
                // 不可用的续传数据
                console.warn(`不正确的续传点:chunk_index:${continuousTask?.chunk_index},byte_offset=${continuousTask.chunk_index * (option.chunkSize ?? 0)}`)
                continuousTask = null;
              }
            }
          }
        }
      }
      try {
        currentChunkTasks = chunkTasks.concat(await this.splitChunk(task, continuousTask))
        if (!this._files[hash]) {
          this._files[hash] = {
            task, continuous: continuousTask as UploadTask, chunks: currentChunkTasks
          }
          this.uploader.dispatch(new AUploadEvent(AUploadEvent.APPEND, { task }))
        } else {
          throw new Error(`存在同样的文件：${file.name}`)
        }

      } catch (err) {
        console.error(err)
        this.uploader.dispatch(new AUploadEvent(AUploadEvent.ERROR, { task, error: err }))
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
    this._chunks = this._chunks.concat(chunkTasks);
    console.log('文件集：', this._files)
    console.log(`找到任务：${chunkTasks.length} chunks`, chunkTasks)
    this.resumeTasks();
  }

  /**
   * http的形式上传切片
   * @param chunk 
   */
  private async uploadChunk(chunk: UploadTask) {
    const option = this.uploader.option
    let url = PluginsAutoService.url || option.url || ''
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
          if (i != 'config') {
            form.append(i, chunk[i])
          }
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
        if (!chunk.progress) {
          chunk.progress = { state: 3, total: 0, loaded: 0, duration: 0, start_timestamp: new Date().valueOf() }
        }
        this.onTaskEvent({ type: 'uploadstart' }, chunk)
      },
      onUploadProgress: (event) => {
        const { loaded, total } = event;
        if (chunk.progress) {
          const progress = chunk.progress
          if (progress.state == 0) {
            //这个块出错了
            progress.loaded = 0
          } else {
            progress.loaded = loaded
          }
          progress.total = total;
          if (progress.start_timestamp) {
            progress.duration = new Date().valueOf() - progress.start_timestamp;
          } else {
            progress.duration = 0
          }
          console.log('stats=====', chunk.progress?.state)
          // if( loaded >= total ){
          //   progress.state = 1
          // }
          chunk.progress = progress;
          // 当前任务是否存在一个错误
          let hasTaskError = false;
          const file = this._files[chunk.hash ?? '']
          if (file && file.task && file.task.progress && file.task.progress.state == 0) {
            hasTaskError = true;
          }
          if (!hasTaskError) {
            this.onTaskEvent({ type: 'uploadprogress' }, chunk)
          }

        }
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
      } catch (err) {
        console.error(err)
      }
      const xhr_id = [chunk.hash, chunk.chunk_index].join('_')
      this._chunksXHR[xhr_id] = {
        hash: chunk.hash ?? '',
        chunk_index: chunk.chunk_index ?? 0,
        xhr: data ? data.xhr : null,
        config
      }
      //resolve(true)
      let error_test = false;
      error_test = Math.random() > 0.5
      if (chunk?.chunk_index && chunk.chunk_index > 2 && error_test) {
        if (chunk.progress) {
          chunk.progress.loaded = 0
          chunk.progress.state = 0
        }
        this.updateTaskState(chunk.hash ?? '', 0)
        console.log('chunks', this._chunks)
        this.onTaskEvent({ type: 'uploadprogress' }, chunk)
        this.onTaskEvent({
          type: 'chunk_error'
        }, chunk)


        reject('网络错误。 debug')
      } else {
        resolve(true)
      }
    })
  }

  /**
   * 更新任务的状态
   * @param hash 
   * @param state 
   */
  private updateTaskState(hash: string, state: number) {
    const files = this._files[hash];
    if (files) {
      const task = files.task;
      if (task && task.progress) {
        task.progress.state = state;
      }
    }
  }


  private async resumeTask(task: UploadTask) {
    const option = this.uploader.option
    if (option.worker) {

    } else {
      const hash = task.hash ?? ''
      if (hash) {
        let chunks = this._files[hash]?.chunks as Array<UploadTask>
        if (Array.isArray(chunks)) {
          chunks = chunks.concat().filter(item => {
            if (item && item.progress) {
              if (item.progress.loaded >= item.progress.total) {
                return false;
              }
            }
            return true;
          })
          if (!chunks.length) {

          } else {
            for (let chunk of chunks) {
              try {
                if (chunk.progress) {
                  chunk.progress.state = 3
                }
                await this.uploadChunk(chunk)
              } catch (err) {
                this.uploader.dispatch(new AUploadEvent(AUploadEvent.CHUNK_ERROR, { chunk }))
              }
            }
          }
          this.onTaskEvent({ type: 'uploadprogress' }, task)

        } else {
          console.log('没有可用的任务')
        }
      } else {
        console.log(`找不到hash:`, task)
      }
    }
  }

  private async resumeTasks() {
    const option = this.uploader.option
    const chunkTasks = this._chunks;
    let url = PluginsAutoService.url || option.url || ''
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
      // 并行执行暂不支持，还是串行吧
      // this._worker = new JSWorker();
      // this._worker.fetch = ajax;
      // this._worker.exec({},  this );
      //For 循环执行

      for (let i = 0; i < this._tasks.length; i++) {
        try {
          await this.resumeTask(this._tasks[i])
        } catch (err) {
          console.error(err)
        }
      }
    }
  }

  /**
   * 计算一个文件序列的进度
   * @param file 
   * @returns 
   */
  private getFileProgress(file: UploadTask, chunk?: UploadTask) {
    let progress = file.progress || { state: 0, total: 0, loaded: 0, duration: 0, start_timestamp: 0, chunks: [] }
    let loaded = 0;
    let duration = 0
    let needUpdate = false;
    if (file.hash) {
      const current = this._files[file.hash ?? 'unkonw']
      if (current) {
        let continuousIndex = -1
        if (current.continuous) {
          // 补上续传数据
          continuousIndex = current.continuous.chunk_index ?? 0
          if (continuousIndex < 0) continuousIndex = 0
          if (this.uploader) {
            console.log('续传续传.......###########', continuousIndex)
            loaded += continuousIndex * (this.uploader.option?.chunkSize ?? 0)
          }
        }
        // 更新chunk status
        if (chunk) {
          const isChunkLoaded = chunk.progress && chunk.progress.loaded >= chunk.progress.total && chunk.progress.state == 1
          if (isChunkLoaded) {
            if (chunk.chunk_count) {
              if (!progress.chunks || progress.chunks.length != chunk.chunk_count) {
                progress.chunks = Array.from({ length: chunk.chunk_count ?? 1 }).map((item, idx) => {
                  if (continuousIndex >= -1 && continuousIndex >= idx) {
                    return -1
                  }
                  return 0;
                })
                progress.chunks[chunk.chunk_index ?? 0] = 1;
              }
            }

          }
        }
        if (!progress.start_timestamp) {
          progress.start_timestamp = new Date().valueOf()
        }
        const reference: File = current.task.file as File;
        let loads: any = []
        current.chunks.forEach(item => {
          duration += Number(item.progress?.duration ?? 0)
          loaded += Number(item.progress?.loaded ?? 0)
          loads.push(item.progress?.loaded ?? 0)
        })

        if (!current.chunks.length) {
          // TODO
          // 不存在切片.

        }
        progress.state = current.chunks.find(item => {
          if (item.progress) {
            return item.progress.state == 0
          }
          return false;
        }) ? 0 : 3
        console.log('~~~~ loads', loads, progress)

        if (loaded >= progress.loaded) {
          // 避免出现 progress事件在error事件前执行产线进度回推现象
          progress.loaded = loaded
          progress.duration = new Date().valueOf() - (progress?.start_timestamp ?? 0)
          if (progress.duration <= 0) {
            progress.duration = duration
          }
        }
        if (reference) { progress.total = reference.size }
        /**
         * 因为payload多传了一堆非流的参数，loaded有可能大于total
         */
        if (progress.loaded >= progress.total) {
          progress.loaded = progress.total;
        }
        if (progress.loaded >= progress.total) progress.state = 1
        file.progress = progress
      }
    }
    return progress
  }

  private onTaskEvent(e, chunk: UploadTask) {
    const hash = chunk.hash ?? ''
    if (hash) {
      console.log('ontask event:', e.type, this._files[hash], hash)
      if (this._files[hash]) {
        const task = this._files[hash].task
        switch (e.type) {
          case 'uploadstart':
            break;
          case 'uploadprogress':
            task.progress = this.getFileProgress(task, chunk)
            if (task.progress.state == 0) {
              return
            }
            this.uploader.dispatch(new AUploadEvent(AUploadEvent.PROGRESS, { task, chunk }))
            if (task.progress.loaded >= task.progress.total && task.progress.loaded) {
              this.uploader.dispatch(new AUploadEvent(AUploadEvent.COMPLETE, { task, chunk }))
            }
            break;
          case 'chunk_error':
            console.error('chunk_error')
            this.uploader.dispatch(new AUploadEvent(AUploadEvent.CHUNK_ERROR, { task, chunk }))
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
