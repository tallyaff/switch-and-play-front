<template>
    <section>
        <div class="flex column match-container">
            <ul v-if="matches" class="games-box-container flex">
                <li v-for="match in matches" :key="match._id" class="flex column games-box">
                    <!-- <div class="flex column games-container"> -->
                        <h2 class="user-approved">
                            <GameUserName :userId="match.userPassive.userId"></GameUserName> 
                            Approved swapping!
                        </h2>
                        <div class="flex games-img">
                            <div class="flex column game-box">
                                <h3>{{match.userPassiveGame.name}}</h3> 
                                <div class="img-activity-container">
                                    <img :src="match.userPassiveGame.src"/>
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
                        <div class="flex msg-box">
                            <GameUserImg :userId="match.userPassive.userId"></GameUserImg>
                            <h4>{{match.userPassive.textareaRes}}</h4>
                        </div>
                    <!-- </div> -->
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import GameService from '../services/GameService.js';
import GameUserImg from '@/components/GameUserImg.vue';
import GameUserName from '@/components/GameUserName.vue';

export default {
    name: 'userMatch',
    data() {
        return {
            passiveUser: null
        }
    },
    components: {GameUserName, GameUserImg},
    created() {
        this.$store.dispatch({type: 'getMatch', 
            user: this.$route.params.userId
            });
        // console.log('matchhhhhh', this.matches);
        // console.log('usrtID^^^', this.userId);
        this.getGameUser();
        
    },
    computed: {
        matches() {
            // console.log('%%%', this.$store.getters.getMatches);
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
        }
    }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";
  
    .games-img {
        .exchange {
            align-self: center;
            font-size: 2em;
        }
    }

    .swap-arrows {
        width: 80px;
        height: 80px;
        align-self: center;
    }

    .games-box {
        border: 1px solid $border-color;  
        box-shadow: 0px 2px 4px 0px #d9d8d8;
        border-radius: 20px;
    }
    .game-box {
       justify-content: space-between;
       border: none;
       box-shadow: none;
       height: 250px;
       margin-bottom: 0;
    }

    .user-approved {
        margin-top: 5px;
    }
</style>
