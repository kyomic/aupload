import { UploadTask } from "typings"

export const AUploadEvent = {
  READY:'ready',
  APPEND:'append',
  ERROR_APPEND:'error_append',
  PROGRESS:'progress',

  CHUNK_ERROR:'chunk_error'
}

class AbstractEvent{
  private _type:string
  constructor( type:string, ...args ){
    this._type = type
  }
}


export class UploadTaskEvent extends AbstractEvent{
  constructor(type:string, task:UploadTask){
    super(type)
  }
}
