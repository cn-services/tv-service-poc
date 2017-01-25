/* global require, module */
'use strict';

var mongoose = require('mongoose');

var ChannelSchema = new mongoose.Schema({
  id: Number,
  location: Number,
  name: String,
  channelPackages: Array,
  active: Boolean,
  hd: Boolean,
  adultContent: Boolean,
  ppv: Boolean,
  ratingSymbol: String,
  secRatingSymbol: String,
  iconName: String,
  multicastAddress: String
}, { collection : 'channels' });

var Channel = mongoose.model('Channel', ChannelSchema);

module.exports = Channel;
