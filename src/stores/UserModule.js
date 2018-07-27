import UserService from '../services/UserService.js'


export default {
    state: {
        user: null,
    },
    mutations: {
        setUser(state, payload ){
            state.user = payload.currUser
            console.log('user from mutation!!!',state.user);
        }
    },
    getters: {
        loggedUser(state){
            console.log('user from usermodule:', state.user);
            return state.user
        },
        userGames(state){
            if (state.user) return state.user.games
        }
        
    },
    actions: {
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


