import MatchService from '../services/MatchService.js'
// import GameService from '../services/GameService.js';
// export const LOAD_USER = 'User/actions/loadUser'

export default {
    state: {
        activities: [],
        userId: null,
        reqCount: 0,
        // newMatch: {}
    },
    mutations: {
        setMatch(state, payload) {
            state.activities = payload.activities
        },
        setCurrUserId(state, payload) {
            state.userId = payload.payload
        },
        logoutActivities(state) {
            state.activities = []
        }
    },
    getters: {
        getMatches(state){
            // console.log('inside getter getMatches');
            if (state.activities) {
                return state.activities.filter(activity => activity.isMatch)
            }
        },
        getRecieves(state) {
            // console.log('inside getter getRecieves');
            if (state.activities) {
                return state.activities.filter(activity => {
                    return activity.userPassive.userId === state.userId && !activity.isMatch;
                })
            }
        },
        getRequestes(state) {
            // console.log('inside getter getRequests');
            if (state.activities) { 
                return state.activities.filter(activity => {
                    return activity.userActive.userId === state.userId && !activity.isMatch
                })
            }
        },
        getNewMatch(state) {
            return state.newMatch;
        }
    },
    actions: {
        getMatch(context, payload) {
            context.commit({type: 'setCurrUserId', payload: payload.user})
            MatchService.getMatch(payload.user)
               .then(activities => {
                   console.log('inside getMatch. activities are:', activities);
                   context.commit({type: 'setMatch', activities})
                   })
        },
        createMatch(context, payload) {
            MatchService.createMatch(payload.newMatch)
            .then(match => {
                   console.log('inside createMatch. match is:', match);
               })
        },
        updateMatch(context, payload) {
            console.log('update after update chat: payload.matchDetails:', payload.matchDetails);
            
            MatchService.updateMatch(payload.matchDetails)
            .then(activities => {
                   console.log('inside updateMatch. activities are:', activities);
               })
        },
        logoutActivity(context) {
           context.commit({type: 'logoutActivities'})
        }   
    }   
}


