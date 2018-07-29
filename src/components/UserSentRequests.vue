<template>
    <section>
        <div class="flex column match-container">
            <h3>Games I ask:</h3>
            <ul v-if="requestes" class="flex games-box">
                <li v-for="request in requestes" :key="request._id">
                    <div class="flex column game-box">
                        <h5>{{request.userActiveGames[0].name}}</h5>
                        <img :src="request.userActiveGames[0].src"/>
                        <h6>from: {puki}</h6>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: 'userRequest',
    props: ["requestes"],
    created() {
        console.log('requestes:&&', this.requestes);
    },
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";

</style>
