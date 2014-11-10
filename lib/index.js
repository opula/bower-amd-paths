/*!
 * bower-amd-paths
 *
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
 * @param {Function} callback
 * @api public
 */
exports = module.exports = function bowerAmdPaths(options, callback) {

    if (typeof options == 'function')  {
        callback = options;
        options = null;
    }
    options = options || {};


    bowerPaths(options, function(err, data) {
        if (err)
            return callback(err);

        var ret = {};
        for(var i=0; i<data.length; i++){
            var moduleName = path.basename(data[i].dir);
            ret[moduleName] = path.join(data[i].dir, data[i].main);
        }

        callback(null, ret);
    });
};


/**
 * Expose internals.
 */

exports.bowerPaths = bowerPaths;


/**
 * @param {Object} options
 * @param {Function} callback
 * @api public
 */
function bowerPaths(options, callback) {

    if (typeof options == 'function')  {
        callback = options;
        options = null;
    }
    options = options || {};
    options.cwd = options.cwd || '';

    if (!callback) {
        throw Error("Callback is mandatory!");
    }

    var bowerCfg = bowerConfig.read(options.cwd),
        bowerCwd = path.resolve(options.cwd, bowerCfg.cwd),
        bowerDirectory = path.join(bowerCwd, bowerCfg.directory);

    async.reduce(listDirs(bowerDirectory), [],
        //iterator
        function(memo, dir, callback) {

            var relDir = path.relative(options.cwd, dir);

            findPackageMain(dir, function(err, data){
                memo.push({
                    dir: relDir,
                    main: data
                });
                callback(null, memo)
            });
        },
        callback
    );
}


function listDirs(dir) {
    var dirs = [];

    if (!fs.existsSync(dir)) {
        return [];
    }

    var files = fs.readdirSync(dir);

    files.forEach(function(file) {
        var f = path.join(dir, file);
        var stat = fs.statSync(f);
        if (stat && stat.isDirectory()) {
            dirs.push(f);
        }
    });
    return dirs;
}


function findPackageMain(folder, callback) {

    async.reduce(possibleJsons, null,
        //iterator
        function(memo, item, callback) {

            if (memo !== null) {
                return callback(null, memo);
            }

            jf.readFile(path.join(folder, item), function(err, data) {
                if (err) {
                    return callback(null, null);
                }
                callback(null, data.main ? filterPackageMain(data.main) : null);
            });
        },
        callback
    );
}


function filterPackageMain(main) {
    if (typeof main === 'string')
        main = [main];

    main = main
        .filter(function(item){
            return path.extname(item)==='.js';
        });

    return main.length ? main[0] : null;
}




/*
 .map(function(item){
 item = item.substring(0, item.length - '.js'.length);
 return path.relative(__dirname, item);
 });
 */

