'use strict';
const squel = require('squel');
const sprintf = require('sprintf');
const _ = require('lodash');
const Promise = require('bluebird');
const db = require('db');
//const config = require('../../config/twilio')[process.env.ENVIRONMENT];

const Message = {
  get: Promise.coroutine(function* (key, options) {
    if ( ! options ) {
      options = [];
    }
    if ( typeof key === 'string' ) {
      key = [key];
    }

    const query = squel
                  .select()
                  .from('messages')
                  .where('`key` IN ?',key);

    const messages = yield db.query(query);
    if ( messages.length ) {
      // expects an options argument
      // that is an object containing keys
      // that correspond to a message's key.
      //
      // {
      //  intro_4: [
      //    '8604601234'
      //  ]
      // }
      return messages.map((obj) => {
        if ( obj.message ) {
          // this is coming from an old database
          obj.body = obj.message;
          delete obj.message;
        }
        if ( options[obj.key] ) {
          if ( _.isArray(options[obj.key]) ) {
            obj.body = sprintf.apply(null, [obj.body].concat(options[obj.key]));
          } else {
            //let old = { game: { round: {submitter: {nickname: 'foobar'} } } };
            obj.body = sprintf(obj.body, options[obj.key]);
          }
        }
        return {
          id: obj.id,
          key: obj.key,
          //name: obj.name
          body: obj.body
        };
      });

    } else {
      throw "No messages found for key " + key;
    }
  }),
  parse: Promise.coroutine(function* (responses, original_message = {}) {
    if ( responses && responses.length ) {
      const messages = {};
      const options = {};
      responses.map((response) => {
        if ( response.options ) {
          options[response.key] = response.options;
        }
      });

      const rows = yield Message.get(responses.map((response) => {
        if ( ! response.key ) {
          throw new Error("Every response must have a key: " + JSON.stringify(response));
        }
        return response.key;
      }), options);

      rows.map((row) => {
        messages[row.key] = row.body;
      });

      return responses.map((response) => {
        let from;

        console.info('response player', response);
        if ( response.player.from ) {
          from = response.player.from;
        } else if ( response.player.user.from ) {
          from = response.player.user.from;
        }
        const to = response.player.to;

        if ( ! to ) {
          console.error(response);
          throw "Missing to field in Message.parse";
        }

        if ( ! from ) {
          console.error(response);
          throw "Missing from field in Message.parse";
        }

        // The 'to' and 'from fields get flipped.
        // i.e., a user's number, which until now
        // was the 'from' field, is now the number
        // we send to, aka the 'to' field.
        return _.assign({
          body: messages[response.key],
          to: from,
          from: to,
          protocol: response.player.protocol || original_message.protocol,
          initiated_id: original_message.id
        }, response);
      });
    } else {
      return [];
    }
  })
};

module.exports = Message;
