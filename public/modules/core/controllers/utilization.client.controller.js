'use strict';


angular.module('core').controller('UtilizationController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        // Some example string
        $scope.helloText = 'Utilization View';
        $scope.descriptionText = 'This shows the utilization of the resources';
	}
]);