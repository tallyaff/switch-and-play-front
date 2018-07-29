<template>
<section>

    <!-- <router-link v-if="loggedinUser" :to="`/user/${loggedinUser._id}/`">
        <button>my profile</button>
    </router-link> -->
    
        
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
            <button @click="checkIfDisplay" class="btn btn-add-game">Add Game</button>
        </router-link>
    </div>
    <div class="filter-images-container-gallery flex">
        <GameFilter></GameFilter> 
        <game-list :games="gamesForDisplay" @remove="removeGame"></game-list>
    </div>
</section>
</template>

<script>

import GameFilter from '@/components/GameFilter.vue'
import GameList from "@/components/GameList.vue";
import Header from "@/components/Header.vue";
import swal from "sweetalert";

export default {
    name: "Gallery",
    components: {
        GameList,
        GameFilter,
        Header,
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
        },
        checkIfDisplay() {
            console.log('this.loggedinUser',this.loggedinUser)
            if (!this.loggedinUser) {
                swal({
                title: "Please login to add your game",
                buttons: ["Not now", "Login"]
                }).then(willLogin => {
                    if (willLogin) {
                        this.$router.push("/login");
                    } else {
                        swal.close();
                    }
                });
            } else this.$router.push("/game/edit");
        },
        removeGame(gameId) {
            swal({
                title: "Are you sure you want to delete this game?",
                icon: "warning",
                buttons: ["Cancel", "Delete"],
                dangerMode: true,
                className: "swal-warning"
            })
            .then(willDelete => {
                if (willDelete) {
                    this.$store.dispatch({ type: "removeGame", gameId }).then(() => {
                        swal("Your game has been deleted!", {
                            icon: "success",
                            timer: 2000,
                            className: "swal-text",
                            button: false
                            });
                    });
                } else {
                    swal.close();
                }
            });
        }
    }
}
    
    
</script>

<style scoped lang="scss">
    @import "~@/assets/scss/style.scss";

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
.swal-text {
    font-family: "Ubuntu";
    color: #0d72fa;
    font-size: 20px !important;
}

.swal-title {
  font-family: "Ubuntu";
  font-size: 20px;
}
</style>

    


