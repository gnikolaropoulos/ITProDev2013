'use strict';

define(['app'], function (app) {

    //This controller retrieves data from the customersService and associates it with the $scope
    //The $scope is ultimately bound to the customers view
    app.register.controller('AgentsCtrl', ['$scope', 'config', 'dataService', function ($scope, config, dataService) {

        function init() {
            dataService.getAgentsSummary()
                .then(function (agents) {
                    $scope.agents = agents;
                    }, function (error) {
                    alert(error.message);
                });
        }

        //$scope.insertCustomer = function () {
        //    var customer = angular.copy($scope.newCustomer);
        //    dataService.insertCustomer(customer)
        //        .then(function (opStatus) {
        //            customer.id = opStatus.operationId;
        //            $scope.customers.push(customer);
        //            $scope.newCustomer = {};
        //        }, function (error) {
        //            alert(error.message);
        //        });
        //};

        $scope.delete = function (id) {
            dataService.deleteCustomer(id).then(function (opStatus) {
                for (var i = 0; i < $scope.customers.length; i++) {
                    if ($scope.customers[i].id == id) {
                        $scope.customers.splice(i, 1);
                        break;
                    }
                }
            }, function (error) {
                alert('Error deleting customer: ' + error.message);
            });
        };

        init();
    }]);

});