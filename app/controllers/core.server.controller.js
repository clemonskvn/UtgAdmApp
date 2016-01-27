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
    
//Practice Filter

    
 };  
//Post for Practice
exports.mypracticepost = function (req, res){
   var rows;
 	console.log ('POST Request recieved')
 	console.log(req.body);
	/*console.log(req.body.PRACTICE);
    console.log(req.body.LOCATION);
    console.log(req.body.START);
    console.log(req.body.END);*/
    var practice = req.body.Name.Name;
    var location = req.body.loc.loc;
    var start = req.body.value1;
    var end = req.body.value2;
    /*if(req.body.PRACTICE!= "" ){*/
var sQuery1 = "SELECT PRACTICE,TITLE,STAFF_MEMBER,BILLABLE_UTILIZATION,PRD_DEV_UTILIZATION,TOTAL_UTILIZATION FROM V_WEEKLY_UTILIZATION where LOCATION ='" +req.body.LOCATION+ "' and START_DATE>='"+req.body.START+"' and START_DATE<='"+req.body.END+"' and PRACTICE='"+req.body.PRACTICE+"'";
	console.log(sQuery1);
    
   	connection.query(sQuery1, function(err, rows, fields) {
  	  if (!err) {
  	    console.log('Select from Util table');
  	    console.log('The sql query result is: ', rows);
  	    res.jsonp(rows);
  	  } else
  	    console.log('Error while performing Query.');
  	  });

  };
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
