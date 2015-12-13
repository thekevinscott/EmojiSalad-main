'use strict';
/*
 * Tests that clues work
 *
 */

const getPlayers = require('../lib/getPlayers');
const playGame = require('../flows/playGame');
const setup = require('../lib/setup');
const check = require('../lib/check');
const rule = require('../../../config/rule');
const clue = rule('clue').example();

describe('Clues', function() {

  it('should notify all the other players when somebody asks for a clue', function() {
    var players = getPlayers(3);

    return playGame(players).then(function() {
      return check(
        { player: players[1], msg: clue },
        [
          { key: 'says', options: [players[1].nickname, clue], to: players[0] },
          { key: 'says', options: [players[1].nickname, clue], to: players[2] },
          { key: 'clue', options: [players[1].nickname, 'MOVIE'], to: players[0] },
          { key: 'clue', options: [players[1].nickname, 'MOVIE'], to: players[1] },
          { key: 'clue', options: [players[1].nickname, 'MOVIE'], to: players[2] }
        ]
      ).then(function(obj) {
        obj.output.should.deep.equal(obj.expected);
      });
    });
  });

  it('should repeat the clue if asked a second time', function() {
    var players = getPlayers(3);

    return playGame(players).then(function() {
      return setup([
        { player: players[1], msg: clue },
      ]);
    }).then(function() {
      return check(
        { player: players[1], msg: clue },
        [
          { key: 'says', options: [players[1].nickname, clue], to: players[0] },
          { key: 'says', options: [players[1].nickname, clue], to: players[2] },
          { key: 'clue', options: [players[1].nickname, 'MOVIE'], to: players[0] },
          { key: 'clue', options: [players[1].nickname, 'MOVIE'], to: players[1] },
          { key: 'clue', options: [players[1].nickname, 'MOVIE'], to: players[2] }
        ]
      ).then(function(obj) {
        obj.output.should.deep.equal(obj.expected);
      });
    });
  });

  it('should not allow the submitter to ask for a clue', function() {
    var players = getPlayers(3);

    return playGame(players).then(function() {
      return check(
        { player: players[0], msg: clue },
        [
          { key: 'says', options: [players[0].nickname, clue], to: players[1] },
          { key: 'says', options: [players[0].nickname, clue], to: players[2] },
          { key: 'no-clue-for-submitter', options: [players[0].nickname], to: players[0] },
          { key: 'no-clue-for-submitter', options: [players[0].nickname], to: players[1] },
          { key: 'no-clue-for-submitter', options: [players[0].nickname], to: players[2] }
        ]
      ).then(function(obj) {
        obj.output.should.deep.equal(obj.expected);
      });
    });
  });

  /*
  it('should not allow more than one clue', function() {
    var players = getPlayers(3);

    return playGame(players).then(function() {
      return setup([
        { player: players[1], msg: clue }
      ]);
    }).then(function() {
      return check(
        { player: players[1], msg: clue },
        [
          { key: 'says', options: [players[1].nickname, clue], to: players[0] },
          { key: 'says', options: [players[1].nickname, clue], to: players[2] },
          { key: 'no-more-clues-allowed', options: ['1 clue'], to: players[0] },
          { key: 'no-more-clues-allowed', options: ['1 clue'], to: players[1] },
          { key: 'no-more-clues-allowed', options: ['1 clue'], to: players[2] }
        ]
      ).then(function(obj) {
        obj.output.should.deep.equal(obj.expected);
      });
    });

  });

  it('should fail gracefully if no more clues exist', function() {
    var players = getPlayers(3);

    return playGame(players, { clues_allowed: 99 }).then(function() {
      return setup([
        { player: players[1], msg: clue },
        { player: players[1], msg: clue },
        { player: players[1], msg: clue },
      ]);
    }).then(function() {
      return check(
        { player: players[1], msg: clue },
        [
          { key: 'says', options: [players[1].nickname, clue], to: players[0] },
          { key: 'says', options: [players[1].nickname, clue], to: players[2] },
          { key: 'no-more-clues-available', to: players[0] },
          { key: 'no-more-clues-available', to: players[1] },
          { key: 'no-more-clues-available', to: players[2] }
        ]
      ).then(function(obj) {
        obj.output.should.deep.equal(obj.expected);
      });
    });
  });
  */
});
