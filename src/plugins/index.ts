import { IAUploadPlugin, Upload } from "../../typings";

export class AbstractPlugins implements IAUploadPlugin {
  constructor(){
    if( !this.pluginName ){
      throw new Error(`当前插件未定义名称，请配置：pluginName `)
    }
  }
  setup(context: Upload) {
    PluginManager.getInstance().register( this.pluginName, this )
    //console.log(`${this.name} plugins is setup`)
  }

  get pluginName(){
    const ctor:any = this.constructor
    if( ctor ){
      return ctor.pluginName;
    }
    return '';
  }
}


export class PluginManager{
  static cache:Record<string, IAUploadPlugin> = {}
  static instance:PluginManager
  /**
   * 注册插件
   * @param name 
   * @param plugins 
   */
  register( name:string, plugins:IAUploadPlugin ){
    const cache = PluginManager.cache;
    if( cache[name ]){
      throw new Error(` 插件：${name} 已经存在，请换个名称 `)
    }
    cache[name] = plugins;
  }

  /**
   * 是否存在插件
   * @param name 
   * @returns 
   */
  has(name:string){
    return !! PluginManager.cache[name]
  }

  static getInstance(){
    let instance = PluginManager.instance;
    if( !instance ){
      instance = new PluginManager()
    }
    return instance;
  }
}
