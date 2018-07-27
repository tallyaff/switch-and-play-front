<template>
    <section>
        <div>
            <ul v-if="recieves">
                <li v-for="recieve in recieves" :key="recieve._id" class="flex match-container">
                    <div class="flex match">
                        <h4>ask from me: </h4>
                        <p>{{recieve.userPassiveGame.name}}</p>
                        <!-- <img :src="match.passive.img"/> -->
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>

<script>
export default {
    name: 'userRecieve',
    props: ["recieves"],
    created() {
        console.log('recieved&&&:', this.recieves);
    }
}
</script>

<style>

</style>
