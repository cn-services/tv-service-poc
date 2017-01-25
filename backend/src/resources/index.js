
module.exports = function (server) {

  var programFile = require('./programs');
  programFile.load(server);

  var channelFile = require('./channels');
  channelFile.load(server);

  var channelPackageFile = require('./channelsPackages');
  channelPackageFile.load(server);
};
