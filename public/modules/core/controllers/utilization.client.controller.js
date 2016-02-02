'use strict';
angular.module('core').controller('UtilizationController', ['$scope', '$http', 'Authentication', 'utilization', 'lastweek','usbillable','nonbill', 'overutil', 'utilLocation','utiloverbooked', 'utilpractice',
	function($scope, $http, Authentication, utilization, lastweek, usbillable, nonbill, overutil, utilLocation, utiloverbooked, utilpractice) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

        // Some example string
        $scope.helloText = 'Utilization View';
        $scope.descriptionText = 'This shows the utilization of the resources';
        
        //Data For Table
    $scope.ngData = [
        {Name: "Moroni", Age: 50, Position: 'PR Menager', Status: 'active', Date: '12.12.2014'},
        {Name: "Teancum", Age: 43, Position: 'CEO/CFO', Status: 'deactive', Date: '10.10.2014'},
        {Name: "Jacob", Age: 27, Position: 'UI Designer', Status: 'active', Date: '09.11.2013'},
        {Name: "Nephi", Age: 29, Position: 'Java programmer', Status: 'deactive', Date: '22.10.2014'},
        {Name: "Joseph", Age: 22, Position: 'Marketing manager', Status: 'active', Date: '24.08.2013'},
        {Name: "Monica", Age: 43, Position: 'President', Status: 'active', Date: '11.12.2014'},
        {Name: "Arnold", Age: 12, Position: 'CEO', Status: 'active', Date: '07.10.2013'},
        {Name: "Mark", Age: 54, Position: 'Analyst', Status: 'deactive', Date: '03.03.2014'},
        {Name: "Amelia", Age: 33, Position: 'Sales manager', Status: 'deactive', Date: '26.09.2013'},
        {Name: "Jesica", Age: 41, Position: 'Ruby programmer', Status: 'active', Date: '22.12.2013'},
        {Name: "John", Age: 48, Position: 'Marketing manager', Status: 'deactive', Date: '09.10.2014'},
        {Name: "Berg", Age: 19, Position: 'UI/UX Designer', Status: 'active', Date: '12.11.2013'}
    ];

    $scope.utilTable = { data: 'ngData' };
        
        //Data for Line Chart
    var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};
    var options={
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        bezierCurve : true,
        bezierCurveTension : 0.4,
        pointDot : true,
        pointDotRadius : 4,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 2,
        datasetFill : true
    };        
        
    var ctx = document.getElementById("myChart").getContext("2d");
    var myLineChart = new Chart(ctx).Line(data, options);
        
      //Default data for Table
        console.log('invoking utilization get');
		$scope.utilization = utilization.query();
		console.log($scope.utilization);
        
        //Defaut data for Last week Util
        console.log('Invoking for last week utilization');
        $scope.lastWeek = lastweek.query();
        console.log($scope.lastWeek);
        
        //Default data for Billable US/non US
        console.log('Getting Data for Billable Utilization');
        $scope.billUs = usbillable.query();
        console.log($scope.billUs);
        
        //Default data for non billabele        
        console.log('Getting Data for Non Billable Utilization');
        $scope.billNon = nonbill.query();
        console.log($scope.billNon);
        
        //Default data for over utilized        
        console.log('Getting Data for over utilized');
        $scope.overUtil = overutil.query();
        console.log($scope.overUtil);
        
        //Default data for Practice dropdown
        console.log('Invoking Select for Practice');
        $scope.practice= utilpractice.query();
        console.log($scope.practice);
        
        //Default data for Location dropdown
        console.log('Invoking Select for Location');
        $scope.location= utilLocation.query();
        console.log($scope.location);
        
        //Default data for overbooked resources
        console.log('Invoking for overbooking');
        $scope.overbooked= utiloverbooked.query();
        console.log($scope.overbooked);
        
        //Post Operations        
        $scope.practiceQuery = function(){
        console.log($scope.filter);
        //POST Method
        $http.post('/mypracticepost', $scope.filter).then(function(response) {
          // If successful we assign the response to the global user model
        $scope.utilization = response.data;
        });
        //post for last week Utilization   
        $http.post('/mylastweekpost', $scope.filter).success(function(response) {
        $scope.lastWeek = response;
        }).error(function(response) {
          $scope.error = response.message;
        });   
/*        //post for billable Utilization   
        $http.post('/mybillablepost', $scope.filter).success(function(response) {
        $scope.billUs = response;
        }).error(function(response) {
          $scope.error = response.message;
        }); 
        //post for non billable utilization   
        $http.post('/mynonbillablepost', $scope.filter).success(function(response) {
        $scope.billNon = response;
        }).error(function(response) {
          $scope.error = response.message;
        });  
        //post for over utilized resources   
        $http.post('/myoverutilpost', $scope.filter).success(function(response) {
        $scope.overUtil = response;
        }).error(function(response) {
          $scope.error = response.message;
        });      
        //post for over overbooked resources   
        $http.post('/myoverbookedpost', $scope.filter).success(function(response) {
        $scope.overbooked = response;
        }).error(function(response) {
          $scope.error = response.message;
        }); */
        };
   	}
]);