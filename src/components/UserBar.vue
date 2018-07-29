<template>
    <div class="user-bar">
        <div v-if="loggedinUser" class="user-icons-container flex">
            Hello {{'loggedinUser'? loggedinUser.username: 'guest'}}
            <router-link v-if="loggedinUser" :to="`/user/${loggedinUser._id}/`" >
                My profile
            </router-link>
            <router-link v-if="loggedinUser" :to="`/user/activity/${loggedinUser._id}/`">
                <button :class="notification? 'btn notification':'btn no-notification'" :setNotofication="setNotification">
                    {{notificationCount}}
                </button>
            </router-link>
            <button @click="onLogout">Logout</button>
        </div>
        <div v-else>
        <p class="helloMsg">Hello Guest</p>
        <router-link  to="/login">Login</router-link>
        </div>
    </div>
</template>

<script>
import UserService from "../services/UserService.js";
import UtilService from "../services/UtilService.js";

export default {
  created() {
    if (this.loggedinUser) {
      this.$store
        .dispatch({
          type: "getMatch",
          user: this.loggedinUser._id
        })
        .then(_ => {
          this.setNotification();
        });
    }
  },
  data() {
    return {
      notification: false,
      notificationCount: 0
    };
  },
  methods: {
    logout() {
      UserService.logout();
      this.$store.commit({ type: "logoutUser" });
      this.$router.push("/");
    },
    setNotification() {
      console.log("setNotification");
      if (this.getNotificationCount.length > 0) {
        this.notificationCount = this.getNotificationCount.length;
        this.notification = true;
      }
    },
      onLogout() {
      this.$emit("update:loggedinUser", null);
      this.$emit("logout");
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedUser;
    },
    getNotificationCount() {
      return this.$store.getters.getRecieves;
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.btn {
  cursor: pointer;
}
.notification {
  background-color: #f56c6c;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #fff;
}
.no-notification {
  display: none;
}
p {
  width: fit-content;
}
.user-bar {
  display: flex;
  align-items: center;
}
.helloMsg{
  font-size: 16px;
  margin-top: 5px;
}
</style>