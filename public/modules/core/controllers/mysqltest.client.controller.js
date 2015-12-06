'use strict';


angular.module('core').controller('MySqlTestController', ['$scope', 'Authentication', 'mysqltest',
	function($scope, Authentication, mysqltest) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

    // Some example string
    $scope.helloText = 'MySQL Test Page';
    $scope.descriptionText = 'Test Connection& Query to MySQL DB';

		//invoke mysqltest REST
		console.log('invoking mysqltest get');
		$scope.mysqltest = mysqltest.query();
		console.log($scope.mysqltest);
	}
]);
