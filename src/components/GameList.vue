<template>
  <div class="game-list">

            <!-- <router-link v-if="user.isAdmin" tag="button" to="/toy/edit/">Add</router-link> -->
            <ul class="toy-preview-container-headers">
              <li>Toy Id-- ? </li>
              <li>Toy Name-- ?</li>
              <li>Toy Price-- ?</li>
              <li>Toy Instock-- ?</li>
              <li>Actions-- ?</li>
            </ul>
            <ul>
            <!-- <li v-if="currToys" v-for="(toy ,idx) in currToys" :key="toy._id">
                {{idx}} -->
                <li v-if="games" v-for="game in games" :key="game._id">
                    <ToyPreview :toy="toy" @remove="$emit('remove', toy._id)"></ToyPreview>
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
    ToyPreview
  },
    computed: {
    // user() {
    //   return this.$store.getters.setLoginUser;
    //   console.log('user', this.$store.getters.setLoginUser);
    // },
  }
}
</script>