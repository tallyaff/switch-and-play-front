<template>
    <section class="user-matches flex align-center justify-center">
        <div class="flex column match-container align-center justify-center">
            <ul v-if="matches" class="games-box-container flex">
                <li v-for="match in matches" :key="match._id" class="flex games-box align-center justify-center">
                    <div class="whole-box">
                    <!-- <div class="flex column games-container"> -->
                        <div class="user-approved-container">
                            <h2 class="user-approved">
                                <GameUserName :userId="match.userPassive.userId"></GameUserName> 
                                Approved swapping!
                            </h2>
                        </div>
                        <div class="flex games-img">
                            <div class="flex column game-box">
                                <h3>{{match.userPassiveGame.name}}</h3> 
                                <div class="img-activity-container">
                                    <img :src="match.userPassiveGame.src" />
                                </div>
                            </div>
                            <!-- <font-awesome-icon icon="exchange-alt" class="exchange"/> -->
                            <img class="swap-arrows" src="img/swaparrows.png"/>
                            <!-- <i class="fas fa-exchange-alt"></i> -->
                            <div class="flex column game-box">
                                <h3>{{match.userActiveGames[0].name}}</h3>
                                <div class="img-activity-container">
                                    <img :src="match.userActiveGames[0].src"/> 
                                </div>
                            </div>
                        </div>
                        <!-- <div class="flex msg-box"> -->
                            <GameUserImg :userId="match.userPassive.userId"></GameUserImg>
                            <!-- <h4>{{match.userPassive.textareaRes}}</h4> -->
                        <!-- </div> -->
                    <!-- </div> -->
                        <font-awesome-icon @click="showChat(match.userPassive.gameId, match._id)" icon="comments" class="chat-icon"/>
                        <show-chat :match="match" v-if="isShow"></show-chat>
                    </div>
                </li>
            </ul>
        </div>
        <!-- this. matches{{matches}} -->
    </section>
</template>

<script>
import GameService from '../services/GameService.js';
import GameUserImg from '@/components/GameUserImg.vue';
import GameUserName from '@/components/GameUserName.vue';
import ShowChat from '@/components/ShowChat.vue';

export default {
    name: 'userMatches',
    data() {
        return {
            passiveUser: null,
            matchId: null,
            gameId: null,
            isShow: false,
        }
    },
    components: {
        GameUserName,
        GameUserImg,
        ShowChat
        },
    created() {
        this.$store.dispatch({type: 'getMatch', 
            user: this.$route.params.userId
            });
        console.log('this.matches in userMatches', this.matches);
        // console.log('usrtID^^^ in userMatches', this.userId);
        this.getGameUser();        
    },
    computed: {
        matches() {
            console.log('matches in computed in userMatches', this.$store.getters.getMatches);
            return this.$store.getters.getMatches;
        },
        loggedinUser() {
             return this.$store.getters.loggedUser;
        },
    },
    methods: {
        getGameUser() {
            return GameService.getUserById(this.userId)
                .then(user => {
                    // console.log('user from server&&&', user);
                    this.passiveUser = user
                })
        },
        showChat(gameId, matchId) {
            this.isShow = !this.isShow;
            console.log('2gameId in gameId', gameId, 'matchId in gameId', matchId);

            this.$router.push(`/game/${gameId}/match/${matchId}`)
        }
    }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";

  .user-matches {
      width: 100%;
  }

  .match-container {
      width: 980px;
  }

  .games-box-container {
      width: 100%;
      align-self: center;
  }
  
  .whole-box {
      width: 122%;
      height: 111%;
      position: relative;
  }

  .user-approved-container {
      height: 10%;
  }

  .game-box {
      width: 5%;
  }


  .img-activity-container img{
      width: 75%;
  }
    .msg-box{
      width: 55%;
      position: absolute;
      top: 195px;
      left: 30px;
  }
    .games-img {
        width: 100%;
        .exchange {
            align-self: center;
            font-size: 2em;
        }
    }

    .swap-arrows {
        width: 40px;
        height: 40px;
        align-self: center;
    }

    .games-box {
        border: 1px solid $border-color;  
        box-shadow: 0px 2px 4px 0px #d9d8d8;
        border-radius: 2px;
        width: 400px;
        height: 300px;
    }
    .game-box {
       justify-content: space-between;
       border: none;
       box-shadow: none;
       height: 150px;
       margin-bottom: 0;
    }

    .user-approved {
        font-size: 18px;
        font-family: 'Ubuntu';
        margin-top: 5px;
    }

    .chat-icon {
        font-size: rem(40px);
        color: $main-color;
        transition: all 0.3s;
        margin: rem(20px);
        &:hover {
            color: $border-color;
        }
    }
</style>
