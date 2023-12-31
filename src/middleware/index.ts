import { AjaxOption, formatBytes } from "@/utils";
import { getFileType, getMime } from "@/utils/mime";
import { IUpload, IUploadMiddleware, UploadTask, Middleware } from "typings";

class AUploadMiddleware implements IUploadMiddleware {
  private _middles:Record<string, Array<Middleware>> = {}
  constructor() {}

  onAppendFile (middleware: (task: UploadTask, context: IUpload)=> Promise<any>) {
    const key = 'onAppendFile';
    const current = this._middles[key] || []
    current.push( middleware );
    this._middles[key] = current;
  }

  /**
   * 设置upload实例，读取配置生成默认的中间件
   */
  set context( context:IUpload ){
    const option = context.option;
    if( option.allowedFileSize ){
      this.onAppendFile( AUploadMiddleware.allowedFileSize(option.allowedFileSize))
    }
    if( option.allowedMimeType ){
      this.onAppendFile( AUploadMiddleware.allowedFileExtension(option.allowedMimeType))
    }
  }
  get( name:string ){
    return this._middles[name] || []
  }

  /**
   * 允许的扩展名
   * @param extensions 
   * @returns 
   */
  static allowedFileExtension (extensions:Array<string>) {
    return async ( task:UploadTask )=> {
      const file = task.file as File
      let originFileType = await getFileType(file);
      const ext = file.name.substring(file.name.lastIndexOf('.'))
      const formattedMimies = extensions.reduce(( prev:Array<string>, current:string)=>{
        const arr = getMime(current)
        prev = prev.concat(arr);
        return prev;
      }, [])
      if( !formattedMimies.includes(originFileType) ){
        throw new Error(`不支持的文件类型，请选择:`+ formattedMimies.map(item=> item.split('/')[1]).join(',')+'等格式的文件')
      }
      return Promise.resolve(1);
    }
  }
  static allowedFileSize( size:number ){
    return ( task:UploadTask )=> {
      const file = task.file as File
      if( file.size> size  ){
        throw new Error(`超过允许的(${ formatBytes(size,0)})文件大小`)
      }
      return Promise.resolve(1);
    }
  }
}

export default AUploadMiddleware
export {AUploadMiddleware}
