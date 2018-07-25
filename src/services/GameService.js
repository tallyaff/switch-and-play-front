
import axios from 'axios'


const GAME_URL = (process.env.NODE_ENV !== 'development')? '/game': '//localhost:3000/game';

function query() {
    return axios.get(GAME_URL)
        .then(res => res.data)
}

// const GAME_URL = 'http://localhost:3000/game';

// const GAME_URL = (process.env.NODE_ENV !== 'development' )
// ? '/game'
// : '//localhost:3000/game' ;

export default {
    query,
    getgameById,
    removeToy,
    saveGame,
    createEmptyGame,
    // sentFilter
}


// function sentFilter(filterByName){
//     console.log('sentFilter in toy service front: filterByName', filterByName);
//     // return axios.get(`${TOY_URL}/${filterByName}`)
//     // /toy?name=amet&nana=baba
//     return axios.get(`${TOY_URL}/?filterByName=${filterByName}`)
//         .then(res => {
//             console.log('filterByName from server', res)
//             return res.data
//         })
//         .catch(err => console.log('Problem talking to server', err))

// }

function removeGame(gameId) {
    return axios.delete(`${GAME_URL}/${gameId}`)
        .then(res => res.data)
}

function getgameById(gameId) {
    console.log('getgameById in game service front', gameId);
    return axios.get(`${GAME_URL}/${gameId}`)
        .then(res => {
            console.log('getgameById from server', res.data)
            return res.data
        })
        .catch(err => console.log('Problem talking to server', err))
}

function saveGame(game) {
    console.log('upadte game in fron service', game)
    if (game._id) {
        // update
        return axios.put(`${GAME_URL}/${game._id}`, game)
            .then(res => res.data)
            .catch(err => console.log('Problem talking to server', err))
    
    } else {
        //add new
        console.log('new toy in fron service', game)
        return axios.post(`${GAME_URL}`, game)
            .then(res => {
                // console.log('add new in front after server', res.data)
                console.log('add new in front - res', res)
                // console.log('add new in front - id', res.data.insertId)
                return res.data
            })
            .catch(err => console.log('Problem talking to server', err))
    }
}


function createEmptyGame() {
    var game = {
        name: '',
        type: '',
        desc: '',
        img: '',
        condition:'',
        addedAt: Date.now(),
        inStock: null,
    }
    return toy;
}


// function query() {
//     console.log('service');
//     let games = [    {
//         gameId: "jhj23",
//         name: "Spiderman",
//         src: "img/gameImg/console/spiderman.jpg",
//         type: "theen",
//         category: "console",
//         desc: "Spiderman PS4 console game",
//         userId: "1245K",
//         condition: "Brand new",
//         isAvailble: true,
//         isNew: false,
//         addedAt: 1532459054
//     },
//     {
//         gameId: "gss78",
//         name: "Call of duty WWII",
//         src: "img/gameImg/console/call_of_duty_WWII.jpg",
//         type: "child",
//         category: "console",
//         desc: "Call of duty WWII PS4 console game",
//         userId: "789L",
//         condition: "Used",
//         isAvailble: true,
//         isNew: true,
//         addedAt: 1532448721
//     }]
//     return games;
    
//     // return axios.get(GAME_URL)
//     //     .then(res => res.data)
//     //     .catch(err => console.log('Problem talking to server', err))


// }

