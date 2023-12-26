import { IUpload, UploadTask } from "typings";
import { AbstractPlugins } from ".";
import { ajax } from "@/utils";

export class PluginsAutoService extends AbstractPlugins {
  static pluginName = 'autoservice'
  constructor() {
    super()
    this.type = 'service'
  }
  setup(context: IUpload) {
    super.setup(context)
  }

  
  async exec( tasks:Array<UploadTask> ){
    console.log('找到任务:',tasks.length)
    const option = this.uploader.option;
    if( option.worker ){
      // 当前启动worker 
    }else{
      // For 循环执行
      for(let i=0;i<tasks.length;i++){
        let task = tasks[i];
        const form = new FormData();
        form.append( 'name', task.name );
        if( task.size ){
          form.append( 'size', task.size +'');
        }
        const blobs = task.blobs.filter(item=>{
          return !!(item instanceof File)
        })
        blobs.forEach(element => {
          form.append('file', element as File)
        });
        await new Promise((resolve)=>{
          setTimeout(async ()=>{
            const data = await ajax({
              url:'http://localhost:8080/',
              method:"POST",
              payload:form
            })
            resolve(1)
          },1000)
        })
        console.log('blob',blobs)
      }
    }
  }

}
