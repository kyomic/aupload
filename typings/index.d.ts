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
  root:Element | string
}


type Upload = {

}

interface IAUploadPlugin {
  setup(context: Upload)
}

interface IndexableAUpload {
  [key: string]: any
  new( config?:AUploadConfig );
}

interface ISetupable {
  setup(context: Upload)
}

