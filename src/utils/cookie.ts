const cookie = {
  set: (name, value, days = 30) => {
    let exp: any = new Date()
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie =
      name +
      '=' +
      escape(value) +
      ';expires=' +
      exp.toGMTString() +
      ';SameSite=None; Secure'
  },
  get: name => {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr: any = document.cookie.match(reg)
    if (arr && arr.length) {
      return unescape(arr[2])
    } else {
      return null
    }
  },
  clear: name => {
    let exp: any = new Date()
    exp.setTime(exp.getTime() - 1)
    let cval = cookie.get(name)
    if (cval) {
      document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
    }
  },
}

export default cookie
