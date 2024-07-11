let mysql = require("mysql");

require("dotenv").config({ path: "lib/.env" });
console.log(`process.env 내용 확인`);
console.log(process.env);

let db = mysql.createPool({
  connectionLimit: 10, // 컨넥션 개수 제한
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

db.connect();

module.exports = db;
