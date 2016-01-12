'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$ocLazyLoadProvider', '$urlRouterProvider',
	function($stateProvider, $ocLazyLoadProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');
        
        $ocLazyLoadProvider.config({
        // Set to true if you want to see what and when is dynamically loaded
        debug: false
        });

		// Home state routing
		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		})
        .state('metrics', {
			url: '/metrics',
			templateUrl: 'modules/core/views/metrics.client.view.html'
		})
        .state('utilization', {
			url: '/utilization',
			templateUrl: 'modules/core/views/utilization.client.view.html',
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {

                            serie: true,
                            name: 'angular-flot',
                            files: [ '/lib/flot/jquery.flot.js', '/lib/flot/jquery.flot.time.js', '/lib/flot/jquery.flot.tooltip.min.js', '/lib/flot/jquery.flot.spline.js', '/lib/flot/jquery.flot.resize.js', '/lib/flot/jquery.flot.pie.js', '/lib/flot/curvedLines.js', '/lib/flot/angular-flot.js', ]
                        },
                        {
                            name: 'angles',
                            files: ['/lib/chartJs/angles.js', '/lib/chartJs/Chart.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['/lib/peity/jquery.peity.min.js', '/lib/peity/angular-peity.js']
                        }
                    ]);
                }
            }
		})
        .state('projectDashboard', {
			url: '/Project Dashboard',
			templateUrl: 'modules/core/views/projectDashboard.client.view.html'
		})
        .state('mysqltest', {
			url: '/mysqltest',
			templateUrl: 'modules/core/views/mysqltest.client.view.html'
		});
	}
]);