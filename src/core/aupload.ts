
import { AUploadConfig, IAUploadPlugin, IndexableAUpload } from '../../typings';
import Emitter from './emitter'
import { PluginsView } from '../plugins/view';
import { PluginManager } from '../plugins';
import {generateRandomString} from '@/utils'

class Upload extends Emitter {
  static defaultConfig:AUploadConfig = { root:'body'}
  private _config:AUploadConfig
  private _root:Element | null
  private _container:Element = document.createElement('div')
  private _id:string = generateRandomString(10)
  constructor( config:AUploadConfig = Upload.defaultConfig ) {
    super()
    this._config =config;
    this._root = this.root;
    this.initialize();
  }
  private initialize(){
    const root = this.root
    if( !root ){
      throw new Error(` 上传组件未配置正确的父容器，请确认config.root: ${this._config.root}是否正确`)
    }
    this._container.className = 'aupload';
    root.appendChild( this._container )
    console.log('root',root)
    const plugins = Upload as IndexableAUpload
    if( plugins ){
      const keys = Object.keys(plugins)
      for(let i=0;i<keys.length;i++){
        const plugins_name = keys[i];
        if( plugins_name == 'defaultConfig'){
          continue;
        }
        const value = plugins[plugins_name];
        console.log('value===',value)
        try{
          const instance = new value();
          instance.setup( this );
          if( !PluginManager.getInstance().has(instance.pluginName)){
            throw new Error(`插件：${name} 未安装，请在插件setup时重载super的方法`)
          }
        }catch(err){
          const name = value ? value.name :'unknow'
          console.warn(`插件：${name} 安装失败：Error:`, err)
        }
        
      }
      
    }
    

    console.log('context', (Upload as  any).abc)
  }

  getRoot(){
    if( typeof this._config.root == 'string'){
      const ele = document.querySelector( this._config.root ) 
      if( ele ){
        return ele;
      }
    }else{
      return this._config.root;
    }
    return null;
  }

  get root(){
    if( this._root ){
      return this._root;
    }
    return this.getRoot();
  }
}

class abc{

}

const AUpload = Upload as IndexableAUpload
/**
 * 自动挂载View视图插件
 */
AUpload.View = PluginsView 
export { AUpload }
