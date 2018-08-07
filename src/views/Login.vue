
<template>
  <div class="login-container">
      <div class="form-container flex">
        <el-form @submit="login" v-if="loginForm" class="flex column">
            <el-form-item class="login-form flex column">
                <h1>Log-In</h1>
                <el-form-item class="flex insert-form">
                  <p>Enter user Name:</p>
                  <el-input v-model="user.username" type="text" class="el-input-user" autofocus/>
                </el-form-item>
                <el-form-item class="flex insert-form">
                  <p>Enter password:</p>
                  <el-input v-model="user.password" type="password" class="el-input-user"/>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="login" class="btn">
                  Login
                  </el-button>
                </el-form-item>
            </el-form-item>
            <el-button type="submit" @click="openSignupModal" class="btn-signup">
                  Sign up
            </el-button>
        </el-form>
        <el-form @submit.prevent="signup" v-if="signupForm">
          <el-form-item class="login-form flex column">
            <h4>Sign up</h4>
            <p>Your Name:</p>
            <el-input v-model="newUser.username" type="text" class="el-input-user"/>
            <p>Choose Password:</p>
            <el-input v-model="newUser.password" type="password" class="el-input-user"/>
            <p>E-mail:</p>
            <el-input v-model="newUser.email" type="email" class="el-input-user"/>
            <p>City:</p>
            <el-input v-model="newUser.city" type="text" class="el-input-user"/>
            <el-button type="submit" @click="signup" class="btn-signup">
            Signup
            </el-button>
          </el-form-item>
        </el-form>
    </div>

  </div>
</template>

<script>
import { eventBus, EVENT_LOGIN_USER } from "../services/EventBusService.js";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      newUser: {
        username: "",
        password: "",
        email: "",
        isAdmin: false,
        city: "",
        games: []
      },
      signupForm: false,
      loginForm: true,
      url: null,
    };
  },
  // computed: {
  //   url() {
  //     // return this.$store.getters.setUrl;
  //     return '/game'
  //   }

  // },
  created() {
    this.url = this.$store.getters.setUrl;
  },
  methods: {
    login() {
      // this.$router.push('/game')
      this.$router.push(`${this.url}`)
      // console.log("login user##", this.user);
      // console.log("this.url", this.url);
      this.$store.dispatch ({
            type: "getUser",
            user: this.user
        })
        .then(user => {
            console.log('user$$:', user);
            this.$store.dispatch({
              type: 'getMatch', 
              user: user._id
            })
            this.$socket.emit('loggedIn', user._id);
        })
        .then(_ => {
            // console.log(this.user.username,'res login function before emit eventbus')
          eventBus.$emit(EVENT_LOGIN_USER, this.user.username);
          return this.$store.getters.loggedUser;
        })
        .catch(err => console.log(err));
        this.$store.commit({type: 'setUrl', url: '/game'})
    },
    signup() {
      // this.$router.push('/game')
      this.$router.push(`${this.url}`)
      // console.log("signup user**", this.newUser);
      this.$store
        .dispatch({
          type: "createUser",
          newUser: this.newUser
        })
        .then(_ => {
          eventBus.$emit(EVENT_LOGIN_USER, user);
        })
        .catch(err => console.log(err));
        this.$store.commit({type: 'setUrl', url: '/game'})
    },
    
    openSignupModal() {
      this.signupForm = true;
      this.loginForm = false;
    }
  },
  computed: {}
};
</script>

<style scoped lang="scss">
    @import "~@/assets/scss/style.scss";
    
.login-form {
  border: 1px solid $border-color;  
  box-shadow: 0px 2px 4px 0px #d9d8d8;
  margin: auto;
  padding: 5px;
  width: 305px;
  align-items: center;
}

.form-container {
  margin: 20px auto;
  justify-content: center
}
.login-container {
  margin-top: 60px;
 
}
.insert-form {
  // justify-content: space-between;
  // width: 80%;
}

.btn {
  width: 100px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.btn-signup {
  background-color: #f1af37;
  margin:  20px;
  color: white;
}

.btn-signup {
  background-color: #f1af37;;
  margin: 20px;
  width: 100px;
  margin: 20px auto;
  margin-top: 50px;
}
.el-form-item__content{
      margin: 10px 50px;
}

</style>
