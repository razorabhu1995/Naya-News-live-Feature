///<reference path="controller.js">
var Events = [
  { id: 1,
    text: 'Football Live',
    type: 'text',commentNumber:0,
    comments: [],
    otherSources:[{
        hashid:1,
        title: 'Annapurna Post',
        linksurl:"asdasdasd",
        otherComments:[]
    }]
  },

  {id: 2,
    text: 'Election Live',
    type: 'text',commentNumber:0,
    comments: [],
    otherSources:[{
      hashid:1,
      title: 'Annapurna Post',
      linksurl:"asdasdasd",
      otherComments:[]
    }]
  },

  {id: 3,
    text: 'Cricket Live',
    type: 'video',
    otherSources:[
      {
      hashid:1,
      title: 'Naya Post',
      linksurl:"https://www.youtube.com/watch?v=hmp9Y2DpPZI",
      commentNumber:0,
      comments: []
      },
      {
        hashid:2,
        title: 'Annapurna Post',
        linksurl:"https://www.youtube.com/watch?time_continue=1&v=ZCTCke9vI2o",
        commentNumber:0,
        comments: []
      },
      {
        hashid:3,
        title: 'Annapurna Post',
        linksurl:"https://www.youtube.com/watch?time_continue=1&v=ZCTCke9vI2o",
        commentNumber:0,
        comments: []
      }
    ]
  },

  { id: 4,
    text: 'Dota Live',
    type: 'video',

    otherSources:[
      {
      hashid:1,
      title: 'EG vs OG',
      linksurl:"https://www.youtube.com/watch?v=HiSijXVRQkI",
      commentNumber:0,
      comments: []
    },
      {
        hashid:2,
        title: 'Annapurna Post',
        linksurl:"https://www.youtube.com/watch?time_continue=1&v=ZCTCke9vI2o",
        commentNumber:0,
        comments: []
      }
    ]
  }

];

app.factory('liveEventService',function ($q) {

  return {

    getEvents : function () {
        return Events;
    },

    getLiveComments :function (id) {
      for (var i = 0; i < Events.length; i++) {
        if (id == Events[i].id) {
          // console.log([i].comments);
          return Events[i].comments;
        }
      }
    },

    saveLiveComment : function (comment, id) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      try {
      for (var i = 0; i < Events.length; i++) {
        if (id ==Events[i].id) {
          Events[i].commentNumber++;
          Events[i].comments.push(comment);
          }
        }
        deferred.resolve();
      } catch (error) {
      deferred.reject("Failed: " + error);
      }


      promise.success = function (fn) {
      promise.then(fn);
      return promise;
      };

      promise.error = function (fn) {
      promise.then(null, fn);
      return promise;
      };

      return promise;

  }
};

});

// app.service('liveEventService',function () {
//   var Events = [
//     {id:1, text: 'Football Live', type: 'text'},
//     {id:2, text: 'Election Live', type: 'text'},
//     {id:3, text: 'Cricket Live', type: 'video'},
//     {id:4, text: 'Dota Live', type: 'video'}
//
//   ];
//
//   this.getLiveEvents=function () {
//     return Events;
//   }
//
//
// })

app.factory('liveTextService',function () {


});


app.factory('liveVideoService',function ($q) {
  return {

    getCommentNumber: function (id) {
      for (var i = 0; i < Events.length; i++) {
        if (id == Events[i].id) {
          return Events[i].commentNumber;
        }
      }
    },


    getLiveVideoComments :function (id) {
      for (var i = 0; i < Events.length; i++) {
        if (id == Events[i].id) {
          // console.log([i].comments);
          return Events[i].comments;
        }
      }
    },

    saveLiveVideoComment : function (comment, id) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      try {
        for (var i = 0; i < Events.length; i++) {
          if (id ==Events[i].id) {
            Events[i].commentNumber++;
            Events[i].comments.push(comment);
          }
        }
        deferred.resolve();
      } catch (error) {
        deferred.reject("Failed: " + error);
      }


      promise.success = function (fn) {
        promise.then(fn);
        return promise;
      };

      promise.error = function (fn) {
        promise.then(null, fn);
        return promise;
      };

      return promise;

    }

};
});

app.factory('otherSourcesService',function ($q) {
  return{
    getSourcesLinks :function (id) {
      for (var i = 0; i < Events.length; i++) {
        if (id == Events[i].id) {
          // console.log([i].comments);
          return Events[i].otherSources;
        }

      }
    },
    saveLiveVideoComment : function (comment, id,hashid) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      try {
        for (var i = 0; i < Events.length; i++) {
          if (id ==Events[i].id) {
            for(var j = 0; j<Events[i].otherSources.length;j++) {
              if(hashid==Events[i].otherSources[j].hashid) {
                Events[i].otherSources[j].commentNumber++;
                Events[i].otherSources[j].comments.push(comment);
                break;
              }
            }
            break;
          }
        }
        deferred.resolve();
      } catch (error) {
        deferred.reject("Failed: " + error);
      }


      promise.success = function (fn) {
        promise.then(fn);
        return promise;
      };

      promise.error = function (fn) {
        promise.then(null, fn);
        return promise;
      };

      return promise;

    }
  };
})
;
