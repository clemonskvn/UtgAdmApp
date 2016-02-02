'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	User = mongoose.model('User'),
	_ = require('lodash');

var mysql      = require('mysql');
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
  host     : 'ec2-54-84-46-213.compute-1.amazonaws.com',
  user     : 'mysqluser',
  password : '123456y',
  database : 'utgadm'
});
connection.connect();

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

/**
 * Test MySQL functionality
 */
exports.mysqltest = function (req, res){
  var rows;

 	connection.query('SELECT * from testadm.players LIMIT 10', function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Select from players table');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });

 };
exports.mysqltestpost = function (req, res){
   var rows;
 	console.log ('POST Request recieved')
 	console.log(req.body);
	console.log(req.body.name);
	var sQuery = "SELECT * from testadm.players where name = '" + req.body.name + "'";
	console.log(sQuery);

  	connection.query(sQuery, function(err, rows, fields) {
  	  if (!err) {
  	    console.log('Select from players table');
  	    console.log('The sql query result is: ', rows);
  	    res.jsonp(rows);
  	  } else
  	    console.log('Error while performing Query.');
  	  });

  };
exports.utilization = function (req, res){
  var rows;

connection.query('SELECT TITLE,STAFF_MEMBER,BILLABLE_UTILIZATION,PRD_DEV_UTILIZATION,TOTAL_UTILIZATION FROM V_WEEKLY_UTILIZATION where STAFF_MEMBER IS NOT NULL LIMIT 10', function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Select from Utilization table');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });
  };     
//Data for last week Util
exports.lastweek = function(req, res){
    var rows;
connection.query('select * from LAST_WEEK_UTILIZATION s', function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Data For last week');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });
};

exports.utilpractice= function(req,res){
    var rows;
    connection.query('SELECT PRACTICE FROM TBL_PRACTICE_DIRECTOR_LKP ', function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Practice List');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });
    
};

exports.usbillable= function(req, res){
    var rows;
    connection.query('select BILLABLE_UTILIZATION from UTILIZATION_US s', function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Billable');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });
    
};

exports.utilLocation= function(req, res){
    var rows;
    connection.query('SELECT distinct location from TBL_EMPLOYEE_LKP', function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Locations');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });
    
};

exports.utiloverbooked= function(req, res){
    var rows;
    connection.query('select s.CNT_OF_OVERBOOKED_RESOURCES from UTILIZATION_OVERBOOKED_RESOURCES s', function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Overbooked');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });
    
};

exports.nonbill= function(req, res){
    var rows;
    connection.query('select s.TOT_NON_BILLABLE_HOURS,s.CNT_RESOURCES from UTILIZATION_NON_BILLABLE_ACTIVITIES s',      function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Non-Billable');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });
    
};

exports.overutil= function(req, res){
    var rows;
    connection.query('select s.CNT_OVERUTILIZED_RESOURCES,s.SUM_OVERUTILIZED_HOURS,s.SUM_ALLOCATED_HOURS from UTILIZATION_OVERUTILIZED_RESOURCES s',function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Over Utilized');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });
    
};

//Post for Practice
exports.mypracticepost = function (req, res){
   var rows;
 	console.log ('POST Request recieved')
 	console.log(req.body);
var stmt= "SELECT PRACTICE,TITLE,STAFF_MEMBER,BILLABLE_UTILIZATION,PRD_DEV_UTILIZATION,TOTAL_UTILIZATION FROM V_WEEKLY_UTILIZATION where STAFF_MEMBER IS NOT NULL";
    
    //Data from the view
    var practice="";
    var location = "";	
    var start = "";
    var end = "";
    if(req.body.Name == undefined){
	 practice = null;
	}
    else{
	practice = req.body.Name.PRACTICE;
	}
    if(req.body.loc == undefined){
	 location = null;
	}
    else{
	location = req.body.loc.location;
	}
    if(req.body.value1 == undefined){
	sdtart= null;
	}
    else{
	start = "'"+req.body.value1+"'";
	}
   if(req.body.value2 == undefined){
	end= null;
	}
    else{
	end = "'"+req.body.value2+"'";
	}	
console.log(practice + location +start+end);
    
var stmt2= "select s.TITLE, s.STAFF_MEMBER, s.BILLABLE_UTILIZATION, s.TOTAL_UTILIZATION from (select @FROM_DATE:="+start+") parm1, (select @TO_DATE:="+end+") parm2 , UTILIZATION_BY_EMPLOYEE s where s.STAFF_MEMBER IS NOT NULL";
    
    // Varioable for appending into sql queries
    var stmtloc = " s.LOCATION ='"+location+"'";
    var stmtprc = " s.PRACTICE ='"+practice+"'";
    var stmtstart=" @FROM_DATE:='"+start+"'";
    var stmtend = " START_DATE:='"+end+"'";
    var stmtand=  " AND ";
    
    var statement = "";
    if(practice!= undefined || practice!= null){
        statement = stmt2+stmtand+stmtprc;
        console.log("practice"+ statement);
        if(location!=undefined || location!= null){
            
             statement = statement+stmtand+stmtloc;
            console.log("locat"+ statement);
        }
        else if(location==undefined || location == null){
            statement = statement;
        }
    }
    else if(practice == undefined || practice == null){
        statement = stmt2;
        console.log(statement);
        if(location!=undefined || location!= null){
            statement = statement+stmtand+stmtloc;
            console.log("locat"+ statement);
        }
        else if(location==undefined|| location == null){
            statement = statement;
        }
}
    
/*var sQuery1 = "SELECT PRACTICE,TITLE,STAFF_MEMBER,BILLABLE_UTILIZATION,PRD_DEV_UTILIZATION,TOTAL_UTILIZATION FROM V_WEEKLY_UTILIZATION where LOCATION ='" +location+ "' and START_DATE>='"+start+"' and START_DATE<='"+end+"' and PRACTICE='"+practice+"'";
	console.log(sQuery1);*/
 connection.query(statement, function(err, rows, fields) {
  	  if (!err) {
  	    console.log('Select from Util table');
  	    console.log('The sql query result is: ', rows);
  	    res.jsonp(rows);
  	  } else
  	    console.log('Error while performing Query.');
  	  });

  };

//Posts
exports.mylastweekpost= function(req, res){
var rows;    
console.log ('POST Request recieved for last week')
console.log(req.body);
var stmt= "select * from LAST_WEEK_UTILIZATION s";
//Data from the view
    var practice="";
    var location = "";	
    /*var start = "";
    var end = "";
*/  if(req.body.Name == undefined){
	 practice = null;
	}
    else{
	practice = req.body.Name.PRACTICE;
	}
    if(req.body.loc == undefined){
	 location = null;
	}
    else{
	location = req.body.loc.location;
	}
console.log(practice + location);

    // Variable for appending into sql queries
    var stmtloc = " ,(select @LOCATION_NAME:='"+location+"') parm4";
    var stmtprc = " ,(select @PRACTICE_NAME:='"+practice+"' ) parm3";
    var statement = "";
    if(practice!= undefined || practice!= null){
        statement = stmt+stmtprc;
        console.log("practice"+ statement);
    if(location!=undefined || location!= null){
        statement = statement+stmtloc;
        console.log("locat"+ statement);
        }
        else if(location==undefined || location == null){
            statement = statement;
        }
    }
    else if(practice == undefined || practice == null){
        statement = stmt;
        console.log(statement);
        if(location!=undefined || location!= null){
            statement = statement+stmtloc;
            console.log("locat"+ statement);
        }
        else if(location==undefined|| location == null){
            statement = statement;
        }
}
connection.query(statement, function(err, rows, fields) {
  	  if (!err) {
  	    console.log('Update for last week Utiliation');
  	    console.log('The sql query result is: ', rows);
  	    res.jsonp(rows);
  	  } else
  	    console.log('Error while performing Query.');
  	  });
    
};
/*exports.mybillablepost= function(req, res){
    var rows;
 	console.log ('POST Bill Util recieved')
 	console.log(req.body);
var stmt= "select BILLABLE_UTILIZATION from UTILIZATION_US s, (select @FROM_DATE:='2015-01-01') parm1, (select @TO_DATE:='2016-01-31') parm2";
    
    //Data from the view
    var start = "";
    var end = "";
    if(req.body.value1 == undefined){
	start = null;
	}
    else{
	start = "'"+req.body.value1+"'";
	}
   if(req.body.value2 == undefined){
	end= null;
	}
    else{
	end = "'"+req.body.value2+"'";
	}	
console.log(start+end);
    
    // Varioable for appending into sql queries
    var stmtstart=" @FROM_DATE:='"+start+"'";
    var stmtend = " START_DATE:='"+end+"'";
        
    var statement = "";
    if(practice!= undefined || practice!= null){
        statement = stmt2+stmtand+stmtprc;
        console.log("practice"+ statement);
        if(location!=undefined || location!= null){
            
         statement = statement+stmtand+stmtloc;
         console.log("locat"+ statement);
        }
        else if(location==undefined || location == null){
            statement = statement;
        }
    }
    else if(practice == undefined || practice == null){
        statement = stmt2;
        console.log(statement);
        if(location!=undefined || location!= null){
            statement = statement+stmtand+stmtloc;
            console.log("locat"+ statement);
        }
        else if(location==undefined|| location == null){
            statement = statement;
        }
}
 connection.query(statement, function(err, rows, fields) {
  	  if (!err) {
  	    console.log('Select from Util table');
  	    console.log('The sql query result is: ', rows);
  	    res.jsonp(rows);
  	  } else
  	    console.log('Error while performing Query.');
  	  });
};
exports.mynonbillablepost= function(req, res){
    var rows;
    connection.query('select s.CNT_OVERUTILIZED_RESOURCES,s.SUM_OVERUTILIZED_HOURS,s.SUM_ALLOCATED_HOURS from UTILIZATION_OVERUTILIZED_RESOURCES s',function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Over Utilized');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });
    
};
exports.myoverutilpost= function(req, res){
    var rows;
    connection.query('select s.CNT_OVERUTILIZED_RESOURCES,s.SUM_OVERUTILIZED_HOURS,s.SUM_ALLOCATED_HOURS from UTILIZATION_OVERUTILIZED_RESOURCES s',function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Over Utilized');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });
    
};
exports.myoverbookedpost= function(req, res){
    var rows;
    connection.query('select s.CNT_OVERUTILIZED_RESOURCES,s.SUM_OVERUTILIZED_HOURS,s.SUM_ALLOCATED_HOURS from UTILIZATION_OVERUTILIZED_RESOURCES s',function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Over Utilized');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });
    
};*/



//Post fro Dat range
/*exports.mydaterange = function (req, res){
   var rows;
 	console.log ('POST Request recieved')
 	console.log(req.body);
	console.log(req.body.fromdate);
    console.log(req.body.todate);    
var sQuery2 = "SELECT PRACTICE,TITLE,STAFF_MEMBER,BILLABLE_UTILIZATION,PRD_DEV_UTILIZATION,TOTAL_UTILIZATION FROM  V_WEEKLY_UTILIZATION where START_DATE>' " + req.body.fromdate + "' START_DATE<='"+ req.body.todate + "' ";
	console.log(sQuery1);
   	connection.query(sQuery2, function(err, rows, fields) {
  	  if (!err) {
  	    console.log('Select from Util table for dates');
  	    console.log('The sql query result is: ', rows);
  	    res.jsonp(rows);
  	  } else
  	    console.log('Error while performing Query.');
  	  });

  };*/
exports.mailing = function(req, res){
    var rows;
    connection.query('SELECT * FROM V_VALID_40HRS', function(err, rows, fields) {
 	  if (!err) {
 	    console.log('Mail Data');
 	    console.log('The sql query result is: ', rows);
 	    res.jsonp(rows);
 	  } else
 	    console.log('Error while performing Query.');
 	  });
    
};
