'use strict';

angular.module('app')
  .factory('$config', function() {
    return {
      backend: '<%- backend %>'
    };
  });

