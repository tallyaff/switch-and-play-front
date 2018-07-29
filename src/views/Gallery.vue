<template>
<section>
    <h2> It is gallery comp</h2>
    <div class="user-icons-container flex">
        <p v-if="loggedinUser">
            Hello: {{'loggedinUser'? loggedinUser.username: 'guest'}}
        </p>
        <router-link v-if="loggedinUser" :to="`/user/activity/${loggedinUser._id}`">
            <button :class="notification? 'btn notification': 'btn no-notification'" :setNotification="setNotification">
                {{notificationCount}}
            </button>
        </router-link>
        <router-link v-if="loggedinUser" :to="`/user/${loggedinUser._id}/`">
            <button>my profile</button>
        </router-link>
        <router-link :to="'/game/edit/'">
            <button>Add Game</button>
        </router-link>
    </div>
        <game-list :games="gamesForDisplay" @remove="removeGame"></game-list>
</section>
</template>

<script>
    import GameList from "@/components/GameList.vue";

    export default {
        name: "Gallery",
        components: {
            GameList
        },
        data() {
            return {
                notification: false,
                notificationCount: 0
            }
        },
        created() {
            this.loadGames();
            console.log('notification1: ', this.notificationCount);
            console.log('notification2: ', this.notification);
            console.log('%notification3: ', this.getNotificationCount.length);
            this.setNotification()
        },
        computed: {
            gamesForDisplay() {
                return this.$store.getters.gamesForDisplay;
            },
            loggedinUser() { 
                return this.$store.getters.loggedUser
            },
            getNotificationCount() {
                return this.$store.getters.getRecieves
            },
        },
        methods: {
            loadGames() {
                this.$store
                .dispatch({ type: "loadGames" })
                .then(games => {})
                .catch(err => {
                    console.log("err", err);
                });
            },
            removeGame(gameId) {
                console.log("remove item...", gameId);
                this.$store.dispatch({ type: "removeGame", gameId }).then(() => {
                    console.log("removed from Gallery");
                    // eventBusService.$emit(SHOW_MSG, {txt: `Todo was removed`})
                });
            },
            setNotification() {
                console.log('setNotification');
                if (this.getNotificationCount.length > 0) {
                    this.notificationCount = this.getNotificationCount.length;
                    this.notification = true;
                }
            }
        }
    };
</script>

<style>
.btn {
    cursor: pointer;
}
.notification {
    border-radius: 50%;
    color: white;
    background-color: red;
}
.no-notification {
    display: none;
}
</style>

