<template>
    <section class="user-recieved container">
        <!-- <showMatch v-if="isMatch" :game="choosenGame" :match="currRecieved"></showMatch>   -->
        <div v-if="!openDetails" class="flex column match-container ">
            <div class="activity-header flex">
                <!-- <h3>Request From Me:</h3> -->
            </div>
            <ul v-if="recieves" class="recieve">
                
                <li v-for="recieve in recieves" :key="recieve._id" class="flex games-container">
                    <div class="flex column user-ask">
                        <div class="user-ask-name">
                            <h2>A request from</h2>
                            <GameUserName :userId="recieve.userActive.userId" class="username"></GameUserName>
                        </div>  
                        <div class="flex msg-box">
                            <GameUserImg :userId="recieve.userActive.userId" class="msg-box-img"></GameUserImg>
                            <h4>{{recieve.userActive.textareaReq}}</h4>
                        </div>
                        <!-- <div class="user-img" :style="{backgroundImage: `url(${recieve.userPassiveGame.src})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
                        </div>  -->
                        <div class="img-activity-container flex">
                            <img :src="recieve.userPassiveGame.src"/>
                        </div>
                    </div>
                    <!-- <div class="choose-game flex column"> -->
                    <!-- </div> -->
                    <div class="offers flex column">
                        <h2 class="choose-one">choose one: </h2>
                        <ul class="flex games-box offer-box">
                            <li v-for="game in recieve.userActiveGames" @click="getMatch(game, recieve)" :key="game._id">
                                <div class="flex column game-box">
                                    <h3>{{game.name}}</h3>
                                    <div class="img-activity-container">
                                        <img :src="game.src"/>
                                    </div>
                                    <!-- <div class="flex btns-details"> -->
                                        <!-- <el-button @click="getMatch(game, recieve)" type="primary" class="details-btn"> -->
                                            <!-- <font-awesome-icon icon="info"/> 
                                            <h5>choose</h5>
                                        </el-button>
                                        <el-button @click="getMatch(game, recieve)" type="primary" class="details-btn">
                                            <font-awesome-icon icon="info" class="pen"/> 
                                        </el-button>     -->
                                    <!-- </div> -->
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        <GameSelect :match="currRecieved" :game="choosenGame" v-if="openDetails"></GameSelect>
    </section>
</template>

<script>
import GameUserImg from "@/components/GameUserImg.vue";
import GameUserName from "@/components/GameUserName.vue";
import GameService from "@/services/GameService.js";
import GameSelect from "@/components/GameSelect.vue";

export default {
  name: "userRecieve",
  components: {
    GameUserImg,
    GameUserName,
    GameSelect
  },
  data() {
    return {
      choosenGame: "",
      currRecieved: "",
      openDetails: false,
      isMatch: true
    };
  },
  created() {
    this.$store.dispatch({
      type: "getMatch",
      user: this.$route.params.userId
    });
    console.log("recieveddddd", this.matches);
    // this.getActiveUser();
    // console.log('get userrrrr', this.user);
  },
  computed: {
    recieves() {
      console.log("****", this.$store.getters.getRecieves);

      return this.$store.getters.getRecieves;
    },
    loggedinUser() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    getMatch(game, recieve) {
      this.openDetails = true;
      this.choosenGame = game;
      this.currRecieved = recieve;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";

.details-btn {
  line-height: 0;
  // width: 30px;
  height: 35px;
  h5 {
    color: white;
  }
}

.recieve {
  // border: 1px solid $border-color;
  // box-shadow: 0px 2px 4px 0px #d9d8d8;
  // border-radius: 2px;
}

.img-activity-container img {
  width: 85%;
}

.choose-one {
  margin-left: 30px;
}

.offer-box {
  margin-top: 30px;
  border: none;
  box-shadow: none;
  margin-left: 1px;
  li {
    cursor: pointer;
  }
}

.user-ask {
  align-content: center;
  // margin-right: 50px; butal

  img {
    max-height: 150px;
    max-width: 150px;
    align-self: center;
    margin: 20px;
  }

  .username {
    margin-bottom: 4px;
  }
  .pen {
    width: 30px;
    height: 50px;
  }
}

.games-container {
  flex-direction: column;
  margin: 0;
  padding: 5px;
}

@media (min-width: 980px) {
  .h4-recieve {
    margin-left: 30px;
  }
  h2 h3 {
    padding: 2px;
  }
  .user-ask {
    margin-right: 50px;
  }
  .games-container {
    flex-direction: row;
  }

  .game-box {
    height: 250px;
    justify-content: space-between;

  }
}
</style>
