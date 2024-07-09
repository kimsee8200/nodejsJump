// 서버 사용을 위해 http 모듈을 불러와 http 변수에 할당한다.
const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("qs");

// http 모듈로 서버를 생성한다.
let server = http.createServer(function (req, res) {
  let reqUrl = req.url;
  let parsedUrl = url.parse(reqUrl);
  let pathname = parsedUrl.pathname;
  let queryData = qs.parse(parsedUrl.query);

  function listMaker(files) {
    let list = "";
    for (i = 0; i < files.length; i++) {
      list += `<tr>
      <td>${i}</td>
      <td><a href='./?name=${files[i]}'>${files[i]}</a></td>
      <td><a href='/update?name=${files[i]}'>수정</a></td>
      <!--<td><a href='/delete?name=${files[i]}'>삭제</a></td>-->
    </tr>`;
    }
    return list;
  }

  if (pathname === "/") {
    if (queryData.name === undefined) {
      fs.readdir("../data", (err, files) => {
        let list = listMaker(files);
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
        
          <h2>학생</h2>
        
          <table style="width:100%">
            <tr>
              <th>id</th>
              <th>이름</th>
              <th>설정</th>
            </tr>
            ${list}
          </table>
        
          <p>정약용은....</p>
        
        </body>
        
        </html>
      `;

        // 한글 깨짐 방지 위해 charset=utf-8 적용
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(html);
      });
    } else {
      fs.readdir("../data", (err, files) => {
        fs.readFile(`../data/${queryData.name}`, "utf-8", (err, data) => {
          if (err) {
            console.error(err);
            return;
          }

          let list = listMaker(files);

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
              <th>설정</th>
            </tr>
            ${list}
          </table>
  
          <h2>${queryData.name}</h2>
          <p>${data}</p>
  
          </body>
          </html>
    `;
          res.writeHead(200);
          res.end(html);
        });
      });
      //name!=undifined -> show detail.
    }
    // 디렉터리에 있는 내용을 읽어온다.
  } else if (pathname === "/create") {
    let html = `<!DOCTYPE html>
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
    <form action="http://localhost:8080/process_create" method="post">
      <p>이름 : <input type="text" name="name"></p>
      <p>설명 : 
        <textarea name="desc"></textarea>
      </p>
      <p>
        <input type="submit" value="저장">
      </p>
    </form>
    </body>
    
    </html>`;

    res.writeHead(200);
    res.end(html);
  } else if (pathname === "/process_create") {
    let postData = "";
    req.on("data", (data) => {
      postData = postData + data;
    });

    req.on("end", () => {
      let parsedQuery = qs.parse(postData);
      console.log(JSON.stringify(parsedQuery));
      fs.writeFile(`../data/${parsedQuery.name}`, parsedQuery.desc, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("파일 저장 성공!");

          res.writeHead(302, { location: "/" });
          res.end();
        }
      });
    });
  } else if (pathname === "/update") {
    fs.readFile(`../data/${queryData.name}`, "utf8", function (err, data) {
      if (err) {
        console.error(err);
      }
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
      <form action="http://localhost:8080/process_update" method="post">
      <input type="text" name="name_old" value="${queryData.name}" hidden>
        <p>이름 : <input type="text" name="name" value="${queryData.name}"></p>
        <p>설명 : 
          <textarea name="desc">${data}</textarea>
        </p>
        <p>
          <input type="submit" value="저장">
        </p>
      </form>
      </body>
  
      </html>
      `;
      res.writeHead(200);
      res.end(html);
    });
  } else if (pathname === "/process_update") {
    let postData = "";
    req.on("data", (data) => {
      postData = postData + data;
    });

    req.on("end", () => {
      let parsedQuery = qs.parse(postData);
      console.log(JSON.stringify(parsedQuery));
      fs.rename(
        `../data/${parsedQuery.name_old}`,
        `../data/${parsedQuery.name}`,
        () => {
          fs.writeFile(
            `../data/${parsedQuery.name}`,
            parsedQuery.desc,
            (err) => {
              if (err) {
                console.error(err);
              } else {
                console.log("파일 저장 성공!");

                res.writeHead(302, { location: "/" });
                res.end();
              }
            }
          );
        }
      );
    });
  } else if (pathname === "/delete") {
    let data = queryData.name;
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("no way out!");
  }
});
// listen 함수로 8080 포트를 가진 서버를 실행
server.listen(8080, function () {
  console.log("Server is running....");
});
