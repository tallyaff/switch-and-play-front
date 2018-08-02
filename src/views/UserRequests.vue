<template>
    <section>
        <div class="flex column match-container">
            <div class="activity-header flex">
                <h3>Games I asked:</h3>
                <div class="router-container-activity flex">
                    <router-link :to="`/user/activity/recieve/${loggedinUser._id}/`" class="flex not-container">
                        <el-button type="primary" class="activity-btn">Requests From Me</el-button>
                    </router-link>
                    <router-link :to="`/user/activity/match/${loggedinUser._id}/`" class="flex not-container">
                        <el-button type="primary" class="activity-btn">My Swapping</el-button>
                    </router-link>
                </div>
            </div>
            <ul v-if="requestes" class="flex games-box recieve">
                <li v-for="request in requestes" :key="request._id">
                    <div class="flex column game-box">
                        <h5>{{request.userPassiveGame.name}}</h5>
                        <img :src="request.userPassiveGame.src"/>
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
</style>
