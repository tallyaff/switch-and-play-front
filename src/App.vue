<template>
    <div id="app">
        <Header></Header>
        <router-view/>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import UtilService from '@/services/UtilService.js'

export default {
  components: {
    Header
  },
  data(){
    return{
      currUser : UtilService.load('loggedinUser') || null
    }
  },
  created(){
     this.$store
        .commit({
          type: "setUser",
          currUser: this.currUser
        })
  }
};
</script>


<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-weight: 200;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>