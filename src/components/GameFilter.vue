<template>
  <div class="filter-gallery-container">
        <form @submit.prevent="setFilter" class="search-in-gallery">
            <el-input class="search-input" type="text" v-model="filterBy.name" placeholder="Search for games" autofocus></el-input>
            <!-- <button>Search</button> -->
            <el-button class="btn search-btn" type="primary">Search</el-button>
        </form>
        <div class="checkbox-filter-container">
        <el-checkbox class="checkbox-filter" label="All" value="all" v-model="filterBy.allByName" @change="setFilter">All</el-checkbox>
        <div>
            <h3>Type</h3>
                <el-checkbox class="checkbox-filter" label="All types" value="all-types" v-model="filterBy.allTypes" @change="setFilter"></el-checkbox>
                <ul v-if="allFilterTypes">
                  <li v-for="oneType in allFilterTypes" :key="oneType._id"> 
                      <el-checkbox class="checkbox-filter" :label='oneType' :value="oneType" v-model="filterBy.type" @change="setFilter"></el-checkbox>
                  </li>
                </ul>
            <h3>Category</h3>
              <el-checkbox class="checkbox-filter" label="All categories" value="all-categories" v-model="filterBy.allCategories" @change="setFilter"></el-checkbox>
              <ul v-if="allFilterCategories">
                <li v-for="oneCategory in allFilterCategories" :key="oneCategory"> 
                    <el-checkbox class="checkbox-filter" :label='oneCategory' :value="oneCategory" v-model="filterBy.type" @change="setFilter">{{oneCategory}}</el-checkbox>
                </li>
              </ul>
         
             <!-- <label >
              <input type="checkbox" name="feature" value="all-types" v-model="filterBy.allTypes" @change="setFilter"/>All types
            </label>
            <label >
              <input type="checkbox" name="feature" value="baby" v-model="filterBy.type" @change="setFilter"/>Baby
            </label>
            <label >
              <input type="checkbox" name="feature" value="child" v-model="filterBy.type" @change="setFilter"/>Child
            </label>
            <label >
              <input type="checkbox" name="feature" value="teen" v-model="filterBy.type" @change="setFilter"/>Teen
            </label> -->
        <!-- </div>
        <div>
            <h3>Category</h3>
            <label >
              <input type="checkbox" name="feature" value="all-categories" v-model="filterBy.allCategories" @change="setFilter"/>All categories
            </label>
             <label >
              <input type="checkbox" name="feature" value="console" v-model="filterBy.category" @change="setFilter"/>Console
            </label>
             <label >
              <input type="checkbox" name="feature" value="doll" v-model="filterBy.category" @change="setFilter"/>Doll
            </label>
             <label >
              <input type="checkbox" name="feature" value="board-game" v-model="filterBy.category" @change="setFilter"/>Board game
            </label>
             <label >
              <input type="checkbox" name="feature" value="lego" v-model="filterBy.category" @change="setFilter"/>Lego
            </label>
             <label >
              <input type="checkbox" name="feature" value="playmobil" v-model="filterBy.category" @change="setFilter"/>Playmobil
            </label>
             <label >
              <input type="checkbox" name="feature" value="puzzle" v-model="filterBy.category" @change="setFilter"/>Puzzle
            </label>
             <label >
              <input type="checkbox" name="feature" value="wheels" v-model="filterBy.category" @change="setFilter"/>Wheels
            </label> -->
        </div>
        </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import GameService from '@/services/GameService.js';
import { eventBus, EVENT_SET_FILTER } from '@/services/EventBusService.js';

export default {
  name: 'home',
  components: {},
  data() {
    return {
      filterBy: {
        allByName: true,
        name: '',
        allTypes: true,
        type: [],
        allCategories: true,
        category: [],
        userId: '',
      },
      allFilterTypes: null,
      allFilterCategories: null,
    
    };
  },
  created() {
    //   var self = this;
    //   this.setFilter = debounce(() => {
    //     console.log('setFilter in gameFilter cmp');

    //     self.$store.dispatch({ type: 'setFilter', filterBy: this.filterBy })
    // }, 2000)

    this.allFilterTypes = this.$store.getters.types;
    console.log('allFilterTypes in home', this.allFilterTypes);
    this.allFilterCategories = this.$store.getters.categories;
    console.log('allFilterCategories in home', this.allFilterCategories);
        
    eventBus.$on(EVENT_SET_FILTER, filterBy => {
      this.filterBy = filterBy;
      console.log('this.filterBy in filter cmp after eventBus', this.filterBy);
    })
        
  },
  computed: {
    // allFilterTypes(){
    //   console.log('allFilterTypes in home', this.$store.allFilterTypes);
    //   return this.$store.allFilterTypes
    // },
    // allFilterCategories(){
    //   console.log('allFilterCategories in home', this.$store.allFilterCategories);
    //   return this.$store.allFilterCategories
    // },
  },
  methods: {
    setFilter: debounce(function() {
      // if(this.filterBy.type) this.filterBy.allTypes = false;
      // console.log('setFilter in gameFilter cmp');
      // console.log('this.filterBy.allTypes', this.filterBy.allTypes);
      if (this.filterBy.allTypes) this.filterBy.type = this.$store.getters.types;
      if (this.filterBy.type.length !== this.$store.getters.types.length) this.filterBy.allTypes = false;
      console.log('this.filterBy.type', this.filterBy.type);
      if (this.filterBy.allCategories) this.filterBy.category = this.$store.getters.categories;
      if (this.filterBy.category.length !== this.$store.getters.categories.length) this.filterBy.allCategories = false;
      console.log('this.filterBy.type', this.filterBy.category);
      // if (this.filterBy.allCategories) this.filterBy.category = this.allFilterCategories;

      this.$store.dispatch({ type: 'setFilter', filterBy: this.filterBy })
        .then(games => {
        //   eventBusService.$emit(SHOW_MSG, {
        //     txt: `${Games.length} Games Loaded!`
        //   });

        })
    }, 2000)
  }
};
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";

  .filter-gallery-container {
    width: 250px;
  }

  .checkbox-filter-container {
    // justify-content: flex-start;
  }

  .checkbox-filter {
    color: $secondary-color;
    text-transform: capitalize;
  }
  .search-btn {
    background-color: $main-color;
  }
  .search-in-gallery .search-input {
    width: 350px;
    margin-bottom: rem(20px);
    // height: 100px;
    // box-shadow: inset 0 0 3px 0px #000000ab;
  }

  .search-in-gallery {
    position: absolute;
    top: 20%;
    margin: rem(20px);
  }
</style>