<template>
    <section>
        <div class="flex column match-container">
            <h3>Games I switched:</h3>
            <ul v-if="matches">
                <li v-for="match in matches" :key="match._id" class="flex games-box">
                    <div class="flex column games-container">
                        <h4>I gave: </h4>
                        <div class="flex column game-box">
                            <p>{{match.userPassiveGame.name}}</p> -->
                           <img :src="match.userPassiveGame.src"/>
                        </div>
                    </div>
                    <h3>⇆</h3>
                    <i class="fas fa-exchange-alt"></i>
                    <div class="flex column games-container">
                        <h4>I recieved: </h4>
                        <p>{{match._id}}</p>
                        <div class="flex column game-box">
                            <p>{{match.userActive.games[0]}}</p>
                            <img :src="match.userActive.games[0]"/> 
                            <div type="text" class="user-details-container">
                                <!-- <GameUser :userId="match.userActive.userId" class="user-details flex"></GameUser> -->
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
    props: ["matches"],
    component: {GameUser},
    created() {
        // console.log('@@matches:&&', this.matches);
    },
    computed: {
      
    }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";
  
</style>
