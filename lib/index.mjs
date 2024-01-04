(function(){"use strict";try{if(typeof document<"u"){var l=document.createElement("style");l.appendChild(document.createTextNode('@charset "UTF-8";:root{--color-primary:#0078ff;--color-primary-1:#3f99ff;--color-primary-2:#71b3ff;--color-primary-3:#9dcbff;--color-primary-4:#e8f3ff;--color-primary-5:#f3f9ff;--color-primary-hover:#0067dd;--color-second: #b3b30b;--color-error:#ff0037;--color-error-1:#ff3b65;--color-warn:#ea5e00;--color-warn-1:#ffc68c;--large-height:48px;--medium-height:24px;--small-height:16px;--mini-height:12px}.aupload_info{position:absolute;left:0;top:0;width:100%;text-align:center;display:flex;justify-content:center;height:0}.aupload_info .message+.message{margin-top:10px}.aupload_info .message-box{min-height:20px;background:#ffffff;padding:6px 12px;border:1px solid #efefef;border-radius:6px;line-height:20px;display:inline-block;box-sizing:content-box;font-size:12px;box-shadow:0 0 20px 4px #edededd9}.aupload_info i.close{font-style:normal;margin-left:10px;color:var(--color-primary);cursor:pointer}.aupload_info i.close:hover{color:var(--color-primary-hover)}.aupload_info i em{color:#ccc;font-style:normal}.aupload_info .message-error{border-color:var(--color-error-1);color:var(--color-error)}.aupload_info .message-warn{border-color:var(--color-warn-1);color:var(--color-warn)}.aupload_view{position:relative}.aupload_view .dropper{min-height:20px;position:absolute}.aupload_view .task{margin-top:10px}.aupload_view .task button{height:24px}.aupload_view .task .file{border:1px solid #f0f0f0;padding:5px 10px;border-radius:5px}.aupload_view .task .file .size{color:#ccc;font-size:14px;width:115px;text-align:right}.aupload_view .task .file+.file{margin-top:10px}.aupload_view .task .info,.aupload_view .task .ext{padding-top:5px;padding-bottom:5px}.aupload_view .task .info{display:flex;justify-content:space-between}.aupload_view .task .info .name i{font-size:9px;border:1px solid #666;font-style:normal;padding-top:7px;position:relative;width:20px;height:22px;display:inline-block;text-align:center;margin-right:10px;border-radius:3px}.aupload_view .task .info .name i:after{content:" ";width:0;height:0;position:absolute;right:-1px;top:-1px;border-top:7px solid white;border-left:7px solid #494949}.aupload_view .task .info .name em{display:inline-block;transform:scale(.8);font-style:normal}.aupload_view .task .ext{display:flex}.aupload_view .task .ext .progress{height:24px;background:#f1f1f1;position:relative;border-radius:24px;box-shadow:inset 0 1px 1px #0000001a;overflow:hidden;flex:1 0 auto}.aupload_view .task .ext .progress .bar{height:100%;position:absolute;background:var(--color-primary);border-radius:24px}.aupload_view .task .ext .progress .text{color:#fff;font-size:12px;line-height:24px;position:absolute;margin-left:10px;text-shadow:1px 0px #3b7185;min-width:100px}.aupload_view .task .ext .progress .text .p{display:inline-block;min-width:37px}.aupload_view .task .ext .progress .text i{font-style:normal}.aupload_view .task .ext .progress_error .bar{background:#ff0037}.aupload_view .task .ext .opt{margin-left:10px}.aupload_view .masker{position:absolute;width:100%;height:100%;opacity:.1;background:#000000;top:0;display:none}.aupload_view .holder{width:100%;height:150px}.aupload_view .view{border:1px dashed var(--color-primary-3);background:var(--color-primary-5);border-radius:6px}.aupload_view .view:hover,.aupload_view .view-in{background:var(--color-primary-4);border-color:var(--color-primary-2)}.aupload_view .view .info{display:flex;flex-direction:column;align-items:center;position:relative;left:50%;top:0;width:80vw;margin-left:-40vw;margin-top:20px}.aupload_view .view .info .button-primary{width:150px;overflow:hidden;position:relative}.aupload_view .view .info .button-primary input[type=file]{cursor:pointer;border:none;outline:none;padding:100px 10px 10px;position:absolute;left:0;top:0;color:transparent;text-shadow:0 0 0 #000}.aupload_view .view .info p{color:#666;pointer-events:none}button{border-radius:5px;border:1px solid #ccc;background-color:#fff;color:#666;cursor:pointer}button:hover{border:1px solid #9c9c9c;color:#818181}button:active{border:1px solid #666;color:#333}button[disabled]{background-color:#f1f1f1;cursor:default}button[disabled]:active,button[disabled]:hover{border:1px solid #ccc;color:#666}button.primary,.button-primary{background:var(--color-primary);color:#f3f8ff;border-radius:6px;text-align:center;cursor:pointer}button.primary:hover,.button-primary:hover{color:#fff;background-color:var(--color-primary-hover)}.button-large{height:var(--large-height);line-height:var(--large-height);padding:0 10px}.button-mini{border-radius:5px;border:1px solid #ccc;background-color:#fff;color:#666;cursor:pointer}.aupload{position:relative;color:#666}*{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.row{margin-right:-15px;margin-left:-15px}.row:after,.row:before{display:table;content:" "}.row:after{clear:both}.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9,.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9,.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9,.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{position:relative;min-height:1px;padding-right:15px;padding-left:15px}.col-xs-1,.col-xs-10,.col-xs-11,.col-xs-12,.col-xs-2,.col-xs-3,.col-xs-4,.col-xs-5,.col-xs-6,.col-xs-7,.col-xs-8,.col-xs-9{float:left}.col-xs-12{width:100%}.col-xs-11{width:91.66666667%}.col-xs-10{width:83.33333333%}.col-xs-9{width:75%}.col-xs-8{width:66.66666667%}.col-xs-7{width:58.33333333%}.col-xs-6{width:50%}.col-xs-5{width:41.66666667%}.col-xs-4{width:33.33333333%}.col-xs-3{width:25%}.col-xs-2{width:16.66666667%}.col-xs-1{width:8.33333333%}.col-xs-pull-12{right:100%}.col-xs-pull-11{right:91.66666667%}.col-xs-pull-10{right:83.33333333%}.col-xs-pull-9{right:75%}.col-xs-pull-8{right:66.66666667%}.col-xs-pull-7{right:58.33333333%}.col-xs-pull-6{right:50%}.col-xs-pull-5{right:41.66666667%}.col-xs-pull-4{right:33.33333333%}.col-xs-pull-3{right:25%}.col-xs-pull-2{right:16.66666667%}.col-xs-pull-1{right:8.33333333%}.col-xs-pull-0{right:auto}.col-xs-push-12{left:100%}.col-xs-push-11{left:91.66666667%}.col-xs-push-10{left:83.33333333%}.col-xs-push-9{left:75%}.col-xs-push-8{left:66.66666667%}.col-xs-push-7{left:58.33333333%}.col-xs-push-6{left:50%}.col-xs-push-5{left:41.66666667%}.col-xs-push-4{left:33.33333333%}.col-xs-push-3{left:25%}.col-xs-push-2{left:16.66666667%}.col-xs-push-1{left:8.33333333%}.col-xs-push-0{left:auto}.col-xs-offset-12{margin-left:100%}.col-xs-offset-11{margin-left:91.66666667%}.col-xs-offset-10{margin-left:83.33333333%}.col-xs-offset-9{margin-left:75%}.col-xs-offset-8{margin-left:66.66666667%}.col-xs-offset-7{margin-left:58.33333333%}.col-xs-offset-6{margin-left:50%}.col-xs-offset-5{margin-left:41.66666667%}.col-xs-offset-4{margin-left:33.33333333%}.col-xs-offset-3{margin-left:25%}.col-xs-offset-2{margin-left:16.66666667%}.col-xs-offset-1{margin-left:8.33333333%}.col-xs-offset-0{margin-left:0}@media (min-width: 768px){.col-sm-1,.col-sm-10,.col-sm-11,.col-sm-12,.col-sm-2,.col-sm-3,.col-sm-4,.col-sm-5,.col-sm-6,.col-sm-7,.col-sm-8,.col-sm-9{float:left}.col-sm-12{width:100%}.col-sm-11{width:91.66666667%}.col-sm-10{width:83.33333333%}.col-sm-9{width:75%}.col-sm-8{width:66.66666667%}.col-sm-7{width:58.33333333%}.col-sm-6{width:50%}.col-sm-5{width:41.66666667%}.col-sm-4{width:33.33333333%}.col-sm-3{width:25%}.col-sm-2{width:16.66666667%}.col-sm-1{width:8.33333333%}.col-sm-pull-12{right:100%}.col-sm-pull-11{right:91.66666667%}.col-sm-pull-10{right:83.33333333%}.col-sm-pull-9{right:75%}.col-sm-pull-8{right:66.66666667%}.col-sm-pull-7{right:58.33333333%}.col-sm-pull-6{right:50%}.col-sm-pull-5{right:41.66666667%}.col-sm-pull-4{right:33.33333333%}.col-sm-pull-3{right:25%}.col-sm-pull-2{right:16.66666667%}.col-sm-pull-1{right:8.33333333%}.col-sm-pull-0{right:auto}.col-sm-push-12{left:100%}.col-sm-push-11{left:91.66666667%}.col-sm-push-10{left:83.33333333%}.col-sm-push-9{left:75%}.col-sm-push-8{left:66.66666667%}.col-sm-push-7{left:58.33333333%}.col-sm-push-6{left:50%}.col-sm-push-5{left:41.66666667%}.col-sm-push-4{left:33.33333333%}.col-sm-push-3{left:25%}.col-sm-push-2{left:16.66666667%}.col-sm-push-1{left:8.33333333%}.col-sm-push-0{left:auto}.col-sm-offset-12{margin-left:100%}.col-sm-offset-11{margin-left:91.66666667%}.col-sm-offset-10{margin-left:83.33333333%}.col-sm-offset-9{margin-left:75%}.col-sm-offset-8{margin-left:66.66666667%}.col-sm-offset-7{margin-left:58.33333333%}.col-sm-offset-6{margin-left:50%}.col-sm-offset-5{margin-left:41.66666667%}.col-sm-offset-4{margin-left:33.33333333%}.col-sm-offset-3{margin-left:25%}.col-sm-offset-2{margin-left:16.66666667%}.col-sm-offset-1{margin-left:8.33333333%}.col-sm-offset-0{margin-left:0}}@media (min-width: 992px){.col-md-1,.col-md-10,.col-md-11,.col-md-12,.col-md-2,.col-md-3,.col-md-4,.col-md-5,.col-md-6,.col-md-7,.col-md-8,.col-md-9{float:left}.col-md-12{width:100%}.col-md-11{width:91.66666667%}.col-md-10{width:83.33333333%}.col-md-9{width:75%}.col-md-8{width:66.66666667%}.col-md-7{width:58.33333333%}.col-md-6{width:50%}.col-md-5{width:41.66666667%}.col-md-4{width:33.33333333%}.col-md-3{width:25%}.col-md-2{width:16.66666667%}.col-md-1{width:8.33333333%}.col-md-pull-12{right:100%}.col-md-pull-11{right:91.66666667%}.col-md-pull-10{right:83.33333333%}.col-md-pull-9{right:75%}.col-md-pull-8{right:66.66666667%}.col-md-pull-7{right:58.33333333%}.col-md-pull-6{right:50%}.col-md-pull-5{right:41.66666667%}.col-md-pull-4{right:33.33333333%}.col-md-pull-3{right:25%}.col-md-pull-2{right:16.66666667%}.col-md-pull-1{right:8.33333333%}.col-md-pull-0{right:auto}.col-md-push-12{left:100%}.col-md-push-11{left:91.66666667%}.col-md-push-10{left:83.33333333%}.col-md-push-9{left:75%}.col-md-push-8{left:66.66666667%}.col-md-push-7{left:58.33333333%}.col-md-push-6{left:50%}.col-md-push-5{left:41.66666667%}.col-md-push-4{left:33.33333333%}.col-md-push-3{left:25%}.col-md-push-2{left:16.66666667%}.col-md-push-1{left:8.33333333%}.col-md-push-0{left:auto}.col-md-offset-12{margin-left:100%}.col-md-offset-11{margin-left:91.66666667%}.col-md-offset-10{margin-left:83.33333333%}.col-md-offset-9{margin-left:75%}.col-md-offset-8{margin-left:66.66666667%}.col-md-offset-7{margin-left:58.33333333%}.col-md-offset-6{margin-left:50%}.col-md-offset-5{margin-left:41.66666667%}.col-md-offset-4{margin-left:33.33333333%}.col-md-offset-3{margin-left:25%}.col-md-offset-2{margin-left:16.66666667%}.col-md-offset-1{margin-left:8.33333333%}.col-md-offset-0{margin-left:0}}@media (min-width: 1200px){.col-lg-1,.col-lg-10,.col-lg-11,.col-lg-12,.col-lg-2,.col-lg-3,.col-lg-4,.col-lg-5,.col-lg-6,.col-lg-7,.col-lg-8,.col-lg-9{float:left}.col-lg-12{width:100%}.col-lg-11{width:91.66666667%}.col-lg-10{width:83.33333333%}.col-lg-9{width:75%}.col-lg-8{width:66.66666667%}.col-lg-7{width:58.33333333%}.col-lg-6{width:50%}.col-lg-5{width:41.66666667%}.col-lg-4{width:33.33333333%}.col-lg-3{width:25%}.col-lg-2{width:16.66666667%}.col-lg-1{width:8.33333333%}.col-lg-pull-12{right:100%}.col-lg-pull-11{right:91.66666667%}.col-lg-pull-10{right:83.33333333%}.col-lg-pull-9{right:75%}.col-lg-pull-8{right:66.66666667%}.col-lg-pull-7{right:58.33333333%}.col-lg-pull-6{right:50%}.col-lg-pull-5{right:41.66666667%}.col-lg-pull-4{right:33.33333333%}.col-lg-pull-3{right:25%}.col-lg-pull-2{right:16.66666667%}.col-lg-pull-1{right:8.33333333%}.col-lg-pull-0{right:auto}.col-lg-push-12{left:100%}.col-lg-push-11{left:91.66666667%}.col-lg-push-10{left:83.33333333%}.col-lg-push-9{left:75%}.col-lg-push-8{left:66.66666667%}.col-lg-push-7{left:58.33333333%}.col-lg-push-6{left:50%}.col-lg-push-5{left:41.66666667%}.col-lg-push-4{left:33.33333333%}.col-lg-push-3{left:25%}.col-lg-push-2{left:16.66666667%}.col-lg-push-1{left:8.33333333%}.col-lg-push-0{left:auto}.col-lg-offset-12{margin-left:100%}.col-lg-offset-11{margin-left:91.66666667%}.col-lg-offset-10{margin-left:83.33333333%}.col-lg-offset-9{margin-left:75%}.col-lg-offset-8{margin-left:66.66666667%}.col-lg-offset-7{margin-left:58.33333333%}.col-lg-offset-6{margin-left:50%}.col-lg-offset-5{margin-left:41.66666667%}.col-lg-offset-4{margin-left:33.33333333%}.col-lg-offset-3{margin-left:25%}.col-lg-offset-2{margin-left:16.66666667%}.col-lg-offset-1{margin-left:8.33333333%}.col-lg-offset-0{margin-left:0}}')),document.head.appendChild(l)}}catch(o){console.error("vite-plugin-css-injected-by-js",o)}})();
var ce = Object.defineProperty;
var he = (c, i, e) => i in c ? ce(c, i, { enumerable: !0, configurable: !0, writable: !0, value: e }) : c[i] = e;
var a = (c, i, e) => (he(c, typeof i != "symbol" ? i + "" : i, e), e);
class L {
  constructor() {
    a(this, "_events", {});
    a(this, "_once_events", {});
  }
  /**
   * 触发事件
   * @param {string} type - 事件类型
   */
  dispatch(i, ...e) {
    const t = typeof i == "object" ? i.type : i;
    let s;
    typeof i == "object" ? s = i : s = { type: t }, s.target = this;
    const r = this._events[t] || [];
    let o = this, n = e || [];
    n.unshift(s), r.map(({ func: h, args: d }, f) => {
      try {
        h.apply(o, n.concat(d || []));
      } catch (u) {
        console.error("dispatch", u);
      }
    }), (this._once_events[t] || []).map(({ func: h, args: d }, f) => {
      try {
        h.apply(o, n.concat(d || []));
      } catch {
      }
    }), this._once_events[t] = [];
  }
  /**
   * 添加一个事件
   * @param {string} type - 事件类型
   * @param {function} handler - 事件处理函数
   * @param {arguments} args - 事件参数（可选）
   */
  addEventListener(i, e, ...t) {
    const s = this._events[i] || [];
    s.push({
      func: e,
      args: t || []
    }), this._events[i] = s;
  }
  /**
   * 移除事件
   * @param {string} type - 事件类型
   * @param {function} handler - 事件处理函数（可选）
   */
  removeEventListener(i, e) {
    const t = this._events[i] || [];
    if (e) {
      const s = t.findIndex((r) => r.func == e);
      s && (t.splice(s, 1), this._events[i] = t);
    } else
      this._events[i] = [];
  }
  on(i, e) {
    this.addEventListener(i, e);
  }
  off(i, e) {
    this.removeEventListener(i, e);
  }
  once(i, e, ...t) {
    const s = this._once_events[i] || [];
    s.push({
      func: e,
      args: t || []
    }), this._once_events[i] = s;
  }
}
class I extends L {
  constructor() {
    super();
    a(this, "uploader");
    a(this, "type", "view");
    if (!this.pluginName)
      throw new Error("当前插件未定义名称，请配置：pluginName ");
  }
  setup(e) {
    C.getInstance().register(this.pluginName, this), this.uploader = e;
  }
  get pluginName() {
    const e = this.constructor;
    return e ? e.pluginName : "";
  }
  destroy() {
    C.getInstance().unregister(this.pluginName, this);
  }
}
const S = class S {
  /**
   * 注册插件
   * @param name 
   * @param plugins 
   */
  register(i, e) {
    const t = S.cache;
    if (t[i])
      throw new Error(` 插件：${i} 已经存在，请换个名称 `);
    t[i] = e;
  }
  /**
   * 取消插件的注册
   * @param name 
   * @param plugins 
   */
  unregister(i, e) {
    const t = S.cache;
    try {
      delete t[i];
    } catch {
    }
  }
  /**
   * 是否存在插件
   * @param name 
   * @returns 
   */
  has(i) {
    return !!S.cache[i];
  }
  static getInstance() {
    let i = S.instance;
    return i || (i = new S()), i;
  }
};
a(S, "cache", {}), a(S, "instance");
let C = S;
function Z(c) {
  return "'" + c.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'";
}
let de = (
  // 关键字
  "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined"
), ue = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g, pe = /[^\w$]+/g, fe = new RegExp(["\\b" + de.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"), ge = /^\d[^,]*|,\d[^,]*/g, me = /^,+|,+$/g, we = /^$|,+/, _e = function(c) {
  return c.replace(ue, "").replace(pe, ",").replace(fe, "").replace(ge, "").replace(me, "").split(we);
}, J = function(c, i = "") {
  return typeof c != "string" && (i = typeof c, i === "number" ? c += "" : i === "function" ? c = J(c.call(c)) : c = ""), c;
}, ye = function(c, i) {
  let e = i.split(":"), t = e.shift(), s = e.join(":") || "";
  return s && (s = ", " + s), "$helpers." + t + "(" + c + s + ")";
}, ve = {
  "<": "&#60;",
  ">": "&#62;",
  '"': "&#34;",
  "'": "&#39;",
  "&": "&#38;"
}, ke = function(c) {
  return ve[c];
}, Ee = function(c) {
  return J(c).replace(/&(?![\w#]+;)|[<>"']/g, ke);
}, be = Array.isArray || function(c) {
  return {}.toString.call(c) === "[object Array]";
}, te = function(c, i) {
  let e, t;
  if (be(c))
    for (e = 0, t = c.length; e < t; e++)
      i.call(c, c[e], e, c);
  else
    for (e in c)
      i.call(c, c[e], e);
}, xe = te, H = {}, Re = { $data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1 };
class Se {
  constructor() {
  }
  render(i, e) {
    return N.compiler(i, e);
  }
}
const _ = class _ {
  /**
   * 编译模板
   * 2012-6-6 @TooBug: define 方法名改为 compile，与 Node Express 保持一致
   * @name    template.compile
   * @param   {String}    模板字符串
   * @param   {Object}    编译选项
   *
   *      - openTag       {String}      // 逻辑语法开始标签 "{{" 或 "<%"
   *      - closeTag      {String}      // 逻辑语法开始标签 "}}" 或 "%>"
   *      - filename      {String}      // 用于报错时提醒用户模板字符串的模板名，并作为cacheStore的属性存储编译函数
   *      - escape        {Boolean}     // html字符串转义，编码: <%=value%> 不编码:<%=#value%>
   *      - compress      {Boolean}     // 是否压缩多余空白和注释
   *      - debug         {Boolean}     // 是否开启调试模式编译模板字符串
   *      - cache         {Boolean}     // 是否缓存模板字符串编译结果
   *      - parser        {Function}    // 语法转换插件钩子，"<%"、"%>"间内部值预处理，默认defaults.parser
   *
   * @return  {Function}  渲染方法
   */
  // 通过compiler以字符串形式拼接编译函数体，最终转化成函数输出
  static compile(i, e) {
    let t = e || Object.assign({}, _.default);
    t = Object.assign(t, _.default);
    let s = t.filename, r = new Se(), o;
    try {
      o = r.render(i, t);
    } catch (l) {
      return l.filename = s || "anonymous", l.name = "Syntax Error", _.showDebugInfo(l);
    }
    function n(l) {
      try {
        return new o(l, s) + "";
      } catch (h) {
        return t.debug ? _.showDebugInfo(h)() : (t.debug = !0, _.compile(i, t)(l));
      }
    }
    return n.prototype = o.prototype, n.toString = function() {
      return o.toString();
    }, s && t.cache && (H[s] = n), n;
  }
  /**
   * 渲染模板(根据模板名)
   * @name    template.render
   * @param   {String}    模板名，页面元素id
   * @param   {Object}    数据，data传入为空时，返回结果为编译函数
   * @return  {String}    渲染好的字符串
   */
  static renderFile(i, e) {
    let t = _.get(i) || _.showDebugInfo({
      filename: i,
      name: "Render Error",
      message: "Template not found"
    });
    return e ? t(e) : t;
  }
  /**
   * 获取编译缓存（可由外部重写此方法）
   * @param   {String}    模板名
   * @param   {Function}  编译好的函数
   */
  static get(i) {
    let e;
    if (H[i])
      e = H[i];
    else if (typeof document == "object") {
      let t = document.getElementById(i);
      if (t) {
        let s = (t.value || t.innerHTML).replace(/^\s*|\s*$/g, "");
        e = _.compile(s, {
          filename: i
        });
      }
    }
    return e;
  }
  static compiler(i, e) {
    let t = e.debug, s = e.openTag || "{{", r = e.closeTag || "}}", o = e.parser, n = e.compress, l = e.escape, h = 1, d = _.utils, f = { ...Re }, u = _.helpers, m = !!"".trim, w = m ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"], v = m ? "$out+=text;return $out;" : "$out.push(text);", R = "function(){var text=''.concat.apply('',arguments);" + v + "}", oe = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + v + "}", Q = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (t ? "$line=0," : ""), P = w[0], ae = "return new String(" + w[3] + ");";
    i.split(s).forEach((g) => {
      let z = g.split(r), k = z[0], E = z[1];
      z.length === 1 ? P += X(k) : (P += le(k), E && (P += X(E)));
    });
    function X(g) {
      return h += g.split(/\n/).length - 1, n && (g = g.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), g && (g = w[1] + Z(g) + w[2] + `
`), g;
    }
    function le(g) {
      let z = h;
      if (o ? g = o(g, e) : t && (g = g.replace(/\n/g, function() {
        return h++, "$line=" + h + ";";
      })), g.indexOf("=") === 0) {
        let k = l && !/^=[=#]/.test(g);
        if (g = g.replace(/^=[=#]?|[\s;]*$/g, ""), k) {
          let E = g.replace(/\s*[^]+\)/, "");
          !d[E] && !/^(include|print)$/.test(E) && (g = "$escape(" + g + ")");
        } else
          g = "$string(" + g + ")";
        g = w[1] + g + w[2];
      }
      return t && (g = "$line=" + z + ";" + g), xe(_e(g), function(k) {
        if (!k || f[k])
          return;
        let E;
        k === "print" ? E = R : k === "include" ? E = oe : d[k] ? E = "$utils." + k : u[k] ? E = "$helpers." + k : E = "$data." + k, Q += k + "=" + E + ",", f[k] = !0;
      }), g + `
`;
    }
    let M = Q + P + ae;
    t && (M = "try{" + M + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + Z(i) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
    try {
      let g = new Function("$data", "$filename", M);
      return g.prototype = { ...d }, g;
    } catch (g) {
      throw g.temp = "function anonymous($data,$filename) {" + M + "}", g;
    }
  }
  /**
   * 模板错误事件（可由外部重写此方法），触发console.error提示错误信息
   * @name    template.onerror
   * @event
   */
  static onerror(i) {
    let e = `Template Error

`;
    for (let t in i)
      e += "<" + t + `>
` + i[t] + `

`;
    typeof console == "object" && console.error(e);
  }
};
a(_, "default", {
  openTag: "{{",
  closeTag: "}}",
  escape: !0,
  // 是否编码输出变量的 HTML 字符
  cache: !0,
  // 是否开启缓存（依赖 options 的 filename 字段）
  compress: !1,
  // 是否压缩输出
  parser: (i, e) => {
    i = i.replace(/^\s/, "");
    let t = i.split(" "), s = t.shift(), r = t.join(" ");
    switch (s) {
      case "if":
        i = "if(" + r + "){";
        break;
      case "else":
        t.shift() === "if" ? t = " if(" + t.join(" ") + ")" : t = "", i = "}else" + t + "{";
        break;
      case "/if":
        i = "}";
        break;
      case "each":
        let o = t[0] || "$data", n = t[1] || "as", l = t[2] || "$value", h = t[3] || "$index", d = l + "," + h;
        n !== "as" && (o = "[]"), i = "$each(" + o + ",function(" + d + "){";
        break;
      case "/each":
        i = "});";
        break;
      case "echo":
        i = "print(" + r + ");";
        break;
      case "print":
      case "include":
        i = s + "(" + t.join(",") + ");";
        break;
      default:
        if (/^\s*\|\s*[\w\$]/.test(r)) {
          let f = !0;
          i.indexOf("#") === 0 && (i = i.substr(1), f = !1);
          let u = 0, m = i.split("|"), w = m.length, v = m[u++];
          for (; u < w; u++)
            v = ye(v, m[u]);
          i = (f ? "=" : "=#") + v;
        } else
          _.helpers[s] ? i = "=#" + s + "(" + t.join(",") + ");" : i = "=" + i;
        break;
    }
    return i;
  }
}), a(_, "utils", {
  $helpers: {},
  $include: _.renderFile,
  $string: J,
  $escape: Ee,
  $each: te
}), a(_, "helpers", {}), a(_, "showDebugInfo", function(i) {
  return _.onerror(i), function() {
    return "{Template Error}";
  };
});
let N = _;
class Te {
  /**
   * 将文件流转为 File对象
   * @param buffer 
   * @param name 
   * @param fileType 
   */
  async buffer2File(i, e, t) {
    const s = new Blob([i], { type: t });
    return new File([s], e);
  }
  async blob2File(i, e) {
    return new File([i], e);
  }
  async file2Buffer(i, e = -1) {
    const t = e < 0 ? i.size : Math.min(e, i.size), s = 8192, r = File.prototype, o = r.slice || r.mozSlice || r.webkitSlice;
    return new Promise((n) => {
      let l = 0, h = new Uint8Array(t);
      const d = new FileReader();
      d.onload = function(u) {
        const m = new Uint8Array(u.target.result);
        h.set(m, l), l += m.length, l < i.size ? l >= e ? n(h) : f() : n(h);
      };
      function f() {
        const u = Math.min(t, l + s, i.size), m = o.call(i, l, u);
        d.readAsArrayBuffer(m);
      }
      f();
    });
  }
  /**
   * 生成文件的hash串(基于WebCrypto的 SHA-256算法)
   * 注意：文件过大时计算会慢，可以通过开源的SparkMd5等更高效的方案或者配置length参数进行前部分字节计算
   * @param {File} file 文件对象
   * @param {number} [length] - 计算的文件字节长度，默认为整个文件字节大小
   * @returns 
   */
  async fileSha256(i, e = -1) {
    const t = await this.file2Buffer(i, e), r = await window.crypto.subtle.digest("SHA-256", t);
    return Array.from(new Uint8Array(r)).map((n) => n.toString(16).padStart(2, "0")).join("");
  }
}
function se(c) {
  const i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let e = "";
  for (let t = 0; t < c; t++) {
    const s = Math.floor(Math.random() * i.length);
    e += i.charAt(s);
  }
  return e;
}
function W(c, i = 2) {
  const e = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  if (c === 0)
    return "0 Bytes";
  if (c < 1)
    return c + " " + e[0];
  const t = 1024, s = i < 0 ? 0 : i, r = Math.floor(Math.log(c) / Math.log(t));
  return parseFloat((c / Math.pow(t, r)).toFixed(s)) + " " + e[r];
}
let B, $e = () => (B || (B = document.getElementsByTagName("head")[0]), B);
async function Fe(c) {
  if (!$e())
    throw new Error("*** loadJS Error, 请在dom ready时调用");
  let i = document.createElement("script"), e = 0;
  return new Promise((t, s) => {
    i.readyState ? i.onreadystatechange = () => {
      (i.readyState == "complete" || i.readyState == "loaded") && (clearTimeout(e), t(!0));
    } : i.onload = () => {
      clearTimeout(e), t(!0);
    }, e = setTimeout(() => {
      s(new Error(`*** Error:加载${c}：30秒超时`));
    }, 30 * 1e3), i.onerror = (r) => {
      clearTimeout(e), s(new Error("*** Error:加载出错"));
    }, i.src = c, i.type = "text/javascript", B.appendChild(i);
  });
}
async function Oe(c, i = "") {
  if (i && typeof window[i] == "object")
    return window[i];
  const e = await Fe(c);
  return window[i] || e;
}
function ie(c = { url: "", method: "GET", async: !0, headers: {}, timeout: 0 }) {
  let { url: i, method: e, async: t, headers: s, timeout: r, payload: o } = c;
  typeof t > "u" && (t = !0);
  const n = new XMLHttpRequest();
  let l = 0;
  const h = function(d, f) {
    n.open((e || "GET").toUpperCase(), i, t || !0), s = s || {};
    try {
      for (let u in s)
        n.setRequestHeader(u, s[u]);
    } catch (u) {
      console.warn("set-headers", u);
    }
    return r && (n.timeout = r), n.onreadystatechange = function() {
      if (n.readyState === 4 && n.status === 200) {
        let u = null;
        try {
          u = JSON.parse(n.responseText);
        } catch {
          u = null;
        }
        clearTimeout(l), d && d({
          data: u,
          xhr: n
        });
      } else
        n.readyState == 4 && ([301, 301].includes(n.status) || f && f("网络错误,代码:" + n.status + ",readyStatus:" + n.readyState));
    }, n.onprogress = function(u) {
      u.lengthComputable && c.onProgress && c.onProgress(u);
    }, n.upload.onloadstart = function(u) {
      c.onUploadStart && c.onUploadStart(u);
    }, n.upload.onprogress = function(u) {
      u.lengthComputable && c.onUploadProgress && c.onUploadProgress(u);
    }, n.ontimeout = function(u) {
      clearTimeout(l), f && f("timeout");
    }, n.onerror = function(u) {
      clearTimeout(l), console.error(u), f && f(u);
    }, n.send(o), r && (l = setTimeout(() => {
      f && f("timeout");
    }, r)), n;
  };
  return console.log(c), t ? new Promise((d, f) => {
    h(d, f);
  }) : (h(), n.status === 200 ? { data: n.responseText, xhr: n } : (console.warn(`xhr:${i} error,status:${n.status}`), { data: "", xhr: n }));
}
function ze(c, i = 1e3, e = null) {
  let t;
  return function(...s) {
    clearTimeout(t), t = setTimeout(() => {
      c.apply(e, s);
    }, i);
  };
}
class Ae extends L {
  constructor(e) {
    super();
    a(this, "_root", document.createElement("div"));
    a(this, "_task");
    a(this, "_hasError", !1);
    a(this, "_hash");
    this._root.className = "file", this.attachTask(e), this._root.addEventListener("click", this.onClick.bind(this));
  }
  attachTask(e) {
    this._task = e, this.draw();
  }
  onClick(e) {
    let t = e.target;
    if (t.tagName.toLowerCase() == "button") {
      const s = t.className;
      s && this.dispatch(s, this._task);
    }
  }
  draw() {
    var d;
    const e = `
      <div class='row'>
        <div class='col-md-6 info'>
          <div class='name'><i><em>{{ext}}</em></i>{{ name }} </div>
          <div class='size'>{{ size }} </div>
        </div>
        <div class='col-md-6 ext'>
          <div class='progress {{progress_class}}'>
            <span class='bar' style='width:{{percent}}%'>
            <span class='text'><i class='p'>{{percent}}%</i><i> {{speed}}/S</i></span>
          </div>
          <div class='opt'>
            
            {{ if state==1 }}
            {{ else if state == 5 }}
            <button class='resume'>继续</button>
            {{ else if state == 0 }}
            <button class='resume'>重试</button>
            {{ else if state == 3 }}
            <button class='pause'>暂停</button>
            {{ /if }}
            <button class='remove'>移除</button>
          </div>
        </div>
      </div>
    `, t = this._hasError ? "progress_error" : "", s = this.task.progress || { loaded: 0, total: 0, duration: 1 };
    let r = 0, o = W(s.loaded / (s.duration / 1e3));
    s.total && (r = (s.loaded / s.total * 100).toFixed(1));
    let n = this._task.name.substring(this._task.name.lastIndexOf(".") + 1);
    n = n.substring(0, 3).toUpperCase();
    const l = {
      ext: n,
      name: this._task.name,
      size: W(this._task.size),
      percent: r,
      speed: o,
      state: (d = this.task.progress) == null ? void 0 : d.state,
      progress_class: t
    };
    let h = N.compile(e)(l);
    this._root.innerHTML = h;
  }
  clearError() {
    this._hasError = !1, this.draw();
  }
  onError(e) {
    this._hasError = !0, this.draw();
  }
  set task(e) {
    this._task = e, this.draw();
  }
  get task() {
    return this._task;
  }
  get root() {
    return this._root;
  }
  destroy() {
    var e;
    if (this._root)
      try {
        (e = this._root.parentNode) == null || e.removeChild(this._root);
      } catch {
      }
  }
}
class Ce {
  constructor(i, ...e) {
    a(this, "_type");
    a(this, "target");
    this._type = i;
  }
  get type() {
    return this._type;
  }
}
class p extends Ce {
  constructor(e, t) {
    super(e);
    a(this, "_data", {});
    this._data = t || {};
  }
  get data() {
    return this._data;
  }
}
/**
 * 上传组件准备好，可以进行 upload操作
 */
a(p, "READY", "ready"), a(p, "APPEND", "append"), a(p, "REMOVE", "remove"), a(p, "ERROR_APPEND", "error_append"), a(p, "PROGRESS", "progress"), a(p, "ERROR", "error"), /**
 * 一个File文件上传完毕
 */
a(p, "COMPLETE", "complete"), a(p, "CHUNK_ERROR");
const Ne = () => ["gif", "jpeg", "jpg", "pjpeg", "x-png", "png", "webp"].map((c) => "image/" + c), Le = (c) => {
  const i = new FileReader();
  return i.readAsArrayBuffer(c.slice(0, 4)), new Promise((e) => {
    i.onloadend = () => {
      const t = i.result, s = new Uint8Array(t);
      let r = "unknow";
      if (s[0] === 255 && s[1] === 216)
        r = "image/jpeg";
      else if (s[0] === 137 && s[1] === 80 && s[2] === 78 && s[3] === 71)
        r = "image/png";
      else if (s[0] === 71 && s[1] === 73 && s[2] === 70 && s[3] === 56)
        r = "image/gif";
      else if (s[0] === 66 && s[1] === 77)
        r = "image/bmp";
      else if (s[0] === 37 && s[1] === 80 && s[2] === 68 && s[3] === 70)
        r = "application/pdf";
      else if (s[0] === 80 && s[1] === 75 && s[2] === 3 && s[3] === 4)
        r = "application/zip";
      else if (s[0] === 123 && s[1] === 92 && s[2] === 114 && s[3] === 116)
        r = "text/rtf";
      else if (s[0] === 80 && s[1] === 75 && s[2] === 83 && s[3] === 32)
        r = "application/vnd.ms-powerpoint";
      else if (s[0] === 82 && s[1] === 73 && s[2] === 70 && s[3] === 70) {
        const o = new DataView(t.slice(8, 12)).getUint32(0, !1);
        o === 22337 ? r = "video/x-ms-wmv" : o === 16726 ? r = "video/x-msvideo" : o === 18514 && (r = "video/mp4");
      } else
        s[0] === 71 && s[1] === 73 && s[2] === 70 && s[3] === 56 ? r = "image/gif" : s[0] === 70 && s[1] === 76 && s[2] === 86 && s[3] === 1 && (r = "video/x-flv");
      e(r);
    };
  });
}, re = (c) => {
  const i = {
    image: /^image\/\*/,
    video: /^video\/\*/,
    audio: /^video\/\*/
  }, t = Object.keys(i).find((r) => {
    if (c.match(i[r]))
      return !0;
  });
  let s = [];
  switch (t) {
    case "image":
      s = Ne();
      break;
  }
  return s;
};
class ne extends I {
  constructor() {
    super();
    a(this, "_root", document.createElement("div"));
    a(this, "_holder", document.createElement("div"));
    a(this, "_masker", document.createElement("div"));
    a(this, "_info", document.createElement("div"));
    a(this, "_browser", document.createElement("div"));
    a(this, "_fileinput", document.createElement("input"));
    a(this, "_view", document.createElement("div"));
    a(this, "_dropper", document.createElement("div"));
    a(this, "_wrapperFiles", document.createElement("div"));
    a(this, "_evtHandler");
    a(this, "_evtUploadHandler");
    a(this, "_evtRootHandler");
    a(this, "_views", []);
  }
  setup(e) {
    super.setup(e), this.initialize();
  }
  initialize() {
    const e = this.uploader;
    e.container && e.container.appendChild(this._root), this._evtHandler = this.onEvent.bind(this), this._evtRootHandler = this.onRootEvent.bind(this), this._root.className = "aupload_view", this._root.appendChild(this._view), this._view.appendChild(this._dropper), this._view.appendChild(this._info), this._root.appendChild(this._wrapperFiles), this._dropper.className = "dropper", this._wrapperFiles.className = "task", this._masker.className = "masker", this._view.className = "view", this._view.title = "拖动或粘帖文件至此区域", this._holder.className = "holder", this._info.className = "info", this._browser = document.createElement("div"), this._browser.className = "button-primary button-large", this._info.appendChild(this._browser), this._dropper.appendChild(this._holder), this._dropper.appendChild(this._masker), this._info.appendChild(this._browser);
    const t = document.createElement("p");
    t.innerHTML = "请选择:.mp4(视频格）的文件，最大不可以超过100MB,请选择:.mp4(视频格）的文件，最大不可以超过100MB", this._info.appendChild(t);
    const s = document.createElement("span");
    s.innerHTML = "请选择文件", this._browser.appendChild(s), this.reloadFileField(), this._dropper.setAttribute("contenteditable", "true"), this.attachEvent();
  }
  reloadFileField() {
    var s;
    const e = this.uploader.option, t = this._browser.querySelector("input[type=file]");
    if (t && (t.removeEventListener("change", this._evtHandler), (s = t.parentNode) == null || s.removeChild(t)), this._fileinput = document.createElement("input"), e.multiple && this._fileinput.setAttribute("multiple", "multiple"), e.allowedMimeType) {
      const r = e.allowedMimeType.reduce((o, n) => {
        const l = re(n);
        return o = o.concat(l), o;
      }, []);
      this._fileinput.setAttribute("accept", r.join(","));
    }
    this._browser.appendChild(this._fileinput), this._fileinput.setAttribute("type", "file"), this._fileinput.addEventListener("change", this._evtHandler);
  }
  attachEvent() {
    const e = ["mouseleave", "paste", "drop", "dragover", "dragleave"];
    for (let t of e)
      this._view.addEventListener(t, this._evtHandler);
    for (let t of ["mouseenter", "mouseleave", "click"])
      this._root.addEventListener(t, this._evtRootHandler);
    this._evtUploadHandler = this.onUploadEvent.bind(this), [
      p.READY,
      p.APPEND,
      p.REMOVE,
      p.PROGRESS,
      p.COMPLETE,
      p.ERROR,
      p.CHUNK_ERROR
    ].forEach((t) => {
      this.uploader.addEventListener(t, this._evtUploadHandler);
    });
  }
  onRootEvent(e) {
    switch (e.type) {
      case "mouseenter":
      case "click":
        this._holder.focus();
        break;
      case "mouseleave":
        this._holder.blur();
        break;
    }
  }
  appendFile(e) {
    const t = new Ae(e);
    t.addEventListener("pause", (s, r) => {
      this.uploader.pause(r);
    }), t.addEventListener("resume", (s, r) => {
      this.uploader.resume(r);
    }), t.addEventListener("remove", (s, r) => {
      this.uploader.remove(r);
    }), this._wrapperFiles.appendChild(t.root), this._views.push(t);
  }
  removeFile(e) {
    const t = this._views.find((s, r) => s.task && s.task.hash == e.hash);
    if (t) {
      const s = this._views.indexOf(t);
      this._views.splice(s, 1), t.destroy();
    }
  }
  uploadFile(e) {
    this.uploader && this.uploader.upload(e.map((t) => ({
      name: t.name,
      size: t.size,
      file: t
    })));
  }
  highlightView(e) {
    e ? this._view.className = "view view-in" : this._view.className = "view";
  }
  onUploadEvent(e) {
    const { task: t, chunk: s, message: r, error: o } = e.data || {};
    switch (e.type) {
      case p.APPEND:
        this.appendFile(t);
        break;
      case p.REMOVE:
        this.removeFile(t);
        break;
      case p.COMPLETE:
      case p.PROGRESS:
        if (t) {
          t.progress;
          const n = this._views.find((l) => l.task.hash == t.hash);
          n && (n.clearError(), n.task = t);
        }
        break;
      case p.CHUNK_ERROR:
        if (t) {
          const n = this._views.find((l) => l.task.hash == t.hash);
          n && n.onError(t);
        }
        break;
      case p.ERROR_APPEND:
        T.Message.error(r + "", { autoClose: !0 });
        break;
      case p.ERROR:
        o && T.Message.error(o + "");
        break;
    }
  }
  onEvent(e) {
    var r;
    console.log("onEvent:", e.type);
    const t = e;
    let s = [];
    switch (e.type) {
      case "change":
        s = Array.from((r = e.target) == null ? void 0 : r.files), this.uploadFile(s), this.reloadFileField();
        break;
      case "dragover":
        t.preventDefault(), t.stopPropagation(), this.highlightView(!0);
        break;
      case "mouseleave":
      case "dragleave":
        this.highlightView(!1);
        break;
      case "drop":
        t.preventDefault(), s = Array.from(t.dataTransfer.files), this.uploadFile(s);
        break;
      case "paste":
        const o = (t.clipboardData || t.originalEvent.clipboardData).items;
        s = [];
        for (let n = 0; n < o.length; n++) {
          const l = o[n];
          if (l.kind === "file") {
            const h = l.getAsFile();
            s.push(h);
          }
        }
        s.length ? this.uploadFile(s) : T.Message.warn("粘帖上传时未找到可用文件，请重试", { autoClose: !0 });
        break;
    }
  }
}
a(ne, "pluginName", "view");
class Ie extends L {
  constructor() {
    super();
    a(this, "id");
  }
}
class Pe extends L {
  constructor() {
    super();
    a(this, "_worker", null);
    a(this, "_workers", []);
    /**
     * 每个子线程执行的代码
     */
    a(this, "_code", "");
    /**
     * 即将处理的任务池
     */
    a(this, "_queue", []);
    /**
     * 闲置的worker 
     */
    a(this, "_idleWorkers", []);
    a(this, "_maxThreads", navigator.hardwareConcurrency || 4);
    a(this, "fetch");
  }
  addQueue(e) {
    this._queue = this._queue.concat(e), this.nextQueue();
  }
  nextQueue() {
    console.log("找到任务数：", this._queue), console.log("找到闲置worker", this._idleWorkers);
    const e = this._queue;
    for (; !(!this._idleWorkers.length || !this._queue.length); ) {
      const t = e.shift(), s = this._idleWorkers.shift();
      s == null || s.postMessage({
        type: "exec",
        data: t
      });
    }
    this._idleWorkers.length >= this._maxThreads && e.length == 0 && (console.log("queue:", e.length, "idle worker:", this._idleWorkers.length, "找不到任务，当前工作可能完成"), this.dispatch("complete", { type: "complete" }));
  }
  exec(e, ...t) {
    const s = typeof e == "string";
    if (typeof e == "string" && this._code && e != this._code && (console.warn("当前执行代码发生变更，这会导致正在运行的worker 中止"), this._workers.forEach((r) => {
      r.terminate();
    })), this._code = e, !this._workers.length)
      for (let r = 0; r < this._maxThreads; r++) {
        const o = new Blob([this._code], { type: "application/javascript" });
        let n = s ? new Worker(URL.createObjectURL(o)) : new Ie();
        n.id = r, n.addEventListener("message", (l) => {
          const h = l.data.type, d = l.data.data, f = l.target;
          switch (h) {
            case "init":
              this._idleWorkers.push(f), this.dispatch("message", l), this.nextQueue();
              break;
            case "exec":
              console.log("执行任务:", d);
              break;
            case "queue_complete":
              console.log("执行完成", d), this._idleWorkers.push(f), this.nextQueue();
              break;
          }
          console.log("主线程收到消息：", h, d);
        });
      }
  }
  /**
   * 终止所在正在执行的worker
   */
  terminate() {
    this._workers.forEach((e) => {
      e.terminate();
    });
  }
  /**
   * 销毁当前worker中的数据
   */
  destroy() {
    this.terminate(), this._idleWorkers = [], this._queue = [], this._code = "";
  }
}
const x = class x extends I {
  constructor() {
    super();
    /**
     *  多线程实例
     */
    a(this, "_worker", new Pe());
    a(this, "_evtWorker");
    a(this, "_isWorkerInitialized", !1);
    /**
     * 当前文件列表
     */
    a(this, "_files", {});
    a(this, "_tasks", []);
    /**
     * 所有切片任务
     */
    a(this, "_chunks", []);
    /**
     * 每个chunk对应的xhr缓存，用于获取请求实例，方便取消请求
     * xhr: 一般为xmlhttp实例
     * config，为请求配置
     */
    a(this, "_chunksXHR", {});
    this.type = "service";
  }
  setup(e) {
    super.setup(e);
  }
  /**
   * 将任务根据option.chunkSize大小进行切片
   * @param {UploadTask} task - 指定被切片的文件任务 
   * @returns 
   */
  async splitChunk(e, t) {
    let s = [];
    const r = this.uploader.option, o = r.chunkSize ?? -1;
    if (r.fileId, o > -1) {
      let n = 0;
      const l = File.prototype, h = l.slice || l.mozSlice || l.webkitSlice, d = e.file;
      if (d instanceof File) {
        n = d.size;
        let f = Math.ceil(n / o), u = (t ? t.chunk_index : 0) || 0;
        u > f && (u = 0);
        for (let m = u; m < f; m++) {
          let w = m * o, v = Math.min(n, m * o + o), R = h.apply(d, [w, v]);
          s.push({
            name: d.name,
            chunk_index: m,
            chunk_count: f,
            //file: await encoder.blob2File(blob, file.name),
            file: R,
            hash: e.hash
          });
        }
      }
    } else
      s = [];
    return s;
  }
  /**
   * 根据encoding方式，生成不同的上传url参数
   * @param task 
   * @returns 
   */
  generateUrl(e) {
    var n;
    const t = this.uploader.option, s = x.url || t.url, r = x.encoding;
    let o = s ?? "";
    if (r == "binary") {
      const l = [], h = (n = t == null ? void 0 : t.config) == null ? void 0 : n.data;
      for (let d in e)
        d != "file" && d != "config" && l.push(`${d}=${e[d]}`);
      if (h)
        for (let d in h)
          l.push(`${d}=${h[d]}`);
      l.length && (o += o.indexOf("?") == -1 ? `?${l.join("&")}` : `&${l.join("&")}`);
    }
    return o;
  }
  async pause(e) {
    const t = e.hash ?? "", r = Object.keys(this._chunksXHR).find((o) => o.indexOf(t) > -1);
    if (r) {
      const o = this._chunksXHR[r];
      if (o)
        try {
          o.xhr.abort();
        } catch {
        }
    }
  }
  async resume(e) {
    await this.resumeTask(e);
  }
  async remove(e) {
    const t = this._tasks.findIndex((s) => s.hash == e.hash);
    if (await this.pause(e), t > -1) {
      const s = this._tasks[t].hash ?? "";
      try {
        delete this._files[s];
      } catch {
      }
      const r = Object.keys(this._chunksXHR), o = r.find((n) => n.indexOf(s) > -1);
      if (o)
        try {
          delete r[o];
        } catch {
        }
      this._chunks = this._chunks.filter((n) => n.hash != s), this._tasks.splice(t, 1);
    }
  }
  /**
   * AUpload 调用Service层，添加上传任务
   * @param tasks 
   */
  async exec(e) {
    const t = this.uploader.option;
    let s = [];
    this._tasks = this._tasks.concat(e);
    for (let r of e) {
      let o = r.hash ?? "", n = r.file, l = [];
      const h = t.start;
      let d = null;
      if (h) {
        if (r.progress && r.progress.chunks) {
          let f = r.progress.chunks.findIndex((u) => u == 0);
          f == -1 && (f = r.progress.chunks.length), d = { chunk_index: f, chunk_count: r.progress.chunks.length, name: r.name, file: r.file };
        } else
          d = await h(r.file, this.uploader);
        if (d && d.chunk_index)
          if (d.chunk_count && d.chunk_count <= d.chunk_index) {
            if (console.warn("好像传完了", this._files), !this._files[o])
              this._files[o] = {
                task: r,
                continuous: d,
                chunks: l
              }, this.uploader.dispatch(new p(p.APPEND, { task: r }));
            else
              throw new Error(`存在同样的文件：${n.name}`);
            this.getFileProgress(r), this.uploader.dispatch(new p(p.COMPLETE, { task: r }));
            continue;
          } else
            r.file instanceof File && d.chunk_index * (t.chunkSize ?? 0) > r.file.size && (console.warn(`不正确的续传点:chunk_index:${d == null ? void 0 : d.chunk_index},byte_offset=${d.chunk_index * (t.chunkSize ?? 0)}`), d = null);
      }
      try {
        if (l = s.concat(await this.splitChunk(r, d)), !this._files[o])
          this._files[o] = {
            task: r,
            continuous: d,
            chunks: l
          }, this.uploader.dispatch(new p(p.APPEND, { task: r }));
        else
          throw new Error(`存在同样的文件：${n.name}`);
      } catch (f) {
        console.error(f), this.uploader.dispatch(new p(p.ERROR, { task: r, error: f }));
        continue;
      }
      s = s.concat(l);
    }
    s = s.map((r) => {
      var o, n;
      return r.config = {
        encoding: x.encoding,
        url: this.generateUrl(r),
        headers: ((o = t.config) == null ? void 0 : o.headers) ?? {},
        data: ((n = t.config) == null ? void 0 : n.data) ?? {}
      }, r;
    }), this._chunks = this._chunks.concat(s), console.log("文件集：", this._files), console.log(`找到任务：${s.length} chunks`, s), this.resumeTasks();
  }
  /**
   * http的形式上传切片
   * @param chunk 
   */
  async uploadChunk(e) {
    const t = this.uploader.option;
    let s = x.url || t.url || "", r = e.file, o, n = {};
    switch (e.config && (e.config.url && (s = e.config.url), e.config.headers && (n = { ...n, ...e.config.headers })), console.log("文件块:", r), x.encoding) {
      case "binary":
        o = r.slice(0, e.size);
        break;
      default:
        const d = new FormData();
        r instanceof File && (e.size = r.size);
        for (let f in e)
          f != "config" && d.append(f, e[f]);
        o = d;
        break;
    }
    let h = {
      url: s,
      method: "POST",
      headers: n,
      payload: o,
      onUploadStart: (d) => {
        e.progress || (e.progress = { state: 3, total: 0, loaded: 0, duration: 0, start_timestamp: (/* @__PURE__ */ new Date()).valueOf() }), this.onTaskEvent({ type: "uploadstart" }, e);
      },
      onUploadProgress: (d) => {
        var m;
        const { loaded: f, total: u } = d;
        if (e.progress) {
          const w = e.progress;
          w.state == 0 ? w.loaded = 0 : w.loaded = f, w.total = u, w.start_timestamp ? w.duration = (/* @__PURE__ */ new Date()).valueOf() - w.start_timestamp : w.duration = 0, console.log("stats=====", (m = e.progress) == null ? void 0 : m.state), e.progress = w;
          let v = !1;
          const R = this._files[e.hash ?? ""];
          R && R.task && R.task.progress && R.task.progress.state == 0 && (v = !0), v || this.onTaskEvent({ type: "uploadprogress" }, e);
        }
      }
    };
    await new Promise(async (d, f) => {
      const u = ie(h);
      let m;
      try {
        u instanceof Promise ? m = await u : m = u;
      } catch (R) {
        console.error(R);
      }
      const w = [e.hash, e.chunk_index].join("_");
      this._chunksXHR[w] = {
        hash: e.hash ?? "",
        chunk_index: e.chunk_index ?? 0,
        xhr: m ? m.xhr : null,
        config: h
      };
      let v = !1;
      v = Math.random() > 0.5, e != null && e.chunk_index && e.chunk_index > 2 && v ? (e.progress && (e.progress.loaded = 0, e.progress.state = 0), this.updateTaskState(e.hash ?? "", 0), console.log("chunks", this._chunks), this.onTaskEvent({ type: "uploadprogress" }, e), this.onTaskEvent({
        type: "chunk_error"
      }, e), f("网络错误。 debug")) : d(!0);
    });
  }
  /**
   * 更新任务的状态
   * @param hash 
   * @param state 
   */
  updateTaskState(e, t) {
    const s = this._files[e];
    if (s) {
      const r = s.task;
      r && r.progress && (r.progress.state = t);
    }
  }
  async resumeTask(e) {
    var s;
    if (!this.uploader.option.worker) {
      const r = e.hash ?? "";
      if (r) {
        let o = (s = this._files[r]) == null ? void 0 : s.chunks;
        if (Array.isArray(o)) {
          if (o = o.concat().filter((n) => !(n && n.progress && n.progress.loaded >= n.progress.total)), o.length)
            for (let n of o)
              try {
                n.progress && (n.progress.state = 3), await this.uploadChunk(n);
              } catch {
                this.uploader.dispatch(new p(p.CHUNK_ERROR, { chunk: n }));
              }
          this.onTaskEvent({ type: "uploadprogress" }, e);
        } else
          console.log("没有可用的任务");
      } else
        console.log("找不到hash:", e);
    }
  }
  async resumeTasks() {
    const e = this.uploader.option, t = this._chunks;
    if (x.url || e.url, e.worker) {
      if (!this._isWorkerInitialized) {
        const s = `
        self.addEventListener('message', function (evt) {
          console.log('[in worker]', evt)
          let data = evt.data.data
          let config = {...(data.config||{})}
          delete data.config;
          let type = evt.data.type
          let encoding = config.encoding
          let url = config.url
          let headers = config.headers || {}
          let payload
          console.log('config',config)
          switch(encoding){
            case 'binary':
              const file = data.file;
              payload = file.slice(0, file.size);
              break;
            default:
              const form = new FormData();
              for(let i in data ){
                form.append(i, data[i])
              }
              payload = form;
              break;
          }
          let option ={
            "body": payload,
            "method": "POST",
            "headers":headers,
          }
          fetch(url,option).then(res=>{
            console.log('请求成功',res)
            self.postMessage({type:'queue_complete'})
          })
        });
        self.postMessage({type:'init'})
      `;
        this._evtWorker = this.onWorkerEvent.bind(this), this._worker.addEventListener("message", this._evtWorker.bind(this)), this._worker.addEventListener("complete", this._evtWorker.bind(this)), this._worker.exec(s), this._isWorkerInitialized = !0;
      }
      this._worker.addQueue(t);
    } else
      for (let s = 0; s < this._tasks.length; s++)
        try {
          await this.resumeTask(this._tasks[s]);
        } catch (r) {
          console.error(r);
        }
  }
  /**
   * 计算一个文件序列的进度
   * @param file 
   * @returns 
   */
  getFileProgress(e, t) {
    var n;
    let s = e.progress || { state: 0, total: 0, loaded: 0, duration: 0, start_timestamp: 0, chunks: [] }, r = 0, o = 0;
    if (e.hash) {
      const l = this._files[e.hash ?? "unkonw"];
      if (l) {
        let h = -1;
        l.continuous && (h = l.continuous.chunk_index ?? 0, h < 0 && (h = 0), this.uploader && (console.log("续传续传.......###########", h), r += h * (((n = this.uploader.option) == null ? void 0 : n.chunkSize) ?? 0))), t && t.progress && t.progress.loaded >= t.progress.total && t.progress.state == 1 && t.chunk_count && (!s.chunks || s.chunks.length != t.chunk_count) && (s.chunks = Array.from({ length: t.chunk_count ?? 1 }).map((m, w) => h >= -1 && h >= w ? -1 : 0), s.chunks[t.chunk_index ?? 0] = 1), s.start_timestamp || (s.start_timestamp = (/* @__PURE__ */ new Date()).valueOf());
        const d = l.task.file;
        let f = [];
        l.chunks.forEach((u) => {
          var m, w, v;
          o += Number(((m = u.progress) == null ? void 0 : m.duration) ?? 0), r += Number(((w = u.progress) == null ? void 0 : w.loaded) ?? 0), f.push(((v = u.progress) == null ? void 0 : v.loaded) ?? 0);
        }), l.chunks.length, s.state = l.chunks.find((u) => u.progress ? u.progress.state == 0 : !1) ? 0 : 3, console.log("~~~~ loads", f, s), r >= s.loaded && (s.loaded = r, s.duration = (/* @__PURE__ */ new Date()).valueOf() - ((s == null ? void 0 : s.start_timestamp) ?? 0), s.duration <= 0 && (s.duration = o)), d && (s.total = d.size), s.loaded >= s.total && (s.loaded = s.total), s.loaded >= s.total && (s.state = 1), e.progress = s;
      }
    }
    return s;
  }
  onTaskEvent(e, t) {
    const s = t.hash ?? "";
    if (s && (console.log("ontask event:", e.type, this._files[s], s), this._files[s])) {
      const r = this._files[s].task;
      switch (e.type) {
        case "uploadstart":
          break;
        case "uploadprogress":
          if (r.progress = this.getFileProgress(r, t), r.progress.state == 0)
            return;
          this.uploader.dispatch(new p(p.PROGRESS, { task: r, chunk: t })), r.progress.loaded >= r.progress.total && r.progress.loaded && this.uploader.dispatch(new p(p.COMPLETE, { task: r, chunk: t }));
          break;
        case "chunk_error":
          console.error("chunk_error"), this.uploader.dispatch(new p(p.CHUNK_ERROR, { task: r, chunk: t }));
          break;
      }
    }
  }
  onWorkerEvent(e) {
    console.log("worker event:", e);
  }
  destroy() {
    super.destroy(), this._isWorkerInitialized = !1, this._worker.terminate(), this._worker.destroy();
  }
};
a(x, "pluginName", "autoservice"), /**
 * 编码方式
 * file: 将文件流打包为File对象，通过Form Boundary进行封装
 * binrary: 直接将文件流发送至服务器，相关的参数会通过query传输
 * base64: 将文件编码为base64，参数打包为JSON，效率较低，不建议使用
 */
a(x, "encoding", "file"), a(x, "url", "");
let q = x;
class D {
  constructor() {
    a(this, "_middles", {});
  }
  onAppendFile(i) {
    const e = "onAppendFile", t = this._middles[e] || [];
    t.push(i), this._middles[e] = t;
  }
  /**
   * 设置upload实例，读取配置生成默认的中间件
   */
  set context(i) {
    const e = i.option;
    e.allowedFileSize && this.onAppendFile(D.allowedFileSize(e.allowedFileSize)), e.allowedMimeType && this.onAppendFile(D.allowedFileExtension(e.allowedMimeType));
  }
  get(i) {
    return this._middles[i] || [];
  }
  /**
   * 允许的扩展名
   * @param extensions 
   * @returns 
   */
  static allowedFileExtension(i) {
    return async (e) => {
      const t = e.file;
      let s = await Le(t);
      t.name.substring(t.name.lastIndexOf("."));
      const r = i.reduce((o, n) => {
        const l = re(n);
        return o = o.concat(l), o;
      }, []);
      if (!r.includes(s))
        throw new Error("不支持的文件类型，请选择:" + r.map((o) => o.split("/")[1]).join(",") + "等格式的文件");
      return Promise.resolve(1);
    };
  }
  static allowedFileSize(i) {
    return (e) => {
      if (e.file.size > i)
        throw new Error(`超过允许的(${W(i, 0)})文件大小`);
      return Promise.resolve(1);
    };
  }
}
const b = class b extends I {
  constructor() {
    super();
    a(this, "_root", document.createElement("div"));
    a(this, "_container", document.createElement("div"));
    a(this, "_cache", []);
  }
  setup(e) {
    super.setup(e), b._instance = this, this.initialize();
  }
  message(e) {
    const t = document.createElement("div");
    t.className = "message";
    const s = "message_" + se(8);
    t.setAttribute("data-id", s), e.showClose = !0;
    let r = e.type == "info" ? "" : "message-" + e.type, o = {
      message: e.message,
      close: e.showClose,
      cls: r
    }, n = `
    <div class="message-box {{cls}}">
      {{ message }}
      {{ if close }}
      <i class="close">关闭</i>
      {{ /if }}
    </div>`, l = N.compile(n)(o);
    t.innerHTML = l, this._container.appendChild(t);
    const h = t.querySelector(".close");
    if (h == null || h.addEventListener("click", () => {
      this.remove(s);
    }), e.autoClose && h) {
      let d = 3e3;
      h.__interval = setInterval(() => {
        h.innerHTML = `关闭<em>(${d / 1e3}秒)</em>`, d <= 0 && (clearInterval(h.__interval), this.remove(s)), d -= 1e3;
      }, 1e3);
    }
  }
  remove(e) {
    var r;
    const t = this._root.querySelector("[data-id=" + e + "]"), s = this._root.querySelector(".close");
    if (s && clearInterval(s.__interval), t)
      try {
        (r = t.parentNode) == null || r.removeChild(t);
      } catch {
      }
  }
  static getInstance() {
    return b._instance || (b._instance = new b()), b._instance;
  }
  static info(e, t) {
    b.getInstance().message({
      type: "info",
      message: e,
      ...t || {}
    });
  }
  static warn(e, t) {
    b.getInstance().message({
      type: "warn",
      message: e,
      ...t || {}
    });
  }
  static error(e, t) {
    b.getInstance().message({
      type: "error",
      message: e,
      ...t || {}
    });
  }
  initialize() {
    this._root.className = "aupload_info", this._root.appendChild(this._container);
    const e = this.uploader.container;
    e && e.appendChild(this._root), this.attachEvent();
  }
  attachEvent() {
  }
};
a(b, "pluginName", "message"), a(b, "_instance");
let K = b;
const j = {
  set: (c, i, e = 30) => {
    let t = /* @__PURE__ */ new Date();
    t.setTime(t.getTime() + e * 24 * 60 * 60 * 1e3), document.cookie = c + "=" + escape(i) + ";expires=" + t.toGMTString() + ";SameSite=None; Secure";
  },
  get: (c) => {
    let i = new RegExp("(^| )" + c + "=([^;]*)(;|$)"), e = document.cookie.match(i);
    return e && e.length ? unescape(e[2]) : null;
  },
  clear: (c) => {
    let i = /* @__PURE__ */ new Date();
    i.setTime(i.getTime() - 1);
    let e = j.get(c);
    e && (document.cookie = c + "=" + e + ";expires=" + i.toGMTString());
  }
};
class Me {
  constructor(i) {
    a(this, "prefix", "_au_");
    a(this, "type", "localStorage");
    this.type = i;
  }
  supported(i) {
    return i in window;
  }
  /**
   *
   * @param name 值名
   * @param value 值
   * @param expire 过期时间，单位小时
   */
  set(i, e, t = 30) {
    i = this.prefix + i;
    let s = {
      data: e,
      expire: (/* @__PURE__ */ new Date()).valueOf() + t * 60 * 60 * 1e3
    };
    this.supported(this.type) ? window[this.type].setItem(i, JSON.stringify(s)) : j.set(i, JSON.stringify(s), t);
  }
  get(i) {
    i = this.prefix + i;
    let e = { data: null }, t = "";
    this.supported(this.type) ? t = window[this.type].getItem(i) || "" : t = j.get(i) || "";
    try {
      e = JSON.parse(t);
    } catch {
      e = { data: null };
    }
    return e && e.data ? e && e.expire < (/* @__PURE__ */ new Date()).valueOf() ? null : e.data : null;
  }
  key(i) {
    if (this.supported(this.type))
      window[this.type].key(i);
    else
      return console.warn("key 方法在当前环境不被支持"), "";
  }
  clear(i) {
    i = this.prefix + i, this.supported(this.type) ? window[this.type].removeItem(i) : j.clear(i);
  }
}
const y = class y {
  constructor() {
    a(this, "_database");
    this.ready();
  }
  ready() {
    return new Promise((i, e) => {
      if (this._database)
        i(this);
      else {
        const t = window.indexedDB.open(y.DATABASE, 1);
        t.onsuccess = (s) => {
          var r;
          this._database = (r = s.target) == null ? void 0 : r.result, i(this);
        }, t.onupgradeneeded = (s) => {
          var o;
          const r = (o = s.target) == null ? void 0 : o.result;
          r.objectStoreNames.contains(y.TABLE) || r.createObjectStore(y.TABLE);
        }, t.onerror = (s) => {
          e(s);
        };
      }
    });
  }
  onReady(i, e) {
    return new Promise((t, s) => {
      const r = (n) => {
        e && e(!1, n), t(n);
      }, o = (n) => {
        e && e(n), s(n);
      };
      return this.ready().then(() => {
        i(r, o);
      }).catch(o);
    });
  }
  setItem(i, e, t) {
    return this.onReady((s, r) => {
      const o = this._database.transaction(y.TABLE, "readwrite").objectStore(y.TABLE).put(e, i);
      o.onsuccess = () => {
        s(e), t && t(!1, e);
      }, o.onerror = r;
    }, t);
  }
  getItem(i, e) {
    return this.onReady((t, s) => {
      const r = this._database.transaction(y.TABLE).objectStore(y.TABLE).get(i);
      r.onsuccess = () => t(r.result), r.onerror = s;
    }, e);
  }
  removeItem(i, e) {
    return this.onReady((t, s) => {
      const r = this._database.transaction(y.TABLE, "readwrite").objectStore(y.TABLE).delete(i);
      r.onsuccess = () => {
        t(i);
      }, r.onerror = s;
    }, e);
  }
  key(i, e) {
    return this.onReady((t, s) => {
      const r = this._database.transaction(y.TABLE).objectStore(y.TABLE).getAllKeys();
      r.onsuccess = () => t(r.result[i]), r.onerror = s;
    }, e);
  }
  keys(i) {
    return this.onReady((e, t) => {
      const s = this._database.transaction(y.TABLE).objectStore(y.TABLE).getAllKeys();
      s.onsuccess = () => e(s.result), s.onerror = t;
    }, i);
  }
  clear(i) {
    return this.onReady((e, t) => {
      const s = this._database.transaction(y.TABLE, "readwrite").objectStore(y.TABLE).clear();
      s.onsuccess = () => {
        e(null);
      }, s.onerror = t;
    }, i);
  }
};
/**
 * 数据库名称
 */
a(y, "DATABASE", "aupload"), /**
 * 表名
 */
a(y, "TABLE", "blob");
let V = y;
new V();
const U = new Me("localStorage"), O = window.localforage, $ = class $ extends I {
  constructor() {
    super();
    a(this, "_evtUploadHandler");
    a(this, "_cache", []);
    a(this, "_cachedFileSize", 0);
  }
  setup(e) {
    super.setup(e), this.initialize();
  }
  initialize() {
    this._evtUploadHandler = this.onUploadEvent.bind(this), O || console.warn(
      "当前环境未引入localforage包，离线上传功能将不可以用，如有需要请参考：https://localforage.docschina.org/ 引入umd 模块"
    ), [
      p.READY,
      p.APPEND,
      p.REMOVE,
      p.PROGRESS
    ].forEach((e) => {
      this.uploader.addEventListener(e, this._evtUploadHandler);
    });
  }
  async onUploadEvent(e) {
    const { task: t, chunk: s } = e.data || {};
    switch (e.type) {
      case p.READY:
        this._cache = U.get($.storeKey) || [];
        try {
          const r = await O.keys();
          for (let o of r) {
            let n = await O.getItem(o);
            if (n && n instanceof Blob) {
              const l = this._cache.find((h) => h.data.hash == o);
              l ? (this._cachedFileSize += n.size, l.data.file = new File([n], l.data.name)) : await O.removeItem(o);
            }
          }
        } catch {
        }
        this._cache.forEach((r) => {
          this.uploader.append(r.data, !1);
        });
        break;
      case p.APPEND:
        this.store(t);
        break;
      case p.REMOVE:
        if (t && t.hash) {
          this._cachedFileSize -= t.size ?? 0;
          const r = this._cache.findIndex((o) => o.data.hash == t.hash);
          if (r >= -1 && (this._cache.splice(r, 1), U.set($.storeKey, this._cache), O))
            try {
              O.removeItem(t.hash);
            } catch {
            }
        }
        break;
      case p.PROGRESS:
        ze(
          () => {
            this.store(t, !1);
          },
          5 * 1e3,
          this
        )();
        break;
    }
  }
  async store(e, t = !0) {
    const s = e.file, r = e.hash ?? "", o = this.uploader.option.cachedFileSize;
    if (s && s instanceof File && r) {
      if (o && o <= this._cachedFileSize + s.size) {
        console.warn("存储超标，请增大 option.cachedFileSize");
        return;
      }
      let n;
      if (t && (n = s.slice(0, s.size)), !this._cache.map((h) => h.data.hash).includes(r)) {
        let h = { ...e };
        h.file = "", this._cache.push({ hash: r, data: h }), this._cachedFileSize = +s.size;
      }
      if (U.set($.storeKey, this._cache), t && n) {
        const h = window.localforage;
        h && await h.setItem(r, n);
      }
    }
  }
};
a($, "pluginName", "storage"), a($, "storeKey", "aupload");
let G = $;
const Be = "1.0.1", je = {
  version: Be
}, De = {
  version: je.version
}, He = De.version, F = class F extends L {
  constructor(e = F.defaultConfig) {
    super();
    /**
     * 不允许的参数名
     */
    a(this, "_disallowedParams", [
      "name",
      "size",
      "hash",
      "chunk_index",
      "chunk_size",
      "file"
    ]);
    a(this, "_option");
    a(this, "_root");
    a(this, "_container", document.createElement("div"));
    a(this, "_id", se(10));
    a(this, "_tasks", []);
    a(this, "_plugins", []);
    /**
     * 中件间
     */
    a(this, "middleware", new D());
    this._option = Object.assign({}, { ...F.defaultConfig }, e), this._root = this.root, setTimeout(() => {
      this.initialize();
    });
  }
  verifyOption(e) {
    var r;
    if (!e.root)
      throw new Error(
        ` 上传组件未配置正确的父容器，请确认config.root: ${this.option.root}是否正确`
      );
    const t = this._disallowedParams, s = (r = e.config) == null ? void 0 : r.data;
    e.cachedFileSize && e.cachedFileSize <= -1 && console.warn("您取消了浏览器离线缓存限制(500MB)，小心浏览器被挤爆"), s && Object.keys(s).forEach((o) => {
      if (t.includes(o))
        throw new Error(
          `配置自定义请求参数 config.data.${o} 错误，${t.join(
            ","
          )} 为系统内置参数`
        );
    });
  }
  initialize() {
    const e = this.root;
    this.verifyOption(this._option), this._container.className = "aupload aupload_" + this.id, e && e.appendChild(this._container), this.middleware.context = this;
    const t = F;
    if (t) {
      const s = Object.keys(t);
      for (let r = 0; r < s.length; r++) {
        const o = s[r];
        if (["defaultConfig", "version"].includes(o))
          continue;
        const n = t[o];
        try {
          const l = new n();
          if (l.setup(this), !C.getInstance().has(l.pluginName))
            throw new Error(
              `插件：${name} 未安装，请在插件setup时重载super的方法`
            );
          this._plugins.push(l);
        } catch (l) {
          const h = n ? n.name : "unknow";
          console.warn(`插件：${h} 安装失败：Error:`, l);
        }
      }
    }
    this.dispatch(p.READY);
  }
  execMiddleware(e) {
    const t = this.middleware.get("onAppendFile");
    return new Promise(async (s, r) => {
      try {
        for (let o of t)
          await o(e, this);
      } catch (o) {
        r(o);
      }
      s(!0);
    });
  }
  append(e, t = !0) {
    const r = this.option.fileId ?? function(n) {
      return "";
    };
    (async () => {
      let n = e.hash, l = e.file;
      try {
        n || (n = await r(l), e.hash = n);
      } catch (h) {
        const d = "AUploadOption.fileId 执行出错：" + h;
        console.error(d), this.dispatch(
          new p(p.ERROR_APPEND, {
            task: e,
            error: h,
            message: d
          })
        );
        return;
      }
      try {
        await this.execMiddleware(e), this._tasks.push(e), this._exec();
      } catch (h) {
        console.error(h), this.dispatch(
          new p(p.ERROR_APPEND, { task: e, error: h })
        );
      }
    })();
  }
  async remove(e) {
    const t = e.hash;
    if (!t) {
      const o = new Error("移除失败，找不到hash");
      this.dispatch(new p(p.ERROR, { task: e, error: o }));
    }
    const s = this.findService();
    s && await s.remove(e);
    const r = this._tasks.findIndex((o) => o.hash == t);
    r && this._tasks.splice(r, 1), this.dispatch(new p(p.REMOVE, { task: e }));
  }
  /**
   * 暂停任务
   * @param task
   */
  async pause(e) {
    const t = this.findService();
    t && t.pause(e);
  }
  /**
   * 恢复/重试任务
   * @param task
   */
  async resume(e) {
    const t = this.findService();
    t && t.resume(e);
  }
  async upload(e) {
    Array.isArray(e) && (e.forEach((t) => {
      this.append(t);
    }), console.log("任务池：", this.tasks)), this._exec();
  }
  findService() {
    const e = this.plugins.filter((t) => t.type == "service");
    return e.length ? e[e.length - 1] : null;
  }
  async _exec() {
    this.tasks, console.log("开始上传:", this.tasks);
    const e = this.plugins.filter((t) => t.type == "service");
    if (e.length) {
      const t = e[e.length - 1], s = [];
      for (; this.tasks.length; ) {
        const r = this.tasks.shift();
        r && s.push(r);
      }
      if (t) {
        t.addEventListener("complete", () => {
        });
        const r = t.exec;
        if (r)
          if (r && typeof r.then == "function")
            await (t && t.exec && t.exec(s));
          else
            try {
              await (t && t.exec && t.exec(s));
            } catch (o) {
              this.dispatch("error", o), console.error(o);
            }
      }
    }
  }
  getRoot() {
    if (typeof this.option.root == "string") {
      const e = document.querySelector(this.option.root);
      if (e)
        return e;
    } else
      return this.option.root;
    return null;
  }
  /**
   * 销毁
   */
  destroy() {
    var e;
    this.plugins.forEach((t) => {
      try {
        t.destroy();
      } catch {
      }
    }), this._plugins = [];
    try {
      (e = this._container.parentNode) == null || e.removeChild(this._container);
    } catch {
    }
    this._tasks = [];
  }
  get tasks() {
    return this._tasks;
  }
  /**
   * 当前组件的唯一标识
   */
  get id() {
    return this._id;
  }
  get root() {
    return this._root ? this._root : this.getRoot();
  }
  /**
   * 当前组件的父容器
   */
  get container() {
    return this._container;
  }
  /**
   * 返回可用的插件列表
   */
  get plugins() {
    return this._plugins;
  }
  get option() {
    return this._option;
  }
  set option(e) {
    throw new Error(" option is readonly");
  }
  toString() {
    return `aupload ${T.version}`;
  }
};
a(F, "version", He), a(F, "defaultConfig", {
  url: "http://localhost:8081/upload",
  root: "body",
  config: {
    headers: {},
    data: { a: 2 }
  },
  //allowedMimeType:['image/*'],
  multiple: !0,
  chunkSize: 1024 * 1024,
  worker: !1,
  cachedFileSize: 400 * 1024 * 1024,
  start: (e, t) => {
    var l;
    const s = t.option, r = ((l = s.config) == null ? void 0 : l.data) ?? {};
    let o = s.url ?? "", n = [];
    if (s.chunkSize && s.chunkSize > -1 && (n.push("name=" + e.name), n.push("size=" + e.size), n.push("chunk_size=" + s.chunkSize)), r)
      for (let h in r)
        n.push(`${h}=${r[h]}`);
    return n.length && (o += o.indexOf("?") == -1 ? `?${n.join("&")}` : `&${n.join("&")}`), new Promise(async (h) => {
      var f;
      let d = "";
      try {
        const u = s == null ? void 0 : s.fileId;
        u && (d = await u(e));
      } catch (u) {
        const m = "AUploadOption.fileId 执行出错：" + u;
        t.dispatch(new p(p.ERROR, { error: m }));
      }
      d && (o += "&hash=" + d);
      try {
        await ie({
          method: "POST",
          url: o ?? "",
          headers: ((f = s.config) == null ? void 0 : f.headers) ?? {}
        });
      } catch {
      }
      h({
        file: e,
        chunk_index: 10,
        name: e.name
      });
    });
  },
  fileId: (e) => new Te().fileSha256(e, 1 * 1024 * 1024)
});
let Y = F;
const T = Y;
T.View = ne;
T.Message = K;
T.Service = q;
T.Storage = G;
const A = class A extends I {
  constructor() {
    super();
    a(this, "_client");
    this.type = "service";
  }
  setup(e) {
    super.setup(e);
  }
  async exec(e) {
    const t = await Oe("https://gosspublic.alicdn.com/aliyun-oss-sdk-6.16.0.min.js", "OSS");
    console.log(t), this._client || (this._client = new t(A.config));
    for (let s of e)
      await this._client.put(s.name, s.file, {});
    throw new Error("还在Coding, 不能干活");
  }
  destroy() {
    super.destroy();
  }
};
a(A, "pluginName", "alioss"), a(A, "config", { region: "yourRegion", accessKeyId: "", accessKeySecret: "", stsToken: "", bucket: "填写Bucket名称，例如examplebucket。" });
let ee = A;
globalThis.AUpload = T;
export {
  T as AUpload,
  ee as PluginsAliOSS,
  T as default
};
