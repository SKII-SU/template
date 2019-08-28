import axios from "axios";
import cookie from "./cookie";
import qs from "qs";
import { Toast } from "vant";
import { LOCAL_PATH } from "@assets/utils/serverInterface.js";

const isWeixin = () => {
  var ua = navigator.userAgent.toLowerCase();
  return ua.match(/micromessenger/i);
};

const CancelToken = axios.CancelToken;
axios.defaults.timeout = 120000;

axios.defaults.timeout = 120000;

export default {
  cancel: {},
  isWechat: isWeixin,
  _checkStatus(status) {
    if (status === 401 && !isWeixin()) {
      cookie.clearCookie();
      cookie.delCookie("token");
      Toast("请登录");
      window.location.href = LOCAL_PATH; /* 未登录跳转登陆 */
      return;
    }
    return this;
  },

  _checkParams(params) {
    if (!params || !params.url) {
      throw new Error("request'url is missed!");
    }
    return this;
  },

  _getHeaders(header) {
    let headers = {};
    const userToken = cookie.getCookie("token");
    if (userToken) {
      headers["token"] = userToken;
    }

    if (header) {
      for (let key in header) {
        headers[key] = header[key];
      }
    }

    return headers;
  },

  _defaultParamsCallback(response, params) {
    response
      .then(function(res) {
        let data = res.data;

        if (data && data.err) {
          console && console.error(data.err);
        }
        if (data.message && data.message.length > 200) {
          console && console.error(data.message);
          data.message = "操作异常，请稍后重试";
        }
        params.done && params.done(res.data);
      })
      .catch(function(err) {
        if (!err) {
          params.fail && params.fail("can not catch error!");
        } else {
          if (err.response) {
            if (err.response.status === 401) {
              params.fail && params.fail(err);
              Toast("数据加载失败");
            }
            params.fail && params.fail(err);
          } else if (err.message) {
            params.fail && params.fail(err);
          }
        }
      });
    return response;
  },

  _request({ url, method, params = {}, data = {}, baseURL, header }) {
    const headers = this._getHeaders(header);

    return axios.request({
      method,
      baseURL,
      url,
      params,
      data,
      headers,
      cancelToken: new CancelToken(c => {
        // 强行中断请求要用到的
        this.cancel = c;
      }),
      validateStatus: status => {
        this._checkStatus(status);
        return (
          status >= 200 && status <= 500 && status !== 404 && status !== 401
        );
      }
    });
  },

  post(params) {
    const res = this._checkParams(params)._request({
      method: "post",
      url: params.url,
      data: qs.stringify(params.data),
      header: params.header,
      baseURL: ""
    });
    return this._defaultParamsCallback(res, params);
  },

  get(params) {
    const res = this._checkParams(params)._request({
      method: "get",
      url: params.url,
      params: params.data,
      header: params.header,
      baseURL: ""
    });

    return this._defaultParamsCallback(res, params);
  },

  checkLogin() {
    return !cookie.getCookie("token") && this._checkStatus(401);
  }
};
