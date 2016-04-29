'use strict';
const squel = require('squel');
const db = require('db');
const proxyquire = require('proxyquire');
const User = require('models/User');
const post = require('test/support/request').post;
const Promise = require('bluebird');
const EMOJI = '👍';
const protocol = 'testqueue';

const should = require('chai').should();

describe('User', () => {
  describe('Create', () => {
    it('should add an avatar by default', () => {
      return User.create({ from: Math.random(), protocol }).then((user) => {
        user.should.have.property('avatar');
        should.exist(user.avatar);
      });
    });
  });
});
