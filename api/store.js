'use strict';
const Promise = require('bluebird');
const db = require('db');
const squel = require('squel').useFlavour('mysql');
const mongodb = Promise.promisifyAll(require('mongodb'));
const using = Promise.using;

const url = require('config/db').mongo;

function store(key, val) {
  return using(
    getConnectionAsync(),
    function(connection) {
      const coll = connection.collection('attributes');
      if ( val !== undefined ) {
        return coll.updateAsync({ key: key }, {
          key: key,
          val: val
        }, {
          upsert: true
        });
      } else {
        return coll.findOneAsync({ key: key }).then(function(item) {
          if ( item ) {
            return item.val;
          }
        });
      }
    }
  ).then(function(data) {
    return data;
  });
}

function getConnectionAsync() {
  return mongodb.MongoClient.connectAsync(url)
  .disposer(function(connection){
    connection.close();
  });
}

module.exports = store;
