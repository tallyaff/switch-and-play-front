<template>
    <div class="user-bar">
        <div v-if="loggedinUser" class="user-bar-container flex space-evenly">
            <p class="userMsg">Hello {{'loggedinUser'? loggedinUser.username: 'guest'}}</p>
            <div class="user-icon-container">
            <router-link v-if="loggedinUser" :to="`/user/${loggedinUser._id}/`">
                <font-awesome-icon icon="user" />
            </router-link>
            <router-link v-if="loggedinUser" :to="`/user/activity/${loggedinUser._id}/`">
                <!-- :class="notificationCount > 0? 'btn notification':'btn no-notification'" :setNotofication="setNotification" -->
                <el-badge :value="notificationCount">
                    <font-awesome-icon icon="bell" />
                </el-badge>
            </router-link>
            <button class="btn-logout" @click="onLogout">Logout</button>
        </div>
        </div>
        <div v-else>
            <p class="helloMsg">Hello Guest</p>
            <router-link to="/login">Login</router-link>
        </div>
    </div>
</template>

<script>
import UserService from "../services/UserService.js";
import UtilService from "../services/UtilService.js";

export default {
  created() {
    if (this.loggedinUser) {
      this.$store.dispatch({
        type: "getMatch",
        user: this.loggedinUser._id
      });
      // .then(_ => {
      //   this.setNotification();
      // });
    }
  },
  data() {
    return {
      // notification: false,
    };
  },
  methods: {
    logout() {
      UserService.logout();
      this.$store.commit({ type: "logoutUser" });
      this.$router.push("/");
    },
    // setNotification() {
    //   console.log("setNotification");
    //   if (this.getNotificationCount.length > 0) {
    //     this.notificationCount = this.getNotificationCount.length;
    //     this.notification = true;
    //   }
    // },
    onLogout() {
      this.$emit("update:loggedinUser", null);
      this.$emit("logout");
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedUser;
    },
    notificationCount() {
      return this.$store.getters.getRecieves.length;
    }
  }
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
.helloMsg {
  color: #f56c6c;
  font-size: 16px;
  margin-top: 5px;
}
.btn-logout {
  color: $secondary-color;
  cursor: pointer;
  font-size: 16px;
  border: none;
  background-color: transparent;
    &:hover {
    color: $main-color;
  }
}
.userMsg {
  color: #f56c6c;
  font-size: 16px;
  position: absolute;
  margin-top: -30px;
}
a {
  &:hover {
    color: $main-color;
  }
}
.user-icon-container{
  color: $secondary-color;
    display: flex;
    width: 150px;
    justify-content: space-around;

    a{
       transition: all 0.3s ease;
    }
}
</style>