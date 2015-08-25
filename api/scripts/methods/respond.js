var User = require('../../models/user');
var Message = require('../../models/message');
var _ = require('lodash');
var sprintf = require('sprintf');

/*
 * Respond takes a scenario, a user, and a text message
 * from a user and sends a message to that user.
 *
 * It grabs the message key from the scenario's message key,
 * and will optionally sprintf replacements based on some rules
 * specified in the options
 *
 */
function respond(scenario, data) {
  //console.log('responds data', data);
  var user = data.args[0].user;
  var messagePassedFromUser = data.args[0].pattern;
  if ( ! scenario ) {
    throw new Error("You must provide a scenario");
  } else if ( ! scenario.message ) {
    throw new Error("You must provide a scenario message key");
  } else if ( scenario.options && !_.isArray(scenario.options) ) {
    throw new Error("Options must be an array");
  } else if ( ! user ) {
    throw new Error("You must provide a user");
  } else if ( ! user.id ) {
    throw new Error("You must provide a user id");
  }

  var key = scenario.message;

  if ( scenario.options ) {
    var options = scenario.options.map(function(option) {
      //console.log('option', option, data.args[0]);
      var optionParams = {
        user: data.args[0].user,
        message: data.args[0].pattern 
      }
      //console.log('option', option);
      return sprintf(option, data)
    });
  } else {
    var options = [];
  }

  var result = Message.get(key, options);
  return result;
  //return _.assign({}, result, {type: 'reply'});
};

module.exports = respond;