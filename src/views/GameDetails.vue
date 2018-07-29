
<template>
  <section class="GameDetails" v-if="currGame">
    <h1>{{currGame.name}}</h1>
      <ul class="game-details-container">
        <li><img :src="currGame.src"></li>
        <li>{{currGame.desc}}</li>
        <li>{{currGame.type}}</li>
        <li>{{currGame.category}}</li>
        <li>{{currGame.consition}}</li>
        <li>{{currGame.addedAt}}</li>
      </ul>
      <game-request :game="currGame" v-if="requesting"></game-request>
      <el-button v-if="!requesting" @click="checkIfLogin">I want this toy!</el-button>
    </section>
  </template>
<script>
import GameRequest from "@/components/GameRequest.vue";
export default {
  name: "GameDetails",
  data() {
    return {
      currGame: null,
      requesting: null
    };
  },
  created() {
    this.loadGame();
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    loadGame() {
      this.$store
        .dispatch({ type: "loadGame", gameId: this.$route.params.gameId })
        .then(game => {
          this.currGame = game;
          // eventBusService.$emit(SHOW_MSG, {txt: `Todo was removed`})
        });
    },
    checkIfLogin() {
      console.log("this.loggedinUser", this.loggedinUser);
      if (!this.loggedinUser) {
        swal({
          title: "Please login to switch a game!",
          buttons: ["Not now", "Login"]
        }).then(willLogin => {
          if (willLogin) {
            this.$router.push("/login");
          } else {
            swal.close();
          }
        });
      } else this.requesting = true;
    }
    // showRequest() {
    //   this.requesting = true;
    // }
  },
  components: {
    GameRequest
  }
};
</script>

<style>
</style>