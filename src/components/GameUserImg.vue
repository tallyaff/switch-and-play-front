<template>
    <section v-if="user">
        <img :src="user.src" class="user-img"/>
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
                    // console.log('user from server&&&', user);
                    this.user = user
                })
        }
    }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";

   
</style>
