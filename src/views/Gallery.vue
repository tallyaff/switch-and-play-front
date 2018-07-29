<template>
    <section>
        <div class="user-icons-container flex">
            <p v-if="loggedinUser">
                Hello: {{'loggedinUser'? loggedinUser.username: 'guest'}}
            </p>
            <button @click="checkIfDisplay" class="btn btn-add-game">Add Game</button>
        </div>
        <div class="filter-images-container-gallery flex">
            <GameFilter></GameFilter>
            <game-list :games="gamesForDisplay" @remove="removeGame"></game-list>
        </div>
    </section>
</template>

<script>
import GameFilter from "@/components/GameFilter.vue";
import GameList from "@/components/GameList.vue";
import swal from "sweetalert";

export default {
  name: "Gallery",
  components: {
    GameList,
    GameFilter
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
    removeGame(gameId) {
      console.log("remove item...", gameId);
      this.$store.dispatch({ type: "removeGame", gameId }).then(() => {
        console.log("removed from Gallery");
      });
    },
    checkIfDisplay() {
      console.log("this.loggedinUser", this.loggedinUser);
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
      } else this.$router.push("/game/edit");
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

<style scoped lang="scss">
// @import "~@/assets/scss/style.scss";

// .btn {
//   cursor: pointer;
// }
// .notification {
//   border-radius: 50%;
//   color: white;
//   background-color: red;
// }
// .no-notification {
//   display: none;
// }
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

    


