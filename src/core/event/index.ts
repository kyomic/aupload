import { UploadTask } from "aupload"



class AbstractEvent{
  private _type:string
  public target:any;
  constructor( type:string, ...args ){
    this._type = type
  }
  get type(){
    return this._type
  }
}

export class AUploadEvent extends AbstractEvent{
  /**
   * 上传组件准备好，可以进行 upload操作
   */
  static READY:string = 'ready'
  static APPEND:string = 'append'
  static REMOVE:string = 'remove'

  static ERROR_APPEND:string = 'error_append'
  static PROGRESS:string = 'progress'
  static ERROR:string='error'
  /**
   * 一个File文件上传完毕
   */
  static COMPLETE:string = 'complete'

  static CHUNK_ERROR:'chunk_error'
  private _data:{ task?:UploadTask, chunk?:UploadTask, error?:any, message?:string } = {}
  constructor( type:string,  data:{ task?:UploadTask, chunk?:UploadTask, error?:any, message?:string }){
    super(type)
    this._data = data || {}
  }

  get data(){
    return this._data;
  }
}

export class UploadTaskEvent extends AbstractEvent{
  constructor(type:string, task:UploadTask){
    super(type)
  }
}
