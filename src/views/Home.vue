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
        <router-link :to="'/game'" @click.native="setFilter('baby')">
          <h2 class="type-title-home">Baby</h2>
        </router-link>
        <ul v-if="gamesForBabyHomeDisplay" class="cards-container-home align-center flex justify-center clean-list">
            <li v-for="game in gamesForBabyHomeDisplay.slice(0, 5)" :key="game._id"> 
          <!-- <router-link :to="`/game`"> -->
          <router-link :to="`/game/${game._id}/`" target="_blank">
              <el-card class="card-home">
                  <div v-if="game.isNew" class="game-new-icon"><img src="img/new-icon.png"></div>
                  <div class="image-container flex align-center justify-center">
                    <img :src="game.src" class="image-card">  
                  </div>
                  <!-- <div class="card-text-container" style="padding: 14px;"> -->
                  <div class="card-text-container flex justify-center align-center column">
                    <span class="card-game-name">{{game.name}}</span>
                    <div class="username-time-container flex space-between align-center space-between">
                      <div type="text" class="user-name-card-home">User Name</div>
                      <time class="time">{{ game.addedAt | getDate }}</time>
                    </div>
                  </div>
              </el-card>
          </router-link>
            </li>
        </ul> 
      </div>
      <div class="filter-type home-filter-container home-filter-container-child flex column align-center justify-center" >
        <!-- <router-link :to="'/game'" value="child" v-model="filterBy.type" @click.native="setFilter"> -->
        <router-link :to="'/game'" @click.native="setFilter('child')">
          <h2 class="type-title-home">Child</h2>
        </router-link>
        <ul v-if="gamesForChildHomeDisplay" class="cards-container-home align-center flex justify-center clean-list">
            <li v-for="game in gamesForChildHomeDisplay.slice(0, 5)" :key="game._id"> 
          <!-- <router-link :to="`/game`"> -->
          <router-link :to="`/game/${game._id}/`" target="_blank">
              <el-card class="card-home">
                  <div v-if="game.isNew" class="game-new-icon"><img src="img/new-icon.png"></div>
                  <div class="image-container flex align-center justify-center">
                    <img :src="game.src" class="image-card">  
                  </div>
                  <!-- <div class="card-text-container" style="padding: 14px;"> -->
                  <div class="card-text-container flex justify-center align-center column">
                    <span class="card-game-name">{{game.name}}</span>
                    <div class="username-time-container flex space-between align-center space-between">
                      <div type="text" class="user-name-card-home">User Name</div>
                      <time class="time">{{ game.addedAt | getDate }}</time>
                    </div>
                  </div>
              </el-card>
          </router-link>
            </li>
        </ul> 
      </div>
      <div class="filter-type home-filter-container home-filter-container-teen flex column align-center justify-center" >
        <!-- <router-link :to="'/game'" value="teen" v-model="filterBy.type" @click.native="setFilter"> -->
        <router-link :to="'/game'" @click.native="setFilter('teen')">
          <h2 class="type-title-home">Teen</h2>
        </router-link>
        <ul v-if="gamesForTeenHomeDisplay" class="cards-container-home align-center flex justify-center clean-list">
            <li v-for="game in gamesForTeenHomeDisplay.slice(0, 5)" :key="game._id"> 
          <!-- <router-link :to="`/game`"> -->
          <router-link :to="`/game/${game._id}/`" target="_blank">
              <el-card class="card-home">
                  <div v-if="game.isNew" class="game-new-icon"><img src="img/new-icon.png"></div>
                  <div class="image-container flex align-center justify-center">
                    <img :src="game.src" class="image-card">  
                  </div>
                  <!-- <div class="card-text-container" style="padding: 14px;"> -->
                  <div class="card-text-container flex justify-center align-center column">
                    <span class="card-game-name">{{game.name}}</span>
                    <div class="username-time-container flex space-between align-center space-between">
                      <div type="text" class="user-name-card-home">User Name</div>
                      <time class="time">{{ game.addedAt | getDate }}</time>
                    </div>
                  </div>
              </el-card>
          </router-link>
            </li>
        </ul> 
      </div>



  <!-- <el-carousel :interval="5000" arrow="always">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel> -->





    </div>
  </div>
</template>

<script>
import GameService from '@/services/GameService.js';
import Gallery from '@/views/Gallery.vue'
import GameFilter from '@/components/GameFilter.vue';
import { eventBus, EVENT_SET_FILTER } from '@/services/EventBusService.js';

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
          allByName: false,
          name: '',
          allTypes: false,
          type: [],
          allCategories: false,
          category: [],
          userId: ''
        },
        url: 'url("img/shutterstock_261496907.jpg")',
        // url: 'url("img/home-img-3.png")',
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
      // console.log('gamesForBabyHomeDisplay in home', this.$store.getters.gamesForBabyHomeDisplay);
      return this.$store.getters.gamesForBabyHomeDisplay
    },
   gamesForChildHomeDisplay(){
      // console.log('gamesForChildHomeDisplay in home', this.$store.getters.gamesForChildHomeDisplay);
      return this.$store.getters.gamesForChildHomeDisplay
    },
   gamesForTeenHomeDisplay(){
      // console.log('gamesForTeenHomeDisplay in home', this.$store.getters.gamesForTeenHomeDisplay);
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
      // console.log('setSearchHome in cmp');      
      this.$store.dispatch({ type: 'setSearchHome', filterBy: this.filterBy })
          .then(games => {
            this.$router.push('/game');

        })
    },
    setFilter(type) {
      console.log('this.filterBy in home', type);
      // eventBus.$emit(EVENT_SET_FILTER, this.filterBy);
      this.filterBy.type = [type]
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
    position: relative;
    bottom: rem(-70px);
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
     background-color: $main-color;
  }

  .type-title-home {
    font-size: rem(40px);
    font-family: 'Ubuntu';
    margin: rem(20px) 0;
  }

  .all-cards-home-container {
      // width: 1200px;
  }

  .home-filter-container-baby, .home-filter-container-teen  {
    background-color:aliceblue;
  }

  .home-filter-container {    
    justify-content: center;
    height: 600px;
  }

  .cards-container-home {
    width: 100%;
    flex-wrap: wrap;
  }

  .card-home {
    position: relative;
    margin: rem(10px);
    width: rem(250px);
    height: rem(350px);
    transition: all 0.5s;
    cursor: pointer;
      .image-container {
        height: rem(200px);
      }
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
      .card-text-container {
        background-color: #dadada54;
        width: rem(250px);
        height: rem(120px);
        padding: rem(10px);
        position: absolute;
        top: rem(248px);
        left: rem(0px);
      }
      .username-time-container {
        padding: rem(10px);
      }
      .card-game-name {
        text-transform: capitalize;
        font-family: 'PaytoneOne';
        font-size: rem(20px);
        color: $main-color;
        // text-shadow: 2px 1px $secondary-color;
      }
      .game-new-icon {
        position: absolute;
        top: -2px;
        left: -2px;
        // z-index: 5;
      }
      .user-name-card-home {
        padding: 0 rem(15px);
        font-size: rem(14px);
        float: right;
        color: $secondary-color;
        font-family: 'Ubuntu-regular';
      }
      .time {
        font-size: rem(14px);
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