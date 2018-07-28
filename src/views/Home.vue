<template>
  <div class="home">
    <router-link :to="'/game'">
      <!-- <button>Go to Gallery</button> -->
      <el-button type="primary">Go to Gallery</el-button>
    </router-link>
    <form @submit.prevent="setSearchHome" class="search">
        <input class="search-input" type="text" v-model="filterBy.name" placeholder="Search for games">
        <el-button class="btn search-btn" type="primary">Search</el-button>
    </form>
    <div class="all-cards-home-container">
      <div class="filter-type home-filter-container flex column align-center justify-center" >
        <h2 class="type-title-home baby-title">Baby</h2>
        <!-- <GameFilter></GameFilter> -->
        <ul v-if="gamesForBabyHomeDisplay" class="cards-container-home align-center flex justify-center clean-list">
          <li v-for="game in gamesForBabyHomeDisplay" :key="game._id"> 
            <el-card class="card-home">
                  <img :src="game.src" class="image-card">
                  <div style="padding: 14px;">
                    <span class="card-game-name">{{game.name}}</span>
                    <div class="bottom clearfix">
                      <time class="time">{{ currentDate }}</time>
                      <el-button type="text" class="user-name">User Name</el-button>
                    </div>
                </div>
              </el-card>
            <!-- <div>{{game.name}}</div> -->
          </li>
        </ul> 
      </div>
      <div class="filter-type home-child-filter-container" >
        <h2 class="baby-title">Child</h2>
            <ul v-if="gamesForChildHomeDisplay">
              <li v-for="game in gamesForChildHomeDisplay" :key="game._id"> 
                <div>{{game.name}}</div>
              </li>
            </ul>
      </div>
      <div class="filter-type home-teen-filter-container" >
        <h2 class="baby-title">Teen</h2>
            <ul v-if="gamesForTeenHomeDisplay">
              <li v-for="game in gamesForTeenHomeDisplay" :key="game._id"> 
                <div>{{game.name}}</div>
              </li>
            </ul>
      </div>
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
        filterBy: {
          allByName: true,
          name: '',
          allTypes: true,
          type: [],
          allCategories: true,
          category: [],
          userId: ''
        },
    }
  },
  created() {
    // this.loadGames();
    // this.loadGamesForHomepage();
  },
  mounted() {
    this.loadGamesForHomepage();
  },
  computed: {
   gamesForBabyHomeDisplay(){
      console.log('gamesForBabyHomeDisplay in home', this.$store.getters.gamesForBabyHomeDisplay);
      return this.$store.getters.gamesForBabyHomeDisplay
    },
   gamesForChildHomeDisplay(){
      console.log('gamesForChildHomeDisplay in home', this.$store.getters.gamesForChildHomeDisplay);
      return this.$store.getters.gamesForChildHomeDisplay
    },
   gamesForTeenHomeDisplay(){
      console.log('gamesForTeenHomeDisplay in home', this.$store.getters.gamesForTeenHomeDisplay);
      return this.$store.getters.gamesForTeenHomeDisplay
    },


    // gamesByFilterServer() {
    //   console.log('computed gamesByFilterServer in gameapp', this.$store.gamesByFilterServer);
    //   return this.$store.getters.gamesByFilterServer;
    // }
  },
  // SET FILTER??? VAR STRTYPE - NOT GOOD
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
    loadGamesForHomepage() {
      this.$store.dispatch({type:'loadGamesForHomepage'})
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
    setSearchHome() {
      console.log('setSearchHome in cmp');      
      this.$store.dispatch({ type: 'setSearchHome', filterBy: this.filterBy })
          .then(games => {
            this.$router.push('/game');
        //   eventBusService.$emit(SHOW_MSG, {
        //     txt: `${Games.length} Games Loaded!`
        //   });

        })
    },
  },
};
</script>

<style scoped lang="scss">
  @import '~@/assets/scss/style.scss';
    .filter-type {
      

  }
  .search {
    
  }
    .search-input {
      width: 500px;
      height: 50px;
      border-radius: 4px;
      border: 1px solid $border-color;
      padding: rem(10px);
      font-size: rem(18px);
  }

  .search-btn {
     height: 50px;
     font-size: rem(18px);
  }

  .all-cards-home-container {
      // width: 1200px;
  }

  .home-filter-container {
    // width: 800px;
    justify-content: center;
  }
  .cards-container-home {
    width: 100%;
  }
  .card-home {
    margin: rem(10px);
    width: rem(250px);
    transition: all 0.5s;
    cursor: pointer;
    .image-card {
        width: 100%;
        // width: 100px;
        // height: 100px;
        // background-position: center;
        // background-size: cover;
    }
    &:hover {
      transform: scale(0.95, 0.95);
    }
    .card-game-name {
      text-transform: capitalize;
    }
  }


  .type-title-home {
    align-self: left;
  }

  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .user-name {
    padding: 0;
    float: right;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }

 


</style>