import UserService from '../services/UserService.js'


export default {
    state: {
        user: null,
    },
    mutations: {
        setUser(state, payload ){
            state.user = payload.currUser
            // console.log('user from mutation!!!',state.user);
        },
        logoutUser(state){
            state.user = null
        },
        saveUser(state, payload ){
            state.user = payload.user
            // console.log('saveUser from mutation!!!',state.user);
        },
    },
    getters: {
        loggedUser(state){
            // console.log('user from usermodule:', state.user);
            return state.user
        },
        userGames(state){
            if (state.user) return state.user.games
        },

        
    },
    actions: {
        createUser(context, {newUser}) {
            // console.log('new user from action***', newUser);
            UserService.createUser(newUser)
               .then(currUser => {
                //    console.log('new user from backend in front', newUser);
                   context.commit({type: 'setUser', currUser})
               })
        },
        getUser(context, payload) {
            // console.log('currUser from action***', payload.user);
            UserService.getUser(payload.user)
               .then(currUser => {
                   console.log('user from backend in front', currUser);
                   context.commit({type: 'setUser', currUser})
               })
        },
        savedUserProfile(context, { savedUserProfile }) {
            // console.log('savedUserProfile in action', savedUserProfile)
            return UserService.saveUser(savedUserProfile)
                .then((user) => {
                    // console.log('savedUserProfile in store', user);
                    context.commit({ type: 'saveUser', user })
                })
        },

        
    }
}


