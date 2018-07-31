<template>
    <section>
        <div class="flex column match-container">
            <h3>Games I asked:</h3>
            <ul v-if="requestes" class="flex games-box">
                <li v-for="request in requestes" :key="request._id">
                    <div class="flex column game-box">
                        <!-- <h5>{{request.userActiveGames[0].name}}</h5> -->
                        <!-- <img :src="request.userActiveGames[0].src"/> -->
                        <div type="text" class="user-details-container">
                            <!-- <GameUser :userId="request.userActive.userId" class="user-details flex"></GameUser> -->
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
    props: ["requestes"],
    component: {GameUser},
    created() {
        // console.log('%%requestes:&&', this.requestes);
    },
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";

</style>
