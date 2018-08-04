<template>
    <div class="game-preview" :class="{checkedBorder: checked, gameRequest: isGameRequest}">
        <ul :class="{gallery: isGallery}" class="game-preview-container pointer flex column align-center clean-list space-between"
            v-if="game">
            <!-- <li>
            <el-checkbox class="offer-game" checked @change=" $emit('check', {gameId :game._id, checked:checked})
                  " v-model="checked" v-if="gameCheckbox"></el-checkbox>
          </li> -->

            <li class="offer-game-2" :class="{gameRequest: isGameRequest}">
                <label class="check" :class="{gameRequest: isGameRequest}">
                    <input type="checkbox" checked @change=" $emit('check', {gameId :game._id, checked:checked})
                  " v-model="checked" v-if="gameCheckbox" />
                    <div class="box" :class="{gameRequest: isGameRequest}"></div>
                </label>
            </li>


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
            <div class="card-text-container" :class="{gallery: isGallery}">
                <li class="game-category-preview capitalize" :class="{gameRequest: isGameRequest}">
                    <span>Category: </span>{{game.category}}</li>
                <li class="game-condition-preview capitalize" v-if="!condition">
                    <span>Condition: </span>{{game.condition}}</li>
                <li class="game-addedAt-preview capitalize" :class="{gameRequest: isGameRequest}">
                    <span>Added at: </span>{{game.addedAt | getDate }}</li>
                <!-- TODO: user location & name -->
                <!-- <li class="game-location-preview capitalize" v-if="!location"> -->
                <!-- <span>Location: </span> -->
                <!-- </li> -->
                <!-- <li class="game-user-name-preview capitalize" v-if="!username"> -->
                <!-- <span>by </span>{{username}} -->
                <!-- </li> -->
                <!-- <button v-if="loggedinUser === 'game.userId'" class="btn btn-remove" @click="$emit('remove', game._id)">Remove</button> 
                      <router-link v-if="loggedinUser === 'game.userId'" tag="button" :to="'/game/edit/'+game._id">Edit</router-link>  -->

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
                  </div>--> 
        </div>
</template>

<script>
import GameUser from "@/components/GameUser.vue";

export default {
  name: "GamePreview",
  components: {GameUser},
  props: ["game", "gameCheckbox", "condition", "location", "username", "newIcon", "isGallery", "isGameRequest"],
  data() {
    return {
      checked: true,
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

.gameRequest.checkedBorder.game-preview {
    border: 2px solid $secondary-color;
    // border: 2px solid #bcbab5;
}


.gameRequest.game-category-preview, .gameRequest.game-addedAt-preview {
    color: grey;
    // font-family: 'Ubuntu';
    & span {   
        color: #adaaaa;
    }
}

.gameRequest.check {
  width: 60px;
  height: 60px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  transition: all 0.3s;
  
  input {
    display: none;
    &:checked + .box {
    //   background-color: $secondary-color;
      
      &:after {
        top: 0;
      }
    }
  }
  
  .gameRequest.box {
    width: 50%;
    height: 50%;
    transition: all 1.1s cubic-bezier(.19,1,.22,1);
    border: 2px solid #d5d3d3;
    border-radius: 4px;
    background-color: $card-text-color;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    //   box-shadow: 0 5px rgba(0,0,0,.2);
    &:after {
      width: 50%;
      height: 20%;
      content: '';
      position: absolute;
      border-left: 3.5px solid;
      border-bottom: 3.5px solid;
      border-color: $secondary-color;
      transform: rotate(-45deg) translate3d(0,0,0);
      transform-origin: center center;
      transition: all 1.1s cubic-bezier(.19,1,.22,1);
      left: 0;
      right: 0;
      top: 200%;
      bottom: 5%;
      margin: auto;
    }
  }
}




.gallery.game-preview-container {
    width: 200px;
    height: 260px;


    // pointer flex column align-center clean-list space-between
}

.gallery.card-text-container {
    text-align: left;
    font-size: 14px;
     background-color: $card-text-color;
 width: 100%;
    height: 35%;   
 /* margin: 20px; */
 padding: 5px;
}

.game-preview {
 height: 100%;

}
.game-preview-container {
 // width: 200px; // i shut it for gamerequest ****
 
 position: relative;
 transition: all 0.5s;
 height: 100%;
 &:hover {
//    transform: scale(0.95, 0.95);
 }
}

.gameRequest.offer-game-2 {
    position: absolute;
    top: 40px;
    left: 10px;
}

.el-checkbox.offer-game {
//  background-color: $secondary-color;
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
 color: $main-color;
 text-transform: capitalize;
 padding: 10px;
}

.image-container {
 // width: 300px;
 //  height: 150px; // i shut it for gamerequest - i think we dont need
}
img {
 width: 50%; //todo in if class!!! - i think we dont need
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

.card-text-container { //for gamerequest
 background-color: $card-text-color;
 width: 100%;
 height: 27%;
 /* margin: 20px; */
 padding: 5px;
}

</style>
