import cookie from './cookie'
export default class Storage {
  prefix: string = '_au_'
  type = 'localStorage'
  constructor(type) {
    this.type = type
  }
  supported(name) {
    return name in window
  }
  /**
   *
   * @param name 值名
   * @param value 值
   * @param expire 过期时间，单位小时
   */
  set(name, value, expire = 30) {
    name = this.prefix + name
    //ms
    let val = {
      data: value,
      expire: new Date().valueOf() + expire * 60 * 60 * 1000,
    }
    if (this.supported(this.type)) {
      window[this.type].setItem(name, JSON.stringify(val))
    } else {
      cookie.set(name, JSON.stringify(val), expire)
    }
  }

  get(name) {
    name = this.prefix + name
    let val: any = { data: null }

    let str = ''
    if (this.supported(this.type)) {
      str = window[this.type].getItem(name) || ''
    } else {
      str = cookie.get(name) || ''
    }
    try {
      val = JSON.parse(str)
    } catch (err) {
      val = { data: null }
    }
    if (val && val.data) {
      if (val && val.expire < new Date().valueOf()) {
        return null
      }
      return val.data
    }
    return null
  }

  key(index) {
    if (this.supported(this.type)) {
      window[this.type].key(index)
    } else {
      console.warn(`key 方法在当前环境不被支持`)
      return ''
    }
  }
  clear(name) {
    name = this.prefix + name
    if (this.supported(this.type)) {
      window[this.type].removeItem(name)
    } else {
      cookie.clear(name)
    }
  }
}
export const localStore = new Storage('localStorage')
export const sessionStore = new Storage('sessionStorage')
