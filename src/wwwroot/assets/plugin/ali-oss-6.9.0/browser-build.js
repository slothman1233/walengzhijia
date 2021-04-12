#! /usr/bin/env node

var path = require('path');
var pkg = require('./package.json');
var fs = require('fs');

var license = [
  '// Aliyun OSS SDK for JavaScript v' + pkg.version,
  '// Copyright Aliyun.com, Inc. or its affiliates. All Rights Reserved.',
  '// License at https://github.com/ali-sdk/ali-oss/blob/master/LICENSE'
].join('\n') + '\n';

function build(options, callback) {
  if (arguments.length === 1) {
    callback = options;
    options = {};
  }

  console.error('Building with options: %j', options);

  fs.writeFileSync(path.resolve(__dirname + '/lib/browser/version.js')
    , 'exports.version="' + pkg.version+'"');
  var browserify = require('browserify');
  var aliasify = require('aliasify');
  var babelify = require('babelify');

  var brOpts = {
    basedir: path.resolve(__dirname, '.'),
    fullPaths: false,
    standalone: 'OSS',
    debug: false
  };
  browserify(brOpts).add('./lib/browser.js')
    .transform(babelify, {
      "global": true,
      "presets": ["es2015"],
      "plugins": ["transform-runtime", "babel-plugin-transform-regenerator", "babel-plugin-transform-es2015-modules-commonjs"],
      "only": ['lib/*', 'shims/*', 'shims/crypto/*'],
    }).transform(aliasify, {
      global: true,
      aliases: {
        'zlib': false,
        'iconv-lite': false,
        'crypto': './shims/crypto/crypto.js',
      },
      verbose: false
    }).bundle(function(err, data) {
      if (err) return callback(err);

      var code = (data || '').toString();
      if (options.minify) {
        var uglify = require('uglify-js');
        var minified = uglify.minify(code, {
          fromString: true,
          output: {
            'ascii_only': true
          }
        });
        code = minified.code;
      }
      code = license + code;
      callback(null, code);
  });
}

// run if we called this tool directly
if (require.main === module) {
  var opts = {
    minify: process.env.MINIFY ? true : false
  };

  build(opts, function(err, code) {
    if (err) console.error(err.message);
    else console.log(code);
  });
}

module.exports = build;
