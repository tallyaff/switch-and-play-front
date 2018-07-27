<template>
    <section>
        <div>
            <!-- <ul>
                <li v-for="recieve in recieves" :key="recieve._id">
                    <div>
                        <p>I ask: {{recieve.game.name}}</p>
                        <img :src="recieve.game.img"/>
                        <p>from: {{recieve.user.name}}
                    </div>
                </li>
            <ul> -->
        </div>
    </section>
</template>

<script>
export default {
    name: 'userRecieve',
    props: ["recieves"],
}
</script>

<style>

</style>
