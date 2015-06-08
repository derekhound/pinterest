'use strict';

angular
  .module('app', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',        // angular-ui-router
    'ui.bootstrap',     // angular-bootstrap
    'ngStorage',
    'ngFileUpload',     // ng-file-upload
    'ngMasonry'         // angular-masonry
  ])

  .config(['$resourceProvider', function($resourceProvider) {
    // set default REST API
    $resourceProvider.defaults.actions = {
      query:  {method: 'GET', isArray: false},
      get:    {method: 'GET'},
      save:   {method: 'POST'},
      update: {method: 'PUT'},
      delete: {method: 'DELETE'}
    };

    // strip trailing slashes and set the url
    $resourceProvider.defaults.stripTrailingSlashes = true;
  }])

  .config(
    ['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

    // for any unmatched url, redirect it
    $urlRouterProvider.when('', '/');
    $urlRouterProvider.otherwise('/');

    // setup states
    $stateProvider

      // portal
      .state('portal', {
        url: '/',
        resolve: {
          autologin: function($auth, $state) {
            $auth.login({}, function(res) {
              if (res.success) {
                $state.go('base.home.index');
              } else {
                $state.go('base.welcome.index');
              }
            });
          }
        }
      })

      // base
      .state('base', {
        url: '',
        templateUrl: 'views/base.html'
      })

      // auth
      .state('base.auth', {
        url: '',
        templateUrl: 'views/auth/base.html'
      })
      .state('base.auth.signup', {
        url: '/auth/signup',
        templateUrl: 'views/auth/signup/signup.html'
      })

      // welcome
      .state('base.welcome', {
        url: '',
        templateUrl: 'views/welcome/base.html'
      })
      .state('base.welcome.index', {
        url: '/welcome/index',
        templateUrl: 'views/welcome/index/index.html'
      })

      // home
      .state('base.home', {
        url: '',
        templateUrl: 'views/home/base.html'
      })
      .state('base.home.index', {
        url: '/home/index',
        templateUrl: 'views/home/index/index.html'
      })

      // destination
      .state('base.destination', {
        url: '',
        templateUrl: 'views/destination/base.html'
      })
      .state('base.destination.index', {
        url: '/destination/index',
        templateUrl: 'views/destination/index/index.html'
      })

      // discovery
      .state('base.discovery', {
        url: '',
        templateUrl: 'views/discovery/base.html'
      })
      .state('base.discovery.index', {
        url: '/discovery/index',
        templateUrl: 'views/discovery/index/index.html'
      })

      // person
      .state('base.person', {
        url: '',
        templateUrl: 'views/person/base.html'
      })
      .state('base.person.index', {
        url: '/person/index',
        templateUrl: 'views/person/index/index.html'
      })

      // post
      .state('base.post', {
        url: '',
        templateUrl: 'views/post/base.html'
      })
      .state('base.post.index', {
        url: '/post/index',
        templateUrl: 'views/post/index/index.html'
      })

      // setting
      .state('base.setting', {
        url: '',
        templateUrl: 'views/setting/base.html'
      })
      .state('base.setting.index', {
        url: '/setting/index',
        templateUrl: 'views/setting/index/index.html'
      })

      ;

  }]);

