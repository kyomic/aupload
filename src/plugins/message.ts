import { IAUploadPlugin, IUpload, UploadTask } from "../../typings";
import { AbstractPlugins } from './index'
import { AUpload } from '../index'
import { Query } from "@/utils/query";
import FileItem from "./component/FileItem";
import { generateRandomString } from "@/utils";
import { ArtTemplate } from "@/utils/artTemplate";

const $ = new Query();

export type MessageConfig = {
  type?: 'success' | 'warn' | 'info' | 'error',
  message: string,
  showClose?:boolean,
  autoClose?:boolean
}
export class PluginsMessage extends AbstractPlugins {
  static pluginName = 'message'
  static _instance: PluginsMessage
  private _root: HTMLElement = document.createElement('div')
  private _container:HTMLElement = document.createElement('div')
  private _cache: Array<MessageConfig> = []
  constructor() {
    super()
  }

  setup(context: IUpload) {
    super.setup(context)
    PluginsMessage._instance = this;
    this.initialize();
  }

  message(msg: MessageConfig) {
    const dom = document.createElement('div');
    dom.className = 'message'
    const id = 'message_'+generateRandomString(8)
    dom.setAttribute('data-id', id)
    msg.showClose =true
    let cls = msg.type == 'info' ? '' :'message-'+msg.type
    let data = {
      message: msg.message,
      close:msg.showClose,
      cls
    }
    let tpl = `
    <div class="message-box {{cls}}">
      {{ message }}
      {{ if close }}
      <i class="close">关闭</i>
      {{ /if }}
    </div>`
    
    let html = ArtTemplate.compile(tpl)( data )
    dom.innerHTML = html
    this._container.appendChild(dom);
    // TODO
    const close = dom.querySelector('.close');
    close?.addEventListener('click',()=>{
      this.remove(id)
    })
    if( msg.autoClose ){
      if( close ){
        let max = 3*1000;
        (close as any).__interval = setInterval(()=>{
          close.innerHTML = `关闭<em>(${max/1000}秒)</em>`
          if( max <=0 ){
            clearInterval( (close as any).__interval)
            this.remove(id)
          }
          max -=1000;
        },1000)
      }
    }
  }

  remove( id ){
    const message = this._root.querySelector('[data-id='+id+']')
    const close = this._root.querySelector('.close');
    if( close ) clearInterval((close as any).__interval);
    if( message ){
      try{
        message.parentNode?.removeChild( message )
      }catch(err){}
    }
  }

  static getInstance() {
    if (!PluginsMessage._instance) {
      PluginsMessage._instance = new PluginsMessage();
    }
    return PluginsMessage._instance
  }
  static info(str: string, config) {
    PluginsMessage.getInstance().message({
      type: 'info',
      message: str,
      ...(config||{})
    })
  }
  static warn(str:string, config){
    PluginsMessage.getInstance().message({
      type: 'warn',
      message: str,
      ...(config||{})
    })
  }
  static error(str:string, config){
    PluginsMessage.getInstance().message({
      type: 'error',
      message: str,
      ...(config||{})
    })
  }
  private initialize() {
    this._root.className = 'aupload_info'
    this._root.appendChild(this._container)
    const container = this.uploader.container;
    if (container) {
      container.appendChild(this._root)
    }
    this.attachEvent();
  }
  private attachEvent() {
    
  }
}
