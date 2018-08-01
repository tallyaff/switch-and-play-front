<template>
    <div class="game-request">
        <h1>Its time to Create your request!</h1>   
        <el-form>
            <span class="title-games">I would like to switch the next games:</span>
            <br>
            <div class="games-container flex">
            <li class="game" v-for="game in games" :key="game._id" >
                <game-preview :game="game" :location="true" :gameCheckbox="true" @check="updateGamesToSwitch">
                </game-preview>
                <li/>
           </div>
                <!-- <el-checkbox class="checkbox-game-request" label="i will pick it up from your place"></el-checkbox>
                <el-checkbox class="checkbox-game-request" label="you will pick it up from my place"></el-checkbox>
                <el-checkbox class="checkbox-game-request" label="lets talk about it"></el-checkbox> -->
                <div class="title-txt-area">Add some words:</div>
                <br>
                <div class="req-container flex column">
                <el-input class="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                 placeholder="Enter some words to your request" v-model="textareaReq">
                </el-input>
                </div>
                <el-button class="btn-request" @click="sendRequest">Send your request!</el-button>
        </el-form>
    </div>
</template>


<script>
import GamePreview from "@/components/GamePreview.vue";
import MatchService from "../services/MatchService.js";

export default {
  name: "GameRequest",
  created() {
    this.$store.dispatch({ type: "gamesById", games: this.user.games })
    
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
        this.gamesToSwitch.push(data.gameId);
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
              userId: this.ownerUserId,
              gameId: this.$route.params.gameId
            },
            userActive: {
              userId: this.user._id,
              games: this.gamesToSwitch,
            },
            textareaReq: this.textareaReq,
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
      this.gamesToSwitch = games.map(game => game._id);
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
      margin-bottom: 80px;
      color: #f56c6c;
    }
    .btn-back{
      font-size: 10px;
    &:hover {
      color: $main-color;
    }
    }
    .title-games,.title-txt-area{
    text-align: left;
    float: left;
    margin-left: 40px;
    color: $main-color;
    }
    .games-container{
    margin-top: 40px;
    margin-left: 40px;
    flex-wrap: wrap;

    }
    li{
    padding: 20px;
    }
    .textarea{
      width: 60%;
      margin-left: 60px;
      margin-top: 20px;
    }
    .btn-request{
      margin-top: 60px;
      margin-bottom: 20px;
      
    } 
    .req-container{
      align-items: center;
    }   
</style>