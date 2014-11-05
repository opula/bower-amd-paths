bower-amd-paths [![Build Status](https://travis-ci.org/gkoychev/bower-amd-paths.svg)](https://travis-ci.org/gkoychev/bower-amd-paths)
===============

> Populates "paths" for AMD (RequireJS) config with installed Bower components

## Install

```sh
$ npm install --save bower-amd-paths
```

## Usage

```js
var bowerAmdPaths = require('bower-amd-paths');
```

if you have the following in your .bowerrc
```js
{
  "cwd": "webapp",
  "directory": "vendor"
}
```

this will return something similar to this:

```js
   { jquery: 'webapp/vendor/jquery/dist/jquery',
     handlebars: 'webapp/vendor/handlebars/handlebars',
     bootstrap: 'webapp/vendor/bootstrap/dist/js/bootstrap',
     almond: 'webapp/vendor/almond/almond',
     'lodash.compat': 'webapp/vendor/lodash/dist/lodash.compat',
     backbone: 'webapp/vendor/backbone-amd/backbone' }
   }
```
