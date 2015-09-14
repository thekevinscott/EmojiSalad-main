'use strict';
//var User = require('../../models/user');
//var Message = require('../../models/message');
var Game = require('../../models/game');
var Promise = require('bluebird');
var _ = require('lodash');
var rule = require('../../config/rule');

module.exports = function(user, input) {
  if ( rule('invite').test(input) ) {
    return require('../users/invite')(user, input);
  } else {
    return Promise.join(
      Game.get({ user: user }),
      function(game) {
        var message = {
          key: 'says',
          options: [
            user.nickname,
            input
          ]
        };
        return game.players.map(function(player) {
          if ( player.id !== user.id ) {
            return _.assign({
              //number: player.number,
              user: player
            },
            message);
          }
        //}).filter(function(el) { return el; });
        }).filter((el) => el);
      }
    );
  }
};
