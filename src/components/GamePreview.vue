<template>
  <div class="game-preview" v-if="game">
        <ul class="game-preview-container">
            <!-- :src="game.src"  -->
            {{game._id}}
            <el-checkbox @change=" $emit('check', {gameId :game._id, checked:checked})
            " v-model="checked" v-if="gameCheckbox" label="offer this game"></el-checkbox>
            <li class="game-name-preview">{{game.name}}</li>
            <img :src="game.src" :alt="'no image'"/>
            <li class="game-category-preview">Category: {{game.category}}</li>
            <li class="game-condition-preview">Condition: {{game.condition}}</li>
            <li class="game-addedAt-preview">Added at: {{game.addedAt}}</li>
            <li>
                <!-- v-if="user.isAdmin"  -->
                <button class="btn btn-remove" @click="$emit('remove', game._id)">Remove</button> 
                <router-link  tag="button" :to="'/game/edit/'+game._id">Edit</router-link> 
                <router-link tag="button" :to="'/game/'+game._id">More details</router-link>
            </li>
        </ul>
  </div>
</template>

<script>
export default {
  name: "GamePreview",
  props: ["game","gameCheckbox"],
  data(){
    return{
     checked : false
    }
  },

  methods: {

  },
  computed: {
    // checked(){
    //   $emit('check', game._id,this.checked)
    // }
    // user() {
    //   // console.log('user!!!!!!!!!!!!!!!!!!', this.$store.getters.setLoginUser);
    //   return this.$store.getters.setLoginUser;
    // },
 
  }
};
</script>

<style scoped lang="scss">
  @import '../assets/scss/style.scss';
    .game-name-preview {
      font-size: rem(30px);
      font-family: 'Ubuntu';
  }


</style>