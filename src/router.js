import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
// import Contact from './views/Contact.vue'
import Gallery from './views/Gallery.vue'
import Login from './views/Login.vue'
import EditGame from './views/EditGame.vue'
import GameDetails from './views/GameDetails.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    // {
    //   path: '/contact',
    //   name: 'contact',
    //   component: Contact
    // },
    {
      path: '/game',
      name: 'game',
      component: Gallery
    },
    {
      path: '/game/:gameId?',
      name: 'game-details',
      component: GameDetails
    },
    {
      path: '/game/edit/:gameId?',
      name: 'edit',
      component: EditGame
    },

  ]
})
