import { NODE_ENV } from "@assets/config/config";
let host = window.location.host;
let severlocaction = ""; // 接口地址
let LOCAL_PATH = host; // 域名

if (host == "www.bscyunhe.com") {
  /* 正式  */
  severlocaction = "https://test-cloudboxapi-k8s.bscyunhe.com";
} else if (host == "test-cloudbox-h5-k8s.bscyunhe.com") {
  /* 测试  */
  severlocaction = "https://test-cloudboxapi-k8s.bscyunhe.com";
} else {
  // severlocaction = "http://10.20.29.57:10034";
  severlocaction = "https://test-cloudboxapi-k8s.bscyunhe.com";
}
export { severlocaction, LOCAL_PATH };
