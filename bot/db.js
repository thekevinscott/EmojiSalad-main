console.info(`Bot db: ${process.env.ENVIRONMENT}`);
const config = require(`./config/database/${process.env.ENVIRONMENT}`);
let db = require('../db')(config);
module.exports = db;
