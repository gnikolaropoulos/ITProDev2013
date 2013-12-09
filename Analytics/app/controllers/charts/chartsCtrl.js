'use strict';

define(['app'], function (app) {
	app.register.controller('ChartsCtrl', ['$scope', 'config', 'chartsService', function ($scope, config, chartsService) {

		init();

		function init() {
			drawChart();
		}

		function drawChart() {
			chartsService.getBarChart().then(function (results) {
				showResults(results);
			});

			chartsService.getBarChart2012().then(function (results) {
				showResults2012(results);
			});

			chartsService.getPieChart().then(function (results) {
				showPieChartResults(results);
			});
		}

		function showResults(results) {
			var chart2011 = {};
			chart2011.type = "BarChart";
			chart2011.displayed = false;
			chart2011.cssStyle = "height:800px; width:100%;";
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Description');
			data.addColumn('number', 'Total Value');
			for (var i = 0; i < results.length; i++) {
				var obj = results[i];;
				data.addRow([obj.description, obj.value]);
			}

			chart2011.data = data;

			chart2011.options = {
				"title": "2011 Portofolio's Assets",
				"isStacked": "true",
				"fill": 20,
				"displayExactValues": true,
				"vAxis": {
					"title": "Asset"
				},
				"hAxis": {
					"title": "Value" 
				}
			};

			$scope.chart2011 = chart2011;
		}

		function showResults2012(results) {
			var chart2012 = {};
			chart2012.type = "BarChart";
			chart2012.displayed = false;
			chart2012.cssStyle = "height:800px; width:100%;";
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'Description');
			data.addColumn('number', 'Total Value');

			for (var i = 0; i < results.length; i++) {
				var obj = results[i];
				//data.addRow(["test", 123, 'web', 123.54, 1232222.67]);
				data.addRow([obj.description, obj.value]);
			}

			chart2012.data = data;

			chart2012.options = {
				"title": "2012 Portofolio's Assets",
				"isStacked": "true",
				"fill": 20,
				"displayExactValues": true,
				"vAxis": {
					"title": "Asset"
				},
				"hAxis": {
					"title": "Value"
				}
			};

			$scope.chart2012 = chart2012;
		}

		function showPieChartResults(results) {
			var pieChart = {};
			pieChart.type = "PieChart";
			pieChart.displayed = false;
			pieChart.cssStyle = "height: 900px; width:100%";
			var data = new google.visualization.DataTable();
			data.addColumn('string', 'description');
			data.addColumn('number', 'Total Value');

			for (var i = 0; i < results.length; ++i) {
				var obj = results[i];
				data.addRow([obj.description, obj.value]);
			}

			pieChart.data = data;

			pieChart.options = {
				title: "Total Assets diversification (in millions)",
				is3D: true,
				displayExactValues: true
			};

			$scope.pieChart = pieChart;
		}
	}]);
});