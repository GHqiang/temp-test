'use strict';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push,
  originalReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch(err => err);
};
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject);
  }
  return originalReplace.call(this, location).catch(err => err);
};


const routerComp = () => {
    return {
      render () {
        return <router-view></router-view>;
      }
    };
  },
  // 静态路由
  staticRoutes = [
    {
      path: '/',
      name: 'index',
      component: () => import('@/pages/HelloWorld'),
      children: [
        {
          path: '/v1',
          name: 'v1',
          component: routerComp(),
          children:[
            {
              path: '*',
              name: '404',
              component: () => import('@/pages/404')
            }
          ]
        }
        ]
    }
  ],
  router = new VueRouter({
    routes: staticRoutes
  });

export default router;
