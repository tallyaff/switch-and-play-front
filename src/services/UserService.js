var STORAGE_KEY = 'loggedinUser';
import UtilService from './UtilService.js'
import axios from 'axios'
axios.defaults.withCredentials = true;

const URL = process.env.NODE_ENV !== 'development'
    ? '/user'
    : 'http://localhost:3000/user'

var loggedinUser = UtilService.load(STORAGE_KEY) || null;

function signup(userDetails) {
    return axios.post(`${URL}/signup`, userDetails)
        .then(res => {
            const user = res.data;
            _setLoggedinUser(user);
        })
        .catch(err => err)
}


function getUser(userCreds) {
    // console.log('req@@:', userCreds);
    return axios.post(`${URL}/login`, {user: userCreds})
        .then(res => {
            // console.log('req##:', userCreds);
            const user = res.data;
            _setLoggedinUser(user);
            return user;
        })
        .catch(err => err)
}

function logout() {
    loggedinUser = null;
    UtilService.store(STORAGE_KEY, null)
}

function getLoggedinUser() {
    return loggedinUser
}
function _setLoggedinUser(user) {
    loggedinUser = user;
    UtilService.store(STORAGE_KEY, loggedinUser)
}

export default {
    getUser,
    signup,
    logout,
    getLoggedinUser
}


