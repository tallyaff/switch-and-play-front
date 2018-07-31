<template>
    <section>
        <div class="flex column match-container">
            <h3>Games I switched:</h3>
            <ul v-if="matches">
                <li v-for="match in matches" :key="match._id" class="flex games-box">
                    <div class="flex column games-container">
                        <h4>I gave: </h4>
                        <div class="flex column game-box">
                            <!-- <p>{{showGame}}</p> -->
                            <p>{{match.userPassiveGame.name}}</p>
                            <img :src="match.userPassiveGame.src"/>
                            <h6>to: {shuki}</h6>
                        </div>
                    </div>
                    <h3>⇆</h3>
                    <!--fab icon doesnt work !! -->
                    <!-- <i class="fas fa-exchange-alt"></i> -->
                    <div class="flex column games-container">
                        <h4>I recieved: </h4>
                        <div class="flex column game-box">
                            <p>{{match.userActiveGames[0].name}}</p>
                            <img :src="match.userActiveGames[0].src"/>
                            <h6>from: {puki}</h6>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import GameService from '../services/GameService.js'
export default {
    name: 'userMatch',
    props: ["matches"],
    created() {
        console.log('matches:&&', this.matches);
    },
    computed: {
        // showGame(){
        //     // console.log('show:@@', this.matches);
        //     return this.$store.getters.gameForDisplay
        // }
    }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";
  
</style>
