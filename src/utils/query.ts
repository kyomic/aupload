export class Query{
  constructor(){
    
  }
  create( tag:string, attribtues:Record<string,any> ){
    const ele = document.createElement(tag );
    if( attribtues ){
      for(let i in attribtues){
        ele.setAttribute(i, attribtues[i])
      }
    }
    return ele;
  }
  static selector( query:string ){

  }
}
