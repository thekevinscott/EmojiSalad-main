'use strict';
const router = require('routes');
const Phone = require('models/phone');
const Player = require('models/player');
const User = require('models/user');
const Message = require('models/message');
const Twilio = require('models/twilio');
const Promise = require('bluebird');
const concatenate = require('lib/concatenateMessages');
const req = Promise.promisify(require('request'));

module.exports = function (message) {
  console.info('\n==========process message===========\n');
  console.info('message', message);
  if ( ! message.from ) {
    throw new Error("No from provided");
  }
  if ( ! message.to ) {
    throw new Error("No to provided");
  }
  if ( ! message.body ) {
    throw new Error("No body provided");
  }

  // responses comes back as an array of messages
  return router(message.from, message.body, message.to).then((responses) => {
    return Message.parse(responses, message);
  }).then((messages) => {
    return concatenate(messages);
  });
};
