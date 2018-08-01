<template>
    <section>
        <div class="flex column match-container">
            <h3>Games I switched:</h3>
            <ul v-if="matches">
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
    props: ["matches"],
    components: {GameUser},
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
