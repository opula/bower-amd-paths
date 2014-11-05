var module = require('../lib');
module.bowerPaths(function(){
    console.log(arguments);
});

module(function(){
    console.log(arguments);
});
