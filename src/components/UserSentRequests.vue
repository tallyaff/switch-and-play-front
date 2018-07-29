<template>
    <section>
        <div class="flex column switchedGames">
            <h3>Games I ask:</h3>
            <ul v-if="requestes">
                <li v-for="request in requestes" :key="request._id" class="flex match-container">
                    <div class="flex match">
                        <h4>I ask: </h4>
                        <p>{{request.userActiveGames[0].name}}</p>
                        <!-- <img :src="match.passive.img"/> -->
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

<style>

</style>
