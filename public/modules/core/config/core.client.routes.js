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
                             files: ['/lib/Chart.js/Chart.js', '/lib/Chart.js/Chart.min.js']
                        },
                        {
                        name: 'angular-flot',
                        files: ['/lib/angular-flot/angular-flot.js']
                        },
                        
                    ]);
                }
            }
		})
        .state('projectDashboard', {
			url: '/Project Dashboard',
			templateUrl: 'modules/core/views/projectDashboard.client.view.html',
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            serie: true, 
                            files: ['/lib/Chart.js/Chart.js', '/lib/Chart.js/Chart.min.js']
                        },
                        {
                        name: 'angular-flot',
                        files: [ 'lib/angular-flot/jquery.flot.js', 'lib/angular-flot/jquery.flot.time.js', 'lib/angular-flot/jquery.flot.tooltip.min.js', 'lib/angular-flot/jquery.flot.spline.js', 'lib/angular-flot/jquery.flot.resize.js', 'lib/angular-flot/jquery.flot.pie.js', 'lib/angular-flot/curvedLines.js', 'lib/angular-flot/angular-flot.js', ]
                        },
                        {
                        name: 'datatables',
                        files: [ 'lib/datatables/media/css/dataTables.bootstrap.css',
                               'lib/datatables/media/css/dataTables.bootstrap.min.css',
                               'lib/datatables/media/css/dataTables.foundation.css',
                               'lib/datatables/media/css/dataTables.foundation.min.css',
                               'lib/datatables/media/css/dataTables.jqueryui.min.css',
                               'lib/datatables/media/css/dataTables.jquery.dataTables.min.css',
                               'lib/datatables/media/js/dataTables.bootstrap.min.js',
                               'lib/datatables/media/js/dataTables.foundation.min.js',
                               'lib/datatables/media/js/dataTables.jqueryui.min.js',
                               'lib/datatables/media/js/jquery.js',
                                'lib/datatables/media/js/jquery.dataTables.min.js'                                                    ]
                        },
                        ]);
                }
            }
		})
        .state('mysqltest', {
			url: '/mysqltest',
			templateUrl: 'modules/core/views/mysqltest.client.view.html'
		});
	}
]);