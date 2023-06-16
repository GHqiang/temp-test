import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/styles/index.scss';
import directives from 'hzwq-ui/lib/directives';

// 增加指令
Vue.use(directives);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
