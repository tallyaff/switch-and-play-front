
<template>
  <div id="app">

    <header></header>
    <router-view/>
    <!-- <div id="nav">
      <img src="img/logo.png">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/contact">Contact</router-link> |
      <router-link to="/login">Login</router-link>
        <p v-if="loggedinUser">
            Hello: {{'loggedinUser'? loggedinUser.username: 'guest'}}
        </p>
    </div>
    <router-view/> -->
  </div>
</template>

<script>

// import eventBus from 'services/EventBusService.js'
// import UserService from 'services/UserService.js';

export default {

  // created() {
  //   eventBus.$on(EVENT_LOGIN_USER, user => {
  //     console.log(user);
  //     this.user = user;
  //   });
  // },
  //     data() {
  //       return {
  //            user: this.$store.getters.loggedUser
  //       }
  //   },
  //   methods: {
  //       logout() {
  //           // this.userName = '';
  //           // UserService.logout();
  //       }
  //   }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
