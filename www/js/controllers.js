var app = angular.module('starter.controllers', [])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //$scope.$on('$ionicView.enter', function(e) {
      //});

      // Form data for the login modal
      $scope.loginData = {};

      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
      }).then(function (modal) {
        $scope.modal = modal;
      });

      // Triggered in the login modal to close it
      $scope.closeLogin = function () {
        $scope.modal.hide();
      };

      // Open the login modal
      $scope.login = function () {
        $scope.modal.show();
      };

      // Perform the login action when the user submits the login form
      $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
          $scope.closeLogin();
        }, 1000);
      };
    })

    .controller('PlaylistsCtrl', function ($scope) {
      $scope.playlists = [
        {title: 'Reggae', id: 1},
        {title: 'Chill', id: 2},
        {title: 'Dubstep', id: 3},
        {title: 'Indie', id: 4},
        {title: 'Rap', id: 5},
        {title: 'Cowbell', id: 6}
      ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    })

    .controller('mynews', ['$scope', 'newsService', '$state', 'liveEventService', function ($scope, newsService, $state, liveEventService) {
      $scope.arrayNews = newsService.getNews();
      $scope.gotoComments = function (id) {
        $state.go('app.comments', {id: id});
      };

      $scope.liveEvents = liveEventService.getEvents();

      $scope.goLive = function (event) {
        if (event.type === 'text') {
          console.log(event);
          $state.go('app.live', {id: event.id, eventDetail: event, type: event.description});
        } else {
          $state.go('app.liveVideo', {id: event.id, eventDetail: event, type: event.description});
        }

      };

    }])

    .controller('comment', ['$scope', 'newsService', '$stateParams', '$ionicPopup', '$cordovaCamera', '$cordovaImagePicker', function ($scope, newsService, $stateParams, $ionicPopup, $cordovaCamera, $cordovaImagePicker) {
      $scope.arrayComments = newsService.getComments($stateParams.id);

      console.log($scope.arrayComments);

      $scope.commentblock = {
        "display": "block",
        "background-color": "#42c8f4",
        "margin": "10px",
        "padding": "15px",
        "border-radius": "5px"
      };

      $scope.submitComment = function () {

        if ($scope.newcomment) {
          var date = Date.now();
          var newcomment = {
            text: $scope.newcomment,
            datetime: date
          };
          var commenttemp = $scope.newcomment;

          newsService.saveComment(newcomment, $stateParams.id)
            .success(function () {
              // console.log($scope.arrayComments);
            })
            .error(function (e) {

              $ionicPopup.alert({
                title: 'error',
                template: e
              }).then(function (res) {
                $scope.newcomment = commenttemp;
              });
            });
          $scope.newcomment = '';
        }
      };

      $scope.cameraOpen = function () {
        document.addEventListener("deviceready", function () {

          var options = {
            quality: 100,
            destinationType: Camera.DestinationType.DATA_URL,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 250,
            targetHeight: 200
          };

          $cordovaCamera.getPicture(options).then(function (imageData) {

            $scope.ImageUrl = "data:image/jpeg;base64," + imageData;


          }, function (err) {
            // error
          });

        }, false);

      };

      $scope.galleryOpen = function () {
        $scope.ImageUrlarr = [];
        var options = {
          maximumImagesCount: 10,
          width: 250,
          height: 250,
          quality: 100
        };
        $cordovaImagePicker.getPictures(options)
          .then(function (results) {
            for (var i = 0; i < results.length; i++) {
              console.log('Image URI: ' + results[i]);
              $scope.ImageUrlarr.push(results[i]);
            }
          }, function (error) {
            // error getting photos
          });

      };
    }])

    .controller('videoCtrl', ['$scope', '$sce', function ($scope, $sce) {
      var url = 'https://www.youtube.com/watch?v=cHhjrPLyBaE';
      var Url = url.replace('watch?v=', 'embed/');
      $scope.trustSrc = function (src) {
        return $sce.trustAsResourceUrl(src);
      };
      $scope.movie = {src: Url};
    }])


    .controller('liveTextCtrl', ['$state','$scope', '$stateParams', 'liveEventService','otherTextSourcesService', function ($state,$scope, $stateParams, liveEventService,otherTextSourcesService) {

      if ($stateParams.eventDetail) {
        $scope.title = $stateParams.eventDetail.text;
      }

      $scope.liveCommentsArray = liveEventService.getLiveComments($stateParams.id);

      $scope.commentblock = {
        "display": "block",
        "background-color": "#42c8f4",
        "margin": "10px",
        "padding": "15px",
        "border-radius": "5px"
      };


      $scope.submitLiveComment = function () {
        if ($scope.newlivecomment) {
          var livedate = Date.now();
          var newlivecomment = {
            text: $scope.newlivecomment,
            datetime: livedate
          };

          var commentlivetemp = $scope.newlivecomment;

          liveEventService.saveLiveComment(newlivecomment, $stateParams.eventDetail.id)
            .success(function () {

            })
            .error(function (e) {

              $ionicPopup.alert({
                title: 'error',
                template: e
              }).then(function (res) {
                $scope.newlivecomment = commentlivetemp;
              });
            });
          $scope.newlivecomment = '';
        }
      };

      $scope.otherTextLinks = otherTextSourcesService.getTextSourcesLinks($stateParams.id);
      $scope.accessTextLinks = function (otherSources) {


        $state.go('app.otherTextSources',{hashid: otherSources.hashid, title: otherSources.title, source: otherSources.linksurl , id: $stateParams.id});
      };


    }])

  .controller('otherTextSourcesController',function ($scope,$stateParams,$sce,$ionicModal,otherTextSourcesService) {
    $scope.title=$stateParams.title;
    var Url=$stateParams.source;
    $scope.url =  $sce.trustAsResourceUrl(Url);

    $scope.inputData = {};

    $scope.commentblock = {
      "display": "block",
      "background-color": "#42c8f4",
      "margin": "10px",
      "padding": "15px",
      "border-radius": "5px"
    };
    $ionicModal.fromTemplateUrl('templates/liveTextComments.html', {
      scope: $scope,
      animation: 'slide-in-up',
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function () {
      console.log("here");
      $scope.modal.show();
    };

    $scope.closeModal = function () {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.arrayOtherSourceComments = otherTextSourcesService.getTextComments($stateParams.hashid,$stateParams.id);
    $scope.commentNumber = otherTextSourcesService.getTextCommentsNumber($stateParams.hashid,$stateParams.id);

    $scope.submitLiveTextComment = function () {
      console.log('here');

      if ($scope.inputData.newliveTextcomment) {
        var livedate = Date.now();
        var textComment = {
          text: $scope.inputData.newliveTextcomment,
          datetime: livedate
        };
        console.log(textComment);


        var commentlivetemp = $scope.inputData.newliveTextcomment;

        otherTextSourcesService.saveLiveTextComment(textComment, $stateParams.id, $stateParams.hashid)
          .success(function () {
            $scope.commentNumber++;
          })
          .error(function (e) {

            $ionicPopup.alert({
              title: 'error',
              template: e
            }).then(function (res) {
              $scope.inputData.newliveTextcomment = commentlivetemp;
            });
          });
        $scope.inputData.newliveTextcomment = '';
      }
    };



  })


  .controller('liveVideoCtrl', ['$scope', '$stateParams', '$sce', 'liveVideoService', '$ionicModal', 'otherVideoSourcesService','ngYoutubeEmbedService',
      function ($scope, $stateParams, $sce, liveVideoService, $ionicModal, otherVideoSourcesService,ngYoutubeEmbedService) {
        $scope.inputData = {};
        if ($stateParams.eventDetail) {
          $scope.title = $stateParams.eventDetail.text;
        }


        $ionicModal.fromTemplateUrl('templates/liveVideoComments.html', {
          scope: $scope,
          animation: 'slide-in-up',
        }).then(function (modal) {
          $scope.modal = modal;
        });

        $scope.openModal = function () {
          console.log("here");
          $scope.modal.show();
        };

        $scope.closeModal = function () {
          $scope.modal.hide();
        };

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
          $scope.modal.remove();
        });


        // $scope.commentNumber = liveVideoService.getCommentNumber($stateParams.id);
        //
        // $scope.liveVideoCommentsArray = liveVideoService.getLiveVideoComments($stateParams.id);

        $scope.commentblock = {
          "display": "block",
          "background-color": "#42c8f4",
          "margin": "10px",
          "padding": "15px",
          "border-radius": "5px"
        };

        // $scope.idSelected (sourceid)
        //$stateParams.id (eventid)


        $scope.submitLiveVideoComment = function () {
          console.log('here');

          if ($scope.inputData.newliveVideocomment) {
            var livedate = Date.now();
            var videoComment = {
              text: $scope.inputData.newliveVideocomment,
              datetime: livedate
            };
            console.log(videoComment);


            var commentlivetemp = $scope.inputData.newliveVideocomment;

            otherVideoSourcesService.saveLiveVideoComment(videoComment, $stateParams.id, $scope.idSelected)
              .success(function () {
                $scope.commentNumber++;
              })
              .error(function (e) {

                $ionicPopup.alert({
                  title: 'error',
                  template: e
                }).then(function (res) {
                  $scope.inputData.newliveVideocomment = commentlivetemp;
                });
              });
            $scope.inputData.newliveVideocomment = '';
          }
        };

        $scope.otherLinks = otherVideoSourcesService.getSourcesLinks($stateParams.id);
        console.log($scope.otherLinks);


        $scope.trustSrc = function (src) {
          return $sce.trustAsResourceUrl(src);
        };


        $scope.accessLinks = function (id) {
          for (var i = 0; i < $scope.otherLinks.length; i++) {
            if (id == $scope.otherLinks[i].hashid) {
              if ($scope.otherLinks[i].linksurl) {
                var url = $scope.otherLinks[i].linksurl;
                var Url = url.split('v=')[1].split('&')[0];
                var videoUrl = "https://www.youtube.com/embed/".concat(Url);//.concat("?autoplay=1");
                $scope.VideoID=Url;
                // Gets fired when the state of the iframe player changes
                $scope.srcurl = $scope.trustSrc(videoUrl);
                $scope.commentNumber = $scope.otherLinks[i].commentNumber;
                $scope.liveVideoCommentsArray = $scope.otherLinks[i].comments;
              }
            }
          }
          console.log($scope.commentNumber);
          console.log($scope.liveVideoCommentsArray);
          // $scope.submitLiveVideoComment = function () {
          //
          //   if ($scope.inputData.newliveVideocomment) {
          //     var livedate = Date.now();
          //     var videoComment = {
          //       text: $scope.inputData.newliveVideocomment,
          //       datetime: livedate
          //     };
          //     console.log(videoComment);
          //
          //
          //     var commentlivetemp = $scope.inputData.newliveVideocomment;
          //
          //     otherSourcesService.saveLiveVideoComment(videoComment, $stateParams.eventDetail.id,id)
          //       .success(function () {
          //         $scope.commentNumber++;
          //       })
          //       .error(function (e) {
          //
          //         $ionicPopup.alert({
          //           title: 'error',
          //           template: e
          //         }).then(function (res) {
          //           $scope.inputData.newliveVideocomment = commentlivetemp;
          //         });
          //       });
          //     $scope.inputData.newliveVideocomment = '';
          //   }
          // };
          // $scope.srcurl = $scope.trustSrc(videoUrl);
          /*if(!$scope.$$phase)
            $scope.$apply();*/
          $scope.idSelected = id;
        };

        $scope.accessLinks(1);
      }])


  .controller('modalController', function($scope, $ionicModal) {

    $ionicModal.fromTemplateUrl('templates/liveVideoComments.html', {
      scope: $scope,
      animation: 'slide-in-up',
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.openModal = function() {
      $scope.modal.show();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
  })
;






