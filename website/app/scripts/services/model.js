'use strict';

angular.module('app')
  .factory('$model', [
    '$resource', '$config', '$auth',
    function ($resource, $config, $auth) {

    var backend = $config.backend;

    function getToken()
    {
      return $auth.getToken();
    }

    var users = $resource(backend + '/api/1/users/:user_id', {
      token: getToken,
      user_id: '@user_id'
    });

    var posts = $resource(backend + '/api/1/posts/:post_id', {
      token: getToken,
      user_id: '@post_id'
    });

    var streams = $resource(backend + '/api/1/streams/:stream_id', {
      token: getToken,
      user_id: '@stream_id'
    });

    return {
      users: users,
      posts: posts,
      streams: streams
    };

  }]);

