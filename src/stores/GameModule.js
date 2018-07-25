import GameService from '../services/GameService.js'


export default {
    state: {
        gamesLoading: false,
        games: [],
        filterBy: {
            name: '',
        },
    },
    mutations: {
        setGamesLoading(state, { isLoading }) {
            state.gamesLoading = isLoading;
        },
        setGames(state, { games }) {
            state.games = games;
        },
        saveGame(state, {game}) {
            console.log('mutation saveGame', game);
              let foundGameIdx = -1;
              foundGameIdx = state.games.findIndex( searchGame => searchGame._id === game._id );
              if(foundGameIdx !== -1) state.games.splice(foundGameIdx, 1, game);
              else state.games.push(game);

          },
    },
    getters: {

    },
    actions: {
        loadGame(context, payload) {
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
            return GameService.getgameById(gameId)
                .then((game) => {
                    return game;
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
    },

}
