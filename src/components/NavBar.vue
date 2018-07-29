<template>
    <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
        <!-- <router-link v-if="!loggedinUser" to="/login">Login</router-link>
        <button v-if="loggedinUser" @click="onLogout">Logout</button> -->
    </div>
</template>

<script>
export default {
  name: "NavBar",
  // props: ["loggedinUser"],
  methods: {
    // onLogout() {
    //   this.$emit("update:loggedinUser", null);
    //   this.$emit("logout");
    // },
  }
};
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 30px;

  a {
    padding: 10px;
    color: #2c3e50;
    position: relative;
    text-decoration: none;
    &.router-link-exact-active {
      color: $secondary-color;
    }
  }
}
  //  .nav a:before {
  //     content:'';
  //     position: absolute;
  //     width: 100%;
  //     height: 2px;
  //     bottom: 0;
  //     left: 0;
  //   //   background-color: #000;
  //     visibility: hidden;
  //     -webkit-transform: scaleX(0);
  //     transform: scaleX(0);
  //     -webkit-transition: all 0.3s ease-in-out 0s;
  //     transition: all 0.3s ease-in-out 0s;
  //   }
  //  .nav a:hover:before {
  //     visibility: visible;
  //     -webkit-transform: scaleX(1);
  //     transform: scaleX(1);
  //   }
  

</style>
