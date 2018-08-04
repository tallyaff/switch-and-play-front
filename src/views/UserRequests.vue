<template>
    <section>
        <div class="flex column match-container">
            <div class="activity-header flex">
            </div>
            <ul v-if="requestes" class="flex games-box recieve">
                <li v-for="request in requestes" :key="request._id">
                    <div class="flex column game-box">
                        <h3>{{request.userPassiveGame.name}}</h3>
                        <div class="img-activity-container">
                            <img :src="request.userPassiveGame.src"/>
                        </div>
                        <div type="text" class="user-details-container">
                            <GameUser :userId="request.userPassive.userId" class="user-details flex"></GameUser>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
import GameUser from '@/components/GameUser.vue';

export default {
    name: 'userRequest',
    components: {GameUser},
    created() {
        this.$store.dispatch({type: 'getMatch', 
            user: this.$route.params.userId
            });
        // console.log('requestsssss', this.matches);
    },
    computed: {
        requestes() {
            return this.$store.getters.getRequestes;
        },
        loggedinUser() {
             return this.$store.getters.loggedUser;
        },
    },
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";

.recieve {
    border: none;
    box-shadow: none;
}
.my-request {
    margin: 20px;
}

.game-box {
    justify-content: space-around;
    height: 300px;
    width: 250px;
}
</style>
