<template>
    <div class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/contact">Contact</router-link>
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

.nav > h4 {
  cursor: pointer;
}
</style>
