import fetchFromService from './utils/fetchFromService';
const token = "95fd9ab140918c0f5e8bef7ba00680fb";
const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const registry = require('microservice-registry');

function getOptions(user_id, text, platform, who_speaks) {
  return {
    url: 'http://api.bonobo.ai/apiv1/addmessage/',
    method: 'post',
    form: {
      token,
      user_id,
      text,
      platform,
      who_speaks,
    }
  };
}

function outgoing(messages) {
  return Promise.all(messages.map(message => {
    return request(getOptions(
      message.player.key,
      message.body,
      message.player.protocol,
      'bot'
    ));
  }));
}

function getUser(phone) {
  return fetchFromService({
    service: 'api',
    route: 'users.get',
    options: {
      from: phone,
    },
  });
}

function incoming(messages) {
  return Promise.all(messages.map(message => {
    return getUser(message.from).then(users => {
      if (users.length) {
        return users.shift();
      }

      throw new Error(`No user found for: ${message.from}`);
    }).then(user => {
      return request(getOptions(
        user.key,
        message.body,
        message.protocol,
        'user'
      ));
    });
  }));
}

module.exports = {
  incoming,
  outgoing,
};
