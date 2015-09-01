var User = require('../../models/user');
var Game = require('../../models/game');
var Message = require('../../models/message');
var Promise = require('bluebird');
var _ = require('lodash');

module.exports = function(user, input) {
  if ( /^invite(.*)/i.test(input) ) {
    return require('../users/invite')(user, input);
  } else if ( ! Game.checkInput(input) ) {
    return Message.get('error-9').then(function(message) {
      message.type = 'respond';
      return [message];
    });
  } else {

    return Game.saveSubmission(user, input).then(function(game) {
      return Promise.join(
        Message.get('game-submission-sent'),
        Message.get('says', [game.round.submitter.nickname, input]),
        Message.get('guessing-instructions'),
        function(message, forwardedMessage, guessingInstructions) {
          //console.log('saved submission');
          message.type = 'respond';
          var messages = [message];
          forwardedMessage.type = 'sms';
          guessingInstructions.type = 'sms';
          //console.log('the players', game.round.players);
          game.round.players.map(function(player) {
            messages.push(_.assign({}, forwardedMessage, { number: player.number }));
            messages.push(_.assign({}, guessingInstructions, { number: player.number }));
          });
          return messages;
        }
      );
      //res.json(game);
    }).catch(function(error) {
      console.log('there is an error', error);
      if ( error && parseInt(error.message) ) {
        return Message.get('error-'+error.message, [input]).then(function(message) {
          message.type = 'respond';
          return [message];
        });
      } else {
        throw error;
      }
    });
  }
};

