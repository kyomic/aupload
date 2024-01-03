import Emitter from "@/core/emitter"
import { ArtTemplateRender,ArtTemplate } from "@/utils/artTemplate"
import { formatBytes } from "@/utils/index"
import { UploadTask } from "typings"


export default class FileItem extends Emitter{
  private _root = document.createElement('div')
  private _task:UploadTask
  private _hasError:boolean = false;
  private _hash:string;
  constructor( task:UploadTask ){
    super()
    this._root.className = 'file'
    this.attachTask( task )
    this._root.addEventListener('click', this.onClick.bind(this) )
  }

  attachTask( task:UploadTask ){
    this._task = task;
    this.draw();
  }
  private onClick(e:MouseEvent){
    let target:any = e.target;
    if( target.tagName.toLowerCase() =='button'){
      const cls = target.className;
      if( cls ){
        this.dispatch(cls, this._task )
      }
    }
  }
  private draw(){
    const tpl = `
      <div class='row'>
        <div class='col-md-6 info'>
          <div class='name'><i><em>{{ext}}</em></i>{{ name }} </div>
          <div class='size'>{{ size }} </div>
        </div>
        <div class='col-md-6 ext'>
          <div class='progress {{progress_class}}'>
            <span class='bar' style='width:{{percent}}%'>
            <span class='text'><i class='p'>{{percent}}%</i><i> {{speed}}/S</i></span>
          </div>
          <div class='opt'>
            
            {{ if state==1 }}
            {{ else if state == 5 }}
            <button class='resume'>继续</button>
            {{ else if state == 0 }}
            <button class='resume'>重试</button>
            {{ else if state == 3 }}
            <button class='pause'>暂停</button>
            {{ /if }}
            <button class='remove'>移除</button>
          </div>
        </div>
      </div>
    `
    
    const cls = this._hasError ? 'progress_error':''
    const progress = this.task.progress || { loaded:0, total:0, duration:1}
    let percent:any = 0
    let speed = formatBytes(progress.loaded / (progress.duration /1000))
    if( progress.total ){
      percent = ((progress.loaded / progress.total) * 100).toFixed(1)
    }
    let ext = this._task.name.substring(this._task.name.lastIndexOf('.')+1);
    ext = ext.substring(0,3).toUpperCase()
    const data = {
      ext,
      name: this._task.name,
      size: formatBytes(this._task.size),
      percent,speed,
      state:this.task.progress?.state,
      progress_class:cls
    }
    let html = ArtTemplate.compile(tpl)( data )
    this._root.innerHTML = html;

  }

  clearError(){
    this._hasError = false;
    this.draw()
  }

  onError( task:UploadTask ){
    this._hasError = true;
    this.draw();
  }


  set task( task:UploadTask ){
    this._task = task;
    this.draw();
  }

  get task(){
    return this._task
  }
  get root(){
    return this._root;
  }

  destroy(){
    if( this._root ){
      try{
        this._root.parentNode?.removeChild( this._root );
      }catch(err){}
    }
  }
}
