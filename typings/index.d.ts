export interface IEventDispatcher {

}

export type AUploadPlugins = 'View'

declare module 'aupload'{
  export type AUploadPlugins = 'View'
  
}

declare class DigitalClock{
  static View:any
}
declare class MyExportedClass{
  static View:any
}


type AUploadConfig = {
  /**
   * 当前上传组件显示的目标容器位置
   */
  root:Element | string,
  /**
   * 是否启动worker
   */
  worker?:boolean
  /**
   * 上传文件预备处理器
   */
  processor?:IUploadProcessor
}


type UploadX = {
  container:Element
}
interface IUpload{
  container:Element
  append( task:UploadTask )
  async upload:( tasks?: Array<UploadTask> )=>void;
}

interface IAUploadPlugin {
  /**
   * 插件类型，可选：界面(view)、服务(service)
   */
  type:'view'|'service',
  setup(context: Upload)
  /**
   * 执行 AUpload中添加的上传任务（参考context.tasks )
   */
  exec?( task:Array<UploadTask> ):Promise<any>
}

interface IndexableAUpload {
  [key: string]: any
  new( config?:AUploadConfig );
}

interface IUploadProcessor{
  getFile():File
}
interface ISetupable {
  setup(context: Upload)
}


/**
 * 一个完整的上传任务
 */
type UploadTask = {
  /**
   * 上传的文件名
   */
  name:string,
  /**
   * 上传的文件大小，
   */
  size?:number,
  /**
   * 上传的文件流信息，支持File、字节流、Base64
   */
  blobs:Array<File|ArrayBuffer|string>
}
