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
  }

  attachTask( task:UploadTask ){
    this._task = task;
    this.draw();
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
            <button>重试</button>
            <button disabled>重试</button>
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
      progress_class:cls
    }
    let html = ArtTemplate.compile(tpl)( data )
    this._root.innerHTML = html;
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
}
