'use strict';

/**
 *  Module dependencies.
 */

var debug = require('debug')('wukong:markdown');
var marked = require('marked');
var path = require('path');
var basename = path.basename;
var dirname = path.dirname;
var extname = path.extname;

/**
 *  Expose `markdown`.
 */

module.exports = markdown;

function markdown(options) {
  options = options || {};
  var keys = options.keys || [];

  return function *markdown(next) {
    var files = this.input;
    var out = this.output;
    var file, data, dir, name, str;
    for (file in files) {
      debug('checking file: %s', file);
      if (!isMkd(file)) continue;
      data = files[file];
      dir = dirname(file);
      name = basename(file, extname(file)) + '.html';
      if ('.' !== dir) name = dir + '/' + name;

      debug('coverting file: %s', file);
      str = marked(data.contents.toString(), options);
      data.contents = new Buffer(str);
      each(keys, data, options);

      out[name] = data;
    }

    yield next;
  };
}

/**
 *  Check if a `file` is markdown.
 *
 *  @param {String} file
 *  @return {Boolean}
 */

function isMkd(file) {
  return /\.md|\.markdown$/.test(extname(file));
}

function each(keys, data, options) {
  function iteration(key) {
    data[key] = marked(data[key], options);
  }
  return keys.forEach(iteration);
}
