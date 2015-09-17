'use strict';
//var User = require('../../models/user');
//var Message = require('../../models/message');
const Game = require('models/game');
//const Round = require('models/round');
//const _ = require('lodash');

var keys = {
  'waiting-for-submission': 'help-submitter-waiting-for-submission',
  'submitted': 'help-submitter-submitted',
  'bench': 'help-player-bench',
  'guessing': 'help-player-guessing',
  'waiting-for-round': getGame('help-player-waiting-for-round'),
  'ready-for-game': getGame('help-player-ready-for-game')
};

function getGame(key) {
  return function(user) {
    return Game.get({ user: user }).then(function(game) {
      return [{
        user: user,
        key: key,
        options: [ game.round.submitter.nickname ]
      }];
    });
  };
}

module.exports = function(user) {
  if ( keys[user.state] ) {
    if ( typeof keys[user.state] === 'function' ) {
      return keys[user.state](user);
    } else {
      return [{
        user: user,
        key: keys[user.state]
      }];
    }
  } else {
    console.error('no help message found for', user.state, user);
  }
};