<template>
  <!-- <div class="game-preview" > -->
        <ul class="game-preview-container pointer flex column align-center clean-list space-between" v-if="game">
            <el-checkbox checked @change=" $emit('check', {gameId :game._id, checked:checked})
            " v-model="checked" v-if="gameCheckbox" label="offer this game"></el-checkbox>
            <li class="game-name-preview">{{game.name}}</li>
            <li v-if="game.isNew" class="game-new-icon"><img src="img/new-icon.png"></li>
            <div class="image-container" :style="{backgroundImage: url, backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
    <!-- <div class="game-preview" > -->
    <ul class="game-preview-container pointer flex column align-center clean-list space-between" v-if="game">
<!-- talyy and liron -->
        <el-checkbox checked @change=" $emit('check', {gameId :game._id, checked:checked})
              " v-model="checked" v-if="gameCheckbox" label="offer this game"></el-checkbox>

        <li class="game-name-preview">{{game.name}}</li>
        <li v-if="game.isNew" class="game-new-icon">
            <img src="img/new-icon.png">
        </li>
        <div class="image-container" :style="{backgroundImage: url, backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
        </div>
        <li class="game-category-preview capitalize">
            <span>Category: </span> {{game.category}}</li>
        <li class="game-condition-preview capitalize">
            <span>Condition: </span>{{game.condition}}</li>
        <li class="game-addedAt-preview capitalize">
            <span>Added at: </span> {{game.addedAt | getDate }}</li>
        <li class="game-addedAt-preview">
            <span>Added at: </span> {{1532359863 | getDate }}</li>
        <!-- TODO: user location & name -->
        <li class="game-location-preview capitalize" v-if="!location">
            <span>Location: </span>
        </li>
        <li class="game-user-name-preview capitalize">
            <span>by </span>
        </li>
        <li>
            <div class="image-container flex align-center justify-center">
                <img :src="game.src" class="image-card">
            </div>
            <!-- <button v-if="loggedinUser === 'game.userId'" class="btn btn-remove" @click="$emit('remove', game._id)">Remove</button> 
                  <router-link v-if="loggedinUser === 'game.userId'" tag="button" :to="'/game/edit/'+game._id">Edit</router-link>  -->
        </li>
    </ul>



            <!-- <div class="card-text-container flex justify-center align-center column">
                <span class="card-game-name">{{game.name}}</span>
                <div class="username-time-container flex space-between align-center space-between">
                    <div type="text" class="user-name-card-home">User Name</div>
                    <time class="time">{{ game.addedAt | getDate }}</time>
                </div>
            </div> -->
    <!-- </div> -->
</template>

<script>
export default {
  name: "GamePreview",
  props: ["game", "gameCheckbox", "location"],
  data() {
    return {
      checked: true
    };
  },
  // created() {
  //   this.onLoadCheckbox();
  //   this.$emit('check', {gameId :this.game._id, checked:this.checked})
  // },

  methods: {},
  computed: {
    url() {
      return `url("${this.game.src}")`;
    },
    loggedinUser() {
      // console.log(this.$store.getters.loggedUser);
      return this.$store.getters.loggedUser || {};
    }
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
.game-preview-container {
  width: 200px;
  transition: all 0.5s;
  &:hover {
    transform: scale(0.95, 0.95);
  }
}

.game-name-preview {
  font-size: rem(30px);
  font-family: "Ubuntu";
  padding: rem(20px);
  color: $main-color;
  text-transform: capitalize;
}

.image-container {
  // width: 300px;
  // height: 250px;
}
img {
  width: 100%;
  transition: all 0.5s;
}

img:hover {
  // background-color: #d9d8d82b;
  // background-color: #f7b2532b;
}

.game-category-preview,
.game-condition-preview,
.game-addedAt-preview,
.game-location-preview,
.game-user-name-preview {
  padding: rem(5px);
  color: $main-color;
  font-family: "Lato-Bold";
  span {
    color: black;
  }
}

.game-user-name-preview span {
  text-transform: capitalize;
  color: $secondary-color;
}

.game-new-icon {
  position: absolute;
  top: -2px;
  left: -2px;
}
ul{
 position: relative;
}
</style>
