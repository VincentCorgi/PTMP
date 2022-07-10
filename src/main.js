import Vue from 'vue'
import App from './App.vue'
import Web3 from 'web3'
import Vuex from 'vuex'
import store from './store'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'
import { BootstrapVueIcons, BootstrapVue } from 'bootstrap-vue'

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.prototype.Web3 = Web3
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
