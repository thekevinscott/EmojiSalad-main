'use strict';
const crontab = require('node-crontab');
const Message = require('models/message');
const Twilio = require('models/twilio');
const Promise = require('bluebird');

const time = '00 00 * * * *';
const checkGames = require('./checkGames');
let job = Promise.coroutine(function* () {
  console.log('The time is ', new Date());
  let response = yield checkGames();
  console.log('response', response);
  let messages = yield Message.parse(response)
  console.log('messages', messages);
  return Twilio.send(messages);
});
crontab.scheduleJob(time, job);
