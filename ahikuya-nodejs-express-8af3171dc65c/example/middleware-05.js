const express = require("express");

var app = express();

// router는 페이지 이동 등의 행위
// 미들웨어는 전처리.

// 라우터 미들웨어 스택의 나머지 미들웨어 함수들을 건너뛰려면
// next('route')를 호출하여 제어를 그 다음 라우트로 전달한다.
// 참고: next('route')는 app.METHOD() 또는 router.METHOD() 함수를 이용해 로드된 미들웨어 함수에서만 작동한다.
// 다음 예에는 /user/:id 경로에 대한 GET 요청을 처리하는 미들웨어 하위 스택이 표시되어 있다.
app.get(
  "/user/:id",
  function (req, res, next) {
    //  user id가 0이면 다음 라우트를 실행한다.
    if (req.params.id == 0) next("route");
    // 0이 아니면 현재 스택의 다음 미들웨어를 실행한다.
    else next(); //
  },
  function (req, res, next) {
    // render a regular page
    res.send(req.params.id);
  }
);

// handler for the /user/:id path, which renders a special page
app.get("/user/:id", function (req, res, next) {
  res.send(`0이면 실행한다. ${req.params.id}`);
});

app.get("*", (req, res) => {
  res.send("Hello Node.js!!");
});

app.listen(3000, () => {
  console.log("Server is running...");
});
