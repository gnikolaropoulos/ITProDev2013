'use strict';

define(['app'], function (app) {
    app.register.controller('AgentAssetsCtrl', ['$scope', '$routeParams', 'dataService', function ($scope, $routeParams, dataService) {
        $scope.customer = {};
        $scope.ordersTotal = 0.00;

        //I like to have an init() for controllers that need to perform some initialization. Keeps things in
        //one place...not required though especially in the simple example below
        init();

        function init() {
            //Grab customerID off of the route        
            var agentID = ($routeParams.agentID) ? parseInt($routeParams.agentID) : 0;
            if (agentID > 0) {
                dataService.getAgent(agentID)
                .then(function (agent) {
                    $scope.agent = agent;
                }, function (error) {
                    alert(error.message);
                });
            }
        }

    }]);

});