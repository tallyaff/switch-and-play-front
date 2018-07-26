import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from './router'
import store from './stores/store.js'
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker'
import   './assets/scss/style.scss'
Vue.config.productionTip = false
Vue.use(Element)

new Vue({
  router,
  store,
 
  render: h => h(App)
}).$mount('#app')
