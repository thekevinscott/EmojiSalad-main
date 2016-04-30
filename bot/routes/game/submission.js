'use strict';
const Round = require('models/round');
const _ = require('lodash');
//const setTimer = require('lib/setTimer');
const Timer = require('models/timer');

module.exports = (game, submitter, input) => {
  //setTimer.clear(game, 'submission');
  Timer.clear('submission', game.id);
  return Round.update(game.round, {
    submission: input
  }).then((round) => {
    if ( round && round.id ) {
      const messages = [
        {
          key: 'game-submission-sent',
          player: submitter
        }
      ];

      return messages.concat(round.players.map((player) => {
        const message = {
          player
        };
        return [
          _.assign({
            key: 'emojis',
            options: [submitter.nickname, submitter.avatar, input]
          }, message),
          _.assign({
            key: 'guessing-instructions'
          }, message)
        ];
      })).reduce((a, b) => {
        return a.concat(b);
      }, []);
    } else {
      console.error('round', round, game);
      throw "Round was not updated";
    }
  });
};
