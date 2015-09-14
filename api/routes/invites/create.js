'use strict';
//var User = require('../../models/user');
//var Phone = require('../../models/phone');
//var Text = require('../../models/text');
//var Game = require('../../models/game');
var Invite = require('../../models/invite');

module.exports = function(req, res) {
  var user = req.body.user;
  var type = req.body.type; // for instance, a phone
  var value = req.body.value;
  if ( ! user ) {
    res.json({ error: { message: 'You must provide a user', errno: 9 }});
  } else if ( ! type ) {
    res.json({ error: { message: 'You must provide a type', errno: 9 }});
  } else if ( ! value ) {
    res.json({ error: {message: 'You must provide a value', errno: 8 }});
  }

  Invite.create(type, value, user).then(function(invite) {
    return {
      invited_user: invite.invited_user,
      inviting_user: invite.inviting_user,
    };
  }).then(function(users) {
    res.json(users);
  }).fail(function(err) {
    console.error('error inviting user', err);
    res.json( err );
  });
};
