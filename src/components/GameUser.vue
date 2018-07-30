<template>
    <section>
        <!-- <p>{{userId}}</p> -->
        <p>{{user._id}}</p>
    </section>
</template>

<script>
import UserService from '@/services/UserService.js';

export default {
    name: "GameUser",
    props: ["userId"],
    data() {
        return {
            user: ''
        }
    },
    created() {
        this.getGameUser
        console.log('user??!!', this.user);
    },
    computed: {
        getGameUser() {
            var userId = this.userId
            console.log('userId&&&', userId);
            UserService.getUserById(userId)
            .then(user => {
                console.log('user from server&&&', user);
                this.user = user
            })
        }
    }
}
</script>

<style>

</style>
