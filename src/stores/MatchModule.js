import MatchService from '../services/MatchService.js'
// import GameService from '../services/GameService.js';
// export const LOAD_USER = 'User/actions/loadUser'

export default {
    state: {
        activities: [],
        user: null,
        // matches: [],
        // recieves: [],
        // requestes: [],
        
    },
    mutations: {
        setMatch(state, payload) {
            console.log('activities**: ', payload.activities);
            state.activities = payload.activities
        },
        // setRec(state, payload) {
        //     console.log('activities&&: ', payload.activities);
        //     state.matches = payload.activities
        // },
        // setReq(state, payload) {
        //     console.log('activities^^: ', payload.activities);
        //     state.matches = payload.activities
        // },
        setCurrUser(state, payload) {
            console.log('user^^: ', payload.payload);
            state.user = payload.payload
        },

    },
    getters: {
        getMatches(state){
            console.log('recieves!!&&&&: ', state.activities)
            return state.activities.filter(activity => activity.isMatch)
        },
        getRecieves(state) {
            return state.activities.filter(activity => activity.userPassiveGame && activity.isMatch === false)
        },
        getRequestes(state) {
            return state.activities.filter(activity => activity.userActiveGames && activity.isMatch === false)
        },
    },
    actions: {
        getMatch(context, payload) {
            console.log('user from action***', payload.user);
            context.commit({type: 'setCurrUser', payload: payload.user})
            MatchService.getMatch(payload.user)
               .then(activities => {
                   console.log('match from backend in front', activities);
                //    debugger
                //    let activityMatch = activities.filter(activity => activity.isMatch)
                //    console.log('activity:$$$', activityMatch);
                   
                //    GameService.getGameById()
                   context.commit({type: 'setMatch', activities})
                //    let activityRec = activities.filter(activity => activity.isMatch);
                //    context.commit({type: 'setRec', activityRec})
                //    let activityReq = activities.filter(activity => activity.isMatch)
                //    context.commit({type: 'setReq', activityReq})
                   })
                   
        }
    }
}


