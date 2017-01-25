/* global require, module */
'use strict';

var mongoose = require('mongoose');

var ProgramSchema = new mongoose.Schema({
  id: Number,
  name: String,
  channelId: Number,
  startTime: Number,
  endTime: Number,
  duration: Number,
  ratingSymbol: String,
  secRatingSymbol: String,
  actors: Array,
  directors: Array
}, { collection : 'programs' });

var Program = mongoose.model('Program', ProgramSchema);

module.exports = Program;
