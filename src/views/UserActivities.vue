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
//send userId to MatchModule.
//gets from there an array with all the matches objs that this user involve
//update the 3 components bind by the values in those objs ( isActive=true >> match; passive >> recieves; active>>requests)
    components: {
        UserMatches,
        UserRecievedRequests,
        UserSentRequests
    },
    data() {
        return {
            matches: [],
            recieves: [],
            requestes: [],
        }
},
    created() {
        const userId = this.$route.params.userId;
        console.log('userId', userId);
        
        // this.$store.dispatch({type: LOAD_USER, userId});
    },
    computed: {
        getMatches() {

        }
    }
}
</script>

<style>

</style>
