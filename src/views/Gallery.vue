<template>
<section>
    <h2> It is gallery comp</h2>
        <p v-if="loggedinUser">
            Hello: {{'loggedinUser'? loggedinUser.username: 'guest'}}
        </p>
        <router-link :to="'/game/edit/'">
        <button>Add Game</button>
        </router-link>
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
        created() {
            this.loadGames();
        },
        computed: {
            gamesForDisplay() {
            return this.$store.getters.gamesForDisplay;
            },
            loggedinUser(){
                return this.$store.getters.loggedUser
            }
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
            }
        }
    };
</script>

<style>
</style>

