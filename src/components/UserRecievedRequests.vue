<template>
    <section>
        <showMatch v-if="isMatch" :game="choosenGame" :match="currRecieved"></showMatch>  
        <div class="flex column switchedGames">
            <h3>Games people ask from me:</h3>
            <ul v-if="recieves">
                <li v-for="recieve in recieves" :key="recieve._id" class="flex match-container">
                    <div class="flex match">
                        <h4>asked from me: </h4>
                        <p>{{recieve.userPassiveGame.name}}</p>
                        <!-- <img :src="match.passive.img"/> -->
                    </div>
                    <div class="flex column games-offer">
                        <h4>games to choose from: </h4>
                        <ul class="p5">
                            <li v-for="game in recieve.userActiveGames" :key="game._id" class="p5">
                                {{game.name}}
                                <button @click="itsMatch(game._id, recieve._id)">choose me! </button>
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

<style>
    .games-offer{
        border: 1px solid;
        margin: 20px;
        justify-content: space-around
    }
    li {
        list-style: none;
    }
    .p5 {
        padding: 5px;
    }
</style>
