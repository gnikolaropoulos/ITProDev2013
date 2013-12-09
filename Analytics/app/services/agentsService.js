'use strict';

define(['app'], function (app) {

    //This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
    //each doing the same thing just structuring the functions/data differently.

    //Although this is an AngularJS factory I prefer the term "service" for data operations
    app.factory('agentsService', function ($http) {
        var serviceBase = '/api/dataservice/',
            customers = null,
            agentsFactory = {};
            
        agentsFactory.getAgents = function () {
            //then does not unwrap data so must go through .data property
            //success unwraps data automatically (no need to call .data property)
            return $http.get(serviceBase + 'Agents').then(function (results) {
                extendCustomers(results.data);
                return results.data;
            });
        };

        agentsFactory.getAgentsSummary = function () {
            return $http.get(serviceBase + 'AgentsSummary').then(function (results) {
                return results.data;
            });
        };

        agentsFactory.insertCustomer = function (customer) {
            return $http.post(serviceBase + 'InsertCustomer', customer).then(function (results) {
                return results.data;
            });
        };

        agentsFactory.updateCustomer = function (customer) {
            return $http.put(serviceBase + 'UpdateCustomer/' + customer.id, customer).then(function (status) {
                return status.data;
            });
        };

        agentsFactory.deleteCustomer = function (id) {
            return $http.delete(serviceBase + 'DeleteCustomer/' + id).then(function (status) {
                return status.data;
            });
        };

        agentsFactory.getAgent = function (id) {
            //then does not unwrap data so must go through .data property
            //success unwraps data automatically (no need to call .data property)
            return $http.get(serviceBase + 'AgentById/' + id).then(function (results) {
                extendCustomers([results.data]);
                return results.data;
            });
        };

        function extendCustomers(agents) {
        	var agentsLen = agents.length;
            //Iterate through customers
        	for (var i = 0; i < agentsLen; i++) {
        		agents[i].assetsTotal = function () {
        			return assetsTotal(this);
        		};
            }
        }

        function assetsTotal(agent) {
            var total = 0;
            var assets = agent.assets;
            var count = assets.length;

            for (var i = 0; i < count; i++) {
            	total += assets[i].value;
            }
            return total;

        };

        return agentsFactory;

    });

});