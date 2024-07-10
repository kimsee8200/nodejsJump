const express = require("express");
const app = express();
const port = 3000;

// rest api
// 라우팅 -> 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 응답하는 방법을 결정하는 것.
app.get("/", (req, res) => {
  res.send("HelloWorld!");
});

app.get("/student", (req, res) => {
  res.send("Hello student!");
});

app.post("/", (req, res) => {
  res.send("으시안 오옹 post");
});

app.put("/", (req, res) => {
  // 전체 수정
  res.send("으시안 오옹 put");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

//마리코스 시탈러
//블다린 라니온
//세오르스 나사리오
//케모르디 블리스
