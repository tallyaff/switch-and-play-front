<template>
    <div class="game-request">
        <h1>Create your request!</h1>
        
        <el-form>
            <span>would like to switch the next games:</span>
            <br>
            <li class="game" v-for="game in userGames" :key="game._id">
                <game-preview :game="game" :gameCheckbox="gameCheckbox" @check="updateGamesToSwitch">
                </game-preview>
                <li/>
                <el-checkbox label="i will pick it up from your place"></el-checkbox>
                <el-checkbox label="you will pick it up from my place"></el-checkbox>
                <el-checkbox label="lets talk about it"></el-checkbox>
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}"
                 placeholder="Enter some words to your request" v-model="textareaReq">
                </el-input>
                <el-button @click="sendRequest">Send your request!</el-button>
        </el-form>

    </div>
</template>

<script>
import GamePreview from "@/components/GamePreview.vue";

export default {
  name: "GameRequest",
  props: ["game"],
  created() {
      this.user = this.$state.getters.loggedUser
      loadGames(context)
//    return this.$store.getters.loggedUser()
//     console.log(lala,'lala')
    //userid = putuserid
  },
  data() {
    return {
      textareaReq: "",
      gameCheckbox: true,
      gamesToSwitch: [],
      userGames: [],
      user: null,
    };
  },
  components: {
    GamePreview
  },
  methods: {
    updateGamesToSwitch(data) {
      if (data.checked) {
        this.gamesToSwitch.push(data.gameId);
      } else {
        const gameIdx = this.gamesToSwitch.findIndex(
          game => game._id === data.gameId
        );
        this.gamesToSwitch.splice(gameIdx, 1);
      }
    },
    sendRequest() {
      console.log("sending request");
    }
  },
};
</script>

<style scoped lang="scss">
</style>