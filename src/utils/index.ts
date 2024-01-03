import { sha256 } from "./encoder";

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

let domHeader
export let getDomHeader = () => {
  if (!domHeader) {
    domHeader = document.getElementsByTagName('head')[0]
  }
  return domHeader
}
export async function loadJS(url: string) {
  if (!getDomHeader()) {
    throw new Error('*** loadJS Error, 请在dom ready时调用')
  }
  let script: any = document.createElement('script')
  let timeoutId: any = 0
  return new Promise((resolve, reject) => {
    if (script.readyState) {
      script.onreadystatechange = () => {
        if (script.readyState == 'complete' || script.readyState == 'loaded') {
          clearTimeout(timeoutId)
          resolve(true)
        }
      }
    } else {
      script.onload = () => {
        clearTimeout(timeoutId)
        resolve(true)
      }
    }
    timeoutId = setTimeout(() => {
      reject(new Error(`*** Error:加载${url}：30秒超时`))
    }, 30 * 1000)
    script.onerror = err => {
      clearTimeout(timeoutId)
      reject(new Error(`*** Error:加载出错`))
    }
    script.src = url
    script.type = 'text/javascript'
    domHeader.appendChild(script)
  })
}



/**
 * 载入JSON（暂不支持JSONP）
 * @param url
 * @param umd 载入后window的缓存变量名
 * @param headers 载请JSON的请求头
 * @param timeout 默认为0(单位ms)
 * @returns
 */
export async function importJSON(
  url: string,
  umd: string = '',
  headers = {},
  timeout: number = 0
) {
  umd = umd || '_au_' + await sha256(url)
  if (!window[umd]) {
    window[umd] = await ajax({
      url, method: 'GET', headers, timeout
    })
  }
  return window[umd]
}

export async function importJS(url: string, umd: string = '') {
  if (umd && typeof window[umd] == 'object') {
    return window[umd]
  }
  const module = await loadJS(url)
  return window[umd] || module
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
  const execute = function (resolve?, reject?) {
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
        if (xhr.readyState == 4) {
          if ([301, 301].includes(xhr.status)) {

          } else {
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
      console.error(err)
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
  } else {
    return new Promise((resolve, reject) => {
      execute(resolve, reject)
    })
  }
}

/** 防抖 */
export function debounce(func, delay: number=1000, context:unknown = null) {
  let timer; // 定义计时器变量
  return function (...args) {
    clearTimeout(timer); // 清除之前的计时器
    timer = setTimeout(() => {
      func.apply(context, args); // 在指定的延迟后调用函数
    }, delay);
  };
}
/** 节流  */
export function throttle(func, limit: number = 1000, context = null) {
  let lastTime: any = null; // 记录上一次执行的时间
  return function (...args) {
    const currentTime = Date.now(); // 获取当前时间
    if (lastTime && currentTime - lastTime < limit) {
      return; // 若两次执行的时间小于限制值，则不执行函数
    } else {
      func.apply(context, args); // 否则执行函数并更新上一次执行的时间
      lastTime = currentTime;
    }
  };
}
