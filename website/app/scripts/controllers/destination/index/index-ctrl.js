'use strict';

angular.module('app')

  .controller('DestinationIndexCtrl', [
    '$scope', '$state', '$model',
    function ($scope, $state, $model) {

    $scope.items = [];

    $scope.add = function() {

      var num = _.random(1, 9);

      $scope.items.push({
        src: 'http://192.168.1.251:3000/public/img/0' + num + '.jpg'
      });
    };

  }]);
