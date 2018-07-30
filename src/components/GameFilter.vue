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
              <!-- <el-checkbox class="checkbox-filter" label="All categories" value="all-categories" v-model="filterBy.allCategories" @change="setFilter"></el-checkbox> -->
              <el-checkbox class="checkbox-filter" label="All categories" :value="filterBy.allCategories" @change="toggleAllCategories"></el-checkbox>
              <ul v-if="allFilterCategories">
                <li v-for="oneCategory in allFilterCategories" :key="oneCategory"> 
                    <el-checkbox class="checkbox-filter" :label='oneCategory' :checked="filterBy.category.includes(oneCategory)" @change="setCategory(oneCategory)">{{oneCategory}}</el-checkbox>
                    <!-- <label><input type="checkbox" :checked="filterBy.category.includes(oneCategory)" @change="setCategory(oneCategory)" />{{oneCategory}}</label> -->
                    <!-- <el-checkbox class="checkbox-filter" :label='oneCategory' :value="oneCategory" v-model="filterBy.category" @change="setFilter">{{oneCategory}}</el-checkbox> -->
                </li>
              </ul>
        </div>
        </div>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import GameService from "@/services/GameService.js";
import { eventBus, EVENT_SET_FILTER } from "@/services/EventBusService.js";

export default {
  components: {},
  data() {
    return {
      elad : true,
      filterBy: {
        allByName: true,
        name: "",
        allTypes: true,
        type: [],
        allCategories: true,
        category: [],
        userId: ""
      },
      allFilterTypes: null,
      allFilterCategories: null
    };
  },
  created() {
    //   var self = this;
    //   this.setFilter = debounce(() => {
    //     console.log('setFilter in gameFilter cmp');

    //     self.$store.dispatch({ type: 'setFilter', filterBy: this.filterBy })
    // }, 2000)
    console.log("creted game filter", this.filterBy);

    this.allFilterTypes = this.$store.getters.types;
    console.log("allFilterTypes in home", this.allFilterTypes);
    this.allFilterCategories = this.$store.getters.categories;
    console.log("allFilterCategories in home", this.allFilterCategories);

    this.filterBy = JSON.parse(
      JSON.stringify(this.$store.state.GameModule.filterBy)
    );

    this.$store.dispatch({
      type: "setFilter",
      filterBy: this.$store.state.GameModule.filterBy
    });

    // eventBus.$on(EVENT_SET_FILTER, filterBy => {
    //   this.filterBy = filterBy;
    //   console.log('this.filterBy in filter cmp after eventBus', this.filterBy);
    // })
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
      // if (this.filterBy.category.length > 0) this.filterBy.allCategories = false;
      // if (this.filterBy.type.length !== this.$store.getters.types.length)
      //   this.filterBy.allTypes = false;
      // if (this.filterBy.allTypes)
      //   this.filterBy.type = this.$store.getters.types;
      // console.log("this.filterBy.type", this.filterBy.type);
      // if (
      //   this.filterBy.category.length !== this.$store.getters.categories.length
      // )
      //   this.filterBy.allCategories = false;
      // if (this.filterBy.allCategories)
      //   this.filterBy.category = this.$store.getters.categories;
      // console.log("this.filterBy.type", this.filterBy.category);
      // if (this.filterBy.allCategories) this.filterBy.category = this.allFilterCategories;

      var filterBy = JSON.parse(JSON.stringify(this.filterBy));
      this.$store.dispatch({ type: "setFilter", filterBy }).then(games => {
        //   eventBusService.$emit(SHOW_MSG, {
        //     txt: `${Games.length} Games Loaded!`
        //   });
      });
    }, 2000),
    toggleAllCategories() {
      this.filterBy.allCategories = !this.filterBy.allCategories;
      if (this.filterBy.allCategories) this.filterBy.category = [];
      this.setFilter();
    },
    setCategory(category) {
      var categoryIdx = this.filterBy.category.indexOf(category);
      if (categoryIdx !== -1) {
        this.filterBy.category.splice(categoryIdx, 1);
         if (this.filterBy.category.length === 0) this.toggleAllCategories();
      } else {
        this.filterBy.category.push(category);
        if (this.filterBy.allCategories) this.toggleAllCategories()
      }


      this.setFilter();
    }
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
  top: 15%;
  margin: rem(20px);
}
</style>