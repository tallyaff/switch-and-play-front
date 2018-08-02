<template>
    <div id="app">
        <Header></Header>
        <router-view/>
        <!-- <footer class="footer"> @ Created by Liron, Tally &amp; Adi</footer> -->
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

.footer {
  color: #0D72FA;
  background-color: #dadada54;
  font-family: 'PaytoneOne';
  font-size: 1.25rem;
  padding: 10px;
  position: absolute;
  width: 100%;
  bottom: 0;
}

</style>