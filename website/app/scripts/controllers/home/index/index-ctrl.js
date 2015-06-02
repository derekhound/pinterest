'use strict';

angular.module('app')

  .controller('HomeIndexCtrl', [
    '$scope', '$state', '$model',
    function ($scope, $state, $model) {

    $scope.model = {

    };

    $scope.items = [];

    function query()
    {
      $model.streams.query({}, function(res) {
        if (res.success) {
          $scope.items = res.items;
        } else {
          console.log(res);
        }
      });
    }

    (function init()
    {
      query();
    })();

  }]);
