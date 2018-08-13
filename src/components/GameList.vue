<template>
  <div class="game-list flex">
        <ul class="game-cards-container flex justify-center" v-if="games">
          <div class="game game-preview clean-list" v-for="game in games" :key="game._id">
            <router-link class="btn btn-more-details" :to="'/game/'+game._id">
                <game-preview :isGallery="true" :game="game" @remove="$emit('remove', game._id)"></game-preview>
            </router-link>
          </div>
        </ul>
  </div>
</template>

<script>
import GamePreview from "@/components/GamePreview.vue";

export default {
  name: "GameList",
  props: ["games"],
  components: {
    GamePreview
  },
};
</script>

<style scoped lang="scss">
  @import '~@/assets/scss/style.scss';

  .game-list {
    max-width: 1800px;
  }

  .game-cards-container {
    flex-wrap: wrap;  
  }
  .game img {
    width: 55%;
  }
  .game {
    border: 1px solid #dadada;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    transition: all 0.5s;
  }

   .game:hover {
      transform: scale(0.95, 0.95);
  }

  @media (min-width: 980px) {
    .game-cards-container{
      justify-content: space-between;
      margin-left: 120px;
}

  }
</style>
