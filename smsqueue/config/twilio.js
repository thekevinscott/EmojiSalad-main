'use strict';

// test credentials
/*
 *     accountSid: 'AC1524487e9a8bc672020d5df2dcbd2e80',
 *         authToken: '0b92955df252e1584090ac62926a7834',
 *         */
var config = {
  production: {
    accountSid: 'ACf2076b907d44abdd8dc8d262ff941ee4',
    authToken: '0d7b1b491ca038d4ff4fdf674cd46aa1',
    from : "12013409832"
  },
  test: {
    accountSid: 'ACf2076b907d44abdd8dc8d262ff941ee4',
    authToken: '0d7b1b491ca038d4ff4fdf674cd46aa1',
    from : "12013409832"
  },
  development: {
    accountSid: 'ACf2076b907d44abdd8dc8d262ff941ee4',
    authToken: '0d7b1b491ca038d4ff4fdf674cd46aa1',
    from : "14692426535"
  },
};

module.exports = config;
//module.exports.production = config.production;