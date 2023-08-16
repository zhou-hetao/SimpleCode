import axios from "axios"; //引入axios
import { Message } from "element-ui";
console.log("process.env", process.env);
console.log('process.env.VUE_APP_BASE_URL + "/api",',process.env.VUE_APP_BASE_URL + "/api",);
// 创建axios实例
const service = axios.create({
  //这里拿开发接口测试
  baseURL: process.env.VUE_APP_BASE_URL + "/api",
  headers: {
    "Content-type": "application/x-www-form-urlencoded",
  }, //设置指定请求头
  timeout: 5000, //超时时间
});
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    //验证token
    // console.log("请求的数据:", config);
    // if (localStorage.getItem('token')) {
    //   config.headers.token = localStorage.getItem('token')
    // }
    // 在请求头中添加token验证信息
    const token = localStorage.getItem("token"); // 假设token存储在localStorage中
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    // console.log("请求的数据:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // console.log("返回的数据", response);
    // 这里拦截401错误，并重新跳入登页重新获取token
    if (response.status && response.status === 200) {
      // 通讯成功
      //   if (response.data.code === 401) {
      //     // 如果是token过期，跳转至登录
      //     Message.error("登陆过期重新登陆")
      //     localStorage.removeItem('token') // 移除token，跳转至登录
      //     router.push({
      //       path: '/login'
      //     })
      //   }
      return Promise.resolve(response.data);
    }
  },
  (err) => {
    // 对响应错误做点什么.
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = "请求错误";
          Message.error(err.message);

          break;
        case 401:
          err.message = "未授权，请登录";
        
          Message.error(err.message);
          break;
        case 403:
          err.message = "拒绝访问";
          Message.error(err.message);
          break;
        case 404:
          err.message = `服务器出错:`;
          Message.error(err.message);
          break;
        case 408:
          err.message = "请求超时";
          Message.error(err.message);
          break;
        case 500:
          err.message = "服务器内部错误";
          Message.error(err.message);
          break;
        case 501:
          err.message = "服务未实现";
          Message.error(err.message);
          break;
        case 502:
          err.message = "网关错误";
          Message.error(err.message);
          break;
        case 503:
          err.message = "服务不可用";
          Message.error(err.message);
          break;
        case 504:
          err.message = "网关超时";
          Message.error(err.message);
          break;
        case 505:
          err.message = "HTTP版本不受支持";
          Message.error(err.message);
          break;
        case 0:
          err.message = "接口不存在";
          console.log("111");
          Message.error(err.message);
          break;
        default:
      }
    }
    return Promise.reject(err); // 返回接口返回的错误信息
  }
);
export default service;
