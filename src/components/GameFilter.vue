<template>
  <div class="filter-gallery-container flex flex-start">
    <el-button class="filter">
        <font-awesome-icon icon="filter" class="fiter-icon" 
         :class="{close: isFilterOpen}" @click="isFilterOpen=!isFilterOpen"/>
</el-button>

        <form @submit.prevent="setFilter" class="search-in-gallery">
            <el-input class="search-input" type="text" v-model="filterBy.name" placeholder="Search for games" autofocus></el-input>
                <el-button class="btn search-btn" type="primary"><font-awesome-icon icon="search"></font-awesome-icon></el-button>
                <el-button class="btn search-btn-text" type="primary">Search</el-button>

        </form>

        <div v-if="isFilterOpen" class="checkbox-filter-container capitalize" :class="{open: isFilterOpen}" >
              <div class="exit">
        <font-awesome-icon icon="times" class="exit-icon" 
         :class="{close: isFilterOpen}" @click="isFilterOpen=!isFilterOpen"/>
</div>

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
                <ul class="checkbox flex column">
                  <li class="checkbox" v-for="oneType in allFilterTypes" :key="oneType">
                    <el-checkbox class="checkbox-filter" :label="oneType"></el-checkbox>
                  </li>
                </ul>
              </el-checkbox-group>
            <h3>Category</h3>
              <el-checkbox class="checkbox-filter" label="All categories" :value="filterBy.allCategories" @change="toggleAllCategories"></el-checkbox>
              <el-checkbox-group class="checkbox-filter" v-model="filterBy.category" v-if="allFilterCategories" @change="setFilter">
                <ul class="checkbox flex column">
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
      isFilterOpen: false,
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
    }
  },
  watch: {
    ["filterBy.type"]() {
      if (this.filterBy.type.length > 0) this.filterBy.allTypes = false;
    },
    ["filterBy.category"]() {
      if (this.filterBy.category.length > 0)
        this.filterBy.allCategories = false;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";

.checkbox-filter-container {
  text-align: left;
  padding-left: 20px;
  transition: 0.5s;
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 92;
  left: 0;
  background-color: $secondary-color-hover;
  padding-top: 15px;

}
// .checkbox-filter-container.open {
//   transform: translate(0, 0);
// }

.checkbox-filter {
  color: $secondary-color;
  padding: 5px;
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
  // position: absolute;
  // top: 120px;
  // margin: rem(20px);
  // left: 143px;
}
h3 {
  text-align: left;
  margin-bottom: 10px;
  margin-top: 30px;
}

.filter-icon {
  display: block;
  width: 25px;
  height: 45px;
}

.filter {
  // margin-top: 20px;
  width: 25px;
  height: 38px;
  text-align: left;
  background-color: $main-color;
  color: white;
  margin-right: 20px;
  // position: absolute;
}

.search-btn-text {
  display: none;
}

.search-btn {
  // display: none;
  // height: 50px;
  width: 25px;
  height: 38px;
  font-size: rem(14px);
  background-color: $main-color;
}
.search-in-gallery .search-input {
  width: 180px;

  margin-bottom: rem(20px);
  // height: 100px;
  // box-shadow: inset 0 0 3px 0px #000000ab;
}

.search-in-gallery {
  // position: absolute;
  top: 20%;
}
.filter-gallery-container {
  margin-top: 30px;
  padding:0 5px;
}
// @media (min-width: 300px) {
//   .filter-gallery-container{
//     display:none;
//   }
//   .filter-icon{
//   display:block;
// }

// }
.exit{
  cursor: pointer;
    float: right;
    padding-right: 10px;
}

@media (min-width: 420px) {

.filter-gallery-container {
  padding:0 20px;
}
}


@media (min-width: 980px) {
  .search-in-gallery .search-input {
    width: 350px;
  }
  .search-btn {
    display: none;
  }
  .search-btn-text {
    font-family: "Ubuntu-regular";
    display: block;
    height: 40px;
    float: right;
    font-size: 1.125rem;
    background-color: $main-color;
  }
  .el-button + .el-button {
    margin-left: 0;
  }
}
</style>