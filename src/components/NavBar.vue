<template>
    <div id="nav" class="nav">
        <router-link to="/">Home </router-link> |
        <router-link to="/about">About </router-link> |
        <router-link to="/contact">Contact </router-link> |
        <router-link v-if="!loggedinUser" to="/login">Login </router-link>
        <h4 v-if="loggedinUser" @click="onLogout">Logout </h4>
    </div>
</template>

<script>

export default {
  name: "NavBar",
  props: ["loggedinUser"],
  methods: {
    onLogout() {
      this.$emit("update:loggedinUser", null);
      this.$emit("logout");
    },
  },
};
</script>

<style scoped lang="scss">
.nav {
      display: flex;
      align-items: center;
      justify-content: space-around;
}
.nav > h4 {
  cursor: pointer;
}
</style>
