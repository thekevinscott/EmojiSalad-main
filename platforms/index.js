var platforms = {
  twilio: require('./twilio')
};

// route requests to a particular messaging platform
module.exports = function(req, res) {
  var platform = req.params.platform;
  if ( platforms[platform] ) {
    return platforms[platform](req, res);
  }
};
