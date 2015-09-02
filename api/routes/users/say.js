var User = require('../../models/user');
var Message = require('../../models/message');
var Game = require('../../models/game');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = function(user, input) {

  if ( /^invite(.*)/i.test(input) ) {
    return require('../users/invite')(user, input);
  } else {
    return Promise.join(
      Message.get('says', [user.nickname, input]),
      Game.get({ user: user }),
      function(message, game) {
        message.type = 'sms';
        message.options = [
          user.nickname,
          input
        ];
        var messages = [];
        game.players.map(function(player) {
          if ( player.id !== user.id ) {
            //console.log('forward to user: ', player.id, player.number);
            messages.push(_.assign({}, message, { number: player.number, user: player }));
          }
        });
        return messages;
      }
    );
  }
}

