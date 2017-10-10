///<reference path="controller.js">
app.service('newsService',['$q', function ($q) {

  var n = [
    {
      id: 1,title: 'News1',
      description: 'This is 1st news',
      commtNo: 0,
      comments: []
    },

    {
      id: 2,
      title: 'News2',
      description: 'This is 2nd news',
      commtNo:0,
      comments: []
    }
  ];

  this.getNews = function () {
    return n;
  };
  this.getComments =function (newsid) {
    for(var i=0; i<n.length;i++){
      if(newsid==n[i].id) {
        console.log(n[i].comments);
        return n[i].comments;

      }
    }

  };

  this.saveComment=function (comment,newsid) {
    var deferred = $q.defer();
    var promise = deferred.promise;
    try {
      for (var i = 0; i < n.length; i++) {
        if (newsid == n[i].id) {
          n[i].commtNo++;
          n[i].comments.push(comment);
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

      promise.error= function (fn) {
       promise.then(null, fn);
       return promise;
      };

      return promise;
  };

}]);
