
<template>
    <section class="show-match">
        <h1>it's a match</h1>
        <router-link :to="'/game'">
        <font-awesome-icon icon="arrow-circle-left"/></router-link>
        </router-link>
    </section>    
</template>

<script>
export default {
    name: 'showMatch',
    props: ["match", "game"],
    created() {
//         this.match =
//         this.game = {
//             {
//                 "_id": {
//                     "$oid": "5b596cf23af932a16bcd90a1"
//                 },
//                 "name": "Playmobil school bus",
//                 "src": "img/gameImg/playmobil/playmobil_school_bus.jpg",
//                 "type": "child",
//                 "category": "playmobil",
//                 "desc": "Playmobil school bus - city life, for age 4+",
//                 "userId": "5b5868165d5aba03c1ce3059",
//                 "condition": "New",
//                 "isAvailble": true,
//                 "isNew": false,
//                 "addedAt": 1532415436
// }
//         }
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
