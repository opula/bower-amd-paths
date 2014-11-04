/*!
 * bower-amd-paths
 * Copyright(c) 2014 Georgy Koychev
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var bowerConfig = require('bower-config'),
    bowerJson = require('bower-json'),
    jf = require('jsonfile'),
    //mainBowerFiles = require('main-bower-files'),
    path = require('path'),
    util = require('util');



/**
 * @param {Object} options
 * @return {Function}
 * @api public
 */
exports = module.exports = function bowerAmdPaths(options) {

    options = options || {};

    var bowerCfg = bowerConfig.read(options.cwd),
        bowerCwd = path.resolve(bowerCfg.cwd),
        bowerDirectory = path.join(bowerCwd, bowerCfg.directory);


    var bjs = bowerJson(bowerCwd, function(){
        console.log(arguments);
    });
    return;

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
};
