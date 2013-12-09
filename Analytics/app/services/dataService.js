'use strict';

define(['app', 'services/agentsService'], function (app) {

    app.factory('dataService', function (config, agentsService) {
        return agentsService;
    });

});

