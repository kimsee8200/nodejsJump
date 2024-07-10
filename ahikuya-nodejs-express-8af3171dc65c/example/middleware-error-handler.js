const express = require("express");

var app = express();
//express.static. 유일한 기본제공 미들웨어.

app.get("/error", (req, res, next) => {
  next(new Error("에러 발생")); // next() 함수를 사용해서 에러 처리 핸들러로 에러 전달.
});

// 에러 처리 핸들러 미들웨어 함수
// 다른 미들웨어 함수와 동일반 방법으로 다음과 같이 오류 처리 미들웨어 함수를 정의할 수 있지만,
// 오류 처리 함수는 3개가 아닌 4개의 인수,
// 구체적으로 말하면 (err, req, res, next) 시그니처를 갖는다는 점이 다르다.
app.use(function (err, req, res, next) {
  // 상태코드 500, 에러 메시지 전달
  res.status(500).json({ statusCode: res.statusCode, errMessage: err.message });
});

app.listen(3000, () => {
  console.log("Server is running...");
});
