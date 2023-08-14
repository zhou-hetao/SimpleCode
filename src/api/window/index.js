///user/window
import service from "@/utils/request";
import Error from "../http/TimeError";
//获取电脑磁盘信息
export function getWindowInit(data) {
    return service({
        url: "/user/window", // 这个地址是去掉公共地址剩下的地址
        method: "POST", // 请求方式 支持多种方式  get post put delete 等等
        data:data //发送请求要配置的参数 无参数的情况下也可以不写
    }).catch((err)=>{
        Error(err)//请求超时处理  错误处理
    });
    
}