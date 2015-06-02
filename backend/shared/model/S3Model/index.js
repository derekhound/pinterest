var fs = require('fs');

module.exports = function(api, S3) {

  var model = {};

  var dir = __dirname;
  fs.readdirSync(dir).forEach(function (filename) {
    // skip files
    if (filename !== 'index.js') {
      // get basename
      var basename = filename.substr(0, filename.lastIndexOf('.'));
      // import model
      var filepath = dir + '/' + filename;
      model[basename] = require(filepath)(api, S3);
    }
  });

  return model;
};

