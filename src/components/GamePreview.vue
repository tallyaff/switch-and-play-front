<template>
  <!-- <div class="game-preview" > -->
        <ul class="game-preview-container flex column align-center clean-list" v-if="game">
            <!-- :src="game.src"  -->
            <li class="game-name-preview">{{game.name}}</li>
            <div class="image-container" :style="{backgroundImage: url, backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
              <!-- this url{{url}} -->
            <!-- <div class="image-container" :style="{backgroundImage: 'url('game.src}"> -->
              <!-- <img :src="game.src" :alt="'no image'"/> -->
            </div>
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
  <!-- </div> -->
</template>

<script>
export default {
  name: "GamePreview",
  props: ["game"],
  data() {
    return {}
    // url("../../media/examples/lizard.png");
  },

  methods: {

  },
  computed: {
    // user() {
    //   // console.log('user!!!!!!!!!!!!!!!!!!', this.$store.getters.setLoginUser);
    //   return this.$store.getters.setLoginUser;
    // },
    url() {
      return `url("${this.game.src}")`;
    } 
 
  }
};
</script>

<style scoped lang="scss">
  @import '../assets/scss/style.scss';
    .game-name-preview {
      font-size: rem(30px);
      font-family: 'Ubuntu';
    }
    .game-name-preview {
      padding: rem(10px);


    }
    .image-container {
      width: 100%;
      height: 500px;
    }
      img {
      // height: 50%;
      width: 100%;
      // background-repeat: no-repeat;

    // width: 400px;
    // height: 500px;
    // margin: 10px;
    // background-size: cover;
    // background-position: center;
    // background-repeat: no-repeat;
    cursor: pointer;
    transition: all 0.5s;
    
  }


</style>