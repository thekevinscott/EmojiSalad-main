import typeToReducer from 'type-to-reducer';

import {
  FETCH_GAMES,
} from 'pages/Games/types';

import {
  INVITE_TO_GAME,
} from 'pages/GameSettings/types';

import {
  UPDATE_USER,
} from 'pages/Settings/types';

const initialState = {};

const getPlayersWithUserKeys = (players) => players.filter(player => {
  return player.user_key;
}).reduce((playerObj, player) => ({
  ...playerObj,
  [player.user_key]: player,
}), {});

const getPlayers = game => {
  if (game.type === 'game') {
    return getPlayersWithUserKeys(game.players);
  } else if (game.type ==='invite') {
    return getPlayersWithUserKeys([game.inviter_player]);
  }

  return {}; 
};

const getUsers = games => games.reduce((gameObj, game) => ({
  ...gameObj,
  ...getPlayers(game),
}), {});

function translateUser(user) {
  return {
    key: user.user_key,
    created: user.created,
    nickname: user.nickname,
    blacklist: user.blacklist,
    avatar: user.avatar,
    protocol: user.protocol,
    archived: user.user_archived,
  };
}

export default typeToReducer({
  [INVITE_TO_GAME]: {
    FULFILLED: (state, {
      data,
    }) => data.reduce((users, invite) => {
      if (invite.error) {
        return users;
      }

      const invitedUser = invite.invited_user;

      return {
        ...users,
        [invitedUser.key]: translateUser(invitedUser),
      };
    }, state),
  },
  [UPDATE_USER]: {
    FULFILLED: (state, { data }) => {
      return {
        ...state,
        [data.key]: translateUser({
          ...state[data.key],
          ...data,
        }),
      };
    },
  },
  [FETCH_GAMES]: {
    FULFILLED: (state, action) => {
      const users = getUsers(action.data);

      return {
        ...state,
        ...Object.keys(users).reduce((obj, userKey) => {
          return {
            ...obj,
            [userKey]: translateUser(users[userKey]),
          };
        }, {}),
      };
    },
  },
}, initialState);
