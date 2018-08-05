
<template>
    <section class="show-match flex column align-center space-between">
        <div class="show-match-container flex column align-center justify-center">
            <h1 class="text congrats">Congrats we have a match!!!</h1>
            <div class="images-container margin-bottom flex align-center space-between">
                <div v-if="gameActive" class="your-choose-container margin-bottom flex column align-center space-between">
                    <h2 class="card-title margin-bottom">You chose this amazing</h2>
                    <div class="name-image-container flex column align-center space-between">
                        <h2 class="game-name margin-bottom capitalize">{{game.name}}</h2>
                        <img class="game-image" :src="game.src"/>
                    </div>
                </div>
                <img class="swap-arrows" src="img/swaparrows.png"/>
                <div v-if="gamePassive" class="game-match-container margin-bottom flex column align-center space-between">
                  <h2 class="card-title margin-bottom">You swapped it with your awesome</h2>
                  <div class="name-image-container flex column align-center space-between">
                    <h2 class="game-name capitalize margin-bottom">{{match.userPassiveGame.name}}</h2>
                    <img class="game-image" :src="gamePassive.src"/>
                  </div>
                </div>
            </div>
            <!-- <el-button @click="schedule" class="btn-schedule" type="primary">Schedule swap</el-button> -->
            <!-- <div v-if="userActive && isSchedule && currRecieved" class="meet-form align-center justify-center"> -->
            <div v-if="userActive" class="meet-form align-center justify-center">
                <h3 class="text margin-bottom"><span class="username capitalize">{{userActive.username}}</span> lives in {{userActive.city}}, send him/her a message</h3>
                <div class="form-meeting flex column align-center justify-center">
                    <div class="form-input-title">
                        <!-- <h3 class="small-text">Type a message:</h3> -->
                        <el-input class="form-input form-textarea" type="textarea" v-model="textareaRes" placeholder="Please type yours message"></el-input>                    
                    </div>
                    <div class="btns-container">
                    <el-button class="btn send-btn" type="primary" @click="itsMatch(game._id, match._id)">Send</el-button>
                    <!-- <el-button class="btn cancel-btn" type="info">Cancel</el-button> -->
                    </div>
                </div>
            </div>

        <!-- <el-button @click="schedule" class="btn-schedule" type="primary">Schedule swap</el-button> -->
        <!-- <div v-if="userActive && isSchedule" class="meet-form">
            <h3 class="text margin-bottom"><span class="username capitalize">{{userActive.username}}</span> leaves in {{userActive.city}}</h3>
            <el-form  @submit.prevent="sendMeetForm" class="form-meeting flex column">
                <div class="form-input-title flex align-center space-between margin-bottom">
                    <h3 class="small-text">Send <span class="username capitalize">{{userActive.username}}</span> email:</h3>
                    <el-input v-if="formDetails.email" class="form-input email-input margin-bottom" type="text" v-model="formDetails.email"></el-input>
                </div>
                 <div class="form-input-title flex align-center space-between margin-bottom">
                    <h3 class="small-text">Subject:</h3>
                    <el-input class="form-input subject-input" type="text" v-model="formDetails.subject" autofocus></el-input>   
                </div>
                 <div class="form-input-title flex align-center space-between margin-bottom">
                    <h3 class="small-text">Message:</h3>
                    <el-input class="form-input form-textarea" type="textarea" v-model="formDetails.text"></el-input>                    
                </div>
                <div class="btns-container">
                 <el-button class="btn send-btn" type="primary" @click="sendMeetForm">Send</el-button>
                 <el-button class="btn cancel-btn" type="info">Cancel</el-button>
                </div>
            </el-form>
        </div> -->
        </div>
    </section>    
</template>

<script>
import GameService from "@/services/GameService.js";
import UserService from "@/services/UserService.js";

export default {
  name: "showMatch",
  props: ["game", "match"],
  data() {
    return {
        choosenGameId: '',
        currMatchId: '',
        gameActive: null,
        userActive: null,
        gamePassive: null,
        textareaRes: ``,
        // isSchedule: false,
        };
  },
  created() {
      console.log('####', this.match);
      console.log('####@@9', this.game);
        this.gameActive = this.game;
        this.getUserActive();
        this.getGamePassive();
  },
  computed: {
    userPassive() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    handleMatch() {
      console.log("game from match@@:", this.game);
    },
    getUserActive() {
      let userActiveId = this.match.userActive.userId;
      UserService.getUserById(userActiveId).then(user => {
        console.log("this.userActive in show match:", user);
        this.userActive = user;
      });
    },
    getGamePassive() {
      let gamePassiveId = this.match.userPassive.gameId;
      console.log("gameId in show match", gamePassiveId);
      GameService.getGameById(gamePassiveId).then(game => {
        console.log("this.gamePassive in show match:", game);
        this.gamePassive = game;
      });
    },
    // schedule() {
    //     this.isSchedule = !this.isSchedule;
    // },
    itsMatch(gameId, matchId) {
        // this.choosenGameId = gameId;
        // console.log('this.choosenGame in itsMatch', this.choosenGame);
        console.log('this.gameeeeee', this.game._id);
        // this.currMatchId = matchId;
        console.log('this.currRecieved in itsMatch', this.match._id);
        // const match = {gameId: this.choosenGame, match: this.recieve}
        const match = {gameId: this.game._id, matchId: this.match._id, textareaRes: this.textareaRes}
        // console.log('game id', this.choosenGame);
        // console.log('match id', this.currRecieved);
        // console.log('###match:!!', match);
        this.$store.dispatch({ type: "updateMatch", matchDetails: match })
    },
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";
    .show-match {
        max-width: rem(760px);
    }

    .show-match-container {
        width: 100%;
    }

    .images-container {
 
    }


    .text, .small-text, .card-title {
        font-family: 'Ubuntu-regular';
    }

    .small-text {
        font-size: rem(15px);
    }

    .margin-bottom {
        margin-bottom: rem(10px);
    }

    .btn-schedule {
        margin-bottom: rem(40px);
        font-size: 20px;
    }

    .congrats {
        font-family: 'Ubuntu-regular';
        font-size: rem(60px);
        color: $secondary-color;
        text-shadow: 2px 2px $main-color;
        margin: 20px 0 40px 0;
    }

    .your-choose-container, .game-match-container {
        border: 1px solid $border-color;
        width: 500px;
        height: 400px;
        padding: rem(20px);
        width: 50%;
    }

    // .your-choose-container .card-title {
    //     height: 40%;
    // } 
    
    // .game-match-container .card-title {
    //     height: 10%;
    // }


    .name-image-container {
        height: 80%;
    }

    .images-container .game-image {
        width: 70%;
    }

    .swap-arrows {
        width: 85px;
        height: 80px;
        align-self: center;
        margin: 20px;
    }

    .your-choose-container h2, .game-match-container h2 {
      font-size: rem(20px);
    }

    .image-container {
        width: rem(200px);
    }

    .your-choose-container .game-name, .game-match-container .game-name {
        font-family: 'PaytoneOne';
        color: $main-color;
        
    }

    .meet-form * {
        margin-bottom: 10px;
    }

    .form-input-title {
        width: rem(500px);
    }

    .form-meeting .form-input {
        width: 80%;
    }


    .form-textarea {
        line-height: rem(300px);
    }

    .cancel-btn {
        background-color: $border-color;
        border: 0;
    }

    .btns-container {
    }
</style>
