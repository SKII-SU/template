const doc = document;

const cookie = {
  // 写cookies
  setCookie: function setCookie(name, value, expiredays) {
    var exdate = new Date(expiredays);
    var expires = isNaN(exdate) ? "" : ";expires=" + exdate.toGMTString();
    doc.cookie = name + "=" + value + expires;
  },

  // 读取cookies
  getCookie: function getCookie(name) {
    var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    var arr = doc.cookie.match(reg);
    if (arr) {
      return decodeURIComponent(arr[2]);
    } else {
      return "";
    }
  },

  // 删除cookies
  delCookie: function delCookie(name) {
    var exp = new Date();
    var cval = " ";

    exp.setTime(exp.getTime() - 100);
    doc.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },

  clearCookie: function clearCookie() {
    var keys = doc.cookie.split(";");
    if (keys) {
      for (let i = keys.length; i--; ) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 100);
        doc.cookie =
          keys[i].split("=")[0] + '=" ";expires=' + exp.toGMTString();
      }
    }
  }
};

export default cookie;
