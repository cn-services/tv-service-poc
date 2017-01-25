/***
 * Unit tests for routes handled by epgService.js
 */
var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('Test API Routing', function() {
  var url = 'http://localhost:9999';

  describe('EPG Service Routes', function() {
    it('Should retrieve the total number of channels', function(done) {
      var expectedNumber = 161;
      request(url)
      .get('/api/epg/getChannelsNumber')
      .expect('Content-Type', /json/)
      .end(function(err,res) {
        if (err) {
          throw err;
        }
        res.should.have.status(200);
        res.body.number.should.equal(expectedNumber);
        done();
      });
    });
  });
});
