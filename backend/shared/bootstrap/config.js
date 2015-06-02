var fs = require('fs');
var _ = require('lodash');

function loadConfigFile(env, filepath)
{
  var result = {};

  // load config
  var config = require(filepath);

  // merge different env setting
  if (config[env]) {
    _.extend(result, config['default'](), config[env]());
  } else {
    _.extend(result, config['default']());
  }

  return result;
}

function loadConfigDir(env, dirpath)
{
  var result = {};

  fs.readdirSync(dirpath).forEach(function (filename) {
    var path = dirpath + '/' + filename;
    var name = require('path').basename(path, '.js');

    if (fs.statSync(path).isDirectory()) {
      result[name] = loadConfigDir(env, path);
    } else {
      result[name] = loadConfigFile(env, path);
    }
  });

  return result;
}

module.exports = function(api) {
  // config dir
  var dir = api.project + '/config';

  // load configs
  api.config = loadConfigDir(api.env, dir);
};

