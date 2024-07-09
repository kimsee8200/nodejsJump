const http = require("http");
const querystring = require("querystring");

// 서버 생성
var server = http.createServer(function (request, response) {
  // post로 전달된 데이터를 담을 변수를 선언
  var postdata = "";
  // request객체의 on( ) 함수로 'data' 이벤트를 연결
  request.on("data", function (data) {
    // body에 있는 데이터를 읽음.
    // data 이벤트가 발생할 때마다 callback을 통해 postdata 변수에 값을 결합하여 저장
    postdata = postdata + data;
  });

  // request객체의 on( ) 함수로 'end' 이벤트를 연결
  request.on("end", function () {
    // end 이벤트가 발생하면(end는 한번만 발생한다) 저장해둔 postdata 를 querystring 으로 객체화
    var parsedQuery = querystring.parse(postdata);
    // 객체화된 데이터를 로그로 출력
    console.log(parsedQuery);
    // HEADER에 성공코드(200) 지정
    response.writeHead(200, { "Content-Type": "text/html" });
    // 데이터를 담아서 클라이언트에 응답처리
    response.end("id=" + parsedQuery.id);
  });
});
server.listen(8080, function () {
  console.log("Server is running...");
});
