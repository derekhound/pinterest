var fs = require('fs');
var winston = require('winston');
var moment = require('moment');

module.exports = function(api, options) {

  var transports = [];

  // application name
  var appName = options.appName || 'default';

  // make log dir
  var dir = api.project + '/log';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  };

  // console logger
  transports.push(new (winston.transports.Console)({
    level: 'debug',
    colorize: true,
    timestamp: function() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    }
  }));

  // file logger
  transports.push(new (winston.transports.DailyRotateFile)({
    level: 'info',
    timestamp: true,
    filename: dir + '/' + appName + '.log',
    maxsize: 10485760, // 10 MB
    maxFiles: 10,
    zippedArchive: true
  }));

  // setup api.logger
  api.logger = new (winston.Logger)({
    levels: {
      emerg: 7,
      alert: 6,
      crit: 5,
      error: 4,
      warning: 3,
      notice: 2,
      info: 1,
      debug: 0
    },
    transports: transports
  });

  // setup api.log
  api.log = function(severity, message, data) {
    if (severity === null || api.logger.levels[severity] === null) {
      severity = 'info'
    }
    if (data !== null) {
      api.logger.log(severity, message, data);
    } else {
      api.logger.log(severity, message);
    }
  }

};

