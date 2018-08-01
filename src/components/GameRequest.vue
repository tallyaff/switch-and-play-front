<template>
    <div class="game-request">
        <h1>Create your request!</h1>   
        <el-form>
            <span>would like to switch the next games:</span>
            <br>
            <li class="game" v-for="game in games" :key="game._id">
                <game-preview :game="game" :gameCheckbox="true" @check="updateGamesToSwitch">
                </game-preview>
                <li/>
                <el-checkbox class="checkbox-game-request" label="i will pick it up from your place"></el-checkbox>
                <el-checkbox class="checkbox-game-request" label="you will pick it up from my place"></el-checkbox>
                <el-checkbox class="checkbox-game-request" label="lets talk about it"></el-checkbox>
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                 placeholder="Enter some words to your request" v-model="textareaReq">
                </el-input>
                <el-button @click="sendRequest">Send your request!</el-button>
        </el-form>
    </div>
</template>


<script>
import GamePreview from "@/components/GamePreview.vue";
import MatchService from "../services/MatchService.js";

export default {
  name: "GameRequest",
  created() {
    this.$store.dispatch({ type: "gamesById", games: this.user.games });
  },
  data() {
    return {
      textareaReq: "",
      // gameCheckbox: true,
      gamesToSwitch: [],
      ownerUserId: null
    };
  },
  components: {
    GamePreview
  },
  methods: {
    updateGamesToSwitch(data) {
      if (data.checked) {
        this.gamesToSwitch.push(`ObjectId("${data.gameId}")`);
      } else {
        const gameIdx = this.gamesToSwitch.findIndex(
          game => game._id === data.gameId
        );
        this.gamesToSwitch.splice(gameIdx, 1);
      }
    },
    sendRequest() {
      this.$store
        .dispatch({ type: "loadGame", gameId: this.$route.params.gameId })
        .then(game => {
          this.ownerUserId = game.userId;
          const matchReq = {
            userPassive: {
              userId:this.ownerUserId,
              gameId: this.$route.params.gameId
            },
            userActive: {
              userId: this.user._id,
              games: this.gamesToSwitch
            },
            isMatch: false
          };
          MatchService.createMatch(matchReq);
        });
    }
  },
  computed: {
    user() {
      console.log(this.$store.getters.loggedUser);
      return this.$store.getters.loggedUser || {};
    },
    games() {
      console.log(this.$store.getters.getUserGames);
      return this.$store.getters.getUserGames || [];
    }
  },
  watch: {
    games(games) {
      this.gamesToSwitch = games.map(game => game._id)
      }
  }
};
</script>

<style scoped lang="scss">
    @import "~@/assets/scss/style.scss";
    .checkbox-game-request {
      color: $main-color;
    }
    h1{
      margin-bottom: 40px;
    }
    
</style>