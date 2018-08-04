<template class="game-request-container">
<!-- test for see if master updated with SAP-27 -->
    <div class="game-request flex column align-center justify-center">
        <h1 class="title-game-request">It's time to create your request!</h1>   
        <h2 class="title-games">Choose optional games for swapping</h2>
        <el-form class="request-container flex column">
          <div class="games-container flex">
            <div class="game" v-for="game in games" :key="game._id">
                <game-preview :game="game" :isGameRequest="true" :newIcon="true" :condition="true" :location="true" :username="true" :gameCheckbox="true" @check="updateGamesToSwitch"></game-preview>
           </div>
          </div>
            <div class="text-btn-container flex column">
              <h2 class="title-txt-area">Add some words:</h2>
              <div class="req-container flex column">
                <el-input class="textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="Enter some words to your request" v-model="textareaReq">
                </el-input>
              </div>
              <el-button class="btn-request" @click="sendRequest">Send your request!</el-button>
            </div>
        </el-form>
    </div>
</template>


<script>
import GamePreview from "@/components/GamePreview.vue";
import MatchService from "../services/MatchService.js";

export default {
  name: "GameRequest",
  props: ["game"],
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
      this.$router.push('/');
      this.ownerUserId = this.game.userId;
        const matchReq = {
          userPassive: {
            userId: this.ownerUserId,
            gameId: this.game._id
          },
          userActive: {
            userId: this.user._id,
            games: this.gamesToSwitch
          },
          textareaReq: this.textareaReq,
          isMatch: false
        };
      this.$store.dispatch({ type: "createMatch", newMatch: matchReq })
        .then(match => {
          swal("Whoo Hoo! Your request has been sent!", {
          className: "swal-text",
          icon: "success",
          timer: 2000,
          button: false
        })
          console.log('match:', match);
        })
        .catch(err =>{
          console.log('error send a request',err)
        })
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

  .game-request {
     max-width: rem(1200px);
   }

   .checkbox-game-request {
     color: $main-color;
   }

   .title-game-request, .title-games,.title-txt-area {
     font-family: 'Ubuntu-regular';
   }

   .title-game-request{
     font-size: rem(40px);
     margin-bottom: rem(20px);
     margin-top: rem(60px);
     // color: $main-color;
   }

   .btn-back{
     font-size: 10px;
   &:hover {
     color: $main-color;
     }
   }

   .title-games {
     text-align: center;
   }

   .title-games,.title-txt-area {
     color: $secondary-color;
   }
   .games-container {
     margin-top: 20px;
     min-width: 70vw;
     max-width: rem(1200px);
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
   }

  //  .choose-checkbox {
  //    background-color: red;
  //  }

   .btn-request {
     font-family: "Ubuntu-regular";
   }

   .game {
     border: 1px solid $border-color;
     // padding: rem(20px);
     margin: rem(10px);
     width: 250px;
     height: 250px;
    //  transition: all 0.5s;
       &:hover {
        //  transform: scale(0.95, 0.95);
       }
   }

   li {
   padding: 20px;
   margin: auto;
   }
   .textarea {
     width: 40%;
     margin-top: 20px;
   }
   .btn-request {
     width: 220px;
     height: 50px;
     align-self: center;
     margin: 20px 0;
     background-color: $main-color;
     font-size: 20px;
     color: white
     
   }
   .req-container{
     align-items: center;
   }
   .swal-text {
    font-family: sans-serif;
    color: #0d72fa;
    font-size: 30px;

       //  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
 }
</style>