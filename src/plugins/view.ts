import { IAUploadPlugin, Upload } from "../../typings";
import {AbstractPlugins} from './index'

export class PluginsView extends AbstractPlugins {
  static pluginName = 'view'
  constructor(){
    super()
  }
  setup(context: Upload) {
   super.setup(context)
  }
}
