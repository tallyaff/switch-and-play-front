<template>
    <section>
        <!-- <showMatch v-if="isMatch" :game="choosenGame" :match="currRecieved"></showMatch>   -->
        <div v-if="!openDetails" class="flex column match-container">
            <div class="activity-header flex">
                <h3>Request From Me:</h3>
                <div class="router-container-activity flex">
                    <router-link :to="`/user/activity/match/${loggedinUser._id}/`" class="flex not-container">
                        <el-button type="primary" class="activity-btn">My Swapping</el-button>
                    </router-link>
                    <router-link :to="`/user/activity/request/${loggedinUser._id}`" class="flex not-container">
                        <el-button type="primary" class="activity-btn">My Requests</el-button>
                    </router-link>
                </div>
            </div>
            <ul v-if="recieves" class="recieve">
                <li v-for="recieve in recieves" :key="recieve._id" class="flex games-container">
                    <div class="flex column game-box mr50">
                        <h5>{{recieve.userPassiveGame.name}}</h5>
                        <img :src="recieve.userPassiveGame.src"/>
                    </div>
                    <div class="choose-game flex column">
                        <div type="text" class="user-details-container user-recieve">
                            <GameUser :userId="recieve.userActive.userId" class="user-details flex"></GameUser>
                        </div>
                        <h4 class="h4-recieve">choose one: </h4>
                    </div>
                    <div class="offers">
                        <ul class="flex games-box offer-box">
                            <li v-for="game in recieve.userActiveGames" :key="game._id">
                                <div class="flex column game-box">
                                    <h5>{{game.name}}</h5>
                                    <img :src="game.src"/>
                                    <el-button @click="getMatch(game, recieve)" type="primary" class="details-btn">details </el-button>
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
import GameUser from '@/components/GameUser.vue';
import GameService from '@/services/GameService.js';
import GameSelect from '@/components/GameSelect.vue';

export default {
    name: 'userRecieve',
    components: {
        GameUser,
        GameSelect,
        },
    data() {
        return {
            choosenGame: '',
            currRecieved: '',
            openDetails: false,
            isMatch: true,
        }
    },
    created() {
        this.$store.dispatch({type: 'getMatch', 
            user: this.$route.params.userId
            });
    },
    computed: {
        recieves() {
            return this.$store.getters.getRecieves;
        },
        loggedinUser() {
             return this.$store.getters.loggedUser;
        },
    },
    methods: {
        getMatch(game, recieve) {
            this.openDetails = true;
            this.choosenGame = game;
            this.currRecieved = recieve;           
        },
    }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";
    
    .games-box>h4 {
    }
    .details-btn {
        line-height: 0;
    }

    .recieve {
        border: 1px solid $border-color;  
        box-shadow: 0px 2px 4px 0px #d9d8d8;
        border-radius: 2px;
    }

    .offer-box {
       border: none;
       box-shadow: none;
       margin-left: 1px;
    }
    .h4-recieve {
        margin-left: 30px;
    }
    .user-recieve {
        top: -22px;
        left: 83px;
    }
</style>
