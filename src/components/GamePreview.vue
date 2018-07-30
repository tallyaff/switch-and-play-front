<template>
  <!-- <div class="game-preview" > -->
        <ul class="game-preview-container flex column align-center clean-list space-between" v-if="game">
            <!-- :src="game.src"  -->
            <!-- {{game._id}} -->
            <el-checkbox checked @change=" $emit('check', {gameId :game._id, checked:checked})
            " v-model="checked" v-if="gameCheckbox" label="offer this game"></el-checkbox>
            <li class="game-name-preview">{{game.name}}</li>
            <div class="image-container" :style="{backgroundImage: url, backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
            </div>
            <li class="game-category-preview"><span>Category: </span> {{game.category}}</li>
            <li class="game-condition-preview"><span>Condition: </span>{{game.condition}}</li>
            <!-- <li class="game-addedAt-preview"><span>Added at: </span> {{game.addedAt}}</li> -->
            <li class="game-addedAt-preview"><span>Added at: </span> {{game.addedAt | getDate }}</li>
            <!-- <li class="game-addedAt-preview"><span>Added at: </span> {{1532359863 | getDate }}</li> -->
            <!-- TODO: user location & name -->
            <li v-if="game.isNew" class="game-new-icon"><img src="img/new-icon.png"></li>
            <li class="game-location-preview"><span>Location: </span> </li>
            <li class="game-user-name-preview"><span>by </span> </li>
            <li>
                <!-- v-if="user.isAdmin"  -->
                <button v-if="loggedinUser === 'game.userId'" class="btn btn-remove" @click="$emit('remove', game._id)">Remove</button> 
                <router-link v-if="loggedinUser === 'game.userId'" tag="button" :to="'/game/edit/'+game._id">Edit</router-link> 
            </li>
        </ul>

        
  <!-- </div> -->
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
    url() {
      return `url("${this.game.src}")`;
    },
    loggedinUser() {
      // console.log(this.$store.getters.loggedUser);
      return this.$store.getters.loggedUser || {};
    },
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
    @import "../assets/scss/style.scss";
    .game-name-preview {
      font-size: rem(30px);
      font-family: "Ubuntu";
      padding: rem(20px);
      color: $main-color;
      text-transform: capitalize;
    }

    .image-container {
      width: 300px;
      height: 250px;
    }
    img {
      width: 100%;
      cursor: pointer;
      transition: all 0.5s;
    }

    img:hover {
      // background-color: #d9d8d82b;
      // background-color: #f7b2532b;
  }
    
    .game-category-preview, .game-condition-preview, .game-addedAt-preview, .game-location-preview, .game-user-name-preview {
        padding: rem(5px);
        color: $main-color; 
        font-family: 'Lato-Bold';
        span {
          color: black;
        }
    }

    .game-user-name-preview span {
      text-transform: capitalize;
      color: $secondary-color;

    }
  
</style>
