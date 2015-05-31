'use strict';

angular.module('app')
  .controller('PostIndexCtrl', [
    '$scope', '$q', '$config', '$auth', '$model', 'Upload',
    function ($scope, $q, $config, $auth, $model, Upload) {

    $scope.model = {
      content: 'this is a test post',
      files: []
    };

    $scope.submit = function() {
      // post with files
      if ($scope.model.files.length > 0) {
        // upload each file
        var tasks = [];
        _.forEach($scope.model.files, function(file) {
          tasks.push(upload(file));
        });
        // post
        $q
        .all(tasks)
        .then(function(results) {
          // get photo_ids
          var photo_ids = _.map(results, function(result) {
            return result.data.item.photo_id;
          });
          // post
          var params = {
            content: $scope.model.content,
            photo_ids: photo_ids
          };
          $model.posts.save(params, function(res) {
            console.log(res);
          });
        })
        .catch(function(err) {
          console.log(err);
        });
      // post without files
      } else {
        // post
        var params = {
          content: $scope.model.content,
          photo_ids: []
        };
        $model.posts.save(params, function(res) {
          console.log(res);
        });
      }
    };

    // upload a single file
    function upload(file) {
      // upload file
      return Upload.upload({
        url: $config.backend + '/api/1/photos',
        fields: {
          'token': $auth.getToken()
        },
        file: file
      })
      .progress(function (evt) {
        // update progress
        file.progress = parseInt(evt.loaded / evt.total);
      })
      .success(function (data, status, headers, config) {
        // make sure server received this file
        if (!data.success) {
          throw new Error('Failed to upload ' + config.file.name);
        }

        // update progress
        file.progress = 1;
      });
    };

  }]);

