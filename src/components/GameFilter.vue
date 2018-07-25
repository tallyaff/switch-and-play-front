<template>
  <div class="home">
        <form @submit.prevent="setFilter" class="search">
            <input type="text" v-model="filterBy.name" placeholder="Search for games" autofocus>
            <button>Search</button>
        </form>
       <label>All<input type="checkbox" v-model="filterBy.name" @change="setFilter"/></label>

        <div>
            <h3>Type</h3>
            <input type="checkbox" name="feature" value="baby" checked v-model="filterBy.type" @change="setFilter"/>
            <label for="baby">Baby</label>
            <input type="checkbox" name="feature" value="child" checked v-model="filterBy.type" @change="setFilter"/>
            <label for="child">Child</label>
            <input type="checkbox" name="feature" value="teen" checked v-model="filterBy.type" @change="setFilter"/>
            <label for="teen">Teen</label>
        </div>
        <div>
            <h3>Category</h3>
            <input type="checkbox" name="feature" value="console" checked v-model="filterBy.category" @change="setFilter"/>
            <label for="console">Console</label>
            <input type="checkbox" name="feature" value="doll" checked v-model="filterBy.category" @change="setFilter"/>
            <label for="doll">Doll</label>
            <input type="checkbox" name="feature" value="game-board" checked v-model="filterBy.category" @change="setFilter"/>
            <label for="game-board">Game board</label>
            <input type="checkbox" name="feature" value="lego" checked v-model="filterBy.category" @change="setFilter"/>
            <label for="lego">Lego</label>
            <input type="checkbox" name="feature" value="playmobil" checked v-model="filterBy.category" @change="setFilter"/>
            <label for="playmobil">Playmobil</label>
            <input type="checkbox" name="feature" value="puzzle" checked v-model="filterBy.category" @change="setFilter"/>
            <label for="puzzle">Puzzle</label>
            <input type="checkbox" name="feature" value="wheels" checked v-model="filterBy.category" @change="setFilter"/>
            <label for="wheels">Wheels</label>
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
