var fs            = require('fs');
var path          = require('path');
var _             = require('lodash');
var Promise       = require('bluebird');
var moment        = require('moment');
var sprintf       = require('sprintf');
var mime          = require('mime-types');

module.exports = function(api, RdsModel, S3Model) {

  /**
   * Create a photo
   *
   * @param {number} user_id
   * @param {string} filepath
   * @promise {object}
   */
  function createPhoto(user_id, filepath)
  {
    return Promise.resolve()

    // upload to S3
    .then(function() {
      return S3Model.Photo.createPhoto(user_id, filepath)
    })

    // create photo
    .then(function(url) {
      return RdsModel.Photo.create({
        user_id: user_id,
        url: url
      });
    })

    // success
    .then(function(row) {
      return {
        photo_id: row.photo_id
      };
    });
  }

  // interface
  return {
    createPhoto:  createPhoto,
  };
};

