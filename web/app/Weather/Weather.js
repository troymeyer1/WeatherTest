(function() {
'use strict';

	angular.module('WeatherApp.Weather', ['ngRoute'])

	.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.when('/Weather', {
		templateUrl: 'Weather/Weather.html',
		controller: 'WeaterController'
	  });
	}])
	.controller('WeaterController', WeatherController);

	WeatherController.$inject = ['$scope', '$http'];

	function WeatherController($scope, $http) {
		var vm = $scope;

		vm.goClicked = goClicked;
		vm.model = {
			zipCode: '',
			hasResults: false
		};
		vm.result;
		
		function goClicked() {
			updateWeather(vm.model.zipCode);
		}
		
		function updateWeather(zipCode) {
			$http({
			  method: 'GET',
			  url: 'http://vm-ms-dev-33:8080/Weather?zip=' + zipCode
			}).then(function successCallback(response) {
				vm.model.hasResults = true;
				vm.model.weatherUrl = 'http://openweathermap.org/img/w/' + response.data.weather[0].icon + '.png'
				vm.result = response.data;
			  }, function errorCallback(response) {
				alert('Error in service call: ' + response);
			  });
		}
	}
})();