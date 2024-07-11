// db2.js 

let mysql = require('mysql')

// dotenv 모듈을 이용해 .env 파일을 사용하도록 설정한다.
require('dotenv').config({path: 'lib/.env'})

let db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
})

db.connect()

module.exports = db