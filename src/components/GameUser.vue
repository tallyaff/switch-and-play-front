<template>
    <section v-if="user" class="user-game-container flex column">
        <img :src="user.src"/>
        <p class="nameUser">{{user.username}}</p>
    </section>
</template>

<script>
import GameService from '@/services/GameService.js';

export default {
    name: "GameUser",
    props: ["userId"],
    data() {
        return {
            user: null
        }
    },
    created() {
        this.getGameUser()
        // debugger
    },
    methods: {
        getGameUser() {
            return GameService.getUserById(this.userId)
                .then(user => {
                    console.log('user from server&&&', user);
                    this.user = user
                })
        }
    }
}
</script>

<style>
    .user-game-container {
        position: absolute;
        top: -100px;
        left: -75px;
    }
    .user-game-container>img {
        width: 50px;
        height: 50px;
        padding: 2px;
        border: 2px solid white;
        border-radius: 50%;
        position: relative;
        /* left: 0px;
        bottom: 1px;  */
    }
    .nameUser {
        /* position: relative; */
        /* bottom: 50px;
        left: -84px; */
    }
</style>
