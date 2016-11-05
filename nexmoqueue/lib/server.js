'use strict';

const port = process.env.PORT;
const ENVIRONMENT = process.env.ENVIRONMENT || 'development';

const cors = require('cors');
const endpoint = `http://localhost:${require('config/app').port}/`;

console.info('endpoint for nexmo queue', endpoint);

const options = {
  port: require('config/app').port,
  db: require(`config/database/${ENVIRONMENT}`),
};

const queue = require('queue');
const {
  app,
  server,
} = queue({
  name: require('config/app').name,
  options,
  parse: require('lib/parse'),
  send: require('lib/sms'),
  //receive: (req, res) => {
    //const params = req.body;
    //let incomingData = {
      //messageId: params.messageId,
      //from: params.msisdn,
      //text: params.text,
      //type: params.type,
      //timestamp: params['message-timestamp']
    //};
    //res.send(incomingData);
  //},
  postReceive: require('lib/postReceive'),
  preprocessSend: require('lib/preprocessSend'),
  POST_LIMIT: '60mb',
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

const whitelist = [
  'http://localhost:3000',
  'http://jungle.emojisalad.com',
  'http://nexmo.emojisalad.com',
];
app.use(cors({
  //origin: (origin, callback) => {
    //const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    //callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
  //},
}));

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
app.get('/', (req, res) => {
  res.send('I am the nexmo');
});

app.post('/delivery', require('./delivery'));
app.get('/jungle', require('./jungle'));

const io = require('socket.io').listen(server);
console.log('the io', io);
io.on('connection', (socket) => {
  console.log('huzzah');
  //socket.emit('state', store.getState().toJS());
});
