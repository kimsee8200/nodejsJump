const express = require("express");
var cookieParser = require("cookie-parser");

const app = express(); // express 객체 생성
app.use(cookieParser()); // cookieParser 사용 설정

app.get("/", (req, res) => {
  // 쿠키 읽기
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies);
  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);

  // 쿠키 쓰기
  res.cookie("user_name", "ahikuya2", { maxAge: 900000, httpOnly: true });
  res.cookie("user_id", "myId", { maxAge: 900000, httpOnly: true });

  res.send(JSON.stringify(req.cookies));
});

app.listen(3000, () => {
  console.log("Appendix Server is Running....");
});

// 창청동->창청인민근린공원->인신네거기->인민혁명거리->현충원->레니온사회대학교->아스필그라드중앙역->사회제1구청
// 당청사본부->혁명중앙광장->레니온중앙박물관->->한신동
