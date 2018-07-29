var STORAGE_KEY = 'loggedinUser';
import UtilService from './UtilService.js'
import axios from 'axios'
import { eventBus, EVENT_LOGIN_USER } from '../services/EventBusService.js'
axios.defaults.withCredentials = true;

const URL = process.env.NODE_ENV !== 'development'
    ? '/user'
    : 'http://localhost:3000/user'

var loggedinUser = UtilService.load(STORAGE_KEY) || null;
console.log('LOgged:', loggedinUser);
if (loggedinUser) {
    eventBus.$emit(EVENT_LOGIN_USER, loggedinUser.username)

}

function createUser(userDetails) {
    console.log(userDetails, 'newuser service front')
    return axios.post(`${URL}/signup`, userDetails)
        .then(res => {
            const user = res.data;
            _setLoggedinUser(user);
            return user;
        })

        .catch(err => err)
}


function getUser(userCreds) {
    // console.log('req@@:', userCreds);
    return axios.post(`${URL}/login`, { user: userCreds })
        .then(res => {
            // console.log('req##:', userCreds);
            const user = res.data;
            _setLoggedinUser(user);
            return user;
        })
        .catch(err => err)
}


function logout() {
    return axios.post(`${URL}/logout`)
        .then(res => {
            console.log('res from axios logput call',res)
            loggedinUser = null;
            UtilService.store(STORAGE_KEY, null)
            eventBus.$emit(EVENT_LOGIN_USER, null)
        });
}


function getLoggedinUser() {
    return loggedinUser
}

function _setLoggedinUser(user) {
    loggedinUser = user;
    UtilService.store(STORAGE_KEY, loggedinUser);
    eventBus.$emit(EVENT_LOGIN_USER, user);
}



export default {
    getUser,
    createUser,
    logout,
    getLoggedinUser,

}


