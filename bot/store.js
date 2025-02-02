'use strict';
const Promise = require('bluebird');
const db = require('db');
const squel = require('squel').useFlavour('mysql');
const mongodb = Promise.promisifyAll(require('mongodb'));
const using = Promise.using;

const store = (key, value) => {
  if ( value ) {
    const query = squel
                  .insert({ autoQuoteTableNames: true, autoQuoteFieldNames: true })
                  .into('attributes')
                  .setFields({
                    value,
                    key
                  }).onDupUpdate('value', value);
                  //console.log(query.toString());
    return db.query(query);
  } else {
    const query = squel
                  .select({ autoQuoteTableNames: true, autoQuoteFieldNames: true })
                  .field('value')
                  .from('attributes')
                  .where('`key`=?',key);
    return db.query(query).then((rows) => {
      if ( rows && rows.length ) {
        return rows[0].value;
      } else {
        return null;
      }
    });
  }
};

module.exports = store;
