/* global require, exports */
'use strict';

exports.load = function(server) {
  // Custom actions
  server.get('/channels/count', actions.count);

  /* Default actions
    GET     /channels                ->  index
    GET     /channels/new            ->  new
    POST    /channels                ->  create
    GET     /channels/:channel       ->  show
    GET     /channels/:channel/edit  ->  edit
    PUT     /channels/:channel       ->  update
    DELETE  /channels/:channel       ->  destroy
  */
  server.resource('channels', actions);
};

var ChannelModel = require('../models/Channel');

var actions = {
  index: function(req, res) {
    ChannelModel.find(req.query, function(err, channels) {
      res.send(channels);
    });
  },

  new: function(req, res) {
    res.send('NEW METHOD NOT IMPLEMENTED YET');
  },

  create : function(req, res) {
    res.send('CREATE METHOD NOT IMPLEMENTED YET');
  },

  show : function(req, res) {
    ChannelModel.find({'id': req.params.channel}, function(err, channel) {
      res.send(channel);
    });
  },

  edit : function(req, res) {
    res.send('EDIT METHOD NOT IMPLEMENTED YET');
  },

  update : function(req, res) {
    res.send('UPDATE METHOD NOT IMPLEMENTED YET');
  },

  destroy : function(req, res) {
    ChannelModel.findOneAndRemove({'id': req.params.channel}, function(err, channel) {
      console.log('Channel with id=' + channel.id + ' was removed');
      res.send('Channel with id=' + channel.id + ' was removed');
    });
  },

  count : function(req, res) {
    ChannelModel.count(req.query, function(err, count) {
      var response = {
        channelsNumber: count
      };
      res.send(response);
    });
  }
};
