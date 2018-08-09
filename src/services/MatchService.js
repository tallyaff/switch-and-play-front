import axios from 'axios'


const MATCH_URL = (process.env.NODE_ENV !== 'development')? '/match': '//localhost:3000/match';


function getMatch(userId) {
    console.log('matchId****:', userId);
    return axios.get(`${MATCH_URL}/user/${userId}`, {match: userId})
        .then(res => {
            // console.log('matchId%%:', res.data);
            const match = res.data;
            return match;
        })
        .catch(err => err)
}

function getMatchById(gameId, matchId) {
    // console.log('getUserById in game service front', userId);
    return axios.get(`${MATCH_URL}/${matchId}`)
        .then(res => {
            // console.log('getUserById from server', res.data)
            return res.data
        })
        .catch(err => console.log('Problem talking to server!', err))
}


function createMatch(matchStarter){
    console.log('match service recived1*******************************************8:', matchStarter)
    return axios.post(`${MATCH_URL}`, matchStarter)
    .then(res => {
        // console.log('add match in front - res', res)
        return res.data
    })
    .catch(err => console.log('Problem talking to server', err))

}

function updateMatch(matchDetails){
    console.log('&&&match service details:',matchDetails)
    return axios.put(`${MATCH_URL}/${matchDetails.matchId}`, {match: matchDetails})
            .then(res => {
                res.data;
                console.log('back from server updateMatch, res:'. res);
                console.log('back from server updateMatch, res.data:'. res.data);
                
            })
            .catch(err => console.log('Problem talking to server', err))
}

function craeteEmptyChatMsg() {
    var msg = {
        username: '',
        txt: '',
        timestamp: Date.now(),
    }
    return msg;
}

export default {
    getMatch,
    createMatch,
    updateMatch,
    getMatchById,
    craeteEmptyChatMsg
}
