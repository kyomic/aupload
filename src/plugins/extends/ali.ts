import { AUploadOption, IUpload, UploadTask } from "aupload";
import { AjaxOption, ajax, importJS, loadJS } from "@/utils";
import { JSWorker } from "@/utils/worker";
import { FileEncoder } from "@/utils/encoder";
import { AUploadEvent } from "@/core/event";
import { getFileType } from "@/utils/mime";
import { AbstractPlugins } from "..";


export type PluginsAliOSSConfig = {
  // ourRegion填写Bucket所在地域。以华东1（杭州）为例，yourRegion填写为oss-cn-hangzhou。
  region:string,
  // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）。
  accessKeyId:string,
  accessKeySecret:string,
  // 从STS服务获取的安全令牌（SecurityToken）。
  stsToken:string,
  // 填写Bucket名称，例如examplebucket。
  bucket:string
}
export class PluginsAliOSS extends AbstractPlugins {
  static pluginName = 'alioss'
  static config:PluginsAliOSSConfig = { region:'yourRegion',accessKeyId:'',accessKeySecret:'',stsToken:'',bucket:'填写Bucket名称，例如examplebucket。'}
  private _client:any
  constructor() {
    super()
    this.type = 'service'
  }

  setup(context: IUpload) {
    super.setup(context)
  }

  async exec(tasks: Array<UploadTask>) {
    const OSS = await importJS('https://gosspublic.alicdn.com/aliyun-oss-sdk-6.16.0.min.js','OSS')
    console.log(OSS)
    if( !this._client ){
      this._client = new OSS(PluginsAliOSS.config);
    }
    for(let task of tasks){
      const res = await this._client.put(task.name, task.file, {})
    }
    throw new Error(`还在Coding, 不能干活`)
  }
  destroy(): void {
    super.destroy();
  }
}
