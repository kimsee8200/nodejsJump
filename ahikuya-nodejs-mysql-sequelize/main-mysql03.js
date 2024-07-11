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


// 데이터 추가 페이지 라우팅
app.get('/create', (req, res) => {
  // 데이터 추가하기
  let html = `
    <!DOCTYPE html>
    <html>

    <style>
      table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
      }
    </style>

    <head>
      <meta charset="utf-8">
    </head>

    <body>
    <H2>학생 정보 추가</H2>
    <form action="http://localhost:3000/process_create" method="post">
      <p>이름 : <input type="text" name="name"></p>
      <p>설명 : 
        <textarea name="desc"></textarea>
      </p>
      <p>
        <input type="submit" value="저장">
      </p>
    </form>
    </body>

    </html>
    `
  res.send(html)
})

// 데이터 추가 처리
app.post('/process_create', (req, res) => {
  let postData = req.body

  let name = postData.name
  let desc = postData.desc

  db.query(`INSERT INTO students (name, profile, school_id) VALUES (?, ?, ?)`,
    [name, desc, 1],
    (err, result) => {
      res.redirect(`/student/${name}`)
    })
})


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



// 상세 페이지 라우팅
// pretty url(clean url, semantic url)
app.get('/student/:name', (req, res) => {
  let studentName = req.params.name

  // 전체 학생을 먼저 조회한다.
  db.query(`SELECT * FROM students`, (err, results) => {
    if (err) {
      throw err;
    }

    // id가 같은 학생을 조회한다.
    db.query(`SELECT * FROM students where name=?`, [studentName], (err2, student) => {
      if (err2) {
        throw err2;
      }
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
        </tr>
        ${list}
      </table>

      <h2>${studentName}</h2>
      <p>${student[0].profile}</p>

      </body>
      </html>
`
      res.send(html)
    })

  })

})



app.listen(port, () => {
  console.log(`Server is running... listening on port ${port}`)
})