/* jshint expr: true */
/* global describe:true, it:true */

'use strict';
var path = require('path');
var should = require('should');
var bowerAmdPaths = require('../lib');


describe('main-bower-files', function() {
    it('should return empty object', function (done) {
        var expected = {};
        bowerAmdPaths(function(err, actual){
            if (err) throw err;
            actual.should.eql(expected);
            done();
        });
    });


    it('backbone-amd should return backbone.js', function (done) {
        var expected = {
            "backbone-amd": "bower_components/backbone-amd/backbone.js"
        };
        bowerAmdPaths({cwd: path.join(__dirname, "fixtures/backbone")}, function(err, actual){
            if (err) throw err;
            actual.should.eql(expected);
            done();
        });
    });

    it('test bowerrc', function (done) {
        var expected = {
            jquery: "webapp/vendor/jquery/dist/jquery.js",
            handlebars: "webapp/vendor/handlebars/handlebars.js"
        };
        bowerAmdPaths({cwd: path.join(__dirname, "fixtures/test-bowerrc")}, function(err, actual){
            if (err) throw err;
            actual.should.eql(expected);
            done();
        });
    });


});