'use strict';
const express = require('express');
//const _ = require('lodash');

function catchErr(err, res) {
  console.error('error', err);
  if ( err.message ) {
    res.status(400).json({ error: err.message });
  } else {
    res.status(400).json({ error: err });
  }
}

module.exports = (app) => {
  [
    'challenges',
    'games',
    'users',
    'emoji',
    'email',
    'players',
    'invites',
    'rounds',
    'phones',
    'phrases'
  ].map((key) => {
    const router = express.Router({ mergeParams: true });
    require(`./${key}`).map((route) => {
      try {
        router.route(route.path)[route.method]((req, res) => {
          //const data = ( route.method === 'get' ) ? req.query : req.body;
          try {
            //console.log('try 1');
            route.fn(req).then((results) => {
              //console.log('request successful', results);
              //console.info('request successful', key, route, results);
              res.status(200).json(results);
            }).catch((err) => {
              console.error('err 1');
              catchErr(err, res);
            });
          } catch (err) {
            console.error('err 2');
            catchErr(err, res);
          }
        });
      } catch (err) {
        //console.error('err', err, route);
        throw new Error('There was an error setting up router');
      }
    });
    app.use(`/${key}`, router);

  });

  app.get('/', (req, res) => {
    res.send('hello world');
  });
};
