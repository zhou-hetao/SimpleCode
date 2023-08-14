import { userLogin } from '@/api/user'
import { Message } from 'element-ui'
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user:localStorage.getItem('username'),
        token: localStorage.getItem('token'),
        navList:JSON.parse(localStorage.getItem('navList'))//左侧导航栏数据
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setuser(state,user){
            state.user = user
        },
        setNavList(state,navList){
            state.navList = navList
        }
    },
    actions: {
        login({ commit }, data) {
           return new Promise((resolve,reject)=>{
            userLogin({username:data.username,password:data.password,phone:data.phone}).then((res) => {
                console.log('登录',res);
                if (res.code == 200) {
                    const token = res.data.token
                    const user = res.data.user
                    const navList =  res.data.navList
                    commit('setToken', token)
                    commit('setuser',user)
                    commit('setNavList',navList)
                    localStorage.setItem('token', token)
                    localStorage.setItem('username', user)
                    localStorage.setItem('navList', JSON.stringify(navList))
                    router.push('/Worktable').catch(() => {})
                    resolve();
                }else{
                    Message({
                        message: '登陆失败  稍后重试',
                        type: "error",
                        duration: 3000,
                    })
                }
            })
            .catch(error=>{
                Message({
                    message: '系统错误',
                    type: "error",
                    duration: 3000,
                })
                reject(error)
            })
           })

        }
    }
})

export default store