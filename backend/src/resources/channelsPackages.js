/* global require, exports */
'use strict';

exports.load = function(server) {
  // Custom actions
  server.get('/channelsPackages/count', actions.count);

  /* Default actions
    GET     /channelsPackages                        ->  index
    GET     /channelsPackages/new                    ->  new
    POST    /channelsPackages                        ->  create
    GET     /channelsPackages/:channelsPackage       ->  show
    GET     /channelsPackages/:channelsPackage/edit  ->  edit
    PUT     /channelsPackages/:channelsPackage       ->  update
    DELETE  /channelsPackages/:channelsPackage       ->  destroy
  */
  server.resource('channelsPackages', actions);
};

var ChannelsPackageModel = require('../models/ChannelsPackage');

var actions = {
  index: function(req, res) {
    ChannelsPackageModel.find(req.query, function(err, channelsPackages) {
      res.send(channelsPackages);
    });
  },

  new: function(req, res) {
    res.send('NOT IMPLEMENTED YET');
  },

  create : function(req, res) {
    res.send('NOT IMPLEMENTED YET');
  },

  show : function(req, res) {
    ChannelsPackageModel.find({'name': req.params.channelsPackage}, function(err, channelsPackage) {
      res.send(channelsPackage);
    });
  },

  edit : function(req, res) {
    res.send('NOT IMPLEMENTED YET');
  },

  update : function(req, res) {
    res.send('NOT IMPLEMENTED YET');
  },

  destroy : function(req, res) {
    ChannelsPackageModel.findOneAndRemove({'id': req.params.channelsPackage}, function(err, channelsPackage) {
      console.log('Channels package with id=' + channelsPackage.id + ' was removed');
      res.send('Channels package with id=' + channelsPackage.id + ' was removed');
    });
  },

  count : function(req, res) {
    ChannelsPackageModel.count(req.query, function(err, count) {
      var response = {
        channelsPackagesNumber: count
      };
      res.send(response);
    });
  }
};
