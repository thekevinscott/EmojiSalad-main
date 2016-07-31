export function selectUser(state, userId) {
  return state.data.users[userId];
}

export function selectPlayers(state, userKeys = []) {
  return userKeys.map(userKey => {
    const player = state.data.users[userKey] || {};
    return player;
  });
}

export function selectMessages(state, messageKeys = []) {
  return messageKeys.map(key => {
    return state.data.messages[key];
  });
}

function getLastMessageAsDate(game) {
  return new Date(game.messages[game.messages.length - 1].timestamp * 1000);
}

export function selectGames(state) {
  return Object.keys(state.data.games || {}).map(gameId => {
    const game = state.data.games[gameId];
    return {
      ...game,
      players: selectPlayers(state, game.players),
      messages: selectMessages(state, game.messages),
    };
  }).sort((a, b) => {
    return getLastMessageAsDate(b) - getLastMessageAsDate(a);
  });
}

export function selectUI(state) {
  return {
    fetching: state.ui.Games.fetching,
  };
}
