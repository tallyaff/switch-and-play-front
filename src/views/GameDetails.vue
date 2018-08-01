<template>
    <section class="GameDetails" v-if="currGame && currUser">
      <router-link class="btn-back" :to="'/game'"><font-awesome-icon icon="arrow-circle-left"/>Go to gallery</router-link>
      <br>
      <br>
      <div class="game-details-all" v-if="!requesting">
        <span class="game-name">{{currGame.name}}</span>
        <br>
        <br>
        <span label="Description">{{currGame.desc}}</span>
        <div class="game-details-container flex content-center" v-if="!requesting">
            <div class="img-container">        
                    <img :src="currGame.src">     
            </div>
            <div class="text-container-title flex column">
                <div class="detail-item" >Type:</div>
                <div class="detail-item" >Categoty:</div>
                <div class="detail-item" >Condition:</div>
                <div class="detail-item" >Added at:</div>
                <div class="detail-item" >Owner:</div>
                <div class="detail-item" >City:</div>
                </div>
            <div class="text-container flex column capitalize">
                <div class="detail-item" label="Type">{{currGame.type}}
                <!-- <img class="details-img" :src="`img/details/${currGame.type}.png`"> -->
                </div>
                <!-- <img src="@/assets/img/details/baby.png"> -->
                <div class="detail-item" label="Category">{{currGame.category}}</div>
                <div class="detail-item" label="Condition">{{currGame.condition}}</div>
                <div class="detail-item" >{{ currGame.addedAt | getDate }}</div>
                <div class="detail-item" >{{currUser.username}}</div>
                <div class="detail-item" >{{currUser.city}}</div>
                </div>
                
            </div>
             <el-button class="btn-want-toy" v-if="!requesting" @click="checkIfLogin">I want this game!</el-button>
             </div>
            <game-request :game="currGame" v-if="requesting"></game-request>
        <!-- <show-match></show-match> -->
    </section>

</template>
<script>
import GameRequest from "@/components/GameRequest.vue";
import ShowMatch from "@/components/ShowMatch.vue";
import GameService from "@/services/GameService.js";

export default {
  name: "GameDetails",
  data() {
    return {
      currGame: null,
      requesting: null,
      currUser: null,
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
          this.getUser()
          // eventBusService.$emit(SHOW_MSG, {txt: `Todo was removed`})
        });
    },
    getUser(){
      GameService.getUserById(this.currGame.userId)
      .then(user =>{
        this.currUser = user
      })
    },
    checkIfLogin() {
      if (!this.loggedinUser) {
        swal({
          title: "Please login to switch a game!",
          buttons: ["Not now", "Login"],
        }).then(willLogin => {
          if (willLogin) {
            this.$router.push("/login");
          } else {
            swal.close();
          }
        });
      } else this.requesting = true;
    }
  },
  components: {
    GameRequest,
    ShowMatch
  }
};
</script>

 <style lang="scss" scoped>
.img-container {
  max-height: 400px;
  max-width: 400px;
}
img {
  width: 100%;
}
.details-img{
  height: 40px;
  width: 40px;
}
.game-details-container {
  margin-top: 50px;
}
.game-name {
  font-family: 'PaytoneOne';
  margin-top: 20px;
  color: $main-color;
  font-size: 24px;
}
.GameDetails {
  font-family: "Ubuntu-regular";
  font-size: 18px;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 40px;
}
.el-button.btn-want-toy {
  background-color: $secondary-color;
  background-color: #f56c6c;
  text-transform: capitalize;
  font-weight: 400;
  // color: $main-color;
  color: white;
  transition: all 0.3 ease;
  margin-bottom: 30px;
  margin-top: 20px;
  &:hover {
    transform: scale(1.1, 1.1);
    font-weight: 600;
    border: none;
  }
}
.text-container {
  align-items: baseline;
  font-weight: 200;
  font-size: 18px;
  padding: 0;
}
.text-container-title{
  align-items: baseline;
  font-weight: 200;
  font-size: 18px;
  padding: 0;
  font-weight: bold;
}
.detail-item {
  text-align: left;
  width: 100%; // Default to full width
  padding: 0.8em 1.2em;
  overflow: hidden; // Or flex might break
  list-style: none;
  border: solid white;
}
.btn-back{
  float: left;
  margin-left: 40px;
}
</style>
<style>
.swal-title {
    color: #0D72FA !important;
    font-weight: 600;
    text-transform: none;
    position: relative;
    display: block;
    padding: 13px 16px;
    font-size: 27px;
    line-height: normal;
    text-align: center;
    margin-bottom: 0;
    font-family: sans-serif;
}
.swal-button-container{
  font-family: sans-serif;
}
.swal-button--confirm{
      background-color: #F6AB2B;
 }  
</style>