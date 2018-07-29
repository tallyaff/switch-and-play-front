<template>
    <section>
        <showMatch v-if="isMatch" :game="choosenGame" :match="currRecieved"></showMatch>  
        <div class="flex column match-container">
            <h3>Request From Me:</h3>
            <ul v-if="recieves">
                <li v-for="recieve in recieves" :key="recieve._id" class="flex games-container">
                    <!-- <div class="flex game-container"> -->
                        <div class="flex column game-box mr50">
                            <h5>{{recieve.userPassiveGame.name}}</h5>
                            <img :src="recieve.userPassiveGame.src"/>
                            <h6>from: {muki}</h6>
                        </div>
                    <!-- </div> -->
                    <div >
                        <ul class="flex games-box">
                            <h4>choose one: </h4>
                            <li v-for="game in recieve.userActiveGames" :key="game._id">
                               <div class="flex column game-box">
                                    <h5>{{game.name}}</h5>
                                    <img :src="game.src"/>
                                    <button @click="itsMatch(game._id, recieve._id)">choose me! </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import ShowMatch from './ShowMatch.vue'
export default {
    name: 'userRecieve',
    props: ["recieves"],
    components: {ShowMatch},
    data() {
        return {
            choosenGame: '',
            currRecieved: '',
            isMatch: false
        }
    },
    created() {
        console.log('##recieved##:', this.recieves);
    },
    methods: {
        itsMatch(gameId, recieveId) {
            this.choosenGame = gameId;
            this.currRecieved = recieveId;
            // const match = {gameId: this.choosenGame, match: this.recieve}
            const match = {gameId: this.choosenGame, matchId: this.currRecieved}
            this.isMatch = true;
            console.log('game id', this.choosenGame);
            console.log('match id', this.currRecieved);
            console.log('match:!!', match);
            this.$store.dispatch({ type: "updateMatch", matchDetails: match })
        },
    }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";
    .mr50 {
        margin-right: 50px;
    }
</style>
