<template>
  <div class="home">
      <h3></h3>

      <!-- <router-link :to="'/game/'+filterBy.name">
        <input  type="text" @input="setFilter" v-model="filterBy.name" placeholder="Search"  name="inputSearch">
      </router-link>  -->
      <!-- <GameList :games="gamesByFilterServer" @remove="removeGame"></GameList> -->
      {{currGames}}
      <Gallery :games="currGames"></Gallery>
      <!-- <GameList :games="games" @remove="removeGame"></GameList> -->
  </div>
</template>

<script>
import GameService from '@/services/GameService.js';
import Gallery from '@/views/Gallery.vue'

export default {
  name: 'home',
  components: {
    Gallery,

  },
  data() {
    return {
        filterBy: {
          name: '',
          type: '',
          category: '',
          userId: ''
        }
    }
  },
  created() {
    this.loadGames();
  },
  computed: {
    currGames() {
      return this.$store.getters.currGames;
    },
    // gamesForDisplay() {
    //   return this.$store.getters.gamesForDisplay;
    //   },
    gamesByFilterServer() {
      console.log('computed gamesByFilterServer in gameapp', this.$store.gamesByFilterServer);
      return this.$store.getters.gamesByFilterServer;
    }
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
    removeGame(gameId) {
        console.log('remove item...', gameId);
        this.$store.dispatch({type: 'removeGame', gameId })
            .then(() =>{
                console.log('removed from game APP'); 
                // eventBusService.$emit(SHOW_MSG, {txt: `Todo was removed`})
            })
    },
    setFilter(ev) {
        // this.$store.commit({type: 'setFilter', filterBy: {name: ev.target.value} })
        this.$store.dispatch({type: 'sentFilter', filterBy: {name: ev.target.value} })
    },
  },
};
</script>
