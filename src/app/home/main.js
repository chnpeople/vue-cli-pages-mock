import Vue from 'vue'
import App from './App.vue'
import { ajax } from '../index'
// import { ajax } from '../../libs/axios';
// Vue.$httpRequestList = [];

Vue.config.productionTip = false;

// Vue.directive('focusA', {
//   // 当被绑定的元素插入到 DOM 中时……
//   inserted: function (el) {
//     // 聚焦元素
//     el.focus()
//   }
// })

new Vue({
  ajax,
  render: h => h(App),
}).$mount('#app')
