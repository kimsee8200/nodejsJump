const http = require("http");
const url = require("url");
const cookie = require("cookie"); // cookie 모듈을 사용한다.

let server = http.createServer((request, response) => {
  let reqUrl = request.url;
  let parsedUrl = url.parse(reqUrl);
  let pathname = parsedUrl.pathname;
  console.log(pathname);

  if (pathname === "/") {
    // cookie 데이터는 header 에 저장한다.
    // cookie를 쓴다.
    response.writeHead(200, {
      "Set-Cookie": ["user_name=ahikuya", "user_token=ababab!!!!"],
    });

    response.end("Write Cookie!!");
  } else if (pathname === "/cookie") {
    // cookie 데이터를 읽어온다.
    let cookieData = request.headers.cookie;
    console.log(cookieData);
    var parsedCookie = {};

    if (cookieData !== undefined) {
      parsedCookie = cookie.parse(cookieData);
    }

    let result = JSON.stringify(parsedCookie); // json 형태로 출력한다.
    //let result = `userName=${parsedCookie.user_name}, userToken=${parsedCookie.user_token}`
    response.writeHead(200);
    response.end(result);
  } else if (pathname === "/permanent_cookie") {
    // Max-Age(Permanent) option - 웹 브라우저가 종료되어도 정해진 기간까지 살아남는 쿠키
    response.writeHead(200, {
      "Set-Cookie": [
        `user_name=ahikuya; Max-Age=${60 * 60 * 24 * 30}`, // 30일 동안 유지
        `user_id=ahikuya2; Max-Age=${60 * 60 * 24 * 7}`, // 일주일 유지
      ],
    });
    response.end("Permanent Cookie!!");
  } else if (pathname === "/secure_cookie") {
    // secure, httpOnly option
    response.writeHead(200, {
      "Set-Cookie": [
        "secure_name=ahikuya; Secure",
        "secure_id=ahikuya2; HttpOnly",
      ],
    });
    response.end("Secure Cookie!!");
  } else if (pathname === "/cookie/path_cookie") {
    // path, domain option
    response.writeHead(200, {
      "Set-Cookie": [
        "path_name=ahikuya; Path=/cookie", // cookie 하위 패쓰에서만 접근 가능
        "domain_id=ahikuya2; Domain=ahikuya.com", // 도메인이 다르면 사용 불가
      ],
    });
    response.end("Path&Domain Cookie!!");
  } else {
    response.writeHead(404);
    response.end("Not Found!!");
  }
});

server.listen(3000, () => {
  console.log("Server is Running....");
});
