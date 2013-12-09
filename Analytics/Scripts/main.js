require.config({
	baseUrl: '/app',
	urlArgs: 'v=1.0'
});

require(
	[ 
		'app',
		'services/routeResolver',
		'services/config',
		'services/agentsService',
		'services/dataService',
		'services/chartsService',
		'controllers/navbarCtrl',
		'controllers/assets/assetChildCtrl',
		'directives/googlechart'
	],
	function () {
		google.load('visualization', '1', { callback: function () { }, packages: ['corechart'] });
		angular.bootstrap(document, ['analyticsApp']);
	});
