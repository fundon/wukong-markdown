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
    var file = this.file;
    var name = file.name;
    debug('checking file: %s', name);
    if (!isMkd(name)) return;
    var dir = dirname(name);
    name = basename(name, extname(name)) + '.html';
    if ('.' !== dir) name = dir + '/' + name;
    debug('coverting file: %s', name);
    var str = marked(file.contents.toString(), options);
    file.contents = new Buffer(str);
    each(keys, file, options);
    file.name = name;

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

function each(keys, file, options) {
  return keys.forEach(iteration);
  function iteration(key) {
    file[key] = marked(file[key], options);
  }
}
