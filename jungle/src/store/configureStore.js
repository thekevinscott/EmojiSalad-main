/**
 * Based on the current environment variable, we need to make sure
 * to exclude any DevTools-related code from the production builds.
 * The code is envify'd - using 'DefinePlugin' in Webpack.
 */

//import io from 'socket.io-client';
//const socket = io('http://nexmo.emojisalad.com');
//socket.on('state', () => {
  //debugger;
//});
let loadedStore = null;

if (process.env.NODE_ENV === 'production') {
  loadedStore = require('./configureStore.prod');
} else {
  loadedStore = require('./configureStore.dev');
}

export const configureStore = loadedStore;
