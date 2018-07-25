import GameService from '../services/GameService.js'


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


        gamesByFilterServer(state, { games }) {
            console.log('mutation gamesByFilterServer', games);
            state.games = games;
        }
    },
    getters: {
        currGames(state) {
            return state.games;
        },
        // gamesForDisplay(state) {
        //   return state.games.filter(game => game.name.includes(state.filterBy.name));
        // },
        gamesByFilterServer(state) {
            console.log('geeters gamesByFilterServer', state.games);
            return state.games;
        }

    },
    actions: {
        loadGames(context, payload) {
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
            return gameService.savegame(savedGame)
                .then((game) => {
                    console.log('savegame in store', game);
                    context.commit({ type: 'savegame', game })
                })
        },

    }
}


