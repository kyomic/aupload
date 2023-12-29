export interface IEventDispatcher {
  dispatch:(type: string, ...args:any[])=>void
  /**
   * 添加一个事件
   * @param {string} type - 事件类型
   * @param {function} handler - 事件处理函数
   * @param {arguments} args - 事件参数（可选）
   */
  addEventListener:(type: string, handler: any, ...args: any[])=>void
  /**
   * 移除事件
   * @param {string} type - 事件类型
   * @param {function} handler - 事件处理函数（可选）
   */
  removeEventListener:(type: string, handler?: any)=>void

  on:(type: string, handler: any)=>void

  off:(type: string, handler?: any)=>void
  once:(type: string, handler: any, ...args: any[])=>void
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


type AUploadOption = {
  /**
   * 接受文件数据的服务
   */
  url?:string,
  /**
   * 配置上传请求的参数信息，如自定义请求头、参数,
   * 注意：参数因 AUpload.Service.encoding='file'，会被编码至Form中，如要编码至body，请修改encoding为binary
   */
  config?: { headers?:Record<string,any>, data?:Record<string,any>},
  /**
   * 当前上传组件显示的目标容器位置
   */
  root?:Element | string,
  
  /**
   * 是否启动worker
   */
  worker?:boolean

  /**
   * 当您需要支持分片、续传时，配置的最小分块大小，默诵为-1，即不分片
   */
  chunkSize?:number
  /**
   * 生成文件的唯一ID，用于前后端文件校验，实现秒传效果(默认为文件前1MB以内的 64位 SHA-256 串 )
   * @returns 
   */
  fileId?:( file:File )=> Promise<string>
  /**
   * 计算最后一个完成的任务，用于实现续传、秒传。
   * 如果返回null，即重头开始上传;
   * 如果返回最后一个任务，则秒传;
   * 如果返回中间任务，则为续传
   * @param file 
   * @returns 
   */
  start?:( file:File, context:IUpload  )=> Promise< UploadTask|null >
}


type UploadX = {
  container:Element
}
interface IUpload{
  container:Element
  append( task:UploadTask )
  async upload:( tasks?: Array<UploadTask> )=>void;
  /**
   * 返回上传配置
   */
  option:AUploadOption
}

interface IAUploadPlugin extends IEventDispatcher {
  /**
   * 插件类型，可选：界面(view)、服务(service)
   */
  type:'view'|'service',
  setup(context: Upload)
  /**
   * 执行 AUpload中添加的上传任务（参考context.tasks )
   */
  exec?( task:Array<UploadTask> ):Promise<any>
  destroy:()=>void
}

interface IAUploadServicePlugin extends IAUploadPlugin{

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
   * 当此任务被切片时，此值有意义
   */
  chunk_index?:number,
  /**
   * 分块个数，默认有 AUploadConfig的chunkBytes
   */
  chunk_count?:number,
  /**
   * 上传的文件流信息，支持File、字节流、Base64
   */
  file:File|ArrayBuffer|string,
  /**
   * 文件hash
   */
  hash?:string,
  /**
   * 每个任务可以拥有不同的url，encoding编码方式
   */
  config?:Record<{url?:string, encoding?:string}>
}
