'use strict'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject)
  }
  return originalReplace.call(this, location).catch(err => err)
}

// 路由组件
const InterviewSituation = () => import('@/pages/interview-situation')
const InformationStatistics = () => import('@/pages/information-statistics')

// 静态路由
const staticRoutes = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/pages/HelloWorld')
  },
  {
    path: '/interview-situation',
    name: 'InterviewSituation',
    component: InterviewSituation
  },
  {
    path: '/information-statistics',
    name: 'InformationStatistics',
    component: InformationStatistics
  }
]

const router = new VueRouter({
  routes: staticRoutes
})

export default router
