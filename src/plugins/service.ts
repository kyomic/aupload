import { IUpload, UploadTask } from "typings";
import { AbstractPlugins } from ".";
import { ajax } from "@/utils";

export class PluginsAutoService extends AbstractPlugins {
  static pluginName = 'autoservice'
  /**
   * 编码方式
   * file: 将文件流打包为File对象，通过Form Boundary进行封装
   * binrary: 直接将文件流发送至服务器，相关的参数会通过query传输
   * base64: 将文件编码为base64，参数打包为JSON，效率较低，不建议使用
   */
  static encoding: 'file' | 'binrary' | 'base64' = 'file'
  constructor() {
    super()
    this.type = 'service'
  }
  setup(context: IUpload) {
    super.setup(context)
  }


  async exec(tasks: Array<UploadTask>) {
    console.log('找到任务:', tasks.length)
    const option = this.uploader.option;
    if (option.worker) {
      // 当前启动worker 
    } else {
      // For 循环执行
      for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        const blob = task.file;
        let payload;
        let url = 'http://localhost:8080/'
        console.log(`文件块:`, blob)
        //TODO
        PluginsAutoService.encoding = 'file'
        const encoding:string = PluginsAutoService.encoding as string;
        switch (encoding) {
          case 'binrary':
            payload = blob.slice(0, task.size );
            const params: string[] = []
            for (let i in task) {
              if (i != 'file') {
                params.push(`${i}=${task[i]}`)
              }
            }
            if (params.length) {
              url += url.indexOf("?") == -1 ? `?${params.join('&')}` : `&${params.join('&')}`
            }
            break;
          default:
            const form = new FormData();
            form.append('name', task.name);
            if (blob instanceof File) {
              // 未配置文件大小时，大小由File对象获取
              task.size = blob.size;
              form.append('file', blob as File)
            }
            if (task.size) {
              form.append('size', task.size + '');
            }
            payload = form;
            break
        }

        await new Promise((resolve) => {
          setTimeout(async () => {
            const data = await ajax({
              url,
              method: "POST",
              payload: payload
            })
            resolve(1)
          }, 1000)
        })

      }
    }
  }

}
