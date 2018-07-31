<template>
    <section class="GameDetails" v-if="currGame">
      <div class="game-details-all" v-if="!requesting">
        <span class="game-name">{{currGame.name}}</span>
        <br>
        <br>
        <span label="Description">{{currGame.desc}}</span>
        <div class="game-details-container flex content-center" v-if="!requesting">
            <div class="img-container">
                <li>
                    <img :src="currGame.src">
                </li>
            </div>
            <div class="text-container-title flex column">
                <div class="detail-item" >Type:</div>
                <div class="detail-item" >Categoty:</div>
                <div class="detail-item" >Condition:</div>
                <div class="detail-item" >Added at:</div>
                </div>
            <div class="text-container flex column">
                <div class="detail-item" label="Type">{{currGame.type}}
                <img class="details-img" :src="`img/details/${currGame.type}.png`">
                </div>
                <!-- <img src="@/assets/img/details/baby.png"> -->
                <div class="detail-item" label="Category">{{currGame.category}}</div>
                <div class="detail-item" label="Condition">{{currGame.condition}}</div>
                <div class="detail-item" label="added At">{{currGame.addedAt}}</div>
                </div>
                
            </div>
             <el-button class="btn-want-toy" v-if="!requesting" @click="checkIfLogin">I want this toy!</el-button>
             </div>
            <game-request :game="currGame" v-if="requesting"></game-request>
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

<style <style lang="scss" scoped>
.img-container {
  max-height: 250px;
  max-width: 250px;
}
img {
  width: 100%;
}
.details-img{
  height: 40px;
  width: 40px;
}
.game-details-container {
  margin-top: 30px;
  
}
.game-name {
  font-family: 'PaytoneOne';
  margin-top: 20px;
  color: $main-color;
  font-size: 16px;
}
.GameDetails {
  font-family: "Ubuntu-regular";
  font-size: 14px;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 50px;
}
.el-button.btn-want-toy {
  margin-top: 30px;
  background-color: $secondary-color;
  text-transform: capitalize;
  font-weight: 600;
  // color: $main-color;
  color: #2c3e50;
  transition: all 0.3 ease;

  &:hover {
    transform: scale(1.1, 1.1);
    font-weight: 600;
    border: none;
  }
}
.text-container {
  align-items: baseline;
  font-weight: 200;
  font-size: 14px;
  padding: 0;
}
.text-container-title{
  margin-top: 25px;
  align-items: baseline;
  font-weight: 200;
  font-size: 14px;
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
</style>