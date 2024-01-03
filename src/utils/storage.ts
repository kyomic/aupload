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

export class IndexDBStore {
  /**
   * 数据库名称
   */
  static DATABASE: string = 'aupload'
  /**
   * 表名
   */
  static TABLE: string = 'blob'
  private _database: any;
  constructor() {
    this.ready()
  }
  ready() {
    return new Promise((resolve, reject) => {
      if (this._database) {
        resolve(this);
      } else {
        const request = window.indexedDB.open(IndexDBStore.DATABASE, 1);
        request.onsuccess = (event: any) => {
          this._database = event.target?.result;
          resolve(this);
        };
        request.onupgradeneeded = (event: any) => {
          const db = event.target?.result;
          if (!db.objectStoreNames.contains(IndexDBStore.TABLE)) {
            db.createObjectStore(IndexDBStore.TABLE);
          }
        };
        request.onerror = (event) => {
          reject(event);
        }
      }
    })
  }
  onReady(request, callback) {
    return new Promise((resolve, reject) => {
      const success = value => {
        callback && callback(false, value)
        resolve(value);
      }
      const error = event => {
        callback && callback(event);
        reject(event);
      }
      return this.ready().then(() => {
        request(success, error);
      }).catch(error)
    })
  }
  setItem(key, value, callback) {
    return this.onReady((success, error) => {
      const request = this._database.transaction(IndexDBStore.TABLE, 'readwrite').objectStore(IndexDBStore.TABLE).put(value, key);
      request.onsuccess = () => {
        success(value);
        callback && callback(false, value)
      };
      request.onerror = error
    }, callback)
  }
  getItem(key, callback) {
    return this.onReady((success, error) => {
      const request = this._database.transaction(IndexDBStore.TABLE).objectStore(IndexDBStore.TABLE).get(key);
      request.onsuccess = () => success(request.result);
      request.onerror = error;
    }, callback)
  }
  removeItem(key, callback) {
    return this.onReady((success, error) => {
      const request = this._database.transaction(IndexDBStore.TABLE, 'readwrite').objectStore(IndexDBStore.TABLE).delete(key);
      request.onsuccess = () => {
        success(key);
      };
      request.onerror = error;
    }, callback)
  }

  key(index, callback) {
    return this.onReady((success, error) => {
      const request = this._database.transaction(IndexDBStore.TABLE).objectStore(IndexDBStore.TABLE).getAllKeys();
      request.onsuccess = () => success(request.result[index]);
      request.onerror = error;
    }, callback)
  }

  keys(callback) {
    return this.onReady((success, error) => {
      const request = this._database.transaction(IndexDBStore.TABLE).objectStore(IndexDBStore.TABLE).getAllKeys();
      request.onsuccess = () => success(request.result);
      request.onerror = error;
    }, callback)
  }
  clear(callback) {
    return this.onReady((success, error) => {
      const request = this._database.transaction(IndexDBStore.TABLE, 'readwrite').objectStore(IndexDBStore.TABLE).clear();
      request.onsuccess = () => {
        success(null);
      };;
      request.onerror = error;
    }, callback)
  }
}
export const indexDbStore = new IndexDBStore();
export const localStore = new Storage('localStorage')
export const sessionStore = new Storage('sessionStorage')
