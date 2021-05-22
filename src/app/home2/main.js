import Vue from 'vue'
import App from './App.vue'
import { ajax } from '../index'
// import { ajax } from '../../libs/axios';

Vue.config.productionTip = false

new Vue({
  ajax,
  render: h => h(App),
}).$mount('#app')
