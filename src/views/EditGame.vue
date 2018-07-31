<template>
    <section>
    <h3>Edit your game!</h3>
        <div class="edit-game no-margin" v-if="gameCopy">
          <el-form class="no-margin" :label-position="labelPosition" @submit.native.prevent="saveGame"  style="width: 40%">
              <el-form-item label="Name">
              <el-input  v-model="gameCopy.name"/>
              </el-form-item>
              <el-form-item label="Descreption">
              <el-input type="textarea" v-model="gameCopy.desc"/>
              </el-form-item>
              <el-form-item label="Category">
              <el-select v-model="gameCopy.category">
                  <el-option value="board-game">Board-game</el-option>
                  <el-option value="console">Console</el-option>
                  <el-option value="doll">Doll</el-option>
                  <el-option value="lego">Lego</el-option>
                  <el-option value="playmobil">Playmobil</el-option>
                  <el-option value="wheels">Wheels</el-option>
                  <el-option value="puzzle">Puzzle</el-option>
              </el-select>
              </el-form-item>
<el-form-item label="Type">
              <el-select v-model="gameCopy.type">
                  <el-option value="baby">Baby</el-option>
                  <el-option value="child">Child</el-option>
                  <el-option value="teen">Teen</el-option>
              </el-select>
              </el-form-item>
<el-form-item label="Condition">
              <el-select v-model="gameCopy.condition">
                  <el-option value="brand-new">Brand new</el-option>
                  <el-option value="new">New</el-option>
                  <el-option value="used">Used</el-option>
              </el-select>
              </el-form-item>
              <el-button class="btn-save" type="primary" @click="saveGame">Save</el-button>
              <el-button @click="$router.go(-1)">Cancel</el-button>
          </el-form>
        </div>
    </section>
</template>

<script>
import GameService from "@/services/GameService.js";
import swal from "sweetalert";

export default {
  name: "editGame",
  data() {
    return {
      currGame: null,
      gameCopy: null,
      labelPosition: "left"
    };
  },
  created() {
    this.loadGame();
  },
  methods: {
    loadGame() {
      // console.log("this.$route.params in edit cmp", this.$route.params.gameId);
      if (this.$route.params.gameId) {
        console.log("has params!!");
        this.$store
          .dispatch({ type: "loadGame", gameId: this.$route.params.gameId })
          .then(game => {
            this.currGame = game;
            //     // console.log("this.currGame in edit cmp", this.currGame);
            this.gameCopy = JSON.parse(JSON.stringify(this.currGame));
            //     // console.log("this.gameCopy new in edit cmp", this.gameCopy);
          });
      } else {
        console.log("has No params!!");
        this.gameCopy = GameService.createEmptyGame();
      }
    },
    saveGame() {
      this.$router.go(-1);
      this.$store
        .dispatch({ type: "saveGame", savedGame: this.gameCopy })
        .then(game => {
          swal("Game has been saved!", {
            className: "swal-text",
            icon: "success",
            timer: 1500,
            button: false
          });
          console.log("savedGame from game APP");
        });
    }
  }
};
</script>

<style scoped lang="scss">
// @import '~@/assets/scss/style.scss';
// @import  'node_modules/sweetalert/src/sweetalert.scss';
.btn-save{
    background-color: $main-color;
}
.edit-game {
  border: 1px solid $main-color;
  width: 55%;
  padding: 20px;
}
</style>

<style>
.swal-text {
  font-family: "Ubuntu";
  color: #0d72fa;
  font-size: 30px;
}
</style>

