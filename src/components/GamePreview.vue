<template>
  <div class="game-preview" >
    <ul class="game-preview-container pointer flex column align-center clean-list space-between" v-if="game">
        <li class="game-name-preview">{{game.name}}</li>
        <li v-if="game.isNew" class="game-new-icon">
            <img v-if="!newIcon" src="img/new-icon.png">
        </li>
        <div class="image-container" :style="{backgroundImage: url, backgroundSize: 'cover', 
             backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
        </div>
        <div class="image-container flex align-center justify-center">
            <img :src="game.src" class="image-card">
        </div>
        <div class="card-text-container">
          <li class="game-category-preview capitalize">
              <span>Category:</span>{{game.category}}</li>
          <li class="game-condition-preview capitalize" v-if="!condition">
              <span>Condition:</span>{{game.condition}}</li>
          <li class="game-addedAt-preview capitalize">
              <span>Added at:</span>{{game.addedAt | getDate }}</li>
          <!-- TODO: user location & name -->
          <li class="game-location-preview capitalize" v-if="!location">
              <!-- <span>Location: </span> -->
          </li>
          <li class="game-user-name-preview capitalize" v-if="!username">
              <!-- <span>by </span>{{username}} -->
          </li>
          <el-checkbox class="offer-game" checked @change=" $emit('check', {gameId :game._id, checked:checked})
                " v-model="checked" v-if="gameCheckbox" label="Offer this game"></el-checkbox>
          <li>
              <!-- <button v-if="loggedinUser === 'game.userId'" class="btn btn-remove" @click="$emit('remove', game._id)">Remove</button> 
                    <router-link v-if="loggedinUser === 'game.userId'" tag="button" :to="'/game/edit/'+game._id">Edit</router-link>  -->
          </li>
          <!-- <div type="text" class="user-name-card-home">
              <gameUser :userId="game.userId" class="user-game-container flex column"></gameUser>
          </div> -->
        </div>

    </ul>


            <!-- <div class="card-text-container flex justify-center align-center column">
                <span class="card-game-name">{{game.name}}</span>
                <div class="username-time-container flex space-between align-center space-between">
                    <div type="text" class="user-name-card-home">User Name</div>
                    <time class="time">{{ game.addedAt | getDate }}</time>
                </div>
            </div> -->
    </div>
</template>

<script>
import GameUser from "@/components/GameUser.vue";

export default {
  name: "GamePreview",
  components: {GameUser},
  props: ["game", "gameCheckbox", "condition", "location", "username", "newIcon"],
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

.game-preview {
 height: 100%;
}

.game-preview-container {
 // width: 200px; // i shut it for gamerequest
 position: relative;
 transition: all 0.5s;
 height: 100%;
 &:hover {
   transform: scale(0.95, 0.95);
 }
}

.el-checkbox.offer-game {
 // background-color: $secondary-color;
 // border-color: $secondary-color;
 padding: 15px;
 position: absolute;
 top: 0;
 left: 0;
 transform: scale(1.5);
 // width: 15px;
 // height: 15px;
}

// .isChecked {
//   border: 3px solid $main-color;
// }

.game-name-preview {
 font-size: rem(16px);
 font-family: "Ubuntu";
 // padding: rem(12px); // i shut it for gamerequest
 color: $main-color;
 text-transform: capitalize;
 padding: 10px; //was added for game reqest
}

.image-container {
 // width: 300px;
 //  height: 150px; // i shut it for gamerequest
}
img {
 width: 50%; //todo in if class!!!
 height: auto;
 transition: all 0.5s;
 margin: 5px; //was added to game request
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
 top: -29px;
 left: -24px;
}
ul{
position: relative;
}
.card-text-container{ // was before
   text-align: left;
   font-size: 14px;
}

.card-text-container{ //for gamerequest
 background-color: $card-text-color;
 width: 100%;
 height: 27%;
 /* margin: 20px; */
 padding: 5px;
}
</style>
