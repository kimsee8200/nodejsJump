const express = require("express");

var app = express();

// 일련의 미들웨어 함수를 하나의 마운트 위치에 로드
// 아래 예는 /user/:id 경로에 대한 모든 유형의 HTTP 요청에 대한 요청 정보를 출력하는 미들웨어 하위 스택을 나타낸다.
app.use(
  "/user/:id",
  function (req, res, next) {
    console.log("Request URL:", req.originalUrl);
    next();
  },
  function (req, res, next) {
    console.log("Request Type:", req.method);
    next();
  }
);

app.get("*", (req, res) => {
  res.send("Hello Node.js!!");
});

app.listen(3000, () => {
  console.log("Server is running...");
});
