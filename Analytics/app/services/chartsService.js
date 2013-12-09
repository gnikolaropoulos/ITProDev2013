'use strict';

define(['app'], function (app) {

	//Although this is an AngularJS factory I prefer the term "service" for data operations
	app.factory('chartsService', function ($http) {
		var serviceBase = '/api/chartsService/',
			chartsFactory = {};

		chartsFactory.getBarChart = function () {
			return $http.get(serviceBase + 'BarCharts').then(function (results) {
				return results.data;
			});
		}

		chartsFactory.getBarChart2012 = function () {
			return $http.get(serviceBase + 'BarCharts2012').then(function (results) {
				return results.data;
			});
		}

		chartsFactory.getPieChart = function () {
			return $http.get(serviceBase + 'PieChart').then(function (results) {
				return results.data;
			});
		}
		return chartsFactory;
	});
});