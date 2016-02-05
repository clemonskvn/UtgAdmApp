'use strict';


angular.module('core').controller('EmailController', ['$scope', '$http','mailing',
	function($scope, $http, mailing) {
		// This provides Authentication context.
 $scope.mailContent = mailing.query();
        console.log($scope.mailContent);   
        // Some example string
       $scope.sendMail = function(){
           function log(obj) {
    $('#response').text(JSON.stringify(obj));
}

// create a new instance of the Mandrill class with your API key
var m = new mandrill.Mandrill('WthYg6uxxJSr1nc3MkGSwQ');
//var file = File.ReadAllBytes(@"C:\Users\Bhavya Latha\Desktop\test.txt");
//var base64 = Convert.ToBase64String(file,0,file.Length);

// create a variable for the API call parameters
var params = {
    "message": {
        "from_email":"kevin.clemons@kclemons.us",
        "to":[{"email":"bhavya.latha@utegration.com"}],
        "subject": "UtgAdmApp-Test email",
        "html": "<p>Hi *|NAME|*, <br/> <br/>This is to notify that the below employees have billed less than 40 hrs. for this week.<br/><br/>1. Mike<br/>2.John<br/>3.Sherley</br/><br/><br/>Thanks,<br/>UtgAdmApp</p>",
        "autotext": "true",
        "track_opens": "true",
        "track_clicks":"true",
        "merge_vars": [
            {
                "rcpt": "bhavya.latha@utegration.com",
                "vars": [
                    {
                        "name": "NAME",
                        "content": "Bhavya"
                    },
                ]
            }
        ] 
        /*"attachments": [
           {
               "type":"text/plain",
               "name": "test",
               "content": "base64"
           }
       ]*/
    }
};
       //Get mail method
        console.log('Invoking for Triggering email');
	m.messages.send(params, function(res) {
        log(res);
        
    }, function(err) {
        log(err);
        alert("Email sending failed");
    });
       
        }
	}
]);


