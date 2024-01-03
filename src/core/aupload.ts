
import { AUploadOption, IAUploadPlugin, IAUploadServicePlugin, IUpload, IndexableAUpload, UploadTask } from '../../typings';
import Emitter from './emitter'
import { PluginsView } from '../plugins/view';
import { PluginManager } from '../plugins';
import { ajax, generateRandomString } from '@/utils'
import { JSWorker } from '@/utils/worker';
import { PluginsAutoService } from '@/plugins/service';
import { FileEncoder } from '@/utils/encoder';
import { AUploadMiddleware } from '@/middleware'
import { PluginsMessage } from '@/plugins/message';
import { PluginsStorage } from '@/plugins/storage';
import { AUploadEvent } from './event';

class Upload extends Emitter implements IUpload {
  static defaultConfig: AUploadOption = {
    url: 'http://localhost:8081/upload',
    root: 'body',
    config: {
      headers: {},
      data: { 'a': 2 }
    },
    //allowedMimeType:['image/*'],
    multiple: true,
    chunkSize: 1024 * 1024,
    worker: false,
    cachedFileSize:400*1024*1024,
    start: (file: File, context: IUpload) => {
      //return Promise.resolve(null);

      const option = context.option;
      const data = option.config?.data ?? {}
      let url = option.url ?? '';
      let params: any[] = []
      if (option.chunkSize && option.chunkSize > -1) {
        params.push('name=' + file.name)
        params.push('size=' + file.size)
        params.push('chunk_size=' + option.chunkSize)
      }
      if (data) {
        for (let i in data) {
          params.push(`${i}=${data[i]}`)
        }
      }
      if (params.length) {
        url += url.indexOf("?") == -1 ? `?${params.join('&')}` : `&${params.join('&')}`
      }
      return new Promise(async (resolve) => {
        let hash = '';
        try {
          const fileId = option?.fileId;
          if (fileId) {
            hash = await fileId(file)
          }
        } catch (err) {
          const error = `AUploadOption.fileId 执行出错：` + err
          context.dispatch( new AUploadEvent( AUploadEvent.ERROR, {error}))
          //throw new Error(`AUploadOption.fileId 执行出错：` + err)
        }
        if (hash) {
          url += '&hash=' + hash;
        }
        try {
          await ajax({
            method: "POST",
            url: url ?? '',
            headers: option.config?.headers ?? {},
          })
        } catch (err) {
        }
        resolve({
          file,
          chunk_index: 10,
          name: file.name
        })
      })

    },
    fileId: (file) => {
      return (new FileEncoder()).fileSha256(file, 1 * 1024 * 1024);
    },
  }
  /**
   * 不允许的参数名
   */
  private _disallowedParams = ['name', 'size', 'hash', 'chunk_index', 'chunk_size', 'file']
  private _option: AUploadOption
  private _root: Element
  private _container: Element = document.createElement('div')
  private _id: string = generateRandomString(10)

  private _tasks: Array<UploadTask> = []

  private _plugins: Array<IAUploadPlugin> = []
  /**
   * 中件间
   */
  public middleware: AUploadMiddleware = new AUploadMiddleware();
  constructor(option: AUploadOption = Upload.defaultConfig) {
    super()
    this._option = Object.assign({}, { ...Upload.defaultConfig }, option);
    this._root = this.root as Element
    setTimeout(() => {
      this.initialize()
    })
    //this.initialize();
  }
  private verifyOption(option: AUploadOption) {
    if (!option.root) {
      throw new Error(` 上传组件未配置正确的父容器，请确认config.root: ${this.option.root}是否正确`)
    }
    const disallows = this._disallowedParams;
    const params = option.config?.data;
    if( option.cachedFileSize && option.cachedFileSize <=-1){
      console.warn(`您取消了浏览器离线缓存限制(500MB)，小心浏览器被挤爆`)
    }
    if (params) {
      Object.keys(params).forEach(key => {
        if (disallows.includes(key)) {
          throw new Error(`配置自定义请求参数 config.data.${key} 错误，${disallows.join(',')} 为系统内置参数`)
        }
      })
    }
  }
  private initialize() {
    const root = this.root
    this.verifyOption(this._option)
    this._container.className = 'aupload aupload_' + this.id;
    root && root.appendChild(this._container)
    this.middleware.context = this;
    const plugins = Upload as IndexableAUpload
    if (plugins) {
      const keys = Object.keys(plugins)
      for (let i = 0; i < keys.length; i++) {
        const plugins_name = keys[i];
        if (plugins_name == 'defaultConfig') {
          continue;
        }
        const value = plugins[plugins_name];
        try {
          const instance = new value();
          instance.setup(this);
          if (!PluginManager.getInstance().has(instance.pluginName)) {
            throw new Error(`插件：${name} 未安装，请在插件setup时重载super的方法`)
          }
          this._plugins.push(instance)
        } catch (err) {
          const name = value ? value.name : 'unknow'
          console.warn(`插件：${name} 安装失败：Error:`, err)
        }
      }
    }

    console.log('ready')
    this.dispatch(AUploadEvent.READY);
    console.log('context', (Upload as any).abc)
  }

  execMiddleware(task: UploadTask): Promise<any> {
    const onAppendFile = this.middleware.get('onAppendFile')
    return new Promise(async (resolve, reject) => {
      try {
        for (let middleware of onAppendFile) {
          await middleware(task, this);
        }
      } catch (err) {
        reject(err)
      }
      resolve(true)
    })
  }

  append(task: UploadTask, auto: boolean = true) {
    const option = this.option;
    const fileId = option.fileId ?? function (file: File) {
      return ''
    };
    const exec = async () => {
      let hash = task.hash;
      let file = task.file as File;
      try {
        if( !hash ){
          hash = await fileId(file);
          task.hash = hash;
        }
      } catch (err) {
        const message = `AUploadOption.fileId 执行出错：` + err
        console.error(message)
        this.dispatch(new AUploadEvent(AUploadEvent.ERROR_APPEND, { task, error:err, message }))
        return;
      }
      try {
        await this.execMiddleware(task);
        this._tasks.push(task);
        this._exec();
      } catch (err) {
        console.error(err)
        this.dispatch(new AUploadEvent(AUploadEvent.ERROR_APPEND,{ task, error:err  }))
      }

    }
    exec();
  }


  async remove(task:UploadTask){
    const hash = task.hash;
    if( !hash ){
      const error =  new Error(`移除失败，找不到hash`)
      this.dispatch( new AUploadEvent(AUploadEvent.ERROR,{ task, error}))
    }
    const service = this.findService() as IAUploadServicePlugin
    if( service ){
      await service.remove( task );
    }
    const findIndex = this._tasks.findIndex(item=> item.hash == hash );
    if( findIndex ){
      this._tasks.splice( findIndex, 1)
    }
    this.dispatch( new AUploadEvent( AUploadEvent.REMOVE, { task }))
  }

  /**
   * 暂停任务
   * @param task 
   */
  async pause(task:UploadTask){
    const service = this.findService() as IAUploadServicePlugin
    service && service.pause( task )
  }

  /**
   * 恢复/重试任务
   * @param task 
   */
  async resume( task:UploadTask ){
    const service = this.findService() as IAUploadServicePlugin
    service && service.resume( task )
  }

  async upload(tasks?: Array<UploadTask>) {
    // const task = tasks?.pop();
    // if( task ){
    //   const encoder = new FileEncoder()
    //   let a = await encoder.fileSha256(task.file as File, 1*1024*1024)
    //   console.log('hash',a)
    // }
    // // return;
    if (Array.isArray(tasks)) {
      tasks.forEach(item => {
        this.append(item)
      })
      console.log("任务池：", this.tasks)
    }
    this._exec();

    //   const workerCode = `
    //   self.addEventListener('message', function (event) {
    //     const { url, fileName } = event.data;
    //     setTimeout(()=>{
    //       self.postMessage({ status: 'success', blob, fileName });
    //     },1000)
    //   });
    //   self.postMessage({type:'init'})
    // `;
    //   let worker = new JSWorker()
    //   worker.on('message',(evt)=>{
    //     const type = evt.data.type;
    //     const data = evt.data.data;
    //     console.log('主进程收到消息',evt)
    //   })
    //   worker.exec( workerCode )
  }


  private findService(){
    const services = this.plugins.filter(item => item.type == 'service')
    if (services.length) {
      return services[services.length-1]
    }
    return null;
  }

  private async _exec() {
    const tasks = this.tasks;
    console.log(`开始上传:`, this.tasks)
    const services = this.plugins.filter(item => item.type == 'service')
    if (services.length) {
      /** 选自动找一个最新的 */
      const current = services[services.length - 1]

      const queue: Array<UploadTask> = [];
      while (this.tasks.length) {
        const task = this.tasks.shift();
        if (task) {
          queue.push(task)
        }
      }
      if (current) {
        current.addEventListener('complete', () => {

        })
        const exec: any = current.exec;
        if (exec) {
          if (exec && typeof exec.then === 'function') {
            // TODO
            // 无法检测当前exec是否为Promise
            await (current && current.exec && current.exec(queue))
          } else {
            try {
              await (current && current.exec && current.exec(queue))
            } catch (err) {
              this.dispatch('error', err)
              console.error(err)
              //current && current.exec && current.exec( queue )
            }
          }
        }
      }

      //current && current.exec && current.exec( queue );
    }
  }


  getRoot() {
    if (typeof this.option.root == 'string') {
      const ele = document.querySelector(this.option.root)
      if (ele) {
        return ele;
      }
    } else {
      return this.option.root;
    }
    return null;
  }
  /**
   * 销毁
   */
  destroy() {
    this.plugins.forEach(plugins => {
      try {
        plugins.destroy();
      } catch (err) { }
    })
    try {
      this._container.parentNode?.removeChild(this._container)
    } catch (err) { }
    this._tasks = []
  }

  get tasks() {
    return this._tasks
  }

  /**
   * 当前组件的唯一标识
   */
  get id() {
    return this._id;
  }
  get root() {
    if (this._root) {
      return this._root;
    }
    return this.getRoot();
  }
  /**
   * 当前组件的父容器
   */
  get container() {
    return this._container
  }
  /**
   * 返回可用的插件列表
   */
  get plugins() {
    return this._plugins
  }

  get option(): AUploadOption {
    return this._option;
  }
  set option(opt: AUploadOption) {
    throw new Error(` option is readonly`)
  }
}

class abc {

}

const AUpload = Upload as IndexableAUpload
/**
 * 自动挂载View视图插件
 */
AUpload.View = PluginsView
AUpload.Message = PluginsMessage
AUpload.Service = PluginsAutoService
AUpload.Storage = PluginsStorage

export { AUpload, Upload }
