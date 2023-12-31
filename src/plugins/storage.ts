import { IAUploadPlugin, IUpload, UploadTask } from "../../typings";
import { AbstractPlugins } from './index'
import { AUpload } from '../index'
import { Query } from "@/utils/query";
import FileItem from "./component/FileItem";
import { generateRandomString } from "@/utils";
import { ArtTemplate } from "@/utils/artTemplate";
import { AUploadEvent } from "@/core/event";

export class PluginsStorage extends AbstractPlugins {
  static pluginName = 'storage'
  constructor() {
    super()
  }

  setup(context: IUpload) {
    super.setup(context)
    this.initialize();
  }
  private initialize(){
    this.uploader.addEventListener(AUploadEvent.READY, async ()=>{
      await this.uploader.append( {
        name:'a',
        size:100,
        file:'null',
      })
    })
  }
}
