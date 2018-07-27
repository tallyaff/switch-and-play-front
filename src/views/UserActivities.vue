<template>
    <section>
        <div>
            <div>
                <h3>Games I switched:</h3>
                <UserMatches :matches="matches">
                </UserMatches>
            </div>
            <div>
                <h3>Games people ask from me:</h3>
                <UserRecievedRequests :recieves="recieves">
                </UserRecievedRequests>
            </div>
            <div>
                <h3>Games I ask:</h3>
                <UserSentRequests :requestes="requestes">
                </UserSentRequests>
            </div>
        </div>
    </section>
</template>

<script>
// import {LOAD_USER} from '@/store/UserModule.js'
import UserMatches from '@/components/UserMatches.vue'
import UserRecievedRequests from '@/components/UserRecievedRequests.vue'
import UserSentRequests from '@/components/UserSentRequests.vue'

export default {
    name: "userActivity",
    components: {
        UserMatches,
        UserRecievedRequests,
        UserSentRequests
    },
    created() {
        console.log('userId: ', this.$route.params.userId);
        this.$store.dispatch({type: 'getMatch', 
            user: this.$route.params.userId
            })
    },
    computed: {
        loggedinUser(){
            return this.$store.getters.loggedUser
        },
        matches() {
            return this.$store.getters.getMatches;
        },
        recieves() {
            return this.$store.getters.getRecieves;
        },
        requestes() {
            return this.$store.getters.getRequestes;
        }
    },
    methods: {
        
    }
}
</script>

<style>

</style>
