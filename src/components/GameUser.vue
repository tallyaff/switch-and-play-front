<template>
    <section v-if="getGameUser" class="user-game-container flex">
        <p>{{user.username}}</p>
        <img :src="user.src"/>
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
    .user-game-container>img {
        width: 50px;
        height: 50px;
        border: 2px solid white;
        border-radius: 50%;
    }
</style>
