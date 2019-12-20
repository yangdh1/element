// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import power from './directive'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import * as filters from './filters' // 全局filter
import './theme/element-variables.scss'
// 权限
import './permission'
import './lib/iconfont/iconfont.css'
import './assets/sass/main.scss'

//全局变量
import global_ from './global'
import moment from 'moment'
Vue.prototype.GLOBAL = global_

Vue.use(ElementUI);
Vue.config.productionTip = false;
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  if(null!=dataStr&&typeof(dataStr)!=undefined&&""!=dataStr){
    return moment(dataStr).format(pattern);
  }else {
    return "";
  }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
