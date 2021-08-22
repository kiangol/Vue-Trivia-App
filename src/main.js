import Vue from 'vue'
import App from './App.vue'


import 'bootstrap/dist/css/bootstrap.min.css'
import './main.css'


import store from "./store"
import router from "./router/router"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
