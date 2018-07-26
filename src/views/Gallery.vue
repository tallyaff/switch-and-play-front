<template>
<div>
    <h2> It is gallery comp</h2>
        <p v-if="loggedinUser">
            Hello: {{'loggedinUser'? loggedinUser.username: 'guest'}}
        </p>
</div>
</template>

<script>
export default {
    computed:{
        loggedinUser(){
            return this.$store.getters.loggedUser
            }
    }

}
</script>

<style>

</style>

