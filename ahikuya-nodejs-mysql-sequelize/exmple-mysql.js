var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0000',
  database : 'lec_nodejs'
});
 
connection.connect();
 
connection.query('SELECT * FROM students;', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0]);
});
 
connection.end();