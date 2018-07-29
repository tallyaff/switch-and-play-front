<template>
  <div class="home">
    <!-- <GameFilter></GameFilter> -->
    <!-- <router-link :to="'/game'"> -->
      <!-- <button>Go to Gallery</button> -->
      <!-- <el-button type="primary">Go to Gallery</el-button> -->
    <!-- </router-link> -->
    <div class="home-bg-img flex justify-center align-center" :style="{backgroundImage: url, backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
      <form @submit.prevent="setSearchHome" class="search">
          <input class="search-input" type="text" v-model="filterBy.name" placeholder="Search for games">
          <el-button class="btn search-btn" type="primary">Search</el-button>
      </form>
    </div>
    <div class="all-cards-home-container">
      <div class="filter-type home-filter-container home-filter-container-baby flex column align-center justify-center" >
        <!-- <router-link :to="'/game'" value="baby" v-model="filterBy.type" @click.native="setFilter"> -->
        <router-link :to="'/game'" value="baby" v-model="filterBy.type" @click.native="setFilter">
          <h2 class="type-title-home">Baby</h2>
        </router-link>
        <ul v-if="gamesForBabyHomeDisplay" class="cards-container-home align-center flex justify-center clean-list">
            <li v-for="game in gamesForBabyHomeDisplay" :key="game._id"> 
          <!-- <router-link :to="`/game`"> -->
          <router-link :to="`/game/${game._id}/`" target="_blank">
              <el-card class="card-home">
                  <div v-if="game.isNew" class="game-new-icon"><img src="img/new-icon.png"></div>
                  <img :src="game.src" class="image-card">
                  <div style="padding: 14px;">
                  <span class="card-game-name">{{game.name}}</span>
                  <div class="bottom clearfix">
                    <div type="text" class="user-name-card-home">User Name</div>
                    <time class="time">{{ game.addedAt | getDate }}</time>
                  </div>
                  </div>
                </el-card>
          </router-link>
            </li>
        </ul> 
      </div>
      <div class="filter-type home-child-filter-container" >
        <router-link :to="'/game'">
          <h2 class="type-title-home">Child</h2>
        </router-link>
            <ul v-if="gamesForChildHomeDisplay">
              <li v-for="game in gamesForChildHomeDisplay" :key="game._id"> 
                <div>{{game.name}}</div>
              </li>
            </ul>
      </div>
      <div class="filter-type home-teen-filter-container" >
         <router-link :to="'/game'">
          <h2 class="type-title-home">Teen</h2>
        </router-link>
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
        url: 'url("img/home-img-1.jpg")',
    }
  },
  created() {
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
  },
  methods: {
    loadGamesForHomepage() {
      this.$store.dispatch({type:'loadGamesForHomepage'})
        .then(games => {
        })
        .catch(err => {
            console.log('err', err);
        });
    },
    setSearchHome() {
      console.log('setSearchHome in cmp');      
      this.$store.dispatch({ type: 'setSearchHome', filterBy: this.filterBy })
          .then(games => {
            this.$router.push('/game');

        })
    },
    setFilter() {
      console.log('this.filterBy in home', this.filterBy);
      
      this.$store.dispatch({ type: "setFilter", filterBy: this.filterBy });
    }, 
  },
};
</script>

<style scoped lang="scss">
  @import '~@/assets/scss/style.scss';
    .filter-type {
      

  }

  .home-bg-img {
    height: 500px;
  }
  .search {
    margin-bottom: rem(20px);
    
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

  .type-title-home {
    font-size: rem(40px);
    font-family: 'Ubuntu';
  }

  .all-cards-home-container {
      // width: 1200px;
  }

  .home-filter-container-baby {
    height: 600px;
    background-color:aliceblue;
  }

  .home-filter-container {
    // width: 800px;
    justify-content: center;
  }

  .cards-container-home {
    width: 100%;
  }

  .card-home {
    position: relative;
    margin: rem(10px);
    width: rem(250px);
    transition: all 0.5s;
    cursor: pointer;
    .image-card {
        width: 100%;
    }
    &:hover {
      transform: scale(0.95, 0.95);
    }
    .card-game-name {
      text-transform: capitalize;
      font-family: 'PaytoneOne';
      font-size: rem(25px);
      color: $main-color;
      // text-shadow: 2px 1px $secondary-color;
    }
    .game-new-icon {
      position: absolute;
      top: -20px;
      left: -20px;
      // z-index: 5;
    }
    .user-name-card-home {
      padding: 0;
      float: right;
      color: $secondary-color;
      font-family: 'Ubuntu-regular';
    }
    .time {
      font-size: 13px;
      color: #999;
      font-family: 'Ubuntu-regular';
    }
  }


  .type-title-home {
    align-self: left;
  }


  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
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