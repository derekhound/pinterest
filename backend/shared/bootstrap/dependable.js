var fs          = require('fs');
var path        = require('path');
var _           = require('lodash');
var dependable  = require('dependable');

function registerFile(container, filepath)
{
  container.load(filepath);
}

function registerDir(container, dirpath)
{
  fs.readdirSync(dirpath).forEach(function (filename) {
    var path = dirpath + '/' + filename;
    var name = require('path').basename(path, '.js');

    if (fs.statSync(path).isDirectory()) {
      // module
      if (fs.existsSync(path + '/index.js')) {
        container.register(name, require(path + '/index.js'));
      // dir
      } else {
        registerDir(container, path);
      }
    // file
    } else {
      registerFile(container, path);
    }
  });
}

module.exports = function(api) {

  // setup api.container
  api.container = dependable.container();

  // register api
  api.container.register('api', api);

  // dir list
  var dirs = [
    '/shared/resource',
    '/shared/model',
    '/shared/service'
  ];

  // register shared dir
  _.forEach(dirs, function(dir) {
    registerDir(api.container, api.project + dir);
  });

};

