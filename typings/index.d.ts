
declare module 'aupload' {
  export type TypedEvent = {
    readonly type: string,
    [attr: string]: any
  }

  /**
   * 上传中间件
   */
  export type Middleware = (task: UploadTask, context: IUpload) => Promise<any>

  /**
   * 上传组件的配置
   */
  export type AUploadOption = {
    /**
     * 接受文件数据的服务
     */
    url?: string,
    /**
     * 配置上传请求的参数信息，如自定义请求头、参数,
     * 注意：参数因 AUpload.Service.encoding='file'，会被编码至Form中，如要编码至body，请修改encoding为binary
     */
    config?: { headers?: Record<string, any>, data?: Record<string, any> },
    /**
     * 当前上传组件显示的目标容器位置
     */
    root?: Element | string,
    /**
     * 是否启动worker
     */
    worker?: boolean
    /**
     * 是否开启多选，默认为true
     */
    multiple?: boolean
    /**
     * 当您需要支持分片、续传时，配置的最小分块大小，默诵为-1，即不分片
     */
    chunkSize?: number
    /**
     * 允许的文件大小，单位字节，默认为:-1，无限制
     */
    allowedFileSize?: number
    /** 
     * 允许的文件类型，
     */
    allowedMimeType?: Array<string>
    /**
     * 生成文件的唯一ID，用于前后端文件校验，实现秒传效果(默认为文件前1MB以内的 64位 SHA-256 串 )
     * @returns 
     */
    fileId?: (file: File) => Promise<string>
    /**
     * 计算最后一个完成的任务，用于实现续传、秒传。
     * 如果返回null，即重头开始上传;
     * 如果返回最后一个任务，则秒传;
     * 如果返回中间任务，则为续传
     * @param file 
     * @returns 
     */
    start?: (file: File, context: IUpload) => Promise<UploadTask | null>
    /**
     * 浏览器缓存的大小，默认为500MB
     */
    cachedFileSize?: number
  }

  /**
   * 一个完整的上传任务
   */
  export type UploadTask = {
    /**
     * 上传的文件名
     */
    name: string,
    /**
     * 上传的文件大小，
     */
    size?: number,
    /**
     * 当此任务被切片时，此值有意义
     */
    chunk_index?: number,
    /**
     * 分块个数，默认有 AUploadConfig的chunkBytes
     */
    chunk_count?: number,
    /**
     * 上传的文件流信息，支持File、字节流、Base64
     */
    file: File | ArrayBuffer | string,
    // /**
    //  * 是不支持多选
    //  */
    // multiple?:boolean
    /**
     * 文件hash
     */
    hash?: string,
    /**
     * 每个任务可以拥有不同的url，encoding编码方式
     */
    config?: Record<{ url?: string, encoding?: string }>
    /**
     * 进度信息，包括 loaded（已经加载字节),total(整个字节数),duration(加载当前切片的用时), startTimestamp(启动加载的时间缀)
     */
    progress?: {
      /**
       * 状态 0：未开始，1：完成，3：处理中，4：出错, 5:暂停
       */
      state: number,
      loaded: number,
      total: number,
      duration: number,
      start_timestamp?: number,
      chunk_start?: number,
      /** 切片的完成状态 */
      chunks?: Array<number>
    }
  }
  
  /**
   * 事件监听器
   */
  export interface IEventDispatcher {
    /**
     * 抛出一个事件
     * @param {string} type - 事件类型 
     * @param {any[]} args - 事件参数 
     * @returns 
     */
    dispatch: (type: string | TypedEvent, ...args: any[]) => void

    /**
     * 添加一个事件
     * @param {string} type - 事件类型
     * @param {function} handler - 事件处理函数
     * @param {arguments} args - 事件参数（可选）
     */
    addEventListener: (type: string, handler: any, ...args: any[]) => void

    /**
     * 移除事件
     * @param {string} type - 事件类型
     * @param {function} handler - 事件处理函数（可选）
     */
    removeEventListener: (type: string, handler?: any) => void

    /**
     * 添加一个事件
     * @param {string} type - 事件类型
     * @param {function} handler - 事件处理函数
     */
    on: (type: string, handler: any) => void

    /**
     * 移除事件
     * @param {string} type - 事件类型
     * @param {function} handler - 事件处理函数（可选）
     */
    off: (type: string, handler?: any) => void

    /**
     * 添加一次事件侦听
     * @param {string} type - 事件类型
     * @param {function} handler - 事件处理函数
     * @param {arguments} args - 事件参数（可选）
     */
    once: (type: string, handler: any, ...args: any[]) => void
  }

  export interface IndexableAUpload {
    /**
     * 素引静态类（一般为上传插件类）
     */
    [key: string]: any

    /**
     * 构造一个上传实例
     * @param {AUploadOption} config - 参数
     */
    new(config?: AUploadOption): IUpload

    /**
     * 返回版本号
     */
    readonly static version: string
  }

  /**
   *  上传中间件
   */
  export interface IUploadMiddleware {
    /**
     * 开始进行文件传输前回调
     * @param {Middleware} middleware - 中间件实例
     * @returns 
     */
    onAppendFile: (middleware: (task: UploadTask, context?: IUpload) => Promise<any>) => void

    /**
     * 通过中间件的Key，查询中间件实现，key可选: onAppendFile
     * @param name 
     */
    get(name: string): Array<Middleware>
  }

  export interface IUpload extends IEventDispatcher {
    /**
     * 返回上传组件所在的容器
     */
    readonly container: Element

    /**
     * 添加一个上传任务
     * @param {UploadTask} task - 任务
     * @param {boolean} auto - 是否自动执行 
     */
    append(task: UploadTask, auto: boolean = false)

    /**
     * 移除一个上传任务
     * @param {UploadTask} task - 任务
     */
    remove(task: UploadTask)

    /**
     * 暂停一个上传任务
     * @param {UploadTask} task - 任务
     */
    pause(task: UploadTask)

    /**
     * 暂停的上传任务恢复上传
     * @param {UploadTask} task - 任务
     */
    resume(task: UploadTask)

    /**
     * 添加上传任务，并开始上传
     * @param tasks - 任务列表
     * @returns 
     */
    async upload: (tasks?: Array<UploadTask>) => void;

    /**
     * 返回当前组件所有的中间件列表
     */
    readonly middleware: IUploadMiddleware,

    /**
     * 返回上传配置
     */
    readonly option: AUploadOption
  }

  export interface IAUploadPlugin extends IEventDispatcher {
    /**
     * 插件类型，可选：界面(view)、服务(service)
     */
    type: 'view' | 'service',

    /**
     * 安装插件
     * @param context 
     */
    setup(context: Upload)

    /**
     * 执行 AUpload中添加的上传任务（参考context.tasks )
     */
    exec?(task: Array<UploadTask>): Promise<any>

    /**
     * 销毁插件
     * @returns 
     */
    destroy: () => void
  }

  /**
   * 上传组件服务插件，用于处理将blob提交至服务器的过程
   */
  export interface IAUploadServicePlugin extends IAUploadPlugin {
    /**
     * 暂停任务
     * @param task 任务
     * @returns Promise<any>
     */
    pause(task: UploadTask): Promise<any>

    /**
     * 继续任务
     * @param task 任务
     * @returns Promise<any>
     */
    resume(task: UploadTask): Promise<any>

    /**
     * 移除任务
     * @param task 任务
     * @returns Promise<any>
     */
    remove(task: UploadTask): Promise<any>
  }

  interface IEvent {
    /**
     * 返回事件类型
     */
    get type(): string
    /**
     * 返回事件数据
     */
    get data(): any
  }

  export class AUploadEvent implements IEvent {
    /**
     * 上传组件准备好，可以进行 upload操作
     */
    static READY: string = 'ready'
    /**
     * 上传组件成功添加文件时触发（完成文件hash计算）
     */
    static APPEND: string = 'append'
    /**
     * 上传的文件从上传队列中移除后触发
     */
    static REMOVE: string = 'remove'
    /**
     * 上传组件成功添加文件出错时触发，如hash计算出错，文件不合法（文件类型、大小中间件处理出错）
     */
    static ERROR_APPEND: string = 'error_append'
    /**
     * 上传进度变化时触发，会响应 task 和 chunk分片信息
     */
    static PROGRESS: string = 'progress'
    /**
     * 上传出错时触发
     */
    static ERROR: string = 'error'
    /**
     * 一个File文件上传完毕
     */
    static COMPLETE: string = 'complete'
    /**
     * 上传分片出错时触发
     */
    static CHUNK_ERROR: 'chunk_error'
    /**
     * 构造器，创建一个上传事件实例
     * @param {string} type - 事件类型 
     * @param {object} data - 事件数据
     */
    constructor(type: string, data: { task?: UploadTask, chunk?: UploadTask, error?: any, message?: string })
    /**
     * 返回事件数据
     */
    readonly data: { task?: UploadTask, chunk?: UploadTask, error?: any, message?: string }
    /**
     * 返回事件类型
     */
    readonly type: string
  }

  /**
   * 上传组件类
   */
  const AUpload = IndexableAUpload
  export {
    AUpload
  }
}
