<template>
    <div class="header">
        <nav-bar :loggedinUser.sync="loggedinUser" @logout="logout"></nav-bar>
        <p v-if="loggedinUser">
            Hello {{'loggedinUser'? loggedinUser.username: 'guest'}}
        </p>
        <p v-else>
            Hello Guest
        </p>
    </div>
</template>

<script>
    import { eventBus, EVENT_LOGIN_USER } from "../services/EventBusService.js";
    import UserService from "../services/UserService.js";
    import UtilService from "../services/UtilService.js";
    import NavBar from "@/components/NavBar.vue";

    export default {
        created() {
            eventBus.$on(EVENT_LOGIN_USER, loggedinUser => {
                console.log(this.loggedinUser, "this.loggedinUser");
                this.loggedinUser = loggedinUser;
            })
        },
        data() {
            return {
                loggedinUser: UserService.getLoggedinUser() || null
            }
        },
        methods: {
            logout() {
                UserService.logout()
            }
        },
        components: {
            NavBar
        }
    };
</script>

<style>
</style>
