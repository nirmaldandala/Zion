lineApp.directive('graphdirective', function () {
	return {
		restrict : 'E',
		replace : 'true',
		templateUrl : 'views/graphdirective.html',
		controller : function ($scope, lineData) {
			$scope.optionslist = ['sales', 'pageViews', 'orders', 'clickThruRate'];
			var xaxisTitle = "Date";

			$scope.optionChanged = function () {
				var curOption = event.currentTarget.value;
				$scope.dataSet = fetchData(curOption);
				$scope.curOption = curOption;
				google.charts.setOnLoadCallback(drawBackgroundColor);
			};

			$scope.init = function() {
				google.charts.load('current', {packages: ['corechart', 'line']});
				$scope.dataSet = fetchData($scope.optionslist[0]);
				$scope.curOption = $scope.optionslist[0];
				google.charts.setOnLoadCallback(drawBackgroundColor);
			};


			function fetchData(val) {
				var lineDatalen = lineData.total.records.length;
				var finalData = [];
				for(var i = 0; i < lineDatalen; i++) {
					finalData.push([filterDate(lineData.total.records[i].date), lineData.total.records[i][val]]);
				}
				return finalData;
			};

			function filterDate(dateVal) {
				return dateVal;
			};

			function drawBackgroundColor(val) {
			      var data = new google.visualization.DataTable();
			      data.addColumn('string', 'date');
			      data.addColumn('number', $scope.curOption);

			      data.addRows($scope.dataSet);

			      var options = {
			        hAxis: {
			          title: xaxisTitle
			        },
			        curveType: 'function',
			        pointSize: 7,
			        pointShape: 'square'
			  	}

			      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
			      chart.draw(data, options);
			    }
			    $scope.init();
		}
	}
});