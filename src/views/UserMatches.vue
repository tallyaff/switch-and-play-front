<template>
    <section>
        <div class="flex column match-container">
            <div class="activity-header flex">
                <h3>Games I swapped:</h3>
                <div class="router-container-activity flex">
                    <router-link :to="`/user/activity/request/${loggedinUser._id}`" class="flex not-container">
                        <el-button type="primary" class="activity-btn">My Requests</el-button>
                    </router-link>
                    <router-link :to="`/user/activity/recieve/${loggedinUser._id}`" class="flex not-container">
                        <el-button type="primary" class="activity-btn">Requests From Me</el-button>
                    </router-link>
                </div>
            </div>
            <ul v-if="matches" class="games-box-container flex">
                <li v-for="match in matches" :key="match._id" class="flex games-box">
                    <div class="flex column games-container">
                        <h4>I gave: </h4>
                        <div class="flex column game-box">
                            <p>{{match.userPassiveGame.name}}</p> 
                           <img :src="match.userPassiveGame.src"/>
                           <div type="text" class="user-details-container">
                                <GameUser :userId="match.userPassive.userId" class="user-details flex"></GameUser>
                            </div>
                        </div>
                    </div>
                    <h3>⇆</h3>
                    <i class="fas fa-exchange-alt"></i>
                    <div class="flex column games-container">
                        <h4>I recieved: </h4>
                        <div class="flex column game-box">
                            <p>{{match.userActiveGames[0].name}}</p>
                            <img :src="match.userActiveGames[0].src"/> 
                            <div type="text" class="user-details-container">
                                <GameUser :userId="match.userActive.userId" class="user-details flex"></GameUser>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import GameService from '../services/GameService.js';
import GameUser from '@/components/GameUser.vue';

export default {
    name: 'userMatch',
    // props: ["matches"],
    components: {GameUser},
    created() {
        this.$store.dispatch({type: 'getMatch', 
            user: this.$route.params.userId
            });
        // console.log('matchhhhhh', this.matches);
    },
    computed: {
        matches() {
            return this.$store.getters.getMatches;
        },
        loggedinUser() {
             return this.$store.getters.loggedUser;
        },
    }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";
  
</style>
