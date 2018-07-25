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


    gamesByFilterServer(state, {games}) {
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
    // loadGame(context, { gameId }) {
    //   console.log('route, gameId', {gameId });
    //   return GameService.getGameById(gameId)
    //     .then((game) => {
    //       return game;
    //     })
    // },
   
    sentFilter(context, {filterBy}) {
      console.log('sentFilter: filterBy', filterBy.name)
      return GameService.sentFilter(filterBy.name)
          .then((games) => {
              console.log('users from server after sentFilter in store', games);
              context.commit({type: 'gamesByFilterServer', games })
          })

        },
    
  }
}