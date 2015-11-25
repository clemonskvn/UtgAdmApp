var mysql      = require('mysql');
var bodyParser = require('body-parser');
var connection = mysql.createConnection({
  host     : 'ec2-54-84-46-213.compute-1.amazonaws.com',
  user     : 'mysqluser',
  password : '123456y',
  database : 'testadm'
});

app.get('/mysqltest', function (req, res){
	console.log ('I recieved a GET request from /mysqltest');
    connection.connect();

	connection.query('SELECT * from players LIMIT 10', function(err, rows, fields) {
	  if (!err) {
	    console.log('Selected from players table');
	    console.log('The solution is: ', rows);
	    res.json(rows);
	  } else
	    console.log('Error while performing Query.');
	  });

	connection.end();
});