// 서버 사용을 위해 http 모듈을 불러와 http 변수에 할당한다.
const http = require('http');

// url 사용
const url = require('url');
// querystring 사용
const querystring = require('querystring');

// 서버 생성
let server = http.createServer(function (req, res) {
  // url 파싱
  let parsedUrl = url.parse(req.url);
  console.log(parsedUrl);
  let pathname = parsedUrl.pathname
  if (pathname === '/') {
    // Query String 부분만 객체화
    let parsedQuery = querystring.parse(parsedUrl.query);
    console.log(parsedQuery);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello Node.js World!');
  }

});


server.listen(8080, function () {
  console.log('Server is running...');
});
