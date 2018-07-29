<template>
    <div id="nav">
        <img src="img/logo.png">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/contact">Contact</router-link> |
        <router-link v-if="!loggedinUser" to="/login">Login</router-link>
        <button v-if="loggedinUser" @click="onLogout">Logout</button>

    </div>
</template>

<script>
    export default {
        name: "NavBar",
        props: ['loggedinUser'],
        methods: {
            onLogout() {
                this.$emit('update:loggedinUser', null);
                this.$emit('logout')
            }
        }
    };
</script>