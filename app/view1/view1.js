'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', 'View1Service', function($scope, View1Service) {
    $scope.content = "Loading...";
    $scope.restaurants = View1Service.get();
    $scope.voted = false;
    $scope.message = 'Thanks for voting!';
    $scope.vote = function(r, dir) {
      if (dir == 'down') {
        r.dislikes++;
        $scope.message = "Bummer...";
      }
      else {
        r.likes++;
      }
      r.voted = true;
    }
  }])

  // Local Storage factory.
  .factory('$localStorage', ['$window', function ($window) {
    return {
      set: function (key, val) {
        $window.localStorage.setItem(key, val);
      },
      get: function(key, defVal) {
        return $window.localStorage.getItem(key) || defVal;
      },
      setObject: function (key, obj) {
        $window.localStorage.setItem(key, JSON.stringify(obj));
      },
      getObject: function(key) {
        return JSON.parse($window.localStorage.getItem(key) || '{}');
      },
      delete: function(key) {
        $window.localStorage.removeItem(key);
      }
    }
  }])

  .factory('View1Service', ['$localStorage', function($localStorage){
    var restaurants = $localStorage.getObject('restaurants');
    if (!restaurants[0]) {
      restaurants = [
        {name: "Tacos Por Favor", description: "Taco Tuesday Motha Fuckas!", voted: false, likes: 0, dislikes: 0},
        {name: "Zankou Chicken", description: "Zangief's favorite restaurant.", voted: false, likes: 0, dislikes: 0},
        {name: "Bergamot Cafe", description: "Turkey Bacon Cheddar sandwiches for the win.", voted: false, likes: 0, dislikes: 0}
      ];
      $localStorage.setObject('restaurants', restaurants);
    }
    var obj = {};

    obj.get = function() {
      return restaurants;
    };

    return obj;
  }]);

