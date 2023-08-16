import Vue from 'vue'
import VueRouter from 'vue-router'
import Guardsman from './beforeEach'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    alias: '/login',
    meta: {
      title:"登录页",
      requiresAuth: false, // 需要登录才能访问
      // roles: ['admin'] // 只有管理员角色可以访问
    },
    component: () => import("@/views/Login/Login.vue")
  },
  {
    path: '/Worktable',
    name: 'Work table',
    meta: {
      title:"首页",
      requiresAuth: false, // 需要登录才能访问
      // roles: ['admin'] // 只有管理员角色可以访问
    },
    component: () => import("@/views/Home/Home.vue"),
    children:[
      {
        path:"/",
        meta: {
          title:"工作台",
          requiresAuth: false, // 需要登录才能访问
          // roles: ['admin'] // 只有管理员角色可以访问
        },
        component: () => import("@/views/subpages/Others/index.vue"),
      },
      {
        path:"gantt",
        meta: {
          title:"甘特图",
          requiresAuth: false, // 需要登录才能访问
          // roles: ['admin'] // 只有管理员角色可以访问
        },
        component: () => import("@/views/subpages/Ganttchart/index.vue"),
      },
      {
        path:"echarts",
        meta: {
          title:"echarts",
          requiresAuth: false, // 需要登录才能访问
          // roles: ['admin'] // 只有管理员角色可以访问
        },
        component: () => import("@/views/subpages/echarts/index.vue"),
      },
      {
        path:"echarts3d",
        meta: {
          title:"echarts3D",
          requiresAuth: false, // 需要登录才能访问
          // roles: ['admin'] // 只有管理员角色可以访问
        },
        component: () => import("@/views/subpages/echarts/echarts3d.vue"),
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title:"404",
      requiresAuth: false, // 需要登录才能访问
      // roles: ['admin'] // 只有管理员角色可以访问
    },
    component: () => import("@/views/Error/404.vue")
  },
]


const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
// 将新的路由配置添加到路由中
// const finalRoutes = routes.concat()
//动态添加路由

// router.addRoute(finalRoutes)
router.beforeEach((to, from, next) => {
  Guardsman(to, from, next)
})
export default router
