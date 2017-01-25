/* global require, module */
'use strict';

var mongoose = require('mongoose');

var ChannelsPackagesSchema = new mongoose.Schema({
  name: String,
  channels: Array
}, { collection : 'channelsPackages' });

var ChannelsPackage = mongoose.model('ChannelsPackage', ChannelsPackagesSchema);

module.exports = ChannelsPackage;
