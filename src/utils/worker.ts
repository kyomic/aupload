import Emitter from "@/core/emitter";

export class JSWorker extends Emitter{
  constructor(){
    super()
  }

  exec( code:string ){
    const blob = new Blob([code], { type: 'application/javascript' });
    let worker
    try{
      worker = new Worker(URL.createObjectURL(blob));
    }catch(err){}
    if( worker ){
      worker.addEventListener('message',(evt)=>{
        this.dispatch('message', evt)
      })
    }
    return worker;
  }
}
