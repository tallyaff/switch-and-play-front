<template>
<section>
    <p v-if="loggedinUser">
        Hello: {{'loggedinUser'? loggedinUser.username: 'guest'}}
    </p>
    <router-link v-if="loggedinUser" :to="`/user/${loggedinUser._id}/`">
        <button>my profile</button>
    </router-link>
    <router-link :to="'/game/edit/'">
        <button class="btn btn-add-game">Add Game</button>
    </router-link>
    <div class="filter-images-container-gallery flex">
        <GameFilter></GameFilter> 
        <game-list :games="gamesForDisplay" @remove="removeGame"></game-list>
    </div>
</section>
</template>

<script>
    import GameList from "@/components/GameList.vue";
    import GameFilter from '@/components/GameFilter.vue'

    export default {
        name: "Gallery",
        components: {
            GameList,
            GameFilter
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

<style scoped lang="scss">
    @import "~@/assets/scss/style.scss";
    .filter-images-container-gallery {
    
    }
    
</style>

