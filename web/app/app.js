'use strict';

// Declare app level module which depends on views, and components
angular.module('WeatherApp', [
  'ngRoute',
  'WeatherApp.Weather'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/Weather'});
}]);
