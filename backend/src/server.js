/* global require, exports, process, __dirname */
'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');
var Resource = require('express-resource');

var server = express();

/**
 * Loading Configuration File and DataBase connection
 */
var config = require('../config/config.json')[server.get('env')];
console.log('Starting application in ' + server.get('env') + ' mode');
console.log(' ');
console.log('Connecting to database');
mongoose.connect(config.db.mongodb);
console.log('Successfully connected to database');
console.log(' ');

/**
 * Express Configuration
 */
console.log('Configuring Express');
server.set('port', config.server.port || 3000);
server.use(express.favicon('public/arrisFavicon.ico'));
server.use(express.logger('dev'));
server.use(express.methodOverride());
server.use(server.router);
server.use(express.static(path.join(__dirname, 'public')));
console.log('Express successfully configured');

/**
 * Setting up API routes
 */
console.log(' ');
console.log('Setting up API routes');
require('./resources')(server);
console.log('API routes successfully configured');

/**
 * Start the server
 */
console.log(' ');
console.log('Starting web server');
var port = server.get('port');
http.createServer(server).listen(port, function(){
  console.log('Arris TV server listening on port %d in %s mode.', port, server.get('env'));
  console.log('Waiting for incoming connections');
});
