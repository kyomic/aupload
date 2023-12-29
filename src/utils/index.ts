export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}


/**
 * 一个简单的http请求选项
 */
export type AjaxOption = {
  url:string, 
  method?:'GET'|'POST'|'PUT'|'DELETE'|'OPTION'|'HEAD'|'PATCH',
  async?:boolean,
  headers?:Record<string,any>
  timeout?:number,
  /**
   * xhr.send的数据
   */
  payload?:any
}
/**
 * 发一个xmlhttp 请求
 * @param {AjaxOption} opt
 * @returns
 */
export function ajax(opt: AjaxOption = { url: '', method: "GET", async: true, headers: {}, timeout: 0 }):Promise<any>|any {
  let {url, method, async, headers, timeout,payload} = opt 
  const xhr = new XMLHttpRequest()
  let timeoutId: any = 0
  const promise =  new Promise((resolve, reject) => {
    xhr.open((method || 'GET').toUpperCase(), url, async || true)
    headers = headers || {}
    try {
      for (let key in headers) {
        xhr.setRequestHeader(key, headers[key])
      }
    } catch (err) { 
      console.warn(`set-headers`, err)
    }
    if (timeout) {
      xhr.timeout = timeout
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let data = null
        try {
          data = JSON.parse(xhr.responseText)
        } catch (err) {
          data = null
        }
        clearTimeout(timeoutId)
        resolve(data)
      } else {
        // 不能reject，有可能是302的JSON
        //reject('网络错误,代码:' + xhr.status + ',readyStatus:' + xhr.readyState)
      }
    }
    xhr.ontimeout = function (event) {
      clearTimeout(timeoutId)
      reject('timeout')
    }
    xhr.onerror = function (err) {
      clearTimeout(timeoutId)
      reject(err)
    }
    xhr.send(payload)
    if (timeout) {
      timeoutId = setTimeout(() => {
        reject('timeout')
      }, timeout)
    }
    /** 如果为同步 */
    if( !async ){
      if (xhr.status === 200) {
        return xhr.responseText
      } else {
        console.warn(`xhr:${url} error,status:${xhr.status}`)
        return ''
      }
    }else{
      return promise
    }
  })
}
