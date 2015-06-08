'use strict';

angular.module('app')

  .controller('DestinationIndexCtrl', [
    '$scope', '$state', '$model',
    function ($scope, $state, $model) {

    $scope.bricks = [{
      src: 'http://192.168.1.251:3000/public/img/01.jpg'
    }, {
      src: 'http://192.168.1.251:3000/public/img/02.jpg'
    }];

    console.log($scope.bricks)

  }]);
