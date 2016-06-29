var lineApp = angular.module('lineApp', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/home');

	$stateProvider
	.state('home', {
		url : '/home',
		templateUrl : 'views/home.html',
		controller : function($scope) {
			
		}
	});
})
