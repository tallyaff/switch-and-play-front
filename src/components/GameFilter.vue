<template>
  <div class="filter-gallery-container">
        <form @submit.prevent="setFilter" class="search-in-gallery">
            <el-input class="search-input" type="text" v-model="filterBy.name" placeholder="Search for games" autofocus></el-input>
            <!-- <button>Search</button> -->
            <el-button class="btn search-btn" type="primary">Search</el-button>
        </form>
        <div class="checkbox-filter-container capitalize">
        <el-checkbox v-show='false' class="checkbox-filter" label="All" value="all" v-model="filterBy.allByName" @change="setFilter"></el-checkbox>
        <div>
            <h3>Type</h3>
                <!-- <el-checkbox class="checkbox-filter" label="All types" value="all-types" v-model="filterBy.allTypes" @change="setFilter"></el-checkbox>
                <ul v-if="allFilterTypes">
                  <li v-for="oneType in allFilterTypes" :key="oneType._id"> 
                      <el-checkbox class="checkbox-filter" :label='oneType' :value="oneType" v-model="filterBy.type" @change="setFilter"></el-checkbox>
                  </li>
                </ul> -->
            <el-checkbox class="checkbox-filter" label="All types" :value="filterBy.allTypes" @change="toggleAllTypes"></el-checkbox>
              <el-checkbox-group v-model="filterBy.type" v-if="allFilterTypes" @change="setFilter">
                <ul>
                  <li v-for="oneType in allFilterTypes" :key="oneType">
                    <el-checkbox class="checkbox-filter" :label="oneType"></el-checkbox>
                  </li>
                </ul>
              </el-checkbox-group>
            <h3>Category</h3>
              <el-checkbox class="checkbox-filter" label="All categories" :value="filterBy.allCategories" @change="toggleAllCategories"></el-checkbox>
              <el-checkbox-group class="checkbox-filter" v-model="filterBy.category" v-if="allFilterCategories" @change="setFilter">
                <ul>
                  <li v-for="oneCategory in allFilterCategories" :key="oneCategory">
                    <el-checkbox class="checkbox-filter" :label="oneCategory"></el-checkbox>
                  </li>
                </ul>
              </el-checkbox-group>
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
    // console.log("creted game filter", this.filterBy);

    this.allFilterTypes = this.$store.getters.types;
    // console.log("allFilterTypes in home", this.allFilterTypes);
    this.allFilterCategories = this.$store.getters.categories;
    // console.log("allFilterCategories in home", this.allFilterCategories);

    this.filterBy = JSON.parse(
      JSON.stringify(this.$store.state.GameModule.filterBy)
    );

    this.$store.dispatch({
      type: "setFilter",
      filterBy: this.$store.state.GameModule.filterBy
    });
  },
  methods: {
    setFilter: debounce(function() {
      var filterBy = JSON.parse(JSON.stringify(this.filterBy));
      this.$store.dispatch({ type: "setFilter", filterBy }).then(games => {});
    }, 500),
    toggleAllTypes() {
      this.filterBy.allTypes = !this.filterBy.allTypes;
      if (this.filterBy.allTypes) this.filterBy.type = [];
      this.setFilter();
    },
    toggleAllCategories() {
      this.filterBy.allCategories = !this.filterBy.allCategories;
      if (this.filterBy.allCategories) this.filterBy.category = [];
      this.setFilter();
    },
  },
  watch: {
    ['filterBy.type']() {
      if (this.filterBy.type.length > 0) this.filterBy.allTypes = false;
    },
    ['filterBy.category']() {
      if (this.filterBy.category.length > 0) this.filterBy.allCategories = false;
    },
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