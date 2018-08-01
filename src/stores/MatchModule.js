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
            console.log('activities**: ', payload.activities);
            state.activities = payload.activities
        },
        setCurrUserId(state, payload) {
            console.log('user^^: ', payload.payload);
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
            // console.log('!!matches!!&&&&: ', state.activities[1].isMatch)
            if (state.activities) {
                return state.activities.filter(activity => activity.isMatch)
            }
        },
        getRecieves(state) {
            // debugger;
            if (state.activities) {
                // console.log('recieves!!: ', state.activities, 'userId:', state.userId, 'passive:', state.activities[0].userPassive.userId);            
                const activityFilter = state.activities.filter(activity => {
                    return activity.userPassive.userId === state.userId && !activity.isMatch;
                    })
                    console.log('***recieve', activityFilter);
                return activityFilter;
            }
        },
        getRequestes(state) {
            // console.log('request!!: ', state.activities, 'userId:', state.userId);           
            if (state.activities) {    
                let activityFilter = state.activities.filter(activity => {
                    return (activity.userActive.userId === state.userId && !activity.isMatch)
                    })
                    console.log('***request', activityFilter);
                    return activityFilter;                    
            }
        },
    },
    actions: {
        getMatch(context, payload) {
            console.log('user from action***', payload.user);
            context.commit({type: 'setCurrUserId', payload: payload.user})
            MatchService.getMatch(payload.user)
               .then(activities => {
                   console.log('match from backend in front', activities);
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


