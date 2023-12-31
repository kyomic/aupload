//官方参考：
//https://blog.csdn.net/m0_38082783/article/details/72676491

export type ArtTemplateCompileOption = {
  openTag?: string;
  closeTag?: string;
  filename?: string;
  escape?: boolean;
  compress?: boolean;
  debug?: boolean;
  // 语法转换插件钩子，"<%"、"%>"间内部值预处理，拼接if、each、print、include、echo语句等，参见compiler模块
  parser?: (code: string, options: ArtTemplateCompileOption) => string;
  cache?: boolean;
};

// 字符串转义
function stringify(code: string) {
  return (
    "'" +
    code
      // 单引号与反斜杠转义
      .replace(/('|\\)/g, "\\$1")
      // 换行符转义(windows + linux)
      .replace(/\r/g, "\\r")
      .replace(/\n/g, "\\n") +
    "'"
  );
}
// 静态分析模板变量
let KEYWORDS =
  // 关键字
  "break,case,catch,continue,debugger,default,delete,do,else,false" +
  ",finally,for,function,if,in,instanceof,new,null,return,switch,this" +
  ",throw,true,try,typeof,var,void,while,with" +
  // 保留字
  ",abstract,boolean,byte,char,class,const,double,enum,export,extends" +
  ",final,float,goto,implements,import,int,interface,long,native" +
  ",package,private,protected,public,short,static,super,synchronized" +
  ",throws,transient,volatile" +
  // ECMA 5 - use strict
  ",arguments,let,yield" +
  ",undefined";

// 滤除多行注释、单行注释、单双引号包裹字符串、点号+空格后的字符串
let REMOVE_RE = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g;
// 滤除变量，如{{if admin}}中的admin
let SPLIT_RE = /[^\w$]+/g;
// 滤除js关键字
let KEYWORDS_RE = new RegExp(["\\b" + KEYWORDS.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g");
// 滤除数字
let NUMBER_RE = /^\d[^,]*|,\d[^,]*/g;
// 滤除起始、结尾的多个逗号
let BOUNDARY_RE = /^,+|,+$/g;
// 以$或,分割
let SPLIT2_RE = /^$|,+/;
let getVariable = function (code: string) {
  return code.replace(REMOVE_RE, "").replace(SPLIT_RE, ",").replace(KEYWORDS_RE, "").replace(NUMBER_RE, "").replace(BOUNDARY_RE, "").split(SPLIT2_RE);
};
let toString = function (value: any, type: string = "") {
  if (typeof value !== "string") {
    type = typeof value;
    if (type === "number") {
      value += "";
    } else if (type === "function") {
      value = toString(value.call(value));
    } else {
      value = "";
    }
  }

  return value;
};
let filtered = function (js: string, filter: string) {
  let parts = filter.split(":");
  let name = parts.shift();
  let args = parts.join(":") || "";

  if (args) {
    args = ", " + args;
  }

  return "$helpers." + name + "(" + js + args + ")";
};
let escapeMap: Dict = {
  "<": "&#60;",
  ">": "&#62;",
  '"': "&#34;",
  "'": "&#39;",
  "&": "&#38;",
};

let escapeFn = function (s: string) {
  return escapeMap[s];
};

let escapeHTML = function (content: string) {
  return toString(content).replace(/&(?![\w#]+;)|[<>"']/g, escapeFn);
};

let isArray =
  Array.isArray ||
  function (obj) {
    return {}.toString.call(obj) === "[object Array]";
  };

  let each = function (data: any, callback: (...args )=>any) {
    let i, len;
  if (isArray(data)) {
    for (i = 0, len = data.length; i < len; i++) {
      callback.call(data, data[i], i, data);
    }
  } else {
    for (i in data) {
      callback.call(data, data[i], i);
    }
  }
};
let forEach = each;
type Dict = {
  [key: string]: any;
};
let cacheStore: Dict = {};
// uniq记录定义编译函数体内已定义的方法名或属性名，防止重复定义
let UniqFunc = { $data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1 };

export class ArtTemplateRender {
  constructor() {}
  render(data: string, opt: ArtTemplateCompileOption):any {
    return ArtTemplate.compiler(data, opt);
  }
}
export class ArtTemplate {
  static default: ArtTemplateCompileOption = {
    openTag: "{{",
    closeTag: "}}",
    escape: true, // 是否编码输出变量的 HTML 字符
    cache: true, // 是否开启缓存（依赖 options 的 filename 字段）
    compress: false, // 是否压缩输出
    parser: (code, option) => {
      // var match = code.match(/([\w\$]*)(\b.*)/); // \b单词边界符
      // var key = match[1];
      // var args = match[2];
      // var split = args.split(' ');
      // split.shift();
      code = code.replace(/^\s/, ""); // 滤除起始的空格

      let split = code.split(" ") as any;
      let key = split.shift();
      let args = split.join(" ");

      switch (key) {
        // 拼接if语句
        case "if":
          code = "if(" + args + "){";
          break;
        case "else":
          if (split.shift() === "if") {
            split = " if(" + split.join(" ") + ")";
          } else {
            split = "";
          }

          code = "}else" + split + "{";
          break;
        case "/if":
          code = "}";
          break;

        // 拼接each语句
        case "each":
          let object = split[0] || "$data";
          let as = split[1] || "as";
          let value = split[2] || "$value";
          let index = split[3] || "$index";

          let param = value + "," + index;

          if (as !== "as") {
            object = "[]";
          }

          code = "$each(" + object + ",function(" + param + "){";
          break;
        case "/each":
          code = "});";
          break;

        // 拼接print语句
        case "echo":
          code = "print(" + args + ");";
          break;

        // 拼接print、include语句
        case "print":
        case "include":
          code = key + "(" + split.join(",") + ");";
          break;

        default:
          // 过滤器（辅助方法），value为待过滤的变量，filterA为helpers下方法名，'abcd'为filterA参数
          // {{value | filterA:'abcd' | filterB}}
          // >>> $helpers.filterB($helpers.filterA(value, 'abcd'))
          // TODO: {{ddd||aaa}} 不包含空格
          if (/^\s*\|\s*[\w\$]/.test(args)) {
            let escape = true;

            // {{#value | link}}
            if (code.indexOf("#") === 0) {
              code = code.substr(1);
              escape = false;
            }

            let i = 0;
            let array = code.split("|");
            let len = array.length;
            let val = array[i++];

            for (; i < len; i++) {
              val = filtered(val, array[i]);
            }

            code = (escape ? "=" : "=#") + val;

            // 即将弃用 {{helperName value}}
          } else if (ArtTemplate.helpers[key]) {
            code = "=#" + key + "(" + split.join(",") + ");";

            // 内容直接输出 {{value}}
          } else {
            code = "=" + code;
          }
          break;
      }

      return code;
    },
  };
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
  static compile(source: string, opt?: ArtTemplateCompileOption): any {
    // 合并默认配置
    let options = opt || Object.assign({}, ArtTemplate.default);
    options = Object.assign(options, ArtTemplate.default);
    let filename = options.filename;
    let RenderInstance = new ArtTemplateRender();
    let RenderFunc: any;

    try {
      RenderFunc = RenderInstance.render(source, options);
    } catch (e: any) {
      e.filename = filename || "anonymous";
      e.name = "Syntax Error";

      return ArtTemplate.showDebugInfo(e);
    }
    // 对编译结果进行一次包装
    function render(data: any) {
      try {
        return new RenderFunc(data, filename) + "";
      } catch (e) {
        // 运行时出错后自动开启调试模式重新编译

        if (!options.debug) {
          options.debug = true;
          return ArtTemplate.compile(source, options)(data);
        }
        return ArtTemplate.showDebugInfo(e)();
      }
    }
    render.prototype = RenderFunc.prototype;
    render.toString = function () {
      return RenderFunc.toString();
    };
    if (filename && options.cache) {
      // 缓存模板字符串解析函数
      cacheStore[filename] = render;
    }
    return render;
  }

  static utils = {
    $helpers: {},
    $include: ArtTemplate.renderFile,
    $string: toString,
    $escape: escapeHTML,
    $each: each,
  };

  static helpers: Dict = {};
  /**
   * 渲染模板(根据模板名)
   * @name    template.render
   * @param   {String}    模板名，页面元素id
   * @param   {Object}    数据，data传入为空时，返回结果为编译函数
   * @return  {String}    渲染好的字符串
   */
  static renderFile(filename: string, data: any) {
    let fn =
      ArtTemplate.get(filename) ||
      ArtTemplate.showDebugInfo({
        filename: filename,
        name: "Render Error",
        message: "Template not found",
      });
    return data ? fn(data) : fn;
  }

  /**
   * 获取编译缓存（可由外部重写此方法）
   * @param   {String}    模板名
   * @param   {Function}  编译好的函数
   */
  static get(filename: string) {
    let cache;
    if (cacheStore[filename]) {
      // 获取使用内存缓存的编译函数
      cache = cacheStore[filename];
    } else if (typeof document === "object") {
      // 通过模板名获取模板字符串，编译，并返回编译函数
      let elem = document.getElementById(filename) as any;

      if (elem) {
        let source = (elem.value || elem.innerHTML).replace(/^\s*|\s*$/g, "");
        cache = ArtTemplate.compile(source, {
          filename: filename,
        });
      }
    }

    return cache;
  }

  static compiler(source: string, options: ArtTemplateCompileOption) {
    let debug = options.debug; // 是否开启调试模式编译模板字符串
    let openTag = options.openTag || "{{"; // 逻辑语法开始标签 "{{"
    let closeTag = options.closeTag || "}}"; // 逻辑语法闭合标签 "}}"
    let parser = options.parser; // 语法转换插件钩子，默认的钩子为拼接if、each、echo等语句
    let compress = options.compress; // 是否压缩多余空白和注释
    let escape = options.escape; // html字符串转义，编码: <%=value%> 不编码:<%=#value%>

    let line = 1;

    // uniq记录定义编译函数体内已定义的方法名或属性名，防止重复定义
    //let uniq = { $data: 1, $filename: 1, $utils: 1, $helpers: 1, $out: 1, $line: 1 };

    // 提取模板中的方法名，在headerCode中注入该方法的内容，拼接的函数体内就可以通过方法名调用
    let utils = ArtTemplate.utils as any;
    let uniq = {...UniqFunc} as any;
    let helpers = ArtTemplate.helpers as any;

    let isNewEngine = Boolean("".trim); // '__proto__' in {}
    let replaces = isNewEngine ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"];

    let concat = isNewEngine ? "$out+=text;return $out;" : "$out.push(text);";

    let print = "function(){" + "var text=''.concat.apply('',arguments);" + concat + "}";

    let include = "function(filename,data){" + "data=data||$data;" + "var text=$utils.$include(filename,data,$filename);" + concat + "}";

    let headerCode = "'use strict';" + "var $utils=this,$helpers=$utils.$helpers," + (debug ? "$line=0," : "");

    let mainCode = replaces[0];

    let footerCode = "return new String(" + replaces[3] + ");";

    // html与逻辑语法分离

    source.split(openTag).forEach((c) => {
      let code1 = c.split(closeTag);
      let $0 = code1[0];
      let $1 = code1[1];

      // code: [html] 以openTag起始，无closeTag闭合，处理成html字符串形式
      if (code1.length === 1) {
        mainCode += html($0);
        // code: [logic, html] 以openTag起始，有closeTag闭合，处理成logic+html字符串形式
      } else {
        mainCode += logic($0);
        if ($1) {
          mainCode += html($1);
        }
      }
    });

    
    
    // 处理 HTML 语句
    function html(code: string) {
      // 记录行号，调试模式下输出处理失败的行号
      line += code.split(/\n/).length - 1;

      // 压缩多余空白与注释
      if (compress) {
        code = code.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "");
      }

      if (code) {
        code = replaces[1] + stringify(code) + replaces[2] + "\n";
      }

      return code;
    }

    // 处理逻辑语句
    function logic(code: string) {
      let thisLine = line;

      if (parser) {
        // 语法转换插件钩子，默认的钩子为拼接if、each、echo等语句
        code = parser(code, options);
      } else if (debug) {
        // 记录行号
        code = code.replace(/\n/g, function () {
          line++;
          return "$line=" + line + ";";
        });
      }

      // 输出语句. 编码: <%=value%> 不编码:<%=#value%>
      // <%=#value%> 等同 v2.0.3 之前的 <%==value%>
      if (code.indexOf("=") === 0) {
        let escapeSyntax = escape && !/^=[=#]/.test(code);

        code = code.replace(/^=[=#]?|[\s;]*$/g, "");

        // 对内容编码
        if (escapeSyntax) {
          let name = code.replace(/\s*[^]+\)/, "");

          // 排除 utils.* | include | print，当name值为utils中内部方法或print、include
          // headerCode中，this关键字指向$utils，$escape可直接调用，对html中'、"、<、>、&进行转义
          if (!utils[name] && !/^(include|print)$/.test(name)) {
            code = "$escape(" + code + ")";
          }

          // 不编码
        } else {
          code = "$string(" + code + ")";
        }

        code = replaces[1] + code + replaces[2];
      }

      if (debug) {
        code = "$line=" + thisLine + ";" + code;
      }

      forEach(getVariable(code), function (name: string) {
        // name 值可能为空，在安卓低版本浏览器下
        if (!name || uniq[name]) {
          return;
        }

        let value;

        // 声明模板变量
        // 赋值优先级:
        // [include, print] > utils > helpers > data
        if (name === "print") {
          value = print;
        } else if (name === "include") {
          value = include;
        } else if (utils[name]) {
          value = "$utils." + name;
        } else if (helpers[name]) {
          value = "$helpers." + name;
        } else {
          value = "$data." + name;
        }

        headerCode += name + "=" + value + ",";
        uniq[name] = true;
      });
      return code + "\n";
    }
    let code = headerCode + mainCode + footerCode;

    // 调试语句，试用try-catch方法捕获错误，报错
    if (debug) {
      code =
        "try{" +
        code +
        "}catch(e){" +
        "throw {" +
        "filename:$filename," +
        "name:'Render Error'," +
        "message:e.message," +
        "line:$line," +
        "source:" +
        stringify(source) +
        ".split(/\\n/)[$line-1].replace(/^\\s+/,'')" +
        "};" +
        "}";
    }

    //console.log('code===',code)
    try {
      // code用于拼接字符串构建函数
      let Render = new Function("$data", "$filename", code);
      Render.prototype = {...utils}
      return Render;
    } catch (e: any) {
      e.temp = "function anonymous($data,$filename) {" + code + "}";
      throw e;
    }

  }
  /**
   * 模板错误事件（可由外部重写此方法），触发console.error提示错误信息
   * @name    template.onerror
   * @event
   */
  static onerror(err: any) {
    let message = "Template Error\n\n";
    for (let name in err) {
      message += "<" + name + ">\n" + err[name] + "\n\n";
    }

    if (typeof console === "object") {
      console.error(message);
    }
  }
  static showDebugInfo = function (err: any) {
    ArtTemplate.onerror(err);

    return function () {
      return "{Template Error}";
    };
  };
}
