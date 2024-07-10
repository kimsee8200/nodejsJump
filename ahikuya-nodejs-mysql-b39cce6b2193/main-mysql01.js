const express = require('express')
const url = require('url')
const qs = require('querystring')

let mysql = require('mysql')

const app = express()   // express 객체 생성
const port = 3000       // 사용할 포트 번호

let db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0000',
  database: 'lec_nodejs'
})

db.connect()


// bodyParser 사용 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 학생 목록을 생성하여 반환한다.
function createList(students) {
  let list = ''
  let item
  for (i = 0; i < students.length; i++) {
    item = students[i]
    list += `
      <tr>
        <th>${item.id}</th>
        <th><a href='/student/${item.name}'>${item.name}</a></th>
        <th><a href="/update/${item.name}">수정</a>
        <form action="/process_delete" method="post">
          <input type="hidden" name="name" value="${item.name}">
          <input type="submit" value="삭제">
        </form>
      </tr>
      `
  }

  return list
}


// 루트 라우팅
app.get('/', (req, res) => {

  // 전체 학생 조회
  db.query(`SELECT * FROM students`, (err, results) => {
    let list = createList(results)

    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <style>
          table, th, td {
            border:1px solid black;
            border-collapse: collapse;
          }
        </style>
      <body>

      <h2>학생</h2>

      <table style="width:100%">
        <tr>
          <th>id</th>
          <th>이름</th>
          <th>편집</th>
        </tr>
        ${list}
      </table>
      <p><a href="/create">학생 추가</a></p>
      </body>
      </html>
      `
    res.send(html)
  })
})


app.listen(port, () => {
  console.log(`Server is running... listening on port ${port}`)
})