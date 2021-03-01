import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/minireset.min.css'
import SlideVerify from 'vue-monoplasty-slide-verify';
import cookie from 'vue-cookie'
Vue.prototype.$cookies = cookie;
Vue.use(ElementUI);
Vue.use(SlideVerify);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
