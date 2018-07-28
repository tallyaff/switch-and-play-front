<template>
    <section>
        <div>
            <ul v-if="matches">
                <li v-for="match in matches" :key="match._id" class="flex match-container">
                    <div class="flex match">
                        <h4>I gave: </h4>
                        <!-- <p>{{showGame}}</p> -->
                        <p>{{match.userPassiveGame.name}}</p>
                        <!-- <img :src="match.passive.img"/> -->
                    </div>
                    <i class="fa fa-arrows-h"></i>
                    <div class="flex match">
                        <h4>I recieved: </h4>
                        <p>{{match.userActiveGames[0].name}}</p>
                        <!-- <img :src="match.active.game.img"/>
                        <p>from: {{match.active.user.name}} -->
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
        showGame(){
            // console.log('show:@@', this.matches);
            return this.$store.getters.gameForDisplay
        }
    }
}
</script>

<style>
    h4, p {
        margin: 0;
    }
    .flex {
        display: flex
    }
    .match-container {
        margin: 5px;
        padding: 5px;
    }
    .match {
        margin: 10px;
        padding: 5px;
        border: 1px solid;
    }
</style>
