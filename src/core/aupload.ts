
import { AUploadConfig, IAUploadPlugin, IUpload, IndexableAUpload, UploadTask } from '../../typings';
import Emitter from './emitter'
import { PluginsView } from '../plugins/view';
import { PluginManager } from '../plugins';
import { generateRandomString } from '@/utils'
import { JSWorker } from '@/utils/worker';
import { PluginsAutoService } from '@/plugins/service';


class UploadQueue extends Emitter {

}

class Upload extends Emitter implements IUpload {
  static defaultConfig: AUploadConfig = { root: 'body' }
  private _option: AUploadConfig
  private _root: Element | null
  private _container: Element = document.createElement('div')
  private _id: string = generateRandomString(10)

  private _tasks:Array<UploadTask> = []

  private _plugins:Array<IAUploadPlugin> = []
  constructor(option: AUploadConfig = Upload.defaultConfig) {
    super()
    this._option = option;
    this._root = this.root;
    this.initialize();
  }
  private initialize() {
    const root = this.root
    if (!root) {
      throw new Error(` 上传组件未配置正确的父容器，请确认config.root: ${this.option.root}是否正确`)
    }
    this._container.className = 'aupload aupload_' + this.id;
    root.appendChild(this._container)
    const plugins = Upload as IndexableAUpload
    if (plugins) {
      const keys = Object.keys(plugins)
      for (let i = 0; i < keys.length; i++) {
        const plugins_name = keys[i];
        if (plugins_name == 'defaultConfig') {
          continue;
        }
        const value = plugins[plugins_name];
        console.log('value===', value)
        try {
          const instance = new value();
          instance.setup(this);
          if (!PluginManager.getInstance().has(instance.pluginName)) {
            throw new Error(`插件：${name} 未安装，请在插件setup时重载super的方法`)
          }
          this._plugins.push( instance)
        } catch (err) {
          const name = value ? value.name : 'unknow'
          console.warn(`插件：${name} 安装失败：Error:`, err)
        }
      }
    }
    console.log('context', (Upload as any).abc)
  }

  append( task:UploadTask ){
    this._tasks.push( task );
    this._exec();
  }

  async upload( tasks?: Array<UploadTask> ) {
    if( Array.isArray(tasks) ){
      this._tasks = this._tasks.concat( tasks )
      console.log("任务池：",this.tasks)
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


  private async _exec(){
    const tasks = this.tasks;
    console.log(`开始上传:`,this.tasks )
    const services = this.plugins.filter(item=> item.type =='service')
    if( services.length ){
      /** 选自动找一个最新的 */
      const current = services[services.length-1]

      const queue:Array<UploadTask> = [];
      while( this.tasks.length ){
        const task = this.tasks.shift();
        if( task ){
          queue.push( task )
        }
      }
      const exec:any = current?.exec;
      if( exec ){
        if( exec && typeof exec.then === 'function'){
          // TODO
          // 无法检测当前exec是否为Promise
          await (current && current.exec && current.exec( queue ))
        }else{
          try{
            await (current && current.exec && current.exec( queue ))
          }catch(err){
            current && current.exec && current.exec( queue )
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

  get tasks(){
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
  get plugins(){
    return this._plugins
  }

  get option(){
    return this._option;
  }
}

class abc {

}

const AUpload = Upload as IndexableAUpload
/**
 * 自动挂载View视图插件
 */
AUpload.View = PluginsView
AUpload.Service = PluginsAutoService

export { AUpload, Upload }
