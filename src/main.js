import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/index.scss'
import directives from 'hzwq-ui/lib/directives'
import axios from './utils/request'

// 按需引入hzwq-ui
import './utils/hzwqui.js'


Vue.use(directives)
Vue.use(ElementUI)
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
