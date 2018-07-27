import GameService from '../services/GameService.js'

export default {
    state: {
        gamesLoading: false,
        games: [],
        loggedUserGames: [],
        game: null,             
        filterBy: {
            name: '',
            type: [],
            category: [],
            userId: ''
        }
    },
    mutations: {
        setGamesLoading(state, { isLoading }) {
            state.gamesLoading = isLoading;
        },
        setGames(state, { games }) {
            state.games = games;
        },
        setGame(state, { game }) {
            state.game = game;
        },
        removeGame(state, { gameId }) {
            state.games = state.games.filter(game => game._id !== gameId)
        },
        saveGame(state, { game }) {
            console.log('mutation saveGame', game);
            let foundGameIdx = -1;
            foundGameIdx = state.games.findIndex(searchGame => searchGame._id === game._id);
            if (foundGameIdx !== -1) state.games.splice(foundGameIdx, 1, game);
            else state.games.push(game);

        },
        
        gamesByFilterServer(state, { games }) {
            console.log('mutation gamesByFilterServer', games);
            state.games = games;
        },
        loggedUserGames(state,{ games }){
            state.loggedUserGames = games;
            console.log(this.loggedUserGames,'this.loggedUserGames')
        }

     
    },
    getters: {
        gamesForDisplay(state) {
            // console.log('stateGames', state.games);
            return state.games
        },
        getUserGames(state){
            return state.loggedUserGames
        },
        gameForDisplay(state) {
            // console.log('stateGame', state.game);
            return state.game
        }
    },
    actions: {
        loadGames(context) {
            context.commit({ type: 'setGamesLoading', isLoading: true })
            return GameService.query()
                .then(games => {
                    context.commit({ type: 'setGames', games })
                    return games;
                })
                .finally(() => {
                    context.commit({ type: 'setGamesLoading', isLoading: false })
                })
        },
        loadGame(context, { gameId }) {
            console.log('route, gameId', { gameId });
            return GameService.getGameById(gameId)
                .then((game) => {
                    context.commit({ type: 'setGame', game })
                    return game;
                })
        },
        removeGame(context, { gameId }) {
            return GameService.removeGame(gameId)
                .then(() => {
                    console.log('remove after game service');
                    context.commit({ type: 'removeGame', gameId })
                })
        },
        saveGame(context, { savedGame }) {
            console.log('newgame in action', savedGame)
            return GameService.saveGame(savedGame)
                .then((game) => {
                    console.log('savegame in store', game);
                    context.commit({ type: 'saveGame', game })
                })
        },
        setFilter(context, { filterBy }) {
            console.log('setFilter in store: filterBy', filterBy)
            return GameService.query(filterBy)
                .then((games) => {
                    console.log('users from server after sentFilter in store', games);
                    context.commit({ type: 'gamesByFilterServer', games })
                })

        },
        gamesById(context, { games }) {
            console.log(games);
            games =  Promise.all(
                games.map(gameId => {
                    return GameService.getGameById(gameId)
                        .then(game => {
                            console.log('ofir',game)
                            return game
                        })
                })
            )
            .then(games =>{
                console.log(games,'gamesssss')
                context.commit({ type: 'loggedUserGames', games })
            })
           
            // console.log(games,'gamesssss')
            // context.commit({ type: 'loggedUserGames', games })
        }
    }
};





