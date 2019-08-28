// 判断是否是微信浏览器的函数
const isWeiXin = function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (
    ua.match(/MicroMessenger/i) == "micromessenger" &&
    ua.match(/wxwork/i) != "wxwork"
  ) {
    return true;
  } else {
    return false;
  }
};
export default isWeiXin;
