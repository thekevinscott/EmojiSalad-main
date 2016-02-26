const Promise = require('bluebird');
const post = require('test/support/request').post;
const put = require('test/support/request').put;

const User = require('models/user');
let game_number;
const from = ''+Math.random();
const nickname = ''+Math.random();

describe('Update', function() {
  before(function() {
    game_number = '+15559999999';
    return Promise.all([
      post({ url: '/users', data: { from: from, to: game_number }}),
    ]);
  });

  it('should return an error for a nonexistent user', function() {
    return put({ url: `/users/foo` }).then((res) => {
      res.statusCode.should.equal(400);
    });
  });

  it('should return an error for a nonexistent key', function() {
    return User.findOne({ from: from }).then((user) => {
      const params = {
        url: `/users/${user.id}`, 
        data: { foo: 'bar' }
      };
      return put(params).then((res) => {
        res.statusCode.should.equal(400);
      });
    });
  });

  it('should update a user\'s confirmed_avatar ', function() {
    return User.findOne({ from: from }).then((user) => {
      const params = {
        url: `/users/${user.id}`, 
        data: { confirmed_avatar: 1 }
      };
      return put(params).then((res) => {
        res.statusCode.should.equal(200);
        res.body.id.should.equal(user.id);
        res.body.confirmed_avatar.should.equal(1);
      });
    }).then(() => {
      return User.findOne({ from: from });
    }).then((user) => {
      user.confirmed_avatar.should.equal(1);
    });
  });

  it('should update a user\'s confirmed ', function() {
    return User.findOne({ from: from }).then((user) => {
      const params = {
        url: `/users/${user.id}`, 
        data: { confirmed: 1 }
      };
      return put(params).then((res) => {
        res.statusCode.should.equal(200);
        res.body.id.should.equal(user.id);
        res.body.from.should.equal(from);
        res.body.confirmed.should.equal(1);
        res.body.should.have.property('avatar');
      });
    }).then(() => {
      return User.findOne({ from: from });
    }).then((user) => {
      user.confirmed.should.equal(1);
    });
  });

  it('should update a user nickname', function() {
    const nickname = ''+Math.random();
    return User.findOne({ from: from }).then((user) => {
      const params = {
        url: `/users/${user.id}`, 
        data: { nickname: nickname }
      };
      return put(params).then((res) => {
        res.statusCode.should.equal(200);
        res.body.id.should.equal(user.id);
        res.body.from.should.equal(user.from);
        res.body.nickname.should.equal(nickname);
        res.body.should.have.property('avatar');
      });
    }).then(() => {
      return User.findOne({ from: from });
    }).then((user) => {
      user.nickname.should.equal(nickname);
    });
  });

});