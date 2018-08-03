<template>
    <section class="flex justify-center">
        <div v-if="!isMatch" class="flex align-center justify-center column game-box-container">
            <h3>{{game.name}}</h3>
            <div class="flex game-box-details">  
                <img :src="game.src"/>
                <div class="flex column details">
                    <p>{{game.desc}}</p>
                    <p>Type: {{game.type}}</p>
                    <p>Category: {{game.category}}</p>
                    <p>condition: {{game.condition}}</p>
                    <p>Added At: {{game.addedAt | getDate }}</p>
                </div>
            </div>
            <el-button @click="itsMatch(game._id, match._id)" type="primary">choose me! 
            </el-button>
        </div>
        <ShowMatch :match="match" :game="game" v-if="isMatch"></ShowMatch>
    </section>
</template>

<script>
import ShowMatch from "@/components/ShowMatch.vue";

export default {
    name: 'GameSelect',
    props: ['match', 'game'],
    components: {
        ShowMatch
    },
    created() {
        console.log('!!match: ', this.match)
        console.log('!!game: ', this.game)
},
    data() {
        return {
            choosenGame: '',
            currRecieved: '',
            isMatch: false,
        }
    },
    methods: {
        itsMatch(game, recieveId) {
            this.choosenGame = game;
            this.currRecieved = recieveId;
            // const match = {gameId: this.choosenGame, match: this.recieve}
            const match = {gameId: this.choosenGame, matchId: this.currRecieved}
            this.isMatch = true;
            console.log('game id', this.choosenGame);
            console.log('match id', this.currRecieved);
            console.log('###match:!!', match);
            this.$store.dispatch({ type: "updateMatch", matchDetails: match })
        },
    }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";

.game-box-container {
    height: 450px;
    width: 80%;
    border: 1px solid $border-color;  
    box-shadow: 0px 2px 4px 0px #d9d8d8;
    border-radius: 2px;
    margin: rem(10px);
    align-items: center;
    justify-content: space-around;
    z-index: 5;
}
.game-box-details {
    height: 80%;
}
.game-box-details > img {
    max-width: 300px;
}

.details {
    justify-content: space-around;
}
</style>
