var _ = require('lodash');

/**
 *
 * @param {object} options
 * @param {string} options.appName
 *
 */

module.exports = function(options, next) {

  // reorder params
  if (_.isFunction(options)) {
    next = options;
    options = {};
  }

  // setup api
  var api = {};

  // project root
  api.project = __dirname + '/../..';

  // setup config
  require('./config')(api);

  // setup dependent injection
  require('./dependable')(api);

  // setup logger
  require('./logger')(api, options);

  // execute application
  if (next) {
    api.container.resolve(next);
  }

  return api;
};

