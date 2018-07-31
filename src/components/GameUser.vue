<template>
<<<<<<< HEAD
    <section v-if="getGameUser" class="user-game-container flex">
        <p>{{user.username}}</p>
        <img :src="user.src"/>
=======
    <section>
        <h1>gameuser cmp</h1>
        <p>userId</p>
>>>>>>> master
    </section>
</template>

<script>
<<<<<<< HEAD
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
=======
export default {
    name: "GameUser",
    props: ["userId"],
    created() {
        this.getGameUser
    },
    methods: {
        getGameUser(userId) {
            console.log('userId&&&', userId);
            UserService.getUserById(userId)
            .then(user => {
                console.log('user from server&&&', user);
                return user
            })
>>>>>>> master
        }
    }
}
</script>

<style>
<<<<<<< HEAD
    .user-game-container>img {
        width: 50px;
        height: 50px;
        border: 2px solid white;
        border-radius: 50%;
    }
=======

>>>>>>> master
</style>
