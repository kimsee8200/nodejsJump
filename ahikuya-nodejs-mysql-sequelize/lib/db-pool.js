// db-pool.js 

let mysql = require('mysql')

// dotenv 모듈을 이용해 .env 파일을 사용하도록 설정한다.
require('dotenv').config({path: 'lib/.env'})

// connection 정보
let connectionConfig = {
  connectionLimit: 10,    // 컨넥션 개수 제한
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB
}

// connection pool 생성
const db = mysql.createPool(connectionConfig)

module.exports = db