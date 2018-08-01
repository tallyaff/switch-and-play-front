<template>
    <section>
        <div class="activity-container">



<!-- THIS CMP CAN BE DELETED -->


            <div>
                <!-- <UserRecievedRequests :recieves="recieves">
                </UserRecievedRequests> -->
            </div>
            <div>
                <!-- <UserSentRequests :requestes="requestes">
                </UserSentRequests> -->
            </div>
            <div>
                <!-- <UserMatches >
                </UserMatches> -->
            </div>
        </div>
    </section>
</template>

<script>
// import {LOAD_USER} from '@/store/UserModule.js'
// import UserMatches from '@/components/UserMatches.vue'
// import UserRecievedRequests from '@/components/UserRecievedRequests.vue'
// import UserSentRequests from '@/components/UserSentRequests.vue'

export default {
    name: "userActivity",
    components: {
        // UserMatches,
        // UserRecievedRequests,
        // UserSentRequests
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
        // matches() {
        //     // console.log('this.$store.getters.getMatches', this.$store.getters.getMatches);
        //     return this.$store.getters.getMatches;
        // },
        recieves() {
            // console.log('this.$store.getters.getRecieves', this.$store.getters.getRecieves);
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


</style>
