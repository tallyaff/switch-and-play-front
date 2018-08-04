
<template>
    <section class="show-match flex column align-center space-between">
        <h1 class="text congrats">Congrats we have a match!!!</h1>
        <div class="images-container margin-bottom flex align-center space-between">
            <div v-if="gameActive" class="your-choose-container margin-bottom flex column align-center">
                <h2 class="margin-bottom">You chose this amazing</h2>
                <h2 class="game-name margin-bottom capitalize">{{game.name}}</h2>
                <img :src="game.src"/>
            </div>
            <!-- <div v-if="gamePassive" class="game-match-container"> -->
                <!-- <h2 class="margin-bottom">You swapped it with your awesome</h2> -->
                <!-- <h2 class="game-name capitalize margin-bottom">{{newMatch.userPassiveGame.name}}</h2> -->
                <!-- <img :src="gamePassive.src"/> -->
            <!-- </div> -->
        </div>
        <el-button @click="schedule" class="btn-schedule" type="primary">Schedule swap</el-button>
        <div v-if="userActive && isSchedule" class="meet-form">
            <h3 class="text margin-bottom"><span class="username capitalize">{{userActive.username}}</span> leaves in {{userActive.city}}</h3>
            <form  @submit.prevent="sendMeetForm" class="form-meeting flex column">
                 <div class="form-input-title flex align-center space-between margin-bottom">
                    <!-- <h3 class="small-text">Type a message:</h3> -->
                    <el-input class="form-input form-textarea" type="textarea" v-model="formDetails.text"></el-input>                    
                </div>
                <div class="btns-container">
                 <el-button class="btn send-btn" type="primary" @click="sendMeetForm">Send</el-button>
                 <el-button class="btn cancel-btn" type="info">Cancel</el-button>
                </div>
            </form>
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
    </section>    
</template>

<script>
import GameService from "@/services/GameService.js";
import UserService from "@/services/UserService.js";

export default {
  name: "showMatch",
  props: ["game"],
  data() {
    return {
      gameActive: null,
      userActive: null,
      gamePassive: null,
      formDetails: {
        email: null,
        subject: `Hi let's meet to swap the games`,
        text: `Please type yours message`
      },
      isSchedule: false,
    };
  },
  created() {
      console.log('####', this.match);
      
    this.match = {
      _id: "5b60bd23ea5c0347c8e2d120",
      userPassive: {
        userId: "5b5867f85d5aba03c1ce2e83",
        gameId: "5b596cf23af932a16bcd90a0"
      },
      userActive: {
        userId: "5b589ba35d5aba03c1d35692",
        games: ["5b596cf23af932a16bcd90ac"]
      },
      isMatch: false
    };
    this.game = {
      _id: "5b596cf23af932a16bcd90ac",
      name: "green tractor",
      src: "img/gameImg/wheels/tractor.jpg",
      type: "baby",
      category: "wheels",
      desc: "nice green tractor for babys!",
      userId: "5b589ba35d5aba03c1d35692",
      condition: "Brand new",
      isAvailble: true,
      isNew: false,
      addedAt: 1533016520092
    };
    // console.log('game from match##:', this.game);
    // console.log('match from match##:', this.match);
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
      this.userActiveId = this.match.userActive.userId;
      UserService.getUserById(this.userActiveId).then(user => {
        console.log("this.userActive in show match:", user);
        this.userActive = user;
        this.formDetails.email = this.userActive.email;

      });
    },
    getGamePassive() {
      this.gamePassiveId = this.match.userPassive.gameId;
      console.log("gameId in show match", this.gamePassiveId);
      GameService.getGameById(this.gamePassiveId).then(game => {
        console.log("this.gamePassive in show match:", game);
        this.gamePassive = game;
      });
    },
    sendMeetForm() {
       window.location = open(`https://mail.google.com/mail/?view=cm&fs=1&to=${this.formDetails.email}&su=${this.formDetails.subject}&body=${this.formDetails.text}`, "_blank");
       // reset feilds
       this.userActive.email = '';
       this.userActive.subject = '';
       this.userActive.text = '';
    },
    schedule() {
        this.isSchedule = !this.isSchedule;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";
    .show-match {
        // width: rem(1200px);
        // border: 1px solid;
    }

    .text, .small-text {
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
    }

    .congrats {
        font-family: 'Ubuntu-regular';
        font-size: rem(60px);
        color: $secondary-color;
        text-shadow: 2px 2px $main-color;
        margin: rem(20px);
    }

    .your-choose-container {
        border: 1px solid $border-color;
    }

    .images-container {
        width: rem(680px);
        //to delete when we have the other game
        justify-content: center;
    }

    .images-container img {
        width: 100%;
    }

    .your-choose-container, .game-match-container {
        padding: rem(20px);
        width: 50%;
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
        align-self: flex-end;
    }
</style>
