<template>
  <div class="home">
    <router-link :to="'/game'">
      <!-- <button>Go to Gallery</button> -->
      <el-button type="primary">Go to Gallery</el-button>
    </router-link>
    <div class="filter-type home-baby-filter-container" >
      <h2 class="baby-title">Baby</h2>
      <GameFilter></GameFilter>
          <ul>
            <li v-for="game in gamesForBabyHomeDisplay" :key="game._id"> 
              <div>{{game.name}}</div>
            </li>
          </ul>
      
    </div>
    <div class="filter-type home-child-filter-container" >
      <h2 class="baby-title">Child</h2>
        <GameFilter></GameFilter>
          <ul>
            <li v-for="game in gamesForChildHomeDisplay" :key="game._id"> 
              <div>{{game.name}}</div>
            </li>
          </ul>
    </div>
    <div class="filter-type home-teen-filter-container" >
      <h2 class="baby-title">Teen</h2>
      <GameFilter></GameFilter>
           <ul>
            <li v-for="game in gamesForTeenHomeDisplay" :key="game._id"> 
              <div>{{game.name}}</div>
            </li>
          </ul>
    </div>
  </div>
</template>

<script>
import GameService from '@/services/GameService.js';
import Gallery from '@/views/Gallery.vue'
import GameFilter from '@/components/GameFilter.vue'

// import Gallery from '@/views/Gallery.vue'

export default {
  name: 'home',
  components: {
    GameFilter,
    // Gallery,

  },
  data() {
    return {
    }
  },
  created() {
    // this.loadGames();
  },
  computed: {

    gamesForDisplay(){
      return this.$store.getters.gamesForDisplay
    },
    gamesForBabyHomeDisplay(){
      return this.$store.getters.gamesForBabyHomeDisplay
    },
    gamesForChildHomeDisplay(){
      return this.$store.getters.gamesForChildHomeDisplay
    },
    gamesForTeenHomeDisplay(){
      return this.$store.getters.gamesForTeenHomeDisplay
    },

    // gamesByFilterServer() {
    //   console.log('computed gamesByFilterServer in gameapp', this.$store.gamesByFilterServer);
    //   return this.$store.getters.gamesByFilterServer;
    // }
  },
  methods: {
    loadGames() {
      this.$store.dispatch({type:'loadGames'})
        .then(games => {
        //   eventBusService.$emit(SHOW_MSG, {
        //     txt: `${Games.length} Games Loaded!`
        //   });

        })
        .catch(err => {
            console.log('err', err);
            
        //   eventBusService.$emit(SHOW_MSG, {
        //     txt: `Failed to Load Games`,
        //     type: 'danger'
        //   });
        });
    },
  },
};
</script>

<style scoped lang="scss">
  @import '~@/assets/scss/style.scss';
    .filter-type {
      

  }


</style>