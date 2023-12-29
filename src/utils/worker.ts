import Emitter from "@/core/emitter";
import { UploadTask } from "typings";

export class JSWorker extends Emitter{
  private _worker:Worker | null = null;
  private _workers:Array<Worker> = []
  /**
   * 每个子线程执行的代码
   */
  private _code:string = ''
  /**
   * 即将处理的任务池
   */
  private _queue: Array<UploadTask> = []
  /**
   * 闲置的worker 
   */
  private _idleWorkers:Array<Worker>=[]
  private _maxThreads:number = navigator.hardwareConcurrency || 4;
  constructor(){
    super()
  }

  addQueue( tasks: Array<UploadTask> ){
    this._queue = this._queue.concat( tasks );
    this.nextQueue();
  }

  private nextQueue(){
    console.log(`找到任务数：`, this._queue)
    console.log(`找到闲置worker`,this._idleWorkers)
    const queue = this._queue
    while (true) {
      if (!this._idleWorkers.length) {
        break;
      }
      if (!this._queue.length) {
        break;
      }
      const current = queue.shift();
      const worker = this._idleWorkers.shift();
      worker?.postMessage({
        type:'exec',
        data:current
      })
    }
    if (this._idleWorkers.length >= this._maxThreads && queue.length == 0) {
      console.log(`queue:`, queue.length, `idle worker:`, this._idleWorkers.length, `找不到任务，当前工作可能完成`)
      this.dispatch('complete', {type:'complete'});
    }
  }

  exec( code:string ){
    if( this._code && code !=this._code ){
      console.warn(`当前执行代码发生变更，这会导致正在运行的worker 中止`)
      this._workers.forEach(item=>{
        item.terminate();
      })
    }
    this._code = code;
    if( !this._workers.length ){
      for( let i=0;i<this._maxThreads;i++){
        const blob = new Blob([this._code], { type: 'application/javascript' });
        let worker = new Worker( URL.createObjectURL( blob ));
        (worker as any).id = i;
        worker.addEventListener('message', evt=>{
          const type = evt.data.type;
          const data = evt.data.data;
          const target = evt.target;
          switch( type ){
            case 'init':
              this._idleWorkers.push( target as Worker );
              this.dispatch( 'message', evt )
              this.nextQueue()
              break;
            case 'exec':
              console.log('执行任务:',data)
              break;
            case 'queue_complete':
              console.log('执行完成', data)
              this._idleWorkers.push( target as Worker );
              this.nextQueue()
              break;
          }
          console.log('主线程收到消息：', type,data)
        })
      }
    }
  }

  /**
   * 终止所在正在执行的worker
   */
  terminate(){
    this._workers.forEach(item=>{
      item.terminate();
    })
  }
  /**
   * 销毁当前worker中的数据
   */
  destroy(){
    this.terminate();
    this._idleWorkers = []
    this._queue = []
    this._code = ''
  }
}
