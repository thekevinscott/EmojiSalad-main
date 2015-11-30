'use strict';
const Promise = require('bluebird');
//const Phone  = require('models/phone');
const Invite = require('models/invite');
const rule = require('config/rule');

module.exports = Promise.coroutine(function* (inviter, input) {
  if ( rule('invite').test(input) ) {
    //var type = 'twilio';
    input = input.split('invite').pop().trim();
    try {
      //let phones = yield Phone.parse([input]);
      //let phone = phones[0];
      let players = yield Invite.create(inviter, input);
      // let the inviting player know we messaged
      // their buddy, and let the buddy
      // know they've been invited
      return [
        {
          player: players.inviting_player,
          key: 'intro_4',
          options: [input]
        },
        {
          key: 'invite',
          options: [players.inviting_player.nickname],
          player: players.invited_player
        },
      ];
    } catch(error) {
      if ( error && parseInt(error.message) ) {
        return [{
          player: inviter,
          key: 'error-'+error.message,
          options: [input]
        }];
      } else {
        console.error('HANDLE THIS', error.message);
        throw error;
      }
    }
  } else {
    return [{
      player: inviter,
      key: 'error-8',
      options: [input]
    }];
  }

});
