// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','simpleAngularTicker','yaru22.angular-timeago','ngCordova.plugins.camera','ngCordova.plugins.imagePicker'])

.run(function($ionicPlatform,timeAgoSettings) {
  timeAgoSettings.refreshMillis = 1000;
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'modalController'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

    .state('app.news', {
      url:'/news',
      views: {
        'menuContent':{
          templateUrl: 'templates/News.html'
        }
      }
    })

    .state('app.comments',{
      url: '/comments/:id',
      views: {
        'menuContent':{
          templateUrl:'templates/Comments.html',
          controller: 'mynews'
        }
      }
    })

    .state('app.live',{
      url:'/live/:id',
      params:{eventDetail:null},
      views:{
        'menuContent': {
          templateUrl: 'templates/LiveEvent.html',
          controller: 'liveTextCtrl'
        }
      }
    })
    .state('app.liveVideo',{
      url:'/liveVideo/:id',
      params:{eventDetail:null},
      views:{
        'menuContent': {
          templateUrl: 'templates/LiveVideoEvents.html',
          controller: 'liveVideoCtrl'
        }
      }
    })
    .state('app.liveVideoComments',{
      url:'/liveVideoComments/:id',
      params:{eventDetail:null},
      views:{
        'menuContent': {
          templateUrl: 'templates/liveVideoComments.html',
          controller: 'liveVideoCtrl'
        }
      }
    })
    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/playlists');
});
