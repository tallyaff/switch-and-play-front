<template>
    <section>
        <div>
            <div>
                <UserRecievedRequests :recieves="recieves">
                </UserRecievedRequests>
            </div>
            <div>
                <UserSentRequests :requestes="requestes">
                </UserSentRequests>
            </div>
            <div>
                <UserMatches :matches="matches">
                </UserMatches>
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
        console.log('recieves^^^^: ', this.recieves);
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
