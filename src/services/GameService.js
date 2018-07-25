
import axios from 'axios'


const BASE_URL = (process.env.NODE_ENV !== 'development')? '/game': '//localhost:3000/game';

function test() {
    return axios.get(BASE_URL)
        .then(res => res.data)
}

export default {
    test
    // query,
    // remove,
    // update,
    // getById
}