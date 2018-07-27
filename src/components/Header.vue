<template>
    <div class="header">
    <nav-bar></nav-bar>
        <p v-if="loggedinUser">
            Hello: {{'loggedinUser'? loggedinUser.username: 'guest'}}
        </p>
        </div>
</template>

<script>
import eventBus from "../services/EventBusService.js";
import UserService from "../services/UserService.js";
import NavBar from '@/components/NavBar.vue'

export default {
  created() {
    eventBus.$on(EVENT_LOGIN_USER, user => {
      console.log(user);
      this.user = user;
    });
  },
  data() {
    return {
      user: this.$store.getters.loggedUser
    };
  },
  methods: {
    logout() {
      // this.userName = '';
      // UserService.logout();
    }
  },
  components:{
      NavBar,
  }
};
</script>

<style>
</style>
