/*
 * bower-amd-paths
 * Copyright(c) 2014 Georgy Koychev
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var bowerConfig = require('bower-config'),
    jf = require('jsonfile'),
    async = require('async'),
    fs = require('fs'),
    path = require('path');


var possibleJsons = ['bower.json', 'component.json', '.bower.json', 'package.json'];


/**
 * @param {Object} options
 * @return {Function}
 * @api public
 */
exports = module.exports = function bowerAmdPaths(options, callback) {

    options = options || {};

    var bowerCfg = bowerConfig.read(options.cwd),
        bowerCwd = path.resolve(bowerCfg.cwd),
        bowerDirectory = path.join(bowerCwd, bowerCfg.directory);

    //console.log(listDirs(bowerDirectory));

    async.reduce(listDirs(bowerDirectory), [],
        //iterator
        function(memo, dir, callback) {

            find(dir, function(err, data){
                console.log('FIND RESULTS: ' + dir);
                console.log(data);

                //
                //callback(arguments);
                callback(null, memo)
            });
        },
        //results
        function(err, results) {
            console.log(arguments);
        }
    );
};


function listDirs(dir) {
    var dirs = [],
        files = fs.readdirSync(dir);

    files.forEach(function(file) {
        var f = path.join(dir, file);
        var stat = fs.statSync(f);
        if (stat && stat.isDirectory()) {
            dirs.push(f);
        }
    });
    return dirs;
}


function find(folder, callback) {

    async.reduce(possibleJsons, null, function(memo, item, callback) {

        if (memo !== null) {
            return callback(null, memo);
        }

        jf.readFile(path.join(folder, item), function(err, data) {
            if (err) {
                return callback(null, null);
            }
            callback(null, data.main ? data.main : null);
        });

    }, callback);
}





/*
 var scripts = bjs
 .filter(function(item){
 return path.extname(item)=='.js';
 })
 .map(function(item){
 item = item.substring(0, item.length - '.js'.length);
 return path.relative(__dirname, item);
 });

 return {
 bowerCwd: path.resolve(bowerCfg.cwd),
 bowerDirectory: bowerDirectory,
 scripts: scripts
 }
 */
