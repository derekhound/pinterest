var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var dependable = require('dependable');

module.exports = function(api, options) {

  // setup api.container
  api.container = dependable.container();

  // register api
  api.container.register('api', api);

  // register files & dirs & modules
  _.forEach(api.config.di.files, function(file) {
    api.container.load(file);
  });
  _.forEach(api.config.di.dirs, function(dir) {
    api.container.load(dir);
  });
  _.forEach(api.config.di.modules, function(module) {
    api.container.register(path.basename(module), require(module));
  });

  // register extra files & dirs & modules
  _.forEach(api.config.di.extraFiles, function(file) {
    api.container.load(file);
  });
  _.forEach(api.config.di.extraDirs, function(dir) {
    api.container.load(dir);
  });
  _.forEach(api.config.di.extraModules, function(module) {
    api.container.register(path.basename(module), require(module));
  });

};

