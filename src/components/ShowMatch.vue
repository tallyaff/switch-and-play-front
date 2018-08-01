
<template>
    <section class="show-match">
        <router-link :to="'/game'" type="button">back to gallery</router-link>
        <h1>Congrats we have a match!!!</h1>
        <div v-if="gameActive" class="your-choose-container">
            <h2>You choose this amazing <span class="game-name">{{gameActive.name}}</span></h2>
            <img :src="gameActive.src"/>
        </div>
        <div v-if="gamePassive" class="game-match-container">
            <h2>You swapped it with your awesome <span class="game-name">{{gamePassive.name}}</span></h2>
            <img :src="gamePassive.src"/>
        </div>
        <div v-if="userActive" class="meet-form">
            <h3><span class="username">{{userActive.username}}</span> leaves in {{userActive.city}}</h3>
            <el-form @submit.prevent="sendMeetForm" class="search-in-gallery">
                <!-- <el-input class="search-input" type="text" v-model="filterBy.name" placeholder="Search for games" autofocus></el-input> -->
                <h3>Send <span class="username">{{userActive.username}}</span> email:</h3>
                <el-input class="email-input" type="text" :value="userActive.email" v-model="formDetails.email"></el-input>
                <el-input class="subject-input" type="text" v-model="formDetails.subject"></el-input>
                <!-- <el-input type="textarea" v-model="gameCopy.desc"/> -->
                <el-input type="textarea" :value="userActive.email" v-model="formDetails.text" autofocus />
                <el-button class="btn send-btn" type="primary">Send</el-button>
            </el-form>
        </div>
    </section>    
</template>

<script>
import GameService from "@/services/GameService.js";
import UserService from "@/services/UserService.js";

export default {
  name: "showMatch",
  props: ["match", "game"],
  data() {
    return {
      gameActive: null,
      userActive: null,
      gamePassive: null,
      formDetails: {
        email: null,
        subject: null,
        text: null
      }
    };
  },
  created() {
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
    //    window.location = open(`https://mail.google.com/mail/?view=cm&fs=1&to=${this.userActive.email}&su=${this.userActive.subject}&body=${this.userActive.text}`, "_blank");
       window.location = open(`https://mail.google.com/mail/?view=cm&fs=1&to=liron.steinberger@gmail.com&su=${this.userActive.subject}&body=${this.userActive.text}`, "_blank");
    //    window.location = open(`https://mail.google.com/mail/?view=cm&fs=1&to=liron.steinberger@gmail.com&su=${SUBJECT}&body=${BODY}`, "_blank");
       // reset feilds
       this.userActive.email = '';
       this.userActive.subject = '';
       this.userActive.text = '';
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";
    .show-match {
        border: 1px solid;
        background-color: rgb(228, 231, 230); /*temp color- change later*/
    }

    .your-choose-container .game-name {
        font-family: 'PaytoneOne';
        color: $main-color;
        font-size: rem(20px);
    }
</style>
