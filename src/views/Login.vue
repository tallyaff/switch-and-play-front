
<template>
  <div class="login-container">
      <div class="form-container flex">
        <form @submit.prevent="login" v-if="loginForm" class="flex column">
            <div class="form flex column">
                <h1>Log-In</h1>
                <p>Enter user Name:</p>
                <input v-model="user.username" type="text" class="input-user">
                <p>Enter password:</p>
                <input v-model="user.password" type="password" class="input-user">
                <button type="submit" @click="$router.push('/game')" class="btn">
                login
                </button>
            </div>
            <button type="submit" @click="openSignupModal" class="btn">
                sign up
            </button>
        </form>
        <form @submit.prevent="signup" v-if="signupForm" class="form flex column">
            <h4>sign up</h4>
            <p>Your Name:</p>
            <input v-model="newUser.username" type="text" class="input-user">
            <p>Choose Password:</p>
             <input v-model="newUser.password" type="password" class="input-user">
             <p>E-mail:</p>
             <input v-model="newUser.email" type="email" class="input-user">
             <p>City:</p>
             <input v-model="newUser.city" type="text" class="input-user">
            <button type="submit" @click="$router.push('/game')" class="btn">
            signup
            </button>
        </form>
    </div>
  </div>
</template>

<script>
import { eventBus, EVENT_LOGIN_USER } from "../services/EventBusService.js";

export default {
    name: 'Login',
    data() {
        return {
            user: {
                username: '',
                password: ''
            },
            newUser: {
                username: '',
                password: '',
                email: '',
                city: ''
            },
            signupForm: false,
            loginForm: true
        }
    },
    methods: {
        login() {
            console.log('login user##', this.user);
            this.$store.dispatch({type: 'getUser', 
            user: this.user
             })
        },
        signup() {
            console.log('signup user**', this.newUser);
            this.$store.dispatch({type: 'createUser', 
            newUser: this.newUser
            })
        },
        openSignupModal() {
            this.signupForm = true;
            debugger
            this.loginForm = false;
        },
    },
    
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
      loginForm: true
    };
  },
  methods: {
    login() {
      // console.log("login user##", this.user);
      this.$store
        .dispatch({
          type: "getUser",
          user: this.user
        })
        .then(_ => {
            console.log(this.user.username,'res login function before emit eventbus')
          eventBus.$emit(EVENT_LOGIN_USER, this.user.username);
        })
        .catch(err => console.log(err));
    },

    signup() {
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
    },



    openSignupModal() {
      this.signupForm = true;
      this.loginForm = false;
    }
  },
  computed: {}
};
</script>

<style>
.form {
  border: 1px solid;
  margin: 10px;
  padding: 5px;
}
.flex {
  display: flex;
}
.column {
  flex-direction: column;
}
.btn {
  margin: 5px;
}
</style>
