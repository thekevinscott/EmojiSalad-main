'use strict';
/*
 * Tests that games work with two players
 *
 */

const getPlayers = require('lib/getPlayers');
const playGame = require('flows/playGame');
const startGame = require('flows/startGame');
const signup = require('flows/signup');
const setup = require('lib/setup');
const getPhrase = require('lib/getPhrase');
const check = require('lib/check');
const rule = require('../../config/rule');
const guess = rule('guess').example();
const EMOJI = '😀';
const db = require('db');
const squel = require('squel');

describe('Game', () => {
  it('should initiate the game with the person who started it', () => {
    const players = getPlayers(2);

    return signup(players[0]).then(() => {
      return setup([
        { player: players[0], msg: 'invite '+players[1].number},
        { player: players[1], msg: 'yes'},
        { player: players[1], msg: players[1].nickname }
      ]);
    }).then(() => {
      return check(
        { player: players[1], msg: players[1].avatar },
        [
          { key: 'accepted-invited', options: [players[1].nickname, players[1].avatar], to: players[0] },
          { key: 'accepted-inviter', options: [players[1].nickname, players[1].avatar, players[0].nickname, players[0].avatar], to: players[1] },
          { key: 'game-start', options: [players[0].nickname, players[0].avatar, '*'], to: players[0] }
        ]
      );
    });
  });

  it('should let allow a third user to join before emojis have been submitted', () => {
    const players = getPlayers(3);

    return signup(players[0]).then(() => {
      return setup([
        { player: players[0], msg: 'invite '+players[1].number},
        { player: players[1], msg: 'yes'},
        { player: players[1], msg: players[1].nickname },
        { player: players[1], msg: players[1].avatar },
        { player: players[1], msg: 'invite '+players[2].number},
        { player: players[2], msg: 'yes'},
        { player: players[2], msg: players[2].nickname }
      ]);
    }).then(() => {
      return check(
        { player: players[2], msg: players[2].avatar },
        [
          // this alerts the submitter that player 2, invited by player 1, has joined the game
          { to: players[0], key: 'join-game', options: [players[2].nickname, players[2].avatar] },
          // this alerts player 1 that player 2, whom they invited, has joined the game.
          { to: players[1], key: 'accepted-invited', options: [players[2].nickname, players[2].avatar] },
          // this alert players 2 that they've joined the game and player 0 is starting.
          { to: players[2], key: 'accepted-inviter', options: [players[2].nickname, players[2].avatar, players[0].nickname, players[0].avatar ] }
        ]
      );
    });
  });

  it('should allow players to cross talk', () => {
    const players = getPlayers(3);

    return playGame(players).then(() => {
      const msg = 'huh?';
      return check(
        { player: players[1], msg },
        [
          { to: players[0], key: 'says', options: [players[1].nickname, players[1].avatar, msg] },
          { to: players[2], key: 'says', options: [players[1].nickname, players[1].avatar, msg] }
        ]
      );
    });
  });

  it('should allow the submitter to cross talk', () => {
    const players = getPlayers(3);

    return playGame(players).then(() => {
      const msg = 'just play';
      return check(
        { player: players[0], msg },
        [
          { to: players[1], key: 'says', options: [players[0].nickname, players[0].avatar, msg] },
          { to: players[2], key: 'says', options: [players[0].nickname, players[0].avatar, msg] }
        ]
      );
    });
  });

  describe('Player order', () => {
    it('should proceed to second player in a two person game', () => {
      const players = getPlayers(2);

      return playGame(players, true).then((game_phrase) => {
        return check(
          { player: players[1], msg: guess + game_phrase, get_response: true },
          [
            { to: players[0], key: 'says', options: [players[1].nickname, players[1].avatar, game_phrase] },
            { to: players[0], key: 'correct-guess', options: [players[1].nickname, players[1].avatar, game_phrase] },
            { to: players[1], key: 'correct-guess', options: [players[1].nickname, players[1].avatar, game_phrase] },
            { to: players[0], key: 'game-next-round', options: [players[1].nickname, players[1].avatar] },
            { to: players[1], key: 'game-next-round-suggestion', options: [players[1].nickname, players[1].avatar, '*'] }
          ]
        );
      });
    });

    it('should loop back to first player in the third round of a two person game', () => {
      const players = getPlayers(2);

      return playGame(players, true).then((first_game_phrase) => {
        return setup([
          { player: players[1], msg: guess + first_game_phrase, get_response: true },
          { player: players[1], msg: EMOJI }
        ], 5).then((messages) => {
          const game_phrase = getPhrase(messages);
          return check(
            { player: players[0], msg: guess + game_phrase },
            [
              { to: players[1], key: 'says', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[0], key: 'correct-guess', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[1], key: 'correct-guess', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[0], key: 'game-next-round-suggestion', options: [players[0].nickname, players[0].avatar, '*'] },
              { to: players[1], key: 'game-next-round', options: [players[0].nickname, players[0].avatar] }
            ]
          );
        });
      });
    });

    it('should loop back to first player in the fourth round of a three person game', () => {
      const players = getPlayers(3);

      return playGame(players, true).then((first_game_phrase) => {
        return setup([
          { player: players[1], msg: guess + first_game_phrase, get_response: true },
          { player: players[1], msg: EMOJI }
        ], 8).then((messages) => {
          //console.log('messages', messages);
          const second_game_phrase = getPhrase(messages);
          return setup([
            { player: players[0], msg: guess + second_game_phrase, get_response: true },
            { player: players[2], msg: EMOJI }
          ], 8);
        }).then((messages) => {
          const game_phrase = getPhrase(messages);
          return check(
            { player: players[0], msg: guess + game_phrase},
            [
              { to: players[1], key: 'says', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[2], key: 'says', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[0], key: 'correct-guess', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[1], key: 'correct-guess', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[2], key: 'correct-guess', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[0], key: 'game-next-round-suggestion', options: [players[0].nickname, players[0].avatar, '*'] },
              { to: players[1], key: 'game-next-round', options: [players[0].nickname, players[0].avatar ] },
              { to: players[2], key: 'game-next-round', options: [players[0].nickname, players[0].avatar ] }
            ]
          );
        });
      });
    });

    it('should add a third player in the middle of the second round', () => {
      const players = getPlayers(3);

      return startGame(players.slice(0, 2), true).then(() => {
        return setup([
          { player: players[0], msg: EMOJI },
          { player: players[0], msg: 'invite '+players[2].number },
          { player: players[2], msg: 'y' },
          { player: players[2], msg: players[2].nickname }
        ]).then(() => {
          return check(
            { player: players[2], msg: players[2].avatar },
            [
              { to: players[0], key: 'accepted-invited', options: [players[2].nickname, players[2].avatar] },
              { to: players[1], key: 'join-game', options: [players[2].nickname, players[2].avatar] },
              { to: players[2], key: 'accepted-inviter-in-progress', options: [players[2].nickname, players[2].avatar, players[0].nickname, players[0].avatar] },
              { to: players[2], key: 'emojis', options: [players[0].nickname, players[0].avatar, EMOJI] },
              { to: players[2], key: 'guessing-instructions', options: [] }
            ]
          );
        });
      });
    });

    it('should add a third player at the second round and proceed to second player', () => {
      const players = getPlayers(3);

      return startGame(players.slice(0, 2), true).then((game_phrase) => {
        return setup([
          { player: players[0], msg: EMOJI },
          { player: players[0], msg: 'invite '+players[2].number },
          { player: players[2], msg: 'y' },
          { player: players[2], msg: players[2].nickname },
          { player: players[2], msg: players[2].avatar }
        ]).then(() => {
          return check(
            { player: players[1], msg: guess + game_phrase },
            [
              { to: players[0], key: 'says', options: [players[1].nickname, players[1].avatar, game_phrase] },
              { to: players[2], key: 'says', options: [players[1].nickname, players[1].avatar, game_phrase] },
              { to: players[0], key: 'correct-guess', options: [players[1].nickname, players[1].avatar, game_phrase] },
              { to: players[1], key: 'correct-guess', options: [players[1].nickname, players[1].avatar, game_phrase] },
              { to: players[2], key: 'correct-guess', options: [players[1].nickname, players[1].avatar, game_phrase] },
              { to: players[0], key: 'game-next-round', options: [players[1].nickname, players[1].avatar] },
              { to: players[1], key: 'game-next-round-suggestion', options: [players[1].nickname, players[1].avatar, '*'] },
              { to: players[2], key: 'game-next-round', options: [players[1].nickname, players[1].avatar] }
            ]
          );
        });
      });
    });

    it('should add a third player at the third round and proceed to third player', () => {
      const players = getPlayers(3);

      return startGame(players.slice(0, 2), true).then((first_game_phrase) => {
        return setup([
          { player: players[0], msg: EMOJI },
          { player: players[1], msg: guess + first_game_phrase, get_response: true },
          { player: players[1], msg: EMOJI },
          { player: players[0], msg: 'invite '+players[2].number },
          { player: players[2], msg: 'y' },
          { player: players[2], msg: players[2].nickname },
          { player: players[2], msg: players[2].avatar }
        ], 5).then((messages) => {
          const game_phrase = getPhrase(messages);
          return check(
            { player: players[0], msg: guess + game_phrase },
            [
              { to: players[1], key: 'says', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[2], key: 'says', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[0], key: 'correct-guess', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[1], key: 'correct-guess', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[2], key: 'correct-guess', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[0], key: 'game-next-round', options: [players[2].nickname, players[2].avatar ] },
              { to: players[1], key: 'game-next-round', options: [players[2].nickname, players[2].avatar ] },
              { to: players[2], key: 'game-next-round-suggestion', options: [players[2].nickname, players[2].avatar, '*'] }
            ]
          );
        });
      });
    });

    it('should add a fourth player at the fourth round and proceed to fourth player', () => {
      const players = getPlayers(4);
      return startGame(players.slice(0, 3), true).then((first_game_phrase) => {
        return setup([
          { player: players[0], msg: EMOJI },
          { player: players[1], msg: guess + first_game_phrase, get_response: true },
          { player: players[1], msg: EMOJI }
        ], 8).then((messages) => {
          const game_phrase = getPhrase(messages);
          return setup([
            { player: players[0], msg: guess + game_phrase, get_response: true },
            { player: players[0], msg: 'invite '+players[3].number },
            { player: players[2], msg: EMOJI },
            { player: players[3], msg: 'y' },
            { player: players[3], msg: players[3].nickname },
            { player: players[3], msg: players[3].avatar }
          ], 8);
        }).then((messages) => {
          const game_phrase = getPhrase(messages);
          return check(
            { player: players[0], msg: guess + game_phrase },
            [
              { to: players[1], key: 'says', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[2], key: 'says', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[3], key: 'says', options: [players[0].nickname, players[0].avatar, guess] },
              { to: players[0], key: 'correct-guess', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[1], key: 'correct-guess', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[2], key: 'correct-guess', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[3], key: 'correct-guess', options: [players[0].nickname, players[0].avatar, game_phrase] },
              { to: players[0], key: 'game-next-round', options: [players[3].nickname, players[3].avatar ] },
              { to: players[1], key: 'game-next-round', options: [players[3].nickname, players[3].avatar ] },
              { to: players[2], key: 'game-next-round', options: [players[3].nickname, players[3].avatar ] },
              { to: players[3], key: 'game-next-round-suggestion', options: [players[3].nickname, players[3].avatar, '*'] }
            ]
          );
        });
      });
    });
  });

  describe('Running out of phrases', () => {
    let original_phrases;
    before(() => {
      const select_phrases = squel
                             .select()
                             .from('phrases');
      return db.api.query(select_phrases).then((rows) => {
        original_phrases = rows;
        const delete_phrases = squel
                               .delete()
                               .from('phrases');
        return db.api.query(delete_phrases);
      }).then(() => {
        const insert_phrases = squel
                               .insert()
                               .into('phrases')
                               .setFieldsRows([
                                 { id: 1, phrase: 'First Phrase' },
                                 { id: 2, phrase: 'Second Phrase' },
                                 { id: 3, phrase: 'Third Phrase' },
                                 { id: 4, phrase: 'Fourth Phrase' }
                               ]);
        return db.api.query(insert_phrases);
      });
    });

    after(() => {
      const insert_phrases = squel
                             .insert()
                             .into('phrases')
                             .setFieldsRows(original_phrases.map((phrase) => {
                               return {
                                 id: phrase.id,
                                 phrase: phrase.phrase,
                                 admin_id: phrase.admin_id,
                                 category_id: phrase.category_id
                               };
                             }));
      return db.api.query(insert_phrases);
    });

    it('should refresh phrases before it runs out of phrases', () => {
      const players = getPlayers(3);
      const phrases = [];
      let current_submitter = 0;

      function submitAndGuess(messages) {
        let game_phrase;
        if (typeof messages === 'string') {
          game_phrase = messages;
        } else {
          game_phrase = getPhrase(messages);
        }
        phrases.push(game_phrase);
        const submitter = players[current_submitter];
        const guesser = players[(current_submitter + 1) >= players.length ? 0 : current_submitter + 1];
        if (current_submitter >= players.length - 1) {
          current_submitter = 0;
        } else {
          current_submitter++;
        }
        return setup([
          { player: submitter, msg: EMOJI },
          { player: guesser, msg: guess + game_phrase, get_response: true }
        ], 8);
      }

      return startGame(players, true)
      .then(submitAndGuess)
      .then(submitAndGuess)
      .then(submitAndGuess)
      .then((messages) => {
        const game_phrase = getPhrase(messages);
        phrases.indexOf(game_phrase).should.equal(-1);
        return submitAndGuess(game_phrase);
      }).then((messages) => {
        const game_phrase = getPhrase(messages);
        phrases.indexOf(game_phrase).should.equal(0);
        return submitAndGuess(game_phrase);
      }).then((messages) => {
        const game_phrase = getPhrase(messages);
        phrases.indexOf(game_phrase).should.equal(1);
        return submitAndGuess(game_phrase);
      });
    });
  });
});
