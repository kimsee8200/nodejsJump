const http = require("http");
const url = require("url");
const qs = require("querystring");

const httpserver = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") {
    return;
  }
  //url 파싱
  let parsedUrl = url.parse(req.url);
  console.log(parsedUrl);
  let paresedQs = qs.parse(parsedUrl.query);
  console.log(paresedQs);
  let pathname = parsedUrl.pathname;
  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`${paresedQs.id}번째 페이지 입니다.`);
  } else if (pathname === "/about") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end("싺딹걱뀩");
  } else {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end("Not found");
  }
});

httpserver.listen(3000, () => {
  console.log("server is running");
});
