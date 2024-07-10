const express = require('express')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')

const app = express()   // express 객체 생성
const port = 3000       // 사용할 포트 번호


// 학생 목록을 생성하여 반환한다.
function createList(files) {
  let list = ''
  for (i = 0; i < files.length; i++) {
    list += `
      <tr>
        <th>${i}</th>
        <th><a href='./?name=${files[i]}'>${files[i]}</a></th>
        <th><a href="/update?name=${files[i]}">수정</a>
        <form action="/process_delete" method="post">
          <input type="hidden" name="name" value="${files[i]}">
          <input type="submit" value="삭제">
        </form>
      </tr>
      `
  }

  return list
}

// pretty url(clean url, semantic url)
app.get('/student/:name', (req, res) => {
  console.log(req.params);
  res.send(req.params)
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