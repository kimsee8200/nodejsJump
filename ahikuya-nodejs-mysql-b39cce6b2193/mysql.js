// 모듈을 불러온다.
const mysql      = require('mysql');

// 컨넥션 정보를 설정 및 생성한다.
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0000',
  database : 'lec_nodejs'
});
 
// db에 연결한다.
connection.connect();
 
// 데이터를 조회한다.
connection.query('SELECT * FROM students', function (error, results, fields) {
  if (error) {
    console.log(error)
  }

  // 조회 결과를 출력한다.
  console.log(results);
});
 
connection.end()