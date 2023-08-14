import service from "@/utils/request";
import Error from "../http/TimeError";
import qs from "qs"

/*APi  接口函数区 */

/*
用户登录接口
*/
export function userLogin(data) {
    return service({
        url: "/user/login", // 这个地址是去掉公共地址剩下的地址
        method: "POST", // 请求方式 支持多种方式  get post put delete 等等
        data:data //发送请求要配置的参数 无参数的情况下也可以不写
    }).catch((err)=>{
        Error(err)//请求超时处理  错误处理
    });
    
}
//验证码获取
export function getUserCode(data){
    return service({
        url: "/user/yz", 
        method: "POST",
        data:data
    }).catch((err)=>{
        Error(err)
    });
    
}

//token校验
export function rulseToken(token){
    return service({
        url: "/user/token",
        headers:{
            token:token
        },
        method: "GET",
    }).catch((err)=>{
        Error(err)
    })
}