<template>
<section>
  <div class="gallery-container flex container column container">
    <div class="filter-gallery">
        <Game-filter></Game-filter> 
    </div>
      <div v-if="gamesLoading">
        <div class="loader-circle"></div>
  </div>
    <div v-else class="images-container-gallery flex">
        <game-list class="game-list container" :games="gamesForDisplay" @remove="removeGame"></game-list>
    </div>
  </div>
</section>
</template>

<script>
import GameList from "@/components/GameList.vue";
import GameFilter from "@/components/GameFilter.vue";
import Header from "@/components/Header.vue";
import swal from "sweetalert";

export default {
  name: "Gallery",
  components: {
    GameList,
    GameFilter,
    Header
  },
  created() {
    // this.$store.loadGames();
    // console.log('this.gamesForDisplay in gallery', this.gamesForDisplay);
    // this.gamesForDisplay;
  },
  computed: {
    // gamesForDisplay() {
    //   return this.$store.getters.gamesForDisplay;
    // },
    gamesForDisplay() {
      return this.$store.getters.gamesByFilterServer;
    },
    loggedinUser() {
      return this.$store.getters.loggedUser;
    },
    gamesLoading() {
      return this.$store.getters.gamesLoading;
    }
  },
  methods: {
    checkIfDisplay() {
      // console.log("this.loggedinUser", this.loggedinUser);
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
    // loadGames() {
    //   this.$store
    //     .dispatch({ type: "loadGames" })
    //     .then(games => {})
    //     .catch(err => {
    //       console.log("err", err);
    //     });
    // },
    // setNotification() {
    //   // console.log("setNotification");
    //   if (this.getNotificationCount.length > 0) {
    //     this.notificationCount = this.getNotificationCount.length;
    //     this.notification = true;
    //   }
    // },
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
.swal-text {
  font-family: "Ubuntu";
  color: #0d72fa;
  font-size: 20px !important;
}
.swal-title {
  font-family: "Ubuntu";
  font-size: 20px;
}
.game-list {
  padding: 0 20px;
}
.filter-gallery {
  // margin-top: 108px;
}

</style>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";
.images-container-gallery {
  // margin-top: rem(100px);
}

@media (min-width: 980px) {
  .filter-images-container-gallery {
    margin-top: rem(30px);
  }
}
</style>
    


