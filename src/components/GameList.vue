<template>
  <div class="game-list flex ">
  <!-- <div class="game-list masonry"> -->
            <!-- <router-link v-if="user.isAdmin" tag="button" to="/toy/edit/">Add</router-link> -->
            <!-- <ul class="game-cards-container" v-if="games"> -->
            <ul class="game-cards-container flex space-between" v-if="games">
            <!-- <li v-if="currToys" v-for="(toy ,idx) in currToys" :key="toy._id">
                {{idx}} -->
                <li class="game clean-list" v-for="game in games" :key="game._id">
                <!-- <li class="masonry" v-if="games" v-for="game in games" :key="game._id"> -->
                    <game-preview  :game="game" @remove="$emit('remove', game._id)"></game-preview>
                    <router-link class="btn btn-more-details" :to="'/game/'+game._id"><font-awesome-icon icon="info" /></router-link>
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

<style scoped lang="scss">
  @import '~@/assets/scss/style.scss';

  .game-list {
    width: 1800px;
    // width: 1800px;
  }

  .game-cards-container {
    flex-wrap: wrap;    
  }

  li.game {
      cursor: pointer;
  }

  .game {
      width: 300px;
      border: 1px solid $border-color;  
      box-shadow: 0px 2px 4px 0px #d9d8d8;
      border-radius: 20px;
      margin: rem(10px);
      
  }

   .game:hover {
      transform: scale(0.95, 0.95);
      box-shadow: 0px 2px 4px 0px $secondary-color;
      // background-color: #d9d8d82b;
      // bactransition: all 0.5s;kground-color:  #f7b2532b;
  }

  .btn-more-details {
    color: $main-color;
    font-size: rem(20px);
    transition: all 0.3s;

    &:hover {
      color: $secondary-color;
    }
  }
</style>