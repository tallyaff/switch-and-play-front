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
    color: $secondary-color;
    // color:	#362026;
    transition: all 0.3s ease;
    position: relative;
    text-decoration: none;
    &.router-link-exact-active {
      color: $main-color;
    }
    &:hover {
      color: $main-color;
    }
  }
}

.nav > h4 {
  cursor: pointer;
}
</style>
