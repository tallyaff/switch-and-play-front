import axios from 'axios'


const MATCH_URL = (process.env.NODE_ENV !== 'development')? '/match': '//localhost:3000/match';

function getMatch(userId) {
    console.log('matchId****:', userId);
    return axios.get(`${MATCH_URL}/${userId}`, {match: userId})
        .then(res => {
            // console.log('matchId%%:', res.data);
            const match = res.data;
            return match;
        })
        .catch(err => err)
}

export default {
    getMatch,

}
