'use strict';
// set require path

require('app-module-path').addPath(__dirname);
require('babel-polyfill');
//require('app-module-path').addPath(__dirname);
const gulp = require('gulp');
const util = require('gulp-util');
const Promise = require('bluebird');
const childExec = require('child_process').exec;
//const mocha = require('gulp-mocha');
const nodemon = require('gulp-nodemon');
const chalk = require('chalk');
const squel = require('squel');

const shared = require('../shared/gulp');
const sql_file = 'fixtures.sql';

/**
 * This imports the stored SQL file, then seeds it
 * with required data
 */
function seed() {
  process.env.ENVIRONMENT = 'test';
  const test = require('./config/db');
  const db = require('./db');

  return shared.importDB(test, sql_file).then(() => {
    // various deleting commands
    const seed = require('./seed') || [];
    // various seeding commands
    return Promise.all(seed.map((cmd) => {
      const query = squel
                    .insert()
                    .into(cmd.table)
                    .setFieldsRows(cmd.rows);
      return db.query(query.toString());
    }));
  });
}

gulp.task('seed', (cb) => {
  seed().then(() => {
    cb();
  }).done(() => {
    process.exit();
  });
});

gulp.task('server', (opts) => {
  const PORT = util.env.PORT || '5998';
  const LOG_LEVEL = util.env.LOG_LEVEL || 'warning';
  return shared.server({ LOG_LEVEL, PORT, CALLBACK_PORT: util.env.CALLBACK_PORT })();
});

gulp.task('default', () => {
  console.log('* seed - Reimports the local database file and seeds with data');
  console.log('* server - Spins up the server with default arguments');
});
