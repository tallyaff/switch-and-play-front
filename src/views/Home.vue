<template>
  <section class="home">
    <div class="home-bg-img flex justify-center align-center" :style="{backgroundImage: url, backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
      <form @submit.prevent="setSearchHome" class="search">
          <input class="search-input" type="text" v-model="filterBy.name" placeholder="Search for games">
          <el-button class="btn search-btn" type="primary">Search</el-button>
      </form>
      <h1 class="header-bg-image">Do you want to swap some games?</h1>
    </div>






    <!-- <div class="all-cards-home-container"> -->

    <div class="baby-cards-container space-between">
      <div class="baby-cards flex container  ">
      <div class="filter-type home-filter-container home-filter-container-baby flex column align-center justify-center" >
        <router-link :to="'/game'" @click.native="setFilter('baby')">
          <h2 class="type-title-home">Most popular baby games</h2>
        </router-link>
        <font-awesome-icon icon="trashAlt" />
        <ul v-if="gamesForBabyHomeDisplay" class="cards-container-home  flex  clean-list">
            <li v-for="game in gamesForBabyHomeDisplay.slice(2, 6)" :key="game._id"> 
          <router-link :to="`/game/${game._id}/`">
              <el-card class="card-home">
                  <div v-if="game.isNew" class="game-new-icon"><img src="img/new-icon.png"></div>
                  <div class="image-container flex align-center justify-center">
                    <img :src="game.src" class="image-card">  
                  </div>
                  <div class="card-text-container flex justify-center align-center column">
                      <span class="card-game-name">{{game.name}}</span>
                    <div class="username-time-container flex space-between align-center">
                      <div class="username-time-container flex space-between align-center space-between">
                        <div type="text" class="user-name-card-home">
                          <gameUser :userId="game.userId" class="user-game-container flex column"></gameUser>
                        </div>
                      </div>
                          <time class="time">{{ game.addedAt | getDate }}</time>
                    </div>
                  </div>
              </el-card>
          </router-link>
            </li>
        </ul>
        <router-link class="link-to-gallery" :to="'/game'" @click.native="setFilter('baby')">
          <h2 class="link-to-gallery">See more...</h2>
        </router-link> 
      </div>
</div>


      <div class="filter-type home-filter-container home-filter-container-child flex column align-center justify-center" >
        <router-link :to="'/game'" @click.native="setFilter('child')">
          <h2 class="type-title-home">Most popular child games</h2>
        </router-link>
        <ul v-if="gamesForChildHomeDisplay" class="cards-container-home align-center flex justify-center clean-list">
            <li v-for="game in gamesForChildHomeDisplay.slice(2, 6)" :key="game._id"> 
          <router-link :to="`/game/${game._id}/`">
              <el-card class="card-home">
                  <div v-if="game.isNew" class="game-new-icon"><img src="img/new-icon.png"></div>
                  <div class="image-container flex align-center justify-center">
                    <img :src="game.src" class="image-card">  
                  </div>
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
        <router-link class="link-to-gallery" :to="'/game'" @click.native="setFilter('child')">
          <h2 class="link-to-gallery">See more...</h2>
        </router-link>  
        </div>



      <div class="filter-type home-filter-container home-filter-container-teen flex column align-center justify-center" >
        <router-link :to="'/game'" @click.native="setFilter('teen')">
          <h2 class="type-title-home">Most popular teen games</h2>
        </router-link>
        <ul v-if="gamesForTeenHomeDisplay" class="cards-container-home align-center flex justify-center clean-list">
            <li v-for="game in gamesForTeenHomeDisplay.slice(2, 6)" :key="game._id"> 
          <router-link :to="`/game/${game._id}/`">
              <el-card class="card-home">
                  <div v-if="game.isNew" class="game-new-icon"><img src="img/new-icon.png"></div>
                  <div class="image-container flex align-center justify-center">
                    <img :src="game.src" class="image-card">  
                  </div>
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
        <router-link class="link-to-gallery" :to="'/game'" @click.native="setFilter('teen')">
          <h2 class="link-to-gallery">See more...</h2>
        </router-link> 
      </div>
    </div>
  </section>
</template>

<script>
import GameService from '@/services/GameService.js';
import UserService from '@/services/UserService.js';
import Gallery from '@/views/Gallery.vue'
import GameFilter from '@/components/GameFilter.vue';
import GameUser from '@/components/GameUser.vue';
import { eventBus, EVENT_SET_FILTER } from '@/services/EventBusService.js';

// import Gallery from '@/views/Gallery.vue'

export default {
  name: 'home',
  components: {
    GameFilter,
    GameUser
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
      this.allByName = true;
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
    // setFilter(criteria = {type: [], name: ''}) {
    //   console.log('this.filterBy in home', type);
    //   // eventBus.$emit(EVENT_SET_FILTER, this.filterBy);
    //   if(criteria.name) this.filterBy.name = criteria.name;
    //   if(criteria.type) this.filterBy.type = criteria.type;
    //   this.$store.dispatch({ type: "setFilter", filterBy: this.filterBy });
    // }, 
  },
};
</script>

<style scoped lang="scss">
  @import '~@/assets/scss/style.scss';
    .filter-type {
        

    }

    .home-bg-img {
      height: 400px;
      position: relative;
    }

    .header-bg-image {
      position: absolute;
      top: 300px;
      width: 100%;
      color: white;
      font-size: rem(60px);
      font-family: 'Ubuntu-regular';
      text-shadow: 3px 1px black;
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
      align-self: flex-start;
      font-size: rem(40px);
      font-family: 'Ubuntu';
      margin-top: rem(30px);
      margin-bottom: rem(10px);
    }

    .all-cards-home-container {
        // width: 1200px;
    }

    .home-filter-container-baby, .home-filter-container-teen  {
      background-color:aliceblue;
    }

    .home-filter-container {    
      padding-bottom: rem(20px);
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
          width: 100%;
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
          padding: 0;
          // text-shadow: 2px 1px $secondary-color;
        }
        .game-new-icon {
          position: absolute;
          top: -2px;
          left: -2px;
        }
        .user-name-card-home {
          padding: 0 rem(15px);
          font-size: rem(14px);
          float: right;
          color: $secondary-color;
          font-family: 'Ubuntu-regular';
          position: relative;
          // top: -40px;
          // left: -40px;
          // align-self: flex-end;
          // align-items: center;
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

  .arrow-btn {
    background-color: inherit;
    border: none;
    font-size: 2em;
  }

  .link-to-gallery {
    font-size: rem(20px);
    font-family: 'Ubuntu';
    transition: all 0.5s;
    align-self: flex-end;
    &:hover {
      color: $secondary-color;
      transform: scale(0.95, 0.95);
    }
    // h2{
    //   margin-right: 85px;
    // }
  }
  .search-btn{
    margin-left: 10px;
  }
  .card-home{
    margin: 0;
  }


</style>