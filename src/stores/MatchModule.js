import MatchService from '../services/MatchService.js'
// export const LOAD_USER = 'User/actions/loadUser'

export default {
    state: {
        matches: [],
        recieves: [],
        requestes: [],
        
    },
    mutations: {
        setMatches(state, payload ){
            state.matches = payload.matches
            // console.log('user from mutation!!!',state.user);
        },
        setMatchesByUser(state, payload ){
            state.matchesByUser = payload.matchesByUser
        }
    },
    getters: {
        getMatch(state){
            return state.matches
        }
    },
    actions: {
        // getMatch(context, payload) {
        //     // console.log('currMatch from action***', payload.currMatch);
        //     MatchService.getMatch(payload.match)
        //        .then(currMatch => {
        //         //    console.log('match from backend in front', currMatch);
        //            context.commit({type: 'setMatches', currMatch})
        //        })
        // },
        getMatchByUser(context, payload) {
            MatchService.getMatch(payload.match)
            .then(matchesByUser => {
             //    console.log('match from backend in front', currMatch);
                context.commit({type: 'setMatchesByUser', matchesByUser})
            })
        }
    }
}


