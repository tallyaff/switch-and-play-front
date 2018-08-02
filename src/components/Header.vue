<template>
  <section class="header-container ">
    <div class="header flex container space-between">
       <router-link to="/">
        <div class="img ">
          <router-link :to="`/`" class="pointer">
            <img src="img/logo.png">
          </router-link>
        </div>
        </router-link>
        <nav-bar :loggedinUser.sync="loggedinUser"></nav-bar>
        <user-bar :loggedinUser="loggedinUser" @logout="logout"></user-bar>
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
    this.loggedinUser
    console.log('this.loggedinUser:', this.loggedinUser);
    
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
@import '~@/assets/scss/style.scss';
  
.header {
  font-family: 'Ubuntu-regular';
  display: flex;
  font-size: 22px;
}
img{
      margin-top: 18px;
}
.header-container{
  box-shadow: 0px 0.5px 4px 0px #d9d8d8;
}


</style>
