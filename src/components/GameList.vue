<template>
  <div class="game-list flex ">
            <ul class="game-cards-container flex space-between" v-if="games">
                <li class="game clean-list" v-for="game in games" :key="game._id">
                <!-- <li class="masonry" v-if="games" v-for="game in games" :key="game._id"> -->
                    <game-preview  :game="game"
                     @remove="$emit('remove', game._id)"
                     >
                    
                     </game-preview>

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
      transition: all 0.5s;
  }

   .game:hover {
      transform: scale(0.95, 0.95);
      box-shadow: 0px 2px 4px 0px $secondary-color;
      // background-color: #d9d8d82b;
      // background-color:  #f7b2532b;
  }
</style>