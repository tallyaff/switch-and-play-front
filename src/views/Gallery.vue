<template>
<section>
    <h2> It is gallery comp</h2>
        <p v-if="loggedinUser">
            Hello: {{'loggedinUser'? loggedinUser.username: 'guest'}}
        </p>
        <router-link v-if="loggedinUser" :to="`/user/${loggedinUser._id}/`">
            <button>my profile</button>
        </router-link>
        <!-- <router-link :to="'/game/edit/'"> -->
            <button  @click="checkIfDisplay">Add Game</button>
        <!-- </router-link> -->
        <game-list :games="gamesForDisplay" @remove="removeGame"></game-list>
</section>
</template>

<script>
import GameList from "@/components/GameList.vue";
import Header from "@/components/Header.vue";
import swal from "sweetalert";

export default {
  name: "Gallery",
  components: {
    GameList
  },
  created() {
    this.loadGames();
  },
  computed: {
    gamesForDisplay() {
      return this.$store.getters.gamesForDisplay;
    },
    loggedinUser() {
      return this.$store.getters.loggedUser;
    }
  },
  methods: {
    loadGames() {
      this.$store
        .dispatch({ type: "loadGames" })
        .then(games => {})
        .catch(err => {
          console.log("err", err);
        });
    },
    checkIfDisplay() {
        console.log('this.loggedinUser',this.loggedinUser)
      if (!this.loggedinUser) {
        swal({
          title: "Please login to add your game",
          buttons: ["Not now", "Login"]
        }).then(willLogin => {
          if (willLogin) {
            this.$router.push("/login");
          } else {
            swal.close();
          }
        });
      }else this.$router.push("/game/edit");
    },
    removeGame(gameId) {
      swal({
        title: "Are you sure you want to delete this game?",
        icon: "warning",
        buttons: ["Cancel", "Delete"],
        dangerMode: true,
        className: "swal-warning"
      }).then(willDelete => {
        if (willDelete) {
          this.$store.dispatch({ type: "removeGame", gameId }).then(() => {
            swal("Your game has been deleted!", {
              icon: "success",
              timer: 2000,
              className: "swal-text",
              button: false
            });
          });
        } else {
          swal.close();
        }
      });
    }
  }
};
</script>

<style>
.swal-text {
  font-family: "Ubuntu";
  color: #0d72fa;
  font-size: 20px !important;
}

.swal-title {
  font-family: "Ubuntu";
  font-size: 20px;
}
</style>

