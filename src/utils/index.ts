export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

export function formatBytes(bytes, decimals = 2) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  if (bytes === 0) return '0 Bytes';
  if (bytes < 1) {
    return bytes + ' ' + sizes[0]
  }
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}



/**
 * 一个简单的http请求选项
 */
export type AjaxOption = {
  url: string,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTION' | 'HEAD' | 'PATCH',
  async?: boolean,
  headers?: Record<string, any>
  timeout?: number,
  /**
   * xhr.send的数据
   */
  payload?: any
  onProgress?: (event: Event) => void
  onUploadStart?: (event: Event) => void
  onUploadProgress?: (event: Event) => void
}
/**
 * 发一个xmlhttp 请求
 * @param {AjaxOption} opt
 * @returns
 */
export function ajax(opt: AjaxOption = { url: '', method: "GET", async: true, headers: {}, timeout: 0 }): Promise<any> | any {
  let { url, method, async, headers, timeout, payload } = opt
  if (typeof async == 'undefined') async = true;
  const xhr = new XMLHttpRequest()
  let timeoutId: any = 0
  const execute = function ( resolve?, reject?) {
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
        resolve && resolve({
          data, xhr
        })
      } else {
        if(xhr.readyState == 4){
          if( [301,301].includes(xhr.status)){

          }else{
            reject && reject('网络错误,代码:' + xhr.status + ',readyStatus:' + xhr.readyState)
          }
        }
        
        // 不能reject，有可能是302的JSON
        //reject('网络错误,代码:' + xhr.status + ',readyStatus:' + xhr.readyState)
      }
    }
    xhr.onprogress = function (event) {
      if (event.lengthComputable) {
        opt.onProgress && opt.onProgress(event)
      }
    }
    xhr.upload.onloadstart = function (event) {
      opt.onUploadStart && opt.onUploadStart(event)
    }
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        opt.onUploadProgress && opt.onUploadProgress(event)
      }
    }
    xhr.ontimeout = function (event) {
      clearTimeout(timeoutId)
      reject && reject('timeout')
    }
    xhr.onerror = function (err) {
      clearTimeout(timeoutId)
      console.log("error")
      reject && reject(err)
    }
    xhr.send(payload)
    if (timeout) {
      timeoutId = setTimeout(() => {
        reject && reject('timeout')
      }, timeout)
    }
    return xhr;
  }


  /** 如果为同步 */
  console.log(opt)
  if (!async) {
    execute();
    if (xhr.status === 200) {
      return { data: xhr.responseText, xhr }
    } else {
      console.warn(`xhr:${url} error,status:${xhr.status}`)
      return { data: '', xhr }
    }
  }else{
    return new Promise((resolve,reject)=>{
      execute(resolve,reject)
    })
  }
}
