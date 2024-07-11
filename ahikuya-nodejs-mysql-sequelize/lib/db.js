// db.js 

let mysql = require('mysql')

let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'lec_nodejs'
})

db.connect()

module.exports = db