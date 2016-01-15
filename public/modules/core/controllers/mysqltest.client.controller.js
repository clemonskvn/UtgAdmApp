'use strict';


angular.module('core').controller('MySqlTestController', ['$scope', '$http', 'Authentication', 'mysqltest',
        function($scope, $http, Authentication, mysqltest ) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

    // Some example string
    $scope.helloText = 'MySQL Test Page';
    $scope.descriptionText = 'Test Connection& Query to MySQL DB';

		//invoke mysqltest REST
		console.log('invoking mysqltest get');
		$scope.mysqltest = mysqltest.query();
		console.log($scope.mysqltest);
        
    $scope.mysqltestquery = function(){
        console.log($scope.filter);
        //POST method
        $http.post('/mysqltestpost', $scope.filter).success(function(response) {
          // If successful we assign the response to the global user model
          $scope.mysqltest = response;
        }).error(function(response) {
          $scope.error = response.message;
        });
        }
    
	}
]);
