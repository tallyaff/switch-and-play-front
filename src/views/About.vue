<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ul>
      <!-- <li v-for="game in games"> -->
        {{game.name}}
      <!-- </li> -->
      </ul>
  </div>
</template>

<script>

export default {
  // import {LOAD_GAMES} from '../store/game-module.js'
  created() {
    this.games();
    
  },
  computed: {
    games() {
      return this.$store.getters.gamesForDisplay
      },
  },
  methods: {
    gamesToShow() {
      this.$store.dispatch(LOAD_GAMES)
      .then((games)=> {
      })
      .catch(err =>{
          // console.log('error loading');
      })
    },
}
</script>
