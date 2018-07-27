import GameService from '../services/GameService.js'



export default {
    state: {
        gamesLoading: false,
        games: [],
        loggedUserGames: [],
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
        removeGame(state, { gameId }) {
            state.games = state.games.filter(game => game._id !== gameId)
        },
        // setFilter(state, payload) {
        //   console.log('payload', payload.filterBy);
        //   state.filterBy = payload.filterBy;
        //   console.log('state', state.filterBy);
        // },
        saveGame(state, { game }) {
            console.log('mutation saveGame', game);
            let foundGameIdx = -1;
            foundGameIdx = state.games.findIndex(searchGame => searchGame._id === game._id);
            if (foundGameIdx !== -1) state.games.splice(foundGameIdx, 1, game);
            else state.games.push(game);

        },
        loggedUserGames(state,{ games }){
            state.loggedUserGames = games;
            console.log(this.loggedUserGames,'this.loggedUserGames')
        }

        // gamesByFilterServer(state, { games }) {
        //     console.log('mutation gamesByFilterServer', games);
        //     state.games = games;
        // }
    },
    getters: {
        gamesForDisplay(state) {
            console.log('stateGames', state.games);
            return state.games
        },
        getUserGames(state){
            return state.loggedUserGames
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





