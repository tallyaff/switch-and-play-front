import UserService from '../services/UserService.js'


export default {
    state: {
        user: null,
    },
    mutations: {
        setUser(state, payload ){
            state.user = payload.currUser
            console.log('user from mutation!!!',state.user);
        },
        logoutUser(state){
            state.user = null
        }
    },
    getters: {
        loggedUser(state){
            console.log('user from usermodule:', state.user);
            return state.user
        },
        userGames(state){
            if (state.user) return state.user.games
        },
        
    },
    actions: {
        createUser(context, {newUser}) {
            console.log('new user from action***', newUser);
            UserService.createUser(newUser)
               .then(currUser => {
                   console.log('new user from backend in front', newUser);
                   context.commit({type: 'setUser', currUser})
               })
        },
        getUser(context, payload) {
            console.log('currUser from action***', payload.user);
            UserService.getUser(payload.user)
               .then(currUser => {
                   console.log('user from backend in front', currUser);
                   context.commit({type: 'setUser', currUser})
               })
        },

        
    }
}


