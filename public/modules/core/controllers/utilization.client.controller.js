'use strict';
angular.module('core').controller('UtilizationController', ['$scope', '$http', 'Authentication', 'utilization',
	function($scope, $http, Authentication, utilization) {
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
        
   // Data and options for Polar Chart
  /*  var polarOptions={
    //Boolean - Show a backdrop to the scale label
    scaleShowLabelBackdrop : true,

    //String - The colour of the label backdrop
    scaleBackdropColor : "rgba(255,255,255,0.75)",

    // Boolean - Whether the scale should begin at zero
    scaleBeginAtZero : true,

    //Number - The backdrop padding above & below the label in pixels
    scaleBackdropPaddingY : 2,

    //Number - The backdrop padding to the side of the label in pixels
    scaleBackdropPaddingX : 2,

    //Boolean - Show line for each value in the scale
    scaleShowLine : true,

    //Boolean - Stroke a line around each segment in the chart
    segmentShowStroke : true,

    //String - The colour of the stroke on each segement.
    segmentStrokeColor : "#fff",

    //Number - The width of the stroke value in pixels
    segmentStrokeWidth : 2,

    //Number - Amount of animation steps
    animationSteps : 100,

    //String - Animation easing effect.
    animationEasing : "easeOutBounce",

    //Boolean - Whether to animate the rotation of the chart
    animateRotate : true,

    //Boolean - Whether to animate scaling the chart from the centre
    animateScale : false,

    };    */
/*    var polarData = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    },
    {
        value: 40,
        color: "#949FB1",
        highlight: "#A8B3C5",
        label: "Grey"
    },
    {
        value: 120,
        color: "#4D5360",
        highlight: "#616774",
        label: "Dark Grey"
    }

];
       
        this.polarData = [
        {
            value: 300,
            color:"#a3e1d4",
            highlight: "#1ab394",
            label: "App"
        },
        {
            value: 140,
            color: "#dedede",
            highlight: "#1ab394",
            label: "Software"
        },
        {
            value: 200,
            color: "#A4CEE8",
            highlight: "#1ab394",
            label: "Laptop"
        }
    ];*/
    /*var ctx2 = document.getElementById("myPolarChart").getContext("2d");    
    var myPolarChart = new Chart(ctx2).PolarArea(polarData, polarOptions);    */
    /**
     * Options for Polar chart
     */
/*    this.polarOptions = {
        scaleShowLabelBackdrop : true,
        scaleBackdropColor : "rgba(255,255,255,0.75)",
        scaleBeginAtZero : true,
        scaleBackdropPaddingY : 1,
        scaleBackdropPaddingX : 1,
        scaleShowLine : true,
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 2,
        animationSteps : 100,
        animationEasing : "easeOutBounce",
        animateRotate : true,
        animateScale : false
    };
        
        console.log('invoking utilization get');
		$scope.utilization = utilization.query();
		console.log($scope.utilization); */   
      
 /*       $scope.tableParams = new ngTableParams({
            page: 1, 
                count: 10, // count per page
                filter: {
                    name: 'M' // initial filter
                },
                sorting: {
                    name: 'asc'
                }
            }, {
                total: $scope.data.length, // length of data
                getData: function ($defer, params) {
                    // use build-in angular filter
                    var filteredData = params.filter() ?
                        $filter('filter')($scope.data, params
                            .filter()) :
                        data;
                    var orderedData = params.sorting() ?
                        $filter('orderBy')($scope.data,
                            params.orderBy()) :
                        $scope.data;
                    params.total(orderedData.length); // set total for recalc paginationemail

                    $defer.resolve(orderedData.slice((
                            params.page() -
                            1) * params.count(),
                        params.page() *
                        params.count()));
                }
            });*/
        /*$scope.myChangeFunction= function(){
            console.log($scope.example.datefrom);
            console.log($scope.example.dateto);
        }*/
        
        $scope.practiceQuery = function(){
        console.log($scope.filter);
        //POST method
        $http.post('/mypracticepost', $scope.filter).success(function(response) {
          // If successful we assign the response to the global user model
          $scope.utilization = response;
        }).error(function(response) {
          $scope.error = response.message;
        });
        }
        //Filters
         //Data for Practice Select
        $scope.Practice = [{
                Id: 1,
                Name: 'PMO'
            }];
        $scope.update(){
            console.log($scope.selectedPractice.Name)
        }
         $scope.Location = [{
                Id: 1,
                loc: 'United States'
            }];
        $scope.locFilter(){
            console.log($scope.selectedLocation.loc)
        }
        $scope.myChangeFunction= function(){
            console.log($scope.date.value1);
            console.log($scope.date.value2);
        }
        
       
        
   	}
]);