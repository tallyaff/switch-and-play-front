<template>
    <section>
        <div>
            <!-- <ul>
                <li v-for="request in requestes" :key="request._id">
                    <div>
                        <p>I ask: {{request.game.name}}</p>
                        <img :src="request.game.img"/>
                        <p>from: {{request.user.name}}
                    </div>
                </li>
            <ul> -->
        </div>
    </section>
</template>

<script>
export default {
    name: 'userRequest',
    props: ["requestes"],
}
</script>

<style>

</style>
