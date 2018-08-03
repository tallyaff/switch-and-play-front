<template>
    <div class="user-bar flex">
        <div v-if="loggedinUser" class="user-bar-container flex space-evenly">
            <!-- <p class="userMsg">Hello {{'loggedinUser'? loggedinUser.username: 'guest'}}</p> -->
            <div class="user-icon-container flex">
                <router-link v-if="loggedinUser" :to="`/user/${loggedinUser._id}/`">
                    <img :src="loggedinUser.src" class="user-img" />
                </router-link>
                <router-link v-if="loggedinUser" :to="`/user/activity/match/${loggedinUser._id}/`" class="flex not-container">
                    <el-badge :value="matchCount.length" v-if="matchCount.length > 0">
                        <font-awesome-icon icon="envelope" class="envelop" />
                    </el-badge>
                    <div v-else>
                        <font-awesome-icon icon="envelope" class="envelop" />
                    </div>
                </router-link>
                <router-link v-if="loggedinUser" :to="`/user/activity/recieve/${loggedinUser._id}/`" class="flex not-container">    
                    <el-badge :value="recieveCount.length" v-if="recieveCount.length > 0">
                        <font-awesome-icon icon="bell" class="bell" />
                    </el-badge>
                    <div v-else>
                        <font-awesome-icon icon="bell" class="bell" />
                    </div>
                </router-link>
                <button class="btn-logout" @click="onLogout">Logout</button>
            </div>
        </div>
        <div v-else class="hello-login flex">
            <!-- <p class="helloMsg">Hello Guest</p> -->
            <router-link class="login-link" to="/login">Login</router-link>
        </div>
    </div>
</template>
               
<script>
import UserService from "../services/UserService.js";
import UtilService from "../services/UtilService.js";

export default {
  created() {
    // console.log('loggedinUser', this.loggedinUser);
    
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
  
    onLogout() {
      this.$emit("update:loggedinUser", null);
      this.$emit("logout");
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedUser;
    },
    recieveCount() {
      return this.$store.getters.getRecieves;
    },
    matchCount() {
      return this.$store.getters.getMatches;
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/scss/style.scss";

.btn {
  cursor: pointer;
}
.notification {
  background-color: #f56c6c;
  border-radius: 10px;
  color: #fff;
  display: absolute;
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
  align-items: center;
}
.helloMsg {
  color: #f56c6c;
  font-size: 16px;
  margin-top: 5px;
  margin-right: 10px;
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
.login-link {
  color: $secondary-color;
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
.user-icon-container {
  color: $secondary-color;
  display: flex;
  width: 190px;
  justify-content: space-around;

  a {
    transition: all 0.3s ease;
  }
}
.not-container {
  display: relative;
  align-items: center;
}
img{
    transition: all 0.3s ease;
    &:hover {
    border-color: $main-color;
  }
}

</style>