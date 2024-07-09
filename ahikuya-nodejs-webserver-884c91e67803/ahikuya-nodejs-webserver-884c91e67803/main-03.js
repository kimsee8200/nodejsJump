/**
 * root(/)로 호출된 페이지를 '홈'으로 구성하고 그 외에에는 서버에러를 출력한다.
 */
const http = require('http')
const fs = require('fs')
const url = require('url')
const qs = require('querystring')


const app = http.createServer(function (req, res) {
  let reqUrl = req.url
  let parsedUrl = url.parse(reqUrl)
  let queryData = parsedUrl.query
  let pathname = url.parse(reqUrl).pathname
  console.log(`pathname=${pathname}, queryData=${queryData}`)

  if (pathname == '/') {
    // 디렉터리에 있는 내용을 읽어온다.
    fs.readdir('./data', (err, files) => {
      let list = ''
      for (i = 0; i < files.length; i++) {
        list += `
        <tr>
          <th>${i}</th>
          <th><a href='./?=${files[i]}'>${files[i]}</a></th>
        </tr>
        `
      }

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

      </body>
      </html>
      `
      res.writeHead(200)
      res.end(html)
    })
  } else {
    res.writeHead(404)
    res.end('Page Not Found!!')
  }
})

app.listen(3000, () => {
  console.log("Server is Running....")
})

