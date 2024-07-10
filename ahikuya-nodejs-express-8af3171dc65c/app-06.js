const express = require('express')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')

const app = express()   // express 객체 생성
const port = 3000       // 사용할 포트 번호

// bodyParser 사용 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 학생 목록을 생성하여 반환한다.
function createList(files) {
  let list = ''
  for (i = 0; i < files.length; i++) {
    list += `
      <tr>
        <th>${i}</th>
        <th><a href='/student/${files[i]}'>${files[i]}</a></th>
        <th><a href="/update/${files[i]}">수정</a>
        <form action="/process_delete" method="post">
          <input type="hidden" name="name" value="${files[i]}">
          <input type="submit" value="삭제">
        </form>
      </tr>
      `
  }

  return list
}

// 상세 페이지 라우팅
// pretty url(clean url, semantic url)
app.get('/student/:name', (req, res) => {
  console.log(req.params);
  let studentName = req.params.name
  fs.readdir('./data', (err, files) => {
    // 파일의 내용을 읽어온다.
    fs.readFile(`./data/${studentName}`, 'utf8', function (err, data) {
      if (err) {
        console.error(err)
        return
      }

      let list = createList(files)

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
      <p>${data}</p>

      </body>
      </html>
`
      res.send(html)
    })


  })
})


// 데이터 추가
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

// 페이지 생성 처리
app.post('/process_create', (req, res) => {
  let postData = req.body

  let name = postData.name
  let desc = postData.desc
  fs.writeFile(`./data/${name}`, desc, err => {
    if (err) {
      console.error(err);
    } else {
      // file written successfully
      console.log('파일 저장 성공!!!')

      // url redirect!!
      res.redirect(`/student/${name}`)
    }
  });
})

// 데이터 수정
app.get('/update/:name', (req, res) => {
  // 데이터 수정하기
  let studentName = req.params.name


  // 수정 전의 이름을 전달하기 위해 hidden 속성의 input 을 추가한다.
  fs.readFile(`./data/${studentName}`, 'utf8', function (err, data) {
    let html = `
      <!DOCTYPE html>
      <html>
  
      <style>
        table,
        th,
        td {
          border: 1px solid black;
          border-collapse: collapse;
        }
      </style>
  
      <head>
        <meta charset="utf-8">
      </head>
  
      <body>
      <H2>학생 정보 수정</H2>
      <form action="http://localhost:3000/process_update" method="post">
      <input type="text" name="name_old" value="${studentName}" hidden>
        <p>이름 : <input type="text" name="name" value="${studentName}"></p>
        <p>설명 : 
          <textarea name="desc">${data}</textarea>
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
})


// 페이지 수정 처리
app.post('/process_update', (req, res) => {
  let postData = req.body

  let name = postData.name
  let oldName = postData.name_old
  let desc = postData.desc
  // 파일 이름을 변경한다.
  fs.rename(`./data/${oldName}`, `./data/${name}`, () => {

    fs.writeFile(`./data/${name}`, desc, err => {
      if (err) {
        console.error(err);
      } else {
        // file written successfully
        console.log('파일 저장 성공!!!')

        // url redirect!!
        // url redirect!!
      res.redirect(`/student/${name}`)
      }
    });
  })
})


// 루트 라우팅
app.get('/', (req, res) => {

  // 디렉터리에 있는 내용을 읽어온다.
  fs.readdir('./data', (err, files) => {
    let list = createList(files)

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