'use strict';
const User = require('models/user');

function find(req) {
  return User.find(req.query);
}
function findOne(req) {
  const user_id = req.params.user_id;
  if ( ! user_id ) {
    throw new Error("No user ID provided, how is that possible?");
  } else if ( !parseInt(user_id) ) {
    throw new Error("Invalid user ID provided");
  }
  return User.findOne(user_id);
}
function create(req) {
  console.info('create user');
  return User.create(req.body);
}
function update(req) {
  //console.info('update user', req.params.user_id, req.body);
  return User.update({ id: req.params.user_id }, req.body).then((response) => {
    console.info('got a repsonse', response);
    return response;
  });
}
function remove(req) {
  const user_id = req.params.user_id;
  if ( ! user_id ) {
    throw new Error("No user ID provided, how is that possible?");
  } else if ( !parseInt(user_id) ) {
    throw new Error("Invalid user ID provided");
  }
  return User.remove(user_id);
}

module.exports = [
  {
    path: '/',
    method: 'get',
    fn: find
  },
  {
    path: '/',
    method: 'post',
    fn: create
  },
  {
    path: '/:user_id',
    method: 'get',
    fn: findOne
  },
  {
    path: '/:user_id',
    method: 'put',
    fn: update
  },
  {
    path: '/:user_id',
    method: 'delete',
    fn: remove
  }

];
