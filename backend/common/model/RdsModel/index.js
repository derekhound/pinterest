var fs = require('fs');

module.exports = function(api, Sequelize) {

  var model = {};

  var dir = __dirname;
  fs.readdirSync(dir).forEach(function (filename) {
    // skip association file
    if (filename !== 'index.js' && filename !== 'association.js') {
      // get basename
      var basename = filename.substr(0, filename.lastIndexOf('.'));
      // import model
      model[basename] = Sequelize.import(dir + '/' + filename);
    }
  });

  // import association file
  require(dir + '/association')(model);

  return model;
};

