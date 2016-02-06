'use strict';

const pmx = require('pmx');
const app = require('express')();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const Promise = require('bluebird');

const registry = require('microservice-registry');

const endpoint = 'http://localhost:' + port + '/';

registry.register('bot', {
  services: [
    'testqueue',
    'api'
  ],
  api: {
    ping: {
      endpoint: endpoint + 'ping',
      method: 'GET',
      description: 'An endpoint for calling back the Bot'
    }
  }
});

app.set('port', port);

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(pmx.expressErrorHandler());

app.listen(port, () => {
  registry.ready(() => {
    console.debug(`EmojinaryFriend Bot: ${port}`);

    // Incoming requests take one of two forms
    // Bot will either reach out to grab messages from the queue,
    // on a cron schedule, or also has the ability to respond to a 'ping',
    // which will trigger the script as well.
    const main = require('main');
    app.get('/ping', main);
    main();
  });
});
