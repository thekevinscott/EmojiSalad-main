var Promise = require('bluebird');
var checkScenario = require('./checkScenario');
var mapActions = require('./mapActions');


/*
 * mapScenarios will iterate over an array of scenarios
 * and run the first one that passes a regex check
 * */
function mapScenarios(scenarios, data) {
  for ( var i=0, l=scenarios.length; i<l; i++ ) {
    var scenario = scenarios[i];
    var lastData = data.args[data.args.length - 1];
    if ( checkScenario.call(null, scenario.regex, lastData.pattern) ) {
      console.log('need to add tests for this, or refactor in some way');
      //var regex;
      //if ( scenario.regex.flags ) {
        //regex = RegExp(scenario.regex.pattern, scenario.regex.flags);
      //} else {
        //regex = RegExp(scenario.regex.pattern);
      //}
      //if ( typeof lastData.pattern === 'string' ) {
        //console.log('************ last data', lastData.pattern);
        //lastData.pattern = lastData.pattern.match( regex )[0];
      //}
      return mapActions.call(null, scenario.actions, data, null);
      break;
    }
  }
  return Promise.reject(new Error({
    message: 'No valid scenarios found'
  }))    
}

module.exports = mapScenarios;
