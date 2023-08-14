import { Message } from "element-ui"

/*  请求超时处理 */
const Error = function(err){
    if(err.code === 'ECONNABORTED' || err.message ===   "Network Error" ||  err.message.includes("timeout")){  
        Message({
          message: '请求超时，请稍后刷新重试',
          type: "error",
          duration: 3000,
        })
      }else{
        Message({
          message: '系统错误,请稍后重试',
          type: "error",
          duration: 3000,
        })
      }
}

export default Error