'use strict';
console.info('Mail db: default');
const config = require(`./config/db`);
const db = require('../db')(config);
module.exports = db;