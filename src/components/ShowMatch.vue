
<template>
    <section class="show-match">
        <h1>it's a match</h1>
        <router-link :to="'/game'" type="button">back to gallery
            <!-- <button>back to gallery</button> -->
        </router-link>
    </section>    
</template>

<script>
export default {
    name: 'showMatch',
    props: ["match", "game"],
    created() {
        console.log('game from match##:', this.game);
        console.log('match from match##:', this.match);
    },
    methods: {
        handleMatch() {
            console.log('game from match@@:', this.game);
        }
    }
}
</script>

<style>
    .show-match {
        border: 1px solid;
        background-color: aquamarine;       /*temp color- change later*/
    }
</style>
