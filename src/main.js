import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入axios
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/common.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as echarts from "echarts"
Vue.prototype.$echarts = echarts
Vue.use(VueAxios, axios)


Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
