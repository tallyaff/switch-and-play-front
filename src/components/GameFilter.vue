<template>
  <div class="home">
        <form @submit.prevent="setFilter" class="search">
            <input type="text" v-model="filterBy.name" placeholder="Search for games" autofocus>
            <button>Search</button>
        </form>
            <label >
              <input type="checkbox" name="feature" value="all" v-model="filterBy.allByName" @change="setFilter"/>All
            </label>
        <div>
            <h3>Type</h3>
            <label >
              <input type="checkbox" name="feature" value="baby" v-model="filterBy.type" @change="setFilter"/>Baby
            </label>
            <label >
              <input type="checkbox" name="feature" value="child" v-model="filterBy.type" @change="setFilter"/>Child
            </label>
            <label >
              <input type="checkbox" name="feature" value="teen" v-model="filterBy.type" @change="setFilter"/>Teen
            </label>
        </div>
        <div>
            <h3>Category</h3>
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
            </label>
        </div>
  </div>
</template>

<script>
import debounce from 'lodash.debounce';
import GameService from '@/services/GameService.js';

export default {
  name: 'home',
  components: {

  },
  data() {
    return {
        filterBy: {
          allByName: true,
          name: '',
          type: [],
          category: [],
          userId: ''
        }
    }
  },
  created() {
    //   var self = this;
    //   this.setFilter = debounce(() => {
    //     console.log('setFilter in gameFilter cmp');
        
    //     self.$store.dispatch({ type: 'setFilter', filterBy: this.filterBy })
    // }, 2000)
  },
  computed: {
  },
  methods: {
    setFilter: debounce(function() {
        console.log('setFilter in gameFilter cmp');
        
        this.$store.dispatch({ type: 'setFilter', filterBy: this.filterBy })
    }, 2000)
  },
};
</script>
