'use strict';

const port = process.env.PORT;
const ENVIRONMENT = process.env.ENVIRONMENT || 'development';

const endpoint = `http://localhost:${require('config/app').port}/`;

console.info('endpoint for sms queue', endpoint);
console.log("ENV VARS", process.env.ENVIRONMENT);

const options = {
  port: require('config/app').port,
  db: require(`config/database/${ENVIRONMENT}`),
  maintenance: require('config/maintenance'),
};

const { app } = require('queue')({
  name: require('config/app').name,
  options,
  parse: require('lib/parse'),
  send: require('lib/sms'),
  postReceive: require('lib/postReceive'),
  preprocessSend: require('lib/preprocessSend'),
  POST_LIMIT: '60mb',
  maintenance: require('lib/maintenance'),
  api: {
    phone: {
      endpoint: `${endpoint}phone`,
      method: 'GET',
    },
    senders: {
      getID: {
        endpoint: `${endpoint}senders/:sender`,
        method: 'GET',
      },
      get: {
        endpoint: `${endpoint}senders`,
        method: 'GET',
      },
    },
  },
});

app.get("/test", (req, res) => {
  console.log("index test");
  res.send("test");
});

const phone = require('lib/phone');
app.get('/phone', (req, res) => {
  const number = req.query.number;

  return phone(number).then((result) => {
    res.json({ number: result });
  }).catch((error) => {
    res.json({ error });
  });
});

app.get('/senders', require('./senders'));
app.get('/senders/:sender', require('./senders').getSenderID);
