'use strict';

define(['app'], function (app) {

    //This controller is a child controller that will inherit functionality from a parent
    //It's used to track the orderby parameter and ordersTotal for a customer. Put it here rather than duplicating 
    //setOrder and orderby across multiple controllers.
    app.controller('AssetChildCtrl', ['$scope', function ($scope) {
        $scope.orderby = 'description';
        $scope.reverse = false;

        //init();

        //function init() {
        //    //Calculate grand total
        //    //Handled at this level so we don't duplicate it across parent controllers
        //    if ($scope.agents && $scope.agent && $scope.agent.assets) {
        //    	var total = 0.00;
        //    	var assetsLen = $scope.agent.assets.length;
        //        for (var i = 0; i < assetsLen; i++) {
        //            var asset = $scope.agent.assets[i];
        //            total += asset.value;
        //        }

        //        $scope.assetsTotal += total;
        //    }
        //}

        $scope.setOrder = function (orderby) {
            if (orderby === $scope.orderby) {
                $scope.reverse = !$scope.reverse;
            }

            $scope.orderby = orderby;
        };

    }]);
});