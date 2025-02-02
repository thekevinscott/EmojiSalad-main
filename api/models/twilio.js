'use strict';
const twilio = require('twilio');
let config;
if ( process.env.ENVIRONMENT !== 'test' ) {
  config = require('../../config/twilio')[process.env.ENVIRONMENT];
} else {
  //config = require('../../../../../config/twilio')[process.env.ENVIRONMENT];
  config = {
    accountSid: 'ACf2076b907d44abdd8dc8d262ff941ee4',
    authToken: '0d7b1b491ca038d4ff4fdf674cd46aa1',
    from : "12013409832"
  };
}
//const Log = require('./log');
const Promise = require('bluebird');
const client = twilio(config.accountSid, config.authToken);
const send = Promise.promisify(client.sendMessage);
const message_time = 0;

module.exports = {
  parse: function(responses, player) {
    var twiml = new twilio.TwimlResponse();
    responses.map(function(response) {
      twiml.sms(response.message, {
        to: response.to,
        from: response.from
      });
    });
    //Log.outgoing(responses, player, 'twilio');
    return new Promise(function(resolve) {
      resolve(twiml);
    });
  },
  send: function(responses) {
    let players = {};
    for ( var i=0; i<responses.length; i++ ) {
      let response = responses[i];
      let player_id = response.player.id;
      if ( !players[player_id] ) {
        players[player_id] = [];
      }
      players[player_id].push(response);
    }
    let newResponses = Object.keys(players).map(function(player_id) {
      return players[player_id].reduce(function(output, response) {
        if (! output) {
          output = {
            to: response.to,
            from: response.from,
            message: [response.message]
          };
        } else {
          output.message.push(response.message);
        }
        return output;
      }, null);
    }).map(function(response) {
      response.message = response.message.join('\n\n');
      return response;
    });

    return Promise.reduce(newResponses, function(output, response) {
      // add 1000 to the sending time. Twilio limits
      // outgoing messages to 1 per second anyways,
      // so we can't actually do anything faster than this.
      return Promise.delay(message_time + 1000).then(function() {
        let creds = {
          to: response.to,
          from: response.from,
          body: response.message
        };
        //Log.outgoing(response, null, 'twilio');
        return send(creds);
      }).then(function(send_output) {
        return output.concat(send_output);
      }).catch(function(err) {
        console.error('error sending message', err);
        throw err;
      });
    }, []).then(function() {
      return new twilio.TwimlResponse();
    });
  }
};
