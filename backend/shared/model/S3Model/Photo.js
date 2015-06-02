var fs = require('fs');
var path = require('path');
var moment = require('moment');
var sprintf = require('sprintf');
var Promise = require('bluebird');
var mime = require('mime-types');


module.exports = function(api, S3) {

  // bucket name
  var bucket = api.config.aws.s3.data_bucket;

  /**
   * Create a photo
   *
   * @param {number} user_id
   * @param {string} filepath
   * @promise {string} - The photo's url
   */
  function createPhoto(user_id, filepath)
  {
    return new Promise(function(resolve, reject) {

      // read file content
      fs.readFile(filepath, function(err, data) {
        if (err) { return reject(err); }

        // file extension
        var ext = path.extname(filepath);

        // bucket & key
        var key = sprintf('%d/photo/%d%s', user_id, moment().valueOf(), ext);
        var url = sprintf('%s/%s/%s', api.config.aws.s3.host, bucket, key);

        // params
        var params = {
          Bucket      : bucket,
          Key         : key,
          Body        : data,
          ContentType : mime.lookup(filepath),
          ACL         : 'public-read',
          StorageClass: 'STANDARD',       // STANDARD | REDUCED_REDUNDANCY
          CacheControl: 'max-age=86400',
        };

        // upload file to s3
        S3.putObject(params, function(err, data) {
          if (err) { return reject(err); }

          return resolve(url);
        });
      });

    });
  }

  function getPhoto()
  {
  }

  return {
    createPhoto: createPhoto,
    getPhoto: getPhoto
  };

};

