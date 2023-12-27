import { IAUploadPlugin, IUpload } from "../../typings";
import { AbstractPlugins } from './index'
import { AUpload } from '../index'

export class PluginsView extends AbstractPlugins {
  static pluginName = 'view'
  private _root: HTMLElement = document.createElement('div')
  private _holder:HTMLElement = document.createElement('div')
  private _masker:HTMLElement = document.createElement('div')
  private _evtHandler
  private _evtRootHandler
  constructor() {
    super()
  }
  setup(context: IUpload ) {
    super.setup(context)
    this.initialize();
  }
  private initialize() {
    // TODO
    // typescript@4.1.5
    // Typescript 在接口IUpload 定义了container属性，但是编译是报错，提示找不到属性 
    const instance:any = this.uploader;
    if (instance.container) {
      (instance.container as any).appendChild(this._root);
    }
    this._evtHandler = this.onEvent.bind(this)
    this._evtRootHandler = this.onRootEvent.bind(this)
    this._root.className = 'aupload_view'
    this._masker.className = 'masker'
    this._holder.className = 'holder'
    this._root.appendChild(this._holder)
    this._root.appendChild(this._masker)
    this._root.setAttribute('contenteditable','true')
    this.attachEvent();
  }
  private attachEvent(){
    const events = ['paste','drop','dropover']
    for(let evt of events){
      this._holder.addEventListener(evt, this._evtHandler)
    }

    for(let evt of ['mouseenter','mouseleave','click']){
      this._root.addEventListener(evt, this._evtRootHandler )
    }
  }

  private onRootEvent(evt:Event){
    switch(evt.type){
      case 'mouseenter':
      case 'click':
        console.log('focus')
        this._holder.focus()
        break;
      case 'mouseleave':
        this._holder.blur()
        break;
    }
  }
  private onEvent(evt:Event){
    console.log('onEvent:',evt.type)
    const event =evt as any;
    switch( evt.type ){
      case 'drop':
        event.preventDefault(); // 阻止浏览器默认行为，如打开文件
        const files = Array.from(event.dataTransfer.files) as Array<File>
        console.log('drop files', files)
        
        for(let i=0;i<files.length;i++){
          const file = files[i]
          if( this.uploader ){
            this.uploader.upload([{
              name:file.name,size:file.size, file:file
            }])
          }
        }
        break
      case 'paste':
        console.log('event',event.clipboardData)
        const items = (event.clipboardData || event.originalEvent.clipboardData).items;
        console.log('length===',items.length)
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.kind === 'file') {
            const file = item.getAsFile();

            // 在这里执行文件上传的逻辑，可以使用XMLHttpRequest、Fetch API等进行上传
            // 例如，使用Fetch API：
            
          }
          console.log('item',item)
        }
    }
  }
}
