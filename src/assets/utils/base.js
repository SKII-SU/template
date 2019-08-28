import date from "./date";
import Cookie from "./cookie";
import storage from "./storage";
import request from "./request";

export default {
  install(Vue) {
    // 全局注册date方法
    for (let i in date) {
      Vue.prototype["$" + i] = date[i];
    }
    // 全局注册cookie方法
    for (let i in Cookie) {
      Vue.prototype["$" + i] = Cookie[i];
    }
    // 全局注册localStorage方法
    for (let i in storage) {
      Vue.prototype["$" + i] = storage[i];
    }
    // 全局注册request 方法
    Vue.prototype["$request"] = request;
  }
};
