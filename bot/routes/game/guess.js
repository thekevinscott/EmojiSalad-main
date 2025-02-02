'use strict';
//const Promise = require('bluebird');
//const Player = require('models/player');
//const Message = require('models/message');
const Round = require('models/round');
//const _ = require('lodash');
//const rule = require('config/rule');
const newRound = require('./new_round');
//const sendMessages = require('lib/sendMessages');
//const setTimer = require('lib/setTimer');
const Timer = require('models/timer');

module.exports = (game, player, input) => {
  //setTimer.clear(game, 'guess');
  Timer.clear('guess', game.id);
  Timer.clear('nobody-has-guessed', game.id);
  Timer.clear('nobody-has-guessed-2', game.id);
  const original_phrase = game.round.phrase;
  // game is in progress
  return Round.guess(game.round, {
    guess: input,
    player_id: player.id
  }).then((resulting_round) => {
    if ( resulting_round.error ) {
      console.error('error with new round', resulting_round);
      throw new Error(resulting_round.error);
    }
    console.info('resulting round', resulting_round);
    return require('./say')(game, player, input).then((messages) => {
      if ( resulting_round.winner && resulting_round.winner.id ) {
        return Round.create(game).then((round) => {
          console.info('round', round);
          if ( round.error ) {
            console.error('There was an error creating the round');
          }
          // correct guess!
          //return messages.concat(game.round.players.map((game_player) => {
          return messages.concat(game.players.map((game_player) => {
            return {
              player: game_player,
              key: 'correct-guess',
              options: [player.nickname, player.avatar, original_phrase]
            };
          })).concat(newRound(game, round));
        });
      } else {
        // if a game is in progress, set a timeout to say the guess
        // was incorrect
        if ( resulting_round.submission ) {
          const nudge_messages = game.players.map((game_player) => {
            //if (game_player.protocol === 'sms') {
            return {
              player: game_player,
              key: 'cron',
              options: [
                game.round.submission,
                input
              ],
              protocol: game_player.protocol
            };
          }).filter(message => message);
          Timer.set('guess', game.id, nudge_messages, 30 * 60);
          //setTimer(game, 'guess', nudge_messages, 30 * 60 * 1000); // 30 minutes
        }

        // else, incorrect guess
        return messages;
      }
    });
  });
};
