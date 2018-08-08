<template>
    <section v-if="match && userPassive">
        <!-- <div class="user-img" :style="{backgroundImage: `url(${user.src})`, 
            backgroundSize: 'cover', backgroundPosition: 'center', backgroundrepeat: 'no-repeat'}">
        </div>   -->
        <ul >
            <li v-for="(msg, idx) in match.chat" :key="idx">
                <h2>{{msg.username}}: {{msg.txt}}, {{msg.timestamp | getDate }}</h2>
                <div class="name-text-chat flex">
                    <h3>{{userPassive.username}} : </h3>
                    <el-input class="form-input form-textarea" type="textarea" v-model="textareaRes" placeholder="Please type yours message"></el-input>                    
                    <div class="btns-container">
                        <el-button class="btn send-btn" type="primary" @click="updateMatch">Send</el-button>
                        <!-- <el-button class="btn cancel-btn" type="info">Cancel</el-button> -->
                    </div>
                </div>
            </li>
        </ul>
    </section>
</template>

<script>
import MatchService from '@/services/MatchService.js';
import UserService from '@/services/UserService.js';

export default {
    name: "ShowChat",
    props: ["match"],
    data() {
        return {
            // user: null
            textareaRes: '',
            msg: MatchService.craeteEmptyChatMsg(),
            userPassive: null,

        }
    },
    created() {
        // this.getGameUser()
        // console.log('hi show CHAT');
        this.getUserPassive();
        
    },
    computed: {
        user() {
        console.log(this.$store.getters.loggedUser);
        return this.$store.getters.loggedUser || {};
        },
    },
    methods: {
        // getGameUser() {
        //     return GameService.getUserById(this.userId)
        //         .then(user => {
        //             // console.log('user from server&&&', user);
        //             this.user = user
        //         })
        // }
        getUserPassive() {
            let userPassiveId = this.match.userPassive.userId;
            UserService.getUserById(userPassiveId)
            .then(user => {
                // console.log("this.userPassiveId in show CHAT:", user);
                this.userPassive = user;
            });
        },
        updateMatch() {
            this.msg.txt = this.textareaRes;
            this.msg.username = this.user.username;
            this.match.chat.push(this.msg);
            console.log('this.match.chat', this.match.chat);
            console.log('this.match with new match', this.match);
            // this.choosenGameId = gameId;
            // console.log('this.choosenGame in itsMatch', this.choosenGame);
            // console.log('this.gameeeeee', this.game._id);
            // this.currMatchId = matchId;
            // console.log('this.currRecieved in itsMatch', this.match._id);
            // const match = {gameId: this.choosenGame, match: this.recieve}
            // const match = {gameId: this.game._id, matchId: this.match._id}

            // const match = {gameId: this.game._id, matchId: this.match._id, textareaRes: this.textareaRes}
            // console.log('game id', this.choosenGame);
            // console.log('match id', this.currRecieved);
            // console.log('###match:!!', match);
            this.$store.dispatch({ type: "updateMatch", matchDetails: this.match })
                .then( () => {
                        // this.$router.push('/'); //???
                        this.$socket.emit('newMatch');
                        //reset msg
                        this.msg = MatchService.craeteEmptyChatMsg();
                        this.textareaRes = '';
                    })
            },
    }
}
</script>

<style scoped lang="scss">

   
</style>