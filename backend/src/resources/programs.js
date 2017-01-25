/* global require, exports */
'use strict';

exports.load = function(server) {
  /* Default actions
    GET     /programs                ->  index
    GET     /programs/new            ->  new
    POST    /programs                ->  create
    GET     /programs/:program       ->  show
    GET     /programs/:program/edit  ->  edit
    PUT     /programs/:program       ->  update
    DELETE  /programs/:program       ->  destroy
  */
  server.resource('programs', actions);
};

var ProgramModel = require('../models/Program');
var ChannelsPackageModel = require('../models/ChannelsPackage');

var defaultChannelsPageSize = 10;
var defaultHoursToRetrievePrograms = 5;

var actions = {
  index: function(req, res) {
    // TODO fill the channelPackagesNamesToFind array with the names of the
    //  channels packages availables for the current user
    var channelPackagesNamesToFind = ['Plata', 'MovieCity', 'Oro'];

    var userChannels = [];

    ChannelsPackageModel.find({'name': { $in: channelPackagesNamesToFind }}, function(err, channelsPackages) {
      for (var i = channelsPackages.length - 1; i >= 0; i--) {
        userChannels = userChannels.concat(channelsPackages[i].channels);
      }
      userChannels = eliminateDuplicates(userChannels);

      var page = req.query.page ? req.query.page : 0;
      var channelsPageSize = req.query.perPage ? req.query.perPage : defaultChannelsPageSize;

      var startTime = req.query.startTime ? req.query.startTime : Date.now();
      var endTime = req.query.endTime ? req.query.endTime : startTime + defaultHoursToRetrievePrograms*3600;

      var requestURL = req.headers.host;

      var linkFirstPage = requestURL + '/programs?startTime=' + startTime + '&endTime=' + endTime +
                          '&page=0&perPage=' + channelsPageSize;
      var linkPreviousPage = requestURL + '/programs?startTime=' + startTime + '&endTime=' + endTime +
                             '&page=' + (parseInt(page, 10) - 1) + '&perPage=' + channelsPageSize;
      var linkNextPage = requestURL + '/programs?startTime=' + startTime + '&endTime=' + endTime +
                         '&page=' + (parseInt(page, 10) + 1) + '&perPage=' + channelsPageSize;

      var linksHeader = linkFirstPage + '; rel="first", ' +
                        linkPreviousPage + '; rel="prev", ' +
                        linkNextPage + '; rel="next"';

      var query = {
        'startTime' : { $lt: endTime },
        'endTime' : { $gt: startTime },
        'channelId' : { $in: userChannels }
      };

      ProgramModel
        .find( query )
        .skip( page * channelsPageSize )
        .limit( channelsPageSize )
        .sort( 'channelId' )
        .exec( function(err, programs) {
          res.setHeader('Link', linksHeader);
          res.send(programs);
        });
    });
  },

  new: function(req, res) {
    res.send('NOT IMPLEMENTED YET');
  },

  create : function(req, res) {
    res.send('NOT IMPLEMENTED YET');
  },

  show : function(req, res) {
    ProgramModel
      .find( {'id': req.params.program} )
      .sort( 'channelId' )
      .exec( function(err, programs) {
        res.json(programs);
      });
  },

  edit : function(req, res) {
    res.send('NOT IMPLEMENTED YET');
  },

  update : function(req, res) {
    res.send('NOT IMPLEMENTED YET');
  },

  destroy : function(req, res) {
    ProgramModel.findOneAndRemove({'id': req.params.program}, function(err, program) {
      console.log('Program with id=' + program.id + ' was removed');
      res.send('Program with id=' + program.id + ' was removed');
    });
  }
};

function eliminateDuplicates(arrayToProcess) {
  var i;
  var length = arrayToProcess.length;
  var resultArray = [];
  var obj = {};
  for (i = 0 ; i < length ; i++) {
    obj[arrayToProcess[i]] = 0;
  }
  for (i in obj) {
    resultArray.push(i);
  }
  return resultArray;
}
