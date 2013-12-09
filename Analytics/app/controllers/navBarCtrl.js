'use strict';

define(['app'], function (app) {

    app.controller('NavbarCtrl', ['$scope', '$location', function ($scope, $location) {
        $scope.highlight = function (path) {
            return $location.path().substr(0, path.length) == path;
        }
    }]);

});