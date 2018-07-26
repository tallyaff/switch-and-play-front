<template>
    <section>
        <div>
            <!-- <ul>
                <li v-for="match in matches" :key="match._id">
                    <div>
                        <p>I gave: {{match.passive.game.name}}</p>
                        <img :src="match.passive.img"/>
                    </div>
                    <div>
                        <p>I recieved: {{match.active.game.name}}</p>
                        <img :src="match.active.game.img"/>
                        <p>from: {{match.active.user.name}}
                    </div>
                </li>
            <ul> -->
        </div>
    </section>
</template>

<script>
export default {
    name: 'userMatch',
    props: ["matches"],
}
</script>

<style>

</style>
