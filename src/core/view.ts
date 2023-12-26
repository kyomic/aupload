export class UploadField{
  private _target:HTMLElement
  constructor( target:HTMLElement ){
    if( !target ){
      target = document.body;
    }
    this._target = target;
    if( !this._target ){
      throw new Error(`UploadField 构造失败，找不到target `)
    }
  }
}
