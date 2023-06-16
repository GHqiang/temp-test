'use strict';
import auth from '@/utils/auth';
import router from '@/router';
import authAxios from 'hzwq-auth-axios';
import { Message } from 'element-ui';

// create an axios instance
export const service = authAxios.create({
  resIntercept: {
    /**
     * 请求数据加载超时时间，默认8000
     */
    requestTimeout: 8000,
    /**
     * 开启自动刷新token，默认false禁用、 true开启
     */
    autoRefreshToken: true,
    /**
     * 提示信息函数
     */
    showPromptMessage(msg) {
      Message({
        message: msg,
        type: 'error',
        showClose: true,
        duration: 3000
      });
    },
    /**
     * 刷新token函数
     * @returns {string|*}
     */
    refreshToken: () => {
      return auth.refreshToken();
    },
    /**
     * 用户退出函数
     */
    logout: () => {
      if (router.currentRoute.name !== 'login') {
        router
          .replace({
            name: 'login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          })
          .then(() => {
            location.reload();
          });
      }
    }
  },
  reqIntercept: {
    /**
     * 获取认证的方法
     */
    token: () => {
      return auth.token(true, 'Authorization');
    }
  }
});

export default service;
