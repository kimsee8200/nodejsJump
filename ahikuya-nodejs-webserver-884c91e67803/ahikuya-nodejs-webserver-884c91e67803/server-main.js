// 서버 사용을 위해 http 모듈을 불러와 http 변수에 할당한다.
const http = require("http");
const fs = require("fs");

// http 모듈로 서버를 생성한다.
let server = http.createServer(function (req, res) {
  // 디렉터리에 있는 내용을 읽어온다.
  fs.readdir("./data", (err, files) => {
    let list = "";
    for (i = 0; i < files.length; i++) {
      list += `<tr><td>${i}</td> <td>${files[i]}</td></tr>`;
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

  <h2>학생</h2>

  <table style="width:100%">
    <tr>
      <th>id</th>
      <th>이름</th>
    </tr>
    ${list}
  </table>

  <p>정약용은....</p>

</body>

</html>
  `;

    // 한글 깨짐 방지 위해 charset=utf-8 적용
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(html);
  });

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("Hello Node.js World!");
});
// listen 함수로 8080 포트를 가진 서버를 실행
server.listen(8080, function () {
  console.log("Server is running....");
});
