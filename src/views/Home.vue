<template>
  <div class="home">
      <h3> Search for games:</h3>
      <!-- <router-link :to="'/game/'+filterBy.name">
        <input  type="text" @input="setFilter" v-model="filterBy.name" placeholder="Search"  name="inputSearch">
      </router-link>  -->
      <!-- <GameList :games="gamesByFilterServer" @remove="removeGame"></GameList> -->
      <!-- {{games}} -->
      <ul>
        <li v-for="game in games" :key="game._id"> 
          <div>{{game.name}}</div>
        </li>
      </ul>
      <!-- <Gallery :games="currGames"></Gallery> -->
      <!-- <GameList :games="games" @remove="removeGame"></GameList> -->
  </div>
</template>

<script>
// @ is an alias to /src
import GameService from '../services/GameService.js';
// import Gallery from '@/views/Gallery.vue'

export default {
  name: 'home',
  components: {
    // Gallery,

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
    this.gamesToShow();
  },
  computed: {
    // currGames() {
    //   return this.$store.getters.currGames;
    // },

    games(){
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
    gamesToShow() {
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
