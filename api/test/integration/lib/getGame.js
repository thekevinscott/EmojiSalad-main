'use strict';
const Game = require('models/Game');
const Player = require('models/Player');
const game_numbers = require('../../../../config/numbers');

function getGame(player) {
  if ( ! player.id ) {
    return Player.get({ number: player.number }).then(function(player) {
      return Game.get({ player: player, game_number: game_numbers.getDefault() });
    });
  } else {
    return Game.get({ player: player, game_number: game_numbers.getDefault() });
  }
}

module.exports = getGame;
