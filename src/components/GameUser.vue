<template>
    <section>
        <h1>gameuser cmp</h1>
        <p>userId</p>
    </section>
</template>

<script>
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
        }
    }
}
</script>

<style>

</style>
