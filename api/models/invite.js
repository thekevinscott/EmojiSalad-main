var Q = require('q');
var squel = require('squel');

var db = require('db');

var Phone = require('./phone');
var User = require('./user');
var Text = require('./text');
var Message = require('./message');

var Invite = {
  create: function(type, value, user) {
    //console.log('create an invite');
    var dfd = Q.defer();
    var acceptedTypes = [
      'twilio'
    ];
    if ( acceptedTypes.indexOf(type) === -1 ) {
      dfd.reject('not an accepted type of invite');
    }
    var invitingUser = user;
    switch(type) {
      case 'twilio':
        value = value.split('invite').pop().trim();
        //console.log('value', value);
        if ( ! value ) {
          //console.log('no value');
          dfd.reject({ error: {
            errno: 8,
            message: 'You must provide a phone number'
          }});
          return dfd.promise;
        }
        Phone.parse(value).then(function(number) {
          console.log('number parsed', number);
          return User.create({ number: number }, 'text_invite', 'twilio');
        }).then(function(invitedUser) {
          console.log('created new user', invitedUser);
          var invite_id;
          var query = squel
                      .insert()
                      .into('invites')
                      .set('invited_id', invitedUser.id)
                      .set('inviter_id', invitingUser.id);
        
                      console.log('perpare to insert query');
          return db.query(query).then(function(rows) {
            invite_id = rows.insertId;
            console.log('got the invited user', invitedUser);
            // inform the invited user that they've been invited
            /*
            return Message.get('invite', invitingUser.username).then(function(message) {
              return Text.sms([{
                message: message,
                number: invitedUser.number
              }]);
            });
            */

            //return User.message(invitedUser, 'invite', [ invitingUser.username ]);
          //}).then(function() {
            //console.log('told the invited user they invited');
            // inform the inviting user their buddy has been invited
            //return User.message(invitingUser, 'intro_4', [ invitedUser.number ]);
          }).then(function() {
            console.log('all done homey');
            // all done!
            dfd.resolve({
              id: invite_id,
              invited_user: invitedUser,
              inviting_user: invitingUser
            });
          });
        }).fail(function(err) {
          console.log('there was an error, return it', err);
          return dfd.reject({ error: err });
          /*
          console.log('err', err);
          if ( err && err.errno ) {
            switch(err.errno) {
              case 1: // invalid number
                User.message(invitingUser, 'error-'+err.errno, [ value ]);
                break;
              case 2: // phone number already has been invited
                User.message(invitingUser, 'error-'+err.errno, [ value ]);
                break;
              case 3: // user is on do-not-call list
                User.message(invitingUser, 'error-'+err.errno, [ value ]);
                break;
              case 6: // user is unverified
                User.message(invitingUser, 'error-'+err.errno, [ value ]);
                break;
            }
            dfd.reject({ error: err.message });
          } else {

            dfd.reject(err);
          }
          */
        });
        break;
    }
    return dfd.promise;
  }
};

module.exports = Invite;