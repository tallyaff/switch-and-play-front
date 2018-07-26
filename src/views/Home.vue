<template>
  <div class="home">
      <h3> Search for games:</h3>
<router-link :to="'/game'">
  <button>Go to Gallery</button>
</router-link> 
      <h3></h3>

      <!-- <GameList :games="gamesByFilterServer" @remove="removeGame"></GameList> -->
      <!-- {{currGames}}
      <Gallery :games="currGames"></Gallery> -->
      <!-- {{games}} -->
      <GameFilter></GameFilter>
      <ul>
        <li v-for="game in gamesForDisplay" :key="game._id"> 
          <div>{{game.name}}</div>
        </li>
      </ul>
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
    this.loadGames();
  },
  computed: {

    gamesForDisplay(){
      return this.$store.getters.gamesForDisplay
    }
    // gamesForDisplay() {
    //   return this.$store.getters.gamesForDisplay;
    //   },
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
