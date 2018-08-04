<template>
    <section class="flex justify-center">
        <div v-if="!isMatch" class="game-box-container flex align-center justify-center column">
            <h3 class="game-name capitalize">{{game.name}}</h3>
            <p class="game-desc capitalize">{{game.desc}}</p>
            <div class="flex game-box-details capitalize">  
                <img :src="game.src"/>
                <div class="flex column details capitalize">
                    <p><span>Type: </span>{{game.type}}</p>
                    <p><span>Category: </span>{{game.category}}</p>
                    <p><span>Condition: </span>{{game.condition}}</p>
                    <p><span>Added At: </span>{{game.addedAt | getDate }}</p>
                </div>
            </div>
            <el-button @click="itsMatch(game._id, match._id)" type="primary" class="btn btn-choose">Choose me! 
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
    },
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";

.game-box-container {
    height: 450px;
    width: 680px;
    border: 1px solid $border-color;  
    box-shadow: 0px 2px 4px 0px #d9d8d8;
    border-radius: 2px;
    margin: rem(20px);
    align-items: center;
    justify-content: space-around;
    z-index: 5;
    position: relative;
    & .game-name{
        font-family: 'PaytoneOne';
        color: $main-color;
        font-size: rem(30px);
    }
    & .game-desc {
        font-family: 'Ubuntu';
        font-size: rem(20px);
        position: absolute;
        top: 16%;
    }
    & .game-box-details {
        font-family: 'Ubuntu-regular';
        font-size: rem(17px);
        margin: 20px 0 0 0;
    }
}

.details p span {
    font-family: 'Ubuntu';
}
// .game-box-details {
//     height: 80%;
// }
.game-box-details > img {
    max-width: 300px;
    margin: 0 20px;
}

.details {
    justify-content: space-around;
}

.btn-choose {
    background-color: $main-color;
    font-size: rem(20px);
}
</style>
