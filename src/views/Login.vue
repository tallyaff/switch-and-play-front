
<template>
  <div class="login-container">
      <div class="form-container flex">
        <form @submit.prevent="login" class="form">
            <h1>Log-In</h1>
            <p>Enter user Name:</p>
            <input v-model="user.username" type="text" class="input-user">
            <p>Enter password:</p>
             <input v-model="user.password" type="password" class="input-user">
            <button type="submit" @click="$router.push('/game')" class="btn">
            login
            </button>
        </form>
        <br>
        <button type="submit" @click="openSignupModal" class="btn">
            sign up
        </button>
    </div>
  </div>
</template>

<script>


export default {
    name: 'Login',
    data() {
        return {
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            // console.log('login***', this.user);
            this.$store.dispatch({type: 'getUser', 
            user: this.user
             })
             console.log('user##', this.user);
             
        },
        openSignupModal() {

        }
    },
    computed: {
        
    },
}
</script>

<style>
</style>
