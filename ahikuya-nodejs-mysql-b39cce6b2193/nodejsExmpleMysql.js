let mysql = require("mysql");
let connection = mysql.createConnection({
  host: "localhost",
  user: "nodeMy",
  password: "1234",
  database: "nodejsjump",
});

connection.connect();

connection.query("SELECT * FROM students;", function (error, results, fields) {
  if (error) throw error;
  console.log("The solution is: ", results);
});

connection.end();

//
