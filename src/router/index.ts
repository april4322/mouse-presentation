import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { isAdmin } from '@/utils'
import UserStore from '@/stores/user'

import AdminIndex from '@/views/admin/index.vue'
import AdminLogin from '@/views/admin/login.vue'
import AdminScreen from '@/views/admin/screen.vue'
import Setting from '@/views/admin/setting.vue'
import MessageHistory from '@/views/admin/history.vue'
import LoginUsers from '@/views/admin/users.vue'

import UserLogin from '@/views/user/login.vue'
import UserForm from '@/views/user/form.vue'


Vue.use(VueRouter)

// 優先度は上から順
const routes: Array<RouteConfig> = [
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLogin
  },
  {
    path: '/admin/index',
    name: 'admin-index',
    component: AdminIndex,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/screen',
    name: 'admin-screen',
    component: AdminScreen,
  },
  {
    path: '/admin/setting',
    name: 'setting',
    component: Setting,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/history',
    name: 'message-history',
    component: MessageHistory,
    meta: { requiresAuth: true }
  },
  {
    path: '/admin/users',
    name: 'login-users',
    component: LoginUsers,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'user-login',
    component: UserLogin,
  },
  {
    path: '/',
    name: 'user-form',
    component: UserForm,
    meta: { requiresAuth: true }
  },
  {
    // admin default routing
    path: '/admin*',
    redirect: "/admin/login"
  },
  {
    // user default routing
    path: '/*',
    redirect: "/login"
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    // 管理者
    if(/admin/i.test(window.location.pathname)){
      isAdmin().then(result => {
        if(result){
          next()
        }
        // 管理者でない場合
        else {
          next('/admin/login')
        }
      })  
    }
    // ユーザー
    else {
      if(UserStore.state.userId){
        next()
      } else {
        next('/user/login')
      }
    }
  } else {
    next()
    // // 管理者
    // if(/admin/i.test(window.location.pathname)){
    //   isAdmin().then(result => {
    //     // ログイン済みなのでログイン画面を開いてもindexへ戻る
    //     if(result){
    //       next('/admin/index')
    //     } else {
    //       next()
    //     }
    //   })
    // } else {
    //   next()
    // }
  }
})

export default router
