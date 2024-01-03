import { IEventDispatcher } from "../../typings"

type TypedEvent = {
  type: string,
  [attr: string]: any
}
class Emitter implements IEventDispatcher {
  protected _events = {}
  protected _once_events = {}
  constructor() { }

  /**
   * 触发事件
   * @param {string} type - 事件类型
   */
  dispatch(type: string | TypedEvent, ...args: any[]) {
    const evtType = typeof type == 'object' ? type.type : type
    let evt: any
    if (typeof type == 'object') {
      evt = type
    } else {
      evt = { type:evtType }
    }
    evt.target = this;

    const events = this._events[evtType] || []
    let context = this
    let arg = args || []
    arg.unshift(evt)
    events.map(({ func, args }, index) => {
      try {
        func.apply(context, arg.concat(args || []))
      } catch (err) { 
        console.error('dispatch',err)
      }
    })
    //once
    const once_events = this._once_events[evtType] || []
    once_events.map(({ func, args }, index) => {
      try {
        func.apply(context, arg.concat(args || []))
      } catch (err) { }
    })
    this._once_events[evtType] = []
  }
  /**
   * 添加一个事件
   * @param {string} type - 事件类型
   * @param {function} handler - 事件处理函数
   * @param {arguments} args - 事件参数（可选）
   */
  addEventListener(type: string, handler: any, ...args: any[]) {
    const events = this._events[type] || []
    events.push({
      func: handler,
      args: args || [],
    })
    this._events[type] = events
  }
  /**
   * 移除事件
   * @param {string} type - 事件类型
   * @param {function} handler - 事件处理函数（可选）
   */
  removeEventListener(type: string, handler?: any) {
    const events = this._events[type] || []
    if (handler) {
      const idx: number = events.findIndex(item => item.func == handler)
      if (idx) {
        events.splice(idx, 1)
        this._events[type] = events
      }
    } else {
      this._events[type] = []
    }
  }

  on(type: string, handler: any) {
    this.addEventListener(type, handler)
  }

  off(type: string, handler?: any) {
    this.removeEventListener(type, handler)
  }

  once(type: string, handler: any, ...args: any[]) {
    const events = this._once_events[type] || []
    events.push({
      func: handler,
      args: args || [],
    })
    this._once_events[type] = events
  }
}

export default Emitter
