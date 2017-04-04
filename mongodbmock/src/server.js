/* global require, exports, process, __dirname */
'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var path = require('path');


var server = express();

/**
 * Express Configuration
 */
console.log('Configuring Express');
server.set('port', 7000);
server.use(express.logger('dev'));
server.use(express.methodOverride());
server.use(server.router);
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.static(path.join(__dirname, '../mockData/channelIcons')));

/**
 * Start the server
 */
console.log(' ');
console.log('Starting server');
var port = server.get('port');
http.createServer(server).listen(port, function(){
  console.log('MongoDB Mock data server for TV backend server listening on port %d.', port);
  console.log('Waiting for incoming connections');
});
