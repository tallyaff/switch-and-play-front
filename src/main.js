import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from './router'
import store from './stores/store.js'
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker'
import './assets/scss/style.scss'
import axios from 'axios'
import moment from 'moment'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faUser, faBell } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCoffee,faUser,faBell)

Vue.use(require('vue-moment'));
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.filter('getDate', (timestamp) => {  
  return moment(timestamp).fromNow();
})

axios.defaults.withCredentials = true;
Vue.config.productionTip = false
Vue.use(Element)




new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    var user = localStorage.getItem('loggedInUser')
    user = JSON.parse(user)
    if (user) {
      this.$store.commit({type: 'setUser', user})
    }
  }
}).$mount('#app')
