import MatchService from '../services/MatchService.js'
import Service from '../services/MatchService.js'
// import GameService from '../services/GameService.js';
// export const LOAD_USER = 'User/actions/loadUser'

export default {
    state: {
        activities: [],
        userId: null,
        reqCount: 0,
    },
    mutations: {
        setMatch(state, payload) {
            // console.log('activities**: ', payload.activities);
            state.activities = payload.activities
        },
        setCurrUserId(state, payload) {
            // console.log('user^^: ', payload.payload);
            state.userId = payload.payload
        },
        // setUpdateMatch(state, payload) {
        //     console.log('match^^: ', payload.payload);
        // },
        // setUserActive(state, payload) {
        //     console.log('setUserActive^^: ', payload.payload);
        //     state.userActive = payload.payload;
        // },
    },
    getters: {
        getMatches(state){
            if (state.activities) {
                return state.activities.filter(activity => activity.isMatch)
            }
        },
        getRecieves(state) {
            if (state.activities) {
                return state.activities.filter(activity => {
                    return activity.userPassive.userId === state.userId && !activity.isMatch;
                    })
                
            }
        },
        getRequestes(state) {
            if (state.activities) { 
                return state.activities.filter(activity => {
                    return activity.userActive.userId === state.userId && !activity.isMatch
                })
            }
        },
    },
    actions: {
        getMatch(context, payload) {
            // console.log('user from action***', payload.user);
            context.commit({type: 'setCurrUserId', payload: payload.user})
            MatchService.getMatch(payload.user)
               .then(activities => {
                //    console.log('match from backend in front', activities);
                   context.commit({type: 'setMatch', activities})
                   })
        },
        updateMatch(context, payload) {
            // console.log('match from cmp***', payload.matchDetails);
            context.commit({type: 'setUpdateMatch', payload: payload.matchDetails})
            MatchService.updateMatch(payload.matchDetails)
               .then(activities => {
                   console.log('match from backend in front', activities);
               })
        },
    }
}


