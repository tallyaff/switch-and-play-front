<template>
    <section class="game-details flex justify-center align-center" v-if="currGame && currUser">
      <div v-if="gamesLoading">
        <div class="loader-circle"></div>
  </div>
      <div v-else-if="!requesting" class="game-details-all" >
        <h2 class="game-name capitalize">{{currGame.name}}</h2>
        <h3 class="game-description" label="Description">{{currGame.desc}}</h3>
        <div class="game-details-container flex column content-center align-center" v-if="!requesting">
            <div class="img-container">        
                <img class="game-image" :src="currGame.src">     
            </div>
            <div class="game-text-container flex">
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
            </div>
             <el-button class="btn-want-game" v-if="!requesting" @click="checkIfLogin">I want this game!</el-button>
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
      requesting: false,
      currUser: null,
      filterBy: {
        allByName: true,
        name: "",
        allTypes: true,
        type: [],
        allCategories: true,
        category: [],
        userId: ""
      },
    }
  },
  created() {
    var filterBy = JSON.parse(JSON.stringify(this.filterBy));
    this.$store.commit({ type: "setFilter", filterBy })
    this.loadGame();


  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedUser;
    },
    gamesLoading() {
      return this.$store.getters.gamesLoading;
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
          title: "Please login to swap a game!",
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

 .game-details-all {
   border: 1px solid $border-color;
   margin-top: rem(20px);
 }
.img-container {
  max-height: 400px;
  max-width: 350px;
  width: 100%;
}
.game-image {
  width: 80%;
}
.details-img{
  height: 40px;
  width: 40px;
}
.game-details-container {
  margin: 50px;
}
.game-name {
  font-family: 'PaytoneOne';
  margin: 20px 0;
  color: $main-color;
  font-size: 24px;
}

.GameDetails, .game-description, .game-details-container, .el-button.btn-want-game {
  font-size: rem(18px);
  font-family: "Ubuntu-regular";
}

.game-description {
  margin: 0 50px;
}

.GameDetails {
  font-size: 18px;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 40px;
}
.el-button.btn-want-game {
  font-size: rem(20px);
  background-color: $secondary-color;
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

.text-container-title, .text-container {
    font-size: 18px;
}

.text-container {
  align-items: baseline;
  font-weight: 200;
  padding: 0;
}
.text-container-title{
  align-items: baseline;
  font-weight: 200;
  padding: 0;
  font-weight: bold;
}
.detail-item {
  text-align: left;
  width: 100%; // Default to full width
  // padding: 0.6em 1.0em;
  padding: 0.8em 1.2em;
  overflow: hidden; // Or flex might break
  list-style: none;
  border: solid white;
}
.btn-back{
  float: left;
  margin-left: 40px;
}

@media (min-width: 730px) {

  .game-details-container  {
    flex-direction: row;
  }
  .game-details-all {
   width: 980px;
 }
}

// @media (min-width: 730px) {

//   .img-container {
//     max-width: 300px;
//   }
//   .text-container-title, .text-container {
//       font-size: 16px;
//   }

//   .text-container {
//       width: 50%;
//   }

//   .game-image {
//     width: 80%;
//   }


// }

// @media (min-width: 790px) {
//   .text-container-title, .text-container {
//       font-size: 18px;
//   }

//   .text-container {
//       width: 60%;
//   }

//   .game-image {
//     width: 100%;
//   }

//   .detail-item {
//     padding: 0.8em 1.2em;
//   }
// }


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