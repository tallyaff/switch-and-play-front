<template>
  <div class="game-list">

            <!-- <router-link v-if="user.isAdmin" tag="button" to="/toy/edit/">Add</router-link> -->
            <ul>
            <!-- <li v-if="currToys" v-for="(toy ,idx) in currToys" :key="toy._id">
                {{idx}} -->
                <li v-if="games" v-for="game in games" :key="game._id">
                    <game-preview :game="game" @remove="$emit('remove', game._id)"></game-preview>
                    <!-- {{toy.name}} -->

                </li>
            </ul>
    <!-- toyList.vue -->
  </div>
</template>

<script>
import GamePreview from '@/components/GamePreview.vue'

export default {
  name: 'GameList',
  props: ['games'],
  components: {
    GamePreview
  },
    computed: {
    // user() {
    //   return this.$store.getters.setLoginUser;
    //   console.log('user', this.$store.getters.setLoginUser);
    // },
  }
}
</script>