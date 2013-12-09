'use strict';

define(['app'], function (app) {

	//This controller retrieves data from the agentsService and associates it with the $scope
	//The $scope is bound to the orders view
	app.register.controller('AssetsCtrl', ['$scope', 'dataService', function ($scope, dataService) {
		$scope.assetsTotal = 0.00;

		init();

		function init() {
			dataService.getAgents()
				.then(function (agents) {
					$scope.agents = agents;
					calculateTotals();
				}, function (error) {
					alert(error.message);
				});
		}

		function calculateTotals() {
			if ($scope.agents) {
				var total = 0.00;
				var agentsLen = $scope.agents.length;
				for (var j = 0; j < agentsLen; ++j) {
					var assetsLen = $scope.agents[j].assets.length;
					for (var i = 0; i < assetsLen; i++) {
						$scope.assetsTotal += $scope.agents[j].assets[i].value;
					}
				}
			}
		}
	}]);
});