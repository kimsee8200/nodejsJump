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
  let pathname = parsedUrl.pathname
  let parsedQuery = qs.parse(parsedUrl.query)
  console.log(`pathname=${pathname}, parsedQuery=${JSON.stringify(parsedQuery)}`)

  if (pathname == '/') {
    if (parsedQuery.name == undefined) {
      // 디렉터리에 있는 내용을 읽어온다.
      fs.readdir('./data', (err, files) => {
        let list = ''
        for (i = 0; i < files.length; i++) {
          list += `
          <tr>
            <th>${i}</th>
            <th><a href='./?name=${files[i]}'>${files[i]}</a></th>
            <th><a href="/update?name=${files[i]}">수정</a>|<a href="/process_delete?name=${files[i]}">삭제</a></th>
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
            <th>편집</th>
          </tr>
          ${list}
        </table>
        <p><a href="/create">학생 추가</a></p>
        </body>
        </html>
        `
        res.writeHead(200)
        res.end(html)
      })
    } else {
      // 디렉터리에 있는 내용을 읽어온다.
      fs.readdir('./data', (err, files) => {
        // 파일의 내용을 읽어온다.
        fs.readFile(`./data/${parsedQuery.name}`, 'utf8', function (err, data) {
          if (err) {
            console.error(err)
            return
          }

          let list = ''
          for (i = 0; i < files.length; i++) {
            list += `
            <tr>
              <th>${i}</th>
              <th><a href='./?name=${files[i]}'>${files[i]}</a></th>
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
  
          <h2>${parsedQuery.name}</h2>
          <p>${data}</p>
  
          </body>
          </html>
    `
          res.writeHead(200)
          res.end(html)
        })


      })

    }
  } else if (pathname === '/create') {
    // 데이터 추가하기
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
    res.writeHead(200)
    res.end(html)

  } else if (pathname === '/process_create') {
    // post로 전달된 데이터를 담을 변수를 선언
    var postdata = '';
    // request객체의 on( ) 함수로 'data' 이벤트를 연결
    req.on('data', function (data) {
      // data 이벤트가 발생할 때마다 callback을 통해 postdata 변수에 값을 결합하여 저장
      postdata = postdata + data;
    });

    // request객체의 on( ) 함수로 'end' 이벤트를 연결
    req.on('end', function () {
      // end 이벤트가 발생하면(end는 한번만 발생한다) 저장해둔 postdata 를 querystring 으로 객체화
      var parsedQuery = qs.parse(postdata);
      // 객체화된 데이터를 로그로 출력
      console.log(JSON.stringify(parsedQuery));

      fs.writeFile(`./data/${parsedQuery.name}`, parsedQuery.desc, err => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
          console.log('파일 저장 성공!!!')

          // url redirect!!
          res.writeHead(302, { location: '/' });
          res.end()
        }
      });
    });
  } else if (pathname === '/update') {
    // 데이터 수정하기
    // 수정 전의 이름을 전달하기 위해 hidden 속성의 input 을 추가한다.
    fs.readFile(`./data/${parsedQuery.name}`, 'utf8', function (err, data) {
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
      <input type="text" name="name_old" value="${parsedQuery.name}" hidden>
        <p>이름 : <input type="text" name="name" value="${parsedQuery.name}"></p>
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
      res.writeHead(200)
      res.end(html)
    })

  } else if (pathname === '/process_update') {
    // post로 전달된 데이터를 담을 변수를 선언
    var postdata = '';
    // request객체의 on( ) 함수로 'data' 이벤트를 연결
    req.on('data', function (data) {
      // data 이벤트가 발생할 때마다 callback을 통해 postdata 변수에 값을 결합하여 저장
      postdata = postdata + data;
    });

    // request객체의 on( ) 함수로 'end' 이벤트를 연결
    req.on('end', function () {
      // end 이벤트가 발생하면(end는 한번만 발생한다) 저장해둔 postdata 를 querystring 으로 객체화
      var parsedQuery = qs.parse(postdata);
      // 객체화된 데이터를 로그로 출력
      console.log(JSON.stringify(parsedQuery));

      // 파일 이름을 변경한다.
      fs.rename(`./data/${parsedQuery.name_old}`, `./data/${parsedQuery.name}`, () => {

        fs.writeFile(`./data/${parsedQuery.name}`, parsedQuery.desc, err => {
          if (err) {
            console.error(err);
          } else {
            // file written successfully
            console.log('파일 저장 성공!!!')

            // url redirect!!
            res.writeHead(302, { location: '/' });
            res.end()
          }
        });
      })
    });
  } else if (pathname === '/process_delete') {
    // 데이터 삭제!!
    // 파일을 삭제한다.
    fs.unlink(`./data/${parsedQuery.name}`, function (err) {
      if (err) {
        console.log("Error : ", err)
        return
      }

      console.log('삭제 성공!!')
      // url redirect!!
      res.writeHead(302, { location: '/' });
      res.end()
    })
  } else {
    res.writeHead(404)
    res.end('Page Not Found!!')
  }
})

app.listen(3000, () => {
  console.log("Server is Running....")
})

