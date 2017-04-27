'use strict';

import registry from 'microservice-registry';
import http from 'http';
import express from 'express';
import bootstrapWebsocket from './websocket';
import bootstrapREST from './rest';
import manifest from './manifest';
import {
  NAME,
  PORT,
  REQUIRED_SERVICES,
} from 'config/app';
import pushNotification from 'utils/pushNotification';

const server = http.createServer();
const app = express();

registry.register(NAME, {
  api: manifest,
  services: REQUIRED_SERVICES,
});

console.info('Waiting for', REQUIRED_SERVICES);
registry.ready(() => {
  console.info(`Started up EmojinaryFriend App Queue: ${PORT}`);
  server.on('request', app);
  bootstrapREST(app);
  bootstrapWebsocket(server);

  server.listen(PORT, () => {
    console.info(NAME, 'running on', PORT);
    registry.ready();
  });
});
