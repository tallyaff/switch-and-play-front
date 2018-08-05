<template>
  <section class="header-container ">
    <div class="header flex container space-between align-center">
       <router-link to="/">
        <div class="img ">
          <router-link :to="`/`" class="pointer">
            <img  src="img/favicon.png">
          </router-link>
        </div>
        </router-link>
         <user-bar :loggedinUser="loggedinUser" @logout="logout"></user-bar>
        <nav-bar  :loggedinUser.sync="loggedinUser"></nav-bar>
    </div>
  </section>
</template>

<script>
import UserService from "../services/UserService.js";
import UtilService from "../services/UtilService.js";
import NavBar from "@/components/NavBar.vue";
import UserBar from "@/components/UserBar.vue";

export default {
  created() {
    this.loggedinUser;
    console.log("this.loggedinUser:", this.loggedinUser);
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    logout() {
      UserService.logout();
      this.$store.commit({ type: "logoutUser" });
      this.$store.dispatch({type: 'logoutActivity'});
      this.$router.push("/");
    }
  },
  components: {
    NavBar,
    UserBar
  }
};
</script>
<style scoped lang="scss">
@import "~@/assets/scss/style.scss";

.header {
  font-family: "Ubuntu-regular";
  display: flex;
  font-size: 22px;
  height: 90px;
}

.header-container {
  box-shadow: 0px 0.5px 4px 0px #d9d8d8;
}

@media (min-width: 890px) {
  .user-bar {
    order: 2;
  }
}

@media (min-width: 420px) {
  .header {
    padding: 20px;
  }
  img {
    content: url("/img/logo.png");
  }
}
</style>
