'use strict';
const squel = require('squel').useFlavour('mysql');
const db = require('db');
const Promise = require('bluebird');
const User = require('models/user');
const _ = require('lodash');
let Game;

let Player = {
  // create a new player
  create: (params) => {
    if ( ! params.from && ! params.user_id ) {
      throw "You must provide a from or user_id field";
    }

    let user_params = {};
    if ( params.user_id ) {
      user_params = { id: params.user_id };
    } else {
      user_params = { from: params.from };
    }
    return User.findOne(user_params).then((user) => {
      if ( ! user || !user.id ) {
        throw 'You must provide a valid from or user_id field';
      }

      let number_query;
      if ( params.to ) {
        number_query = squel
                       .select()
                       .field('id')
                       .field('number')
                       .from('game_numbers','n')
                       .where('n.number=?', params.to);
      } else {
        // no game number has been specified;
        // for instance, if an invite has
        // been created.
        //
        // In this case, we auto generate a game
        // number for this player
        let get_to_query = squel
                           .select({ autoEscapeFieldNames: true })
                           .field('p.`to`')
                           //.field('`to`')
                           .from('players','p')
                           .where('p.user_id=?',user.id);

        number_query = squel
                       .select()
                       .field('id')
                       .field('number')
                       .from('game_numbers','n')
                       .where('n.id NOT IN ?', get_to_query)
                       .order('id')
                       .limit(1);
      }

      return db.query(number_query.toString()).then((numbers_rows) => {

        if ( !numbers_rows.length ) {
          console.error(number_query.toString());
          throw "No game number found";
        }

        const to = numbers_rows[0];

        let query = squel
                    .insert({ autoQuoteFieldNames: true })
                    .into('players')
                    .setFields({
                      to: to.id,
                      created: squel.fval('NOW(3)'),
                      user_id: user.id
                    });

        //let state;
        //if ( params.initial_state ) {
          //state = params.initial_state;
          //delete params.initial_state;
        //} else {
          //state = 'waiting-for-confirmation';
        //}

        //query.setFields({ 'state_id': squel
                                     //.select()
                                     //.field('id')
                                     //.from('player_states')
                                     //.where('state=?',state)});


        return db.query(query.toString()).then((rows) => {
          if ( rows.insertId ) {
            return {
              id: rows.insertId,
              to: to.number,
              from: user.from,
              nickname: user.nickname,
              user_id: user.id,
              avatar: user.avatar
            };

            return player;
          } else {
            console.error(query.toString());
            throw "Error creating player";
          }
        });
      });
    });


  },
  findOne: (params) => {
    if (parseInt(params)) {
      params = { id: params };
    }
    return Player.find(params).then((players) => {
      if ( players && players.length) {
        return players[0];
      } else {
        return {};
      }
    });
  },

  find: (params = {}) => {
    let query = squel
                .select({ autoEscapeFieldNames: true })
                .field('p.id')
                .field('p.created')
                .field('n.number','to')
                //.field('p.state_id')
                .field('u.id', 'user_id')
                //.field('u.blacklist')
                .field('u.nickname')
                .field('u.from')
                .field('u.avatar')
                .from('players', 'p')
                .left_join('game_numbers','n','n.id=p.`to`')
                .left_join('users', 'u', 'u.id=p.user_id')

    if ( params.id ) {
      query = query.where('p.id=?',params.id);
    }

    if ( params.nickname ) {
      query = query.where('u.nickname LIKE ?',params.nickname+'%');
    }
    
    if ( params.from ) {
      query = query.where('u.`from` LIKE ?',params.from+'%');
    }

    if ( params.user_id ) {
      query = query.where('u.`id` = ?',params.user_id);
    }

    return db.query(query);
  },
  

  /*
  get: Promise.coroutine(function* (params) {
    if ( !params.id && ( (!params.from && !params.number) || !params.to )) {
      console.error('params', params);
      throw new Error({
        message: 'Tried to select on an invalid params key'
      });
    } 

    let user_params = {};
    if ( params.from ) {
      user_params.from = params.from;
    } else if ( params.number ) {
      user_params.from = params.number;
    } else if ( params.id ) {
      user_params.player_id = params.id;
    }

    let user = yield User.get(user_params);

    if ( ! user ) {
      return null;
    } else {
      let query = squel
                  .select({ autoEscapeFieldNames: true })
                  .field('p.id')
                  .field('p.created')
                  .field('p.blacklist')
                  .field('p.state_id')
                  .field('n.number','to')
                  .field('s.state', 'state')
                  .field('u.id', 'user_id')
                  .field('u.blacklist')
                  .field('u.nickname')
                  .from('players', 'p')
                  .left_join('game_numbers','n','n.id=p.`to`')
                  .left_join('player_states', 's', 's.id = p.state_id')
                  .left_join('users', 'u', 'u.id = p.user_id')
                  .where('u.id=?', user.id);

      if ( params.id ) {
        query = query.where('p.`id`=?', params.id);
      } else if ( params.to ) {
        query = query
                .where('n.number=?',params.to);
      }

      let players = yield db.query(query.toString());

      if ( ! players.length ) {
        return null;
      } else {

        let player = players[0];

        player.number = user.from;
        player.from = user.from;
        player.user_id = user.id;
        player.avatar = user.avatar;
        player.user = user;

        return player;
      }
    }
  }),
  */

  update: Promise.coroutine(function* (player, params) {

    let query = squel
                .update()
                .table('players', 'p')
                .where('p.id=?', player.id);

    if ( params.state ) {
      let state = squel
                   .select()
                   .field('id')
                   .from('player_states')
                   .where('state=?', params.state);

      query.set('state_id', state, { dontQuote: true });
    }

    yield db.query(query.toString());
    return player;
  }),
  logLastActivity: function(player, game_number) {
    if ( ! Game ) {
      Game = require('./game');
    }
    const promises = [];
    if ( player && player.id ) {
      let update_player = squel
                        .update()
                        .table('players')
                        .setFields({
                          last_activity: squel.fval('NOW(3)')
                        })
                       .where('id=?',player.id);

      promises.push(db.query(update_player));

      promises.push(Game.get({ player: player, game_number: game_number }).then(function(game) {
        if ( game && game.id ) {

          let update_game = squel
                            .update()
                            .table('games')
                            .setFields({
                              last_activity: squel.fval('NOW(3)')
                            })
                           .where('id=?',game.id);

          return db.query(update_game);
        }
      }));
    }

    return Promise.all(promises);
  }
};

module.exports = Player;