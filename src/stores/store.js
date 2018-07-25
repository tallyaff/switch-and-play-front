import Vue from 'vue'
import Vuex from 'vuex'
import GameModule from './GameModule.js'
import UserModule from './UserModule.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

  modules: {
    GameModule,
    UserModule,
  }
})
