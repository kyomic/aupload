
const {exec, ChildProcess} = require('child_process')
module.exports.getProcessParams = function(proc){
  if( !proc ){
    if( typeof process!='undefined'){
      proc = process
    }
  }
  let params = {}
  if( proc ){
    let args = process.argv.slice(2) ||[]
    args.map(item=>{
      item = item.replace(/^-+/,'')
      console.log(item)
      let arr = item.split('=');
      if( arr[0]){
        params[arr[0]] = arr[1]||''
      }
    })
  }
  return params;
}


/**
 * 
 * @param {string} cmd 执行的命令
 * @param { (data: string | Buffer) => void } onStdOut 
 * @param { (data: string | Buffer) => void } onStdErr 
 * @param { (data: string | Buffer) => boolean } shouldExit 
 * @returns 
 */
module.exports.execCommand = async ( cmd,onStdOut,onStdErr,shouldExit)=>{
  return new Promise((resolve, reject) => {
    let stdout_arr = []
    const child_process = exec(cmd)

    child_process.stdout.on('data', data => {
      console.log(data);
      onStdOut?.(data)
      stdout_arr.push(data)
      // let exit = data.indexOf('ERROR') !== -1
      // if (exit) return reject(data)
      let exit = shouldExit?.(data) || false
      if (exit) {
        resolve({
          process: child_process,
          data: stdout_arr.join(''),
        })
        child_process.kill()
      }
    })

    child_process.stderr.on('data', data => onStdErr?.(data))
    child_process.on('error', error =>
      reject(`${cmd} 执行出错：${error.message}`)
    )

    child_process.on('exit', code => {
      let process_args = (child_process).spawnargs
      console.log(
        `child_process exited: ${child_process.pid}, cmd: ${process_args} exit, code: ${code}`
      )
      if (code) reject(`[CODE: ${code}] ${process_args} 执行失败，意外退出`)
    })

    child_process.on('close', code => {
      let process_args = (child_process).spawnargs
      console.log(
        `child_process closed: ${child_process.pid}, cmd: ${process_args} exit, code: ${code}`
      )
      if (code) reject(`[CODE: ${code}] ${process_args} 执行失败，意外关闭`)
      else
        resolve({
          process: child_process,
          data: stdout_arr.join(''),
        })
    })
  })
}
