<template>
  <div class="home">
        <form @submit.prevent="setFilter" class="search">
            <input type="text" v-model="filterBy.name" placeholder="Search for games" autofocus>
            <button>Search</button>
        </form>
       <label>All<input type="checkbox" v-model="filterBy.name" @change="setFilter"/></label>

        <div>
            <h3>Type</h3>
            
            <label >
              <input type="checkbox" name="feature" value="baby" checked v-model="filterBy.type" @change="setFilter"/>Baby
            </label>
            <label >
              <input type="checkbox" name="feature" value="child" checked v-model="filterBy.type" @change="setFilter"/>Child
            </label>
            <label >
              <input type="checkbox" name="feature" value="teen" checked v-model="filterBy.type" @change="setFilter"/>Teen
            </label>
        </div>
        <div>
            <h3>Category</h3>
             <label >
              <input type="checkbox" name="feature" value="console" checked v-model="filterBy.category" @change="setFilter"/>Console
            </label>
             <label >
              <input type="checkbox" name="feature" value="doll" checked v-model="filterBy.category" @change="setFilter"/>Doll
            </label>
             <label >
              <input type="checkbox" name="feature" value="game-board" checked v-model="filterBy.category" @change="setFilter"/>Game board
            </label>
             <label >
              <input type="checkbox" name="feature" value="lego" checked v-model="filterBy.category" @change="setFilter"/>Lego
            </label>
             <label >
              <input type="checkbox" name="feature" value="playmobil" checked v-model="filterBy.category" @change="setFilter"/>Playmobil
            </label>
             <label >
              <input type="checkbox" name="feature" value="puzzle" checked v-model="filterBy.category" @change="setFilter"/>Puzzle
            </label>
             <label >
              <input type="checkbox" name="feature" value="wheels" checked v-model="filterBy.category" @change="setFilter"/>Wheels
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
