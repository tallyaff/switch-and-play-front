<template>
    <section>
        <div class="activity-container flex column align-center justify-center">
            <div class="activity-nav-container ">
                <div class="nav-container flex">
                    <router-link :to="`/user/activity/${loggedinUser._id}/match`">My Swaps
                    </router-link>
                    <router-link :to="`/user/activity/${loggedinUser._id}/request`">My Requests
                    </router-link>
                    <router-link :to="`/user/activity/${loggedinUser._id}/recieve`">Request For Me
                    </router-link>
                </div>
                <router-view></router-view>
            </div>
        </div>
    </section>
</template>

<script>
// import {LOAD_USER} from '../store/UserModule.js'
import UserMatches from './UserMatches.vue'
import UserRecieved from './UserRecieved.vue'
import UserRequests from './UserRequests.vue'

export default {
    name: "userActivity",
    components: {
        UserMatches,
        UserRecieved,
        UserRequests
    },
    // data(){
    //     return {
    //        matchez: this.matches
    //     }
    // },
    created() {
        // console.log('userId: ', this.$route.params.userId);
        // console.log('recieves^^^^: ', this.recieves);
        // console.log('matches^^^^: ', this.matches);
        this.$store.dispatch({type: 'getMatch', 
            user: this.$route.params.userId
            })
    },
    computed: {
        loggedinUser(){
            return this.$store.getters.loggedUser
        },
        matches() {
            console.log('this.$store.getters.getMatches', this.$store.getters.getMatches);
            return this.$store.getters.getMatches;
        },
        recieves() {
            console.log('this.$store.getters.getRecieves', this.$store.getters.getRecieves);
            // debugger
            return this.$store.getters.getRecieves;
        },
        requestes() {
            // console.log('this.$store.getters.getRequestes', this.$store.getters.getRequestes);
            return this.$store.getters.getRequestes;
        }
    },
    methods: {

    }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/scss/style.scss";

  .activity-container {
      width: 100%;
  }

.activity-nav-container {
    width: 980px;
  }

.nav-container {
    align-items: center;
    align-self: center;
    // justify-content: space-around;
    // padding: 30px;
    font-family: 'Ubuntu-regular';
    margin: 20px 30px 10px 30px;
    // align-self: flex-start;
    a {
        padding: 15px;
        color: #F6AB2B;
        transition: all 0.3s ease;
        position: relative;
        font-size: 1.3em;

        @media only screen and  (max-width: 540px) {
            font-size: 1em;
        }

        &.router-link-exact-active {
            color: $main-color;
        }
        &:hover {
            color: $main-color;
        }
    }
.games-box {
    width: 300px;
}
}
</style>
