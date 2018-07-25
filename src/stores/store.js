import Vue from 'vue'
import Vuex from 'vuex'
import GameModule from './GameModule.js'
<<<<<<< HEAD
import UserModule from './UserModule.js'
=======
>>>>>>> f6d6adb4c641c4fa481fa2cf879c1d1fd2277081

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

<<<<<<< HEAD
  modules: {
    GameModule,
    UserModule,
=======
  },
  modules:{
    GameModule,
>>>>>>> f6d6adb4c641c4fa481fa2cf879c1d1fd2277081
  }
})
