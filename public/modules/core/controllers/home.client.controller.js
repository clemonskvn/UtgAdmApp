'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'mailing',
	function($scope, Authentication, mailing) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        // Some example string
        $scope.helloText = 'Welcome to UtgAdmApp';
        $scope.descriptionText = 'It is an application for Utegration to manage our project, time, budget, etc.';
        
       $scope.sendMail = function(){
       //Get mail method
        console.log('Invoking for Triggering email');
        $scope.mailContent = mailing.query();
        console.log($scope.mailContent); 
        }
	}
]);