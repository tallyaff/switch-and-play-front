import GameService from '../services/GameService.js'

export default {
    state: {
        gamesLoading: false,
        games: [],
        // filterBy: {
        //   name: '',
        // },
    },
    mutations: {
        setGamesLoading(state, { isLoading }) {
            state.gamesLoading = isLoading;
        },
        setGames(state, { games }) {
            state.games = games;
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
        
        // gamesByFilterServer(state, { games }) {
        //     console.log('mutation gamesByFilterServer', games);
        //     state.games = games;
        // }
    },
    getters: {
        gamesForDisplay(state) {
            console.log('stateUser', state.games);
            return state.games
        },
        
    },
    actions: {
        loadGames(context) {
            // doing commit on this store mutation
            context.commit({ type: 'setGamesLoading', isLoading: true })
            return GameService.query()
                .then(games => {
                    // to update the mutation setGames
                    context.commit({ type: 'setGames', games })
                    return games;
                })
                .finally(() => {
                    context.commit({ type: 'setGamesLoading', isLoading: false })
                })
        },
        // loadGame(context, { gameId }) {
        //   console.log('route, gameId', {gameId });
        //   return GameService.getGameById(gameId)
        //     .then((game) => {
        //       return game;
        //     })
        // },

        sentFilter(context, { filterBy }) {
            console.log('sentFilter: filterBy', filterBy.name)
            return GameService.sentFilter(filterBy.name)
                .then((games) => {
                    console.log('users from server after sentFilter in store', games);
                    context.commit({ type: 'gamesByFilterServer', games })
                })

        },
        saveGame(context, { savedGame }) {
            console.log('newgame in action', savedGame)
            return GameService.savegame(savedGame)
                .then((game) => {
                    console.log('savegame in store', game);
                    context.commit({ type: 'savegame', game })
                })
        },

    }
}


