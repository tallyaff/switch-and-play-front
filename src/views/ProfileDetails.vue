<template>
    <section>
        <h1>this is my profile</h1>
        <p v-if="loggedinUser">
            Hello: {{'loggedinUser'? loggedinUser.username: 'guest'}}
        </p>
        <router-link v-if="loggedinUser" :to="`/user/activity/${loggedinUser._id}`">
            <button>my activities</button>
        </router-link>
    </section>
</template>

<script>
export default {
    name: "ProfileDetails",
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedUser
        }
    }
}
</script>

<style>

</style>
