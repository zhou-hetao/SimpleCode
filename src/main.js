import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/user'
import ElementUI, { Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
Vue.config.errorHandler = function(err) {
  Message.error("出错了");
};