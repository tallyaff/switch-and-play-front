import axios from 'axios'
// const GAME_URL = 'http://localhost:3000/game';

const GAME_URL = (process.env.NODE_ENV !== 'development' )
? '/game'
: '//localhost:3000/game' ;

export default {
    query,

}



function query() {
    console.log('service');
    let games = [    {
        gameId: "jhj23",
        name: "Spiderman",
        src: "img/gameImg/console/spiderman.jpg",
        type: "theen",
        category: "console",
        desc: "Spiderman PS4 console game",
        userId: "1245K",
        condition: "Brand new",
        isAvailble: true,
        isNew: false,
        addedAt: 1532459054
    },
    {
        gameId: "gss78",
        name: "Call of duty WWII",
        src: "img/gameImg/console/call_of_duty_WWII.jpg",
        type: "child",
        category: "console",
        desc: "Call of duty WWII PS4 console game",
        userId: "789L",
        condition: "Used",
        isAvailble: true,
        isNew: true,
        addedAt: 1532448721
    }]
    return games;
    
    // return axios.get(GAME_URL)
    //     .then(res => res.data)
    //     .catch(err => console.log('Problem talking to server', err))
}