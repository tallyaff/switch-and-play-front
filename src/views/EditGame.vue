<template>
    <section>
        <div class="edit-game" v-if="gameCopy">
 <h2>Id: {{gameCopy._id}}</h2>
          <form @submit.prevent="savegame">
              <h2>game name:</h2>
              <input type="text" v-model="gameCopy.name">
              <h2>game type:</h2>
              <input type="text" v-model="gameCopy.type">
              <h2>game category:</h2>
              <input type="text" v-model="gameCopy.createdAt">
              <h2>game description:</h2>
              <input type="text" v-model="gameCopy.inStock">
              <h2>game condition:</h2>
              <input type="text" v-model="gameCopy.inStock">
              <button>Save</button>
          </form>
        </div>
    </section>
</template>

<script>
import GameService from '@/services/GameService.js'

export default {
  name: "editGame",
  data() {
    return {
      currGame: null,
      gameCopy: null
    };
  },
  created() {
    this.loadGame();
  },
  methods: {
    loadGame() {
    //   console.log("this.$route.params in edit cmp", this.$route.params.gameId);
      if (this.$route.params.gameId) {
        // console.log("has params!!");
        this.$store
          .dispatch({ type: "loadGame", gameId: this.$route.params.gameId })
          .then(game => {
            this.currGame = game;
            // console.log("this.currGame in edit cmp", this.currGame);
            this.gameCopy = JSON.parse(JSON.stringify(this.currGame));
            // console.log("this.gameCopy new in edit cmp", this.gameCopy);
          });
      } else {
        console.log("has No params!!");
        this.gameCopy = GameService.createEmptyGame();
      }
    },
    saveGame() {
      this.$store
        .dispatch({ type: "saveGame", savedGame: this.gameCopy })
        .then(game => {
          console.log("savedGame from game APP");
        });
    }
  }
};
</script>
<style>
</style>
