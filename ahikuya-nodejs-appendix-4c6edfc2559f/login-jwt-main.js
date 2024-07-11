const express = require("express");
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken"); // jwt 모듈을 불러온다.

const app = express(); // express 객체 생성
const port = 3000; // 사용할 포트 번호

app.use(cookieParser()); //

// bodyParser 사용 설정
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const SECRET_KEY = "secret ahikuya";

// 사용자 정보를 저장할 데이터베이스
const userList = new Map();

let tokenObject = {}; // Refresh Token을 저장할 Object (실습을 위한 DB 대용)

// Access Token 생성
function createAccessToken(id) {
  const accessToken = jwt.sign(
    { id: id }, // JWT 데이터
    SECRET_KEY, // 비밀키 (환경변수(.env)로 전달해주자)
    { expiresIn: "10s" }
  ); // Access Token이 10초 뒤에 만료되도록 설정

  return accessToken;
}

// Refresh Token 생성
function createRefreshToken() {
  const refreshToken = jwt.sign(
    {}, // JWT 데이터
    SECRET_KEY, // 비밀키
    { expiresIn: "7d" }
  ); // Refresh Token이 7일 뒤에 만료되도록 설정

  return refreshToken;
}

// Access Token 검증
function validateAccessToken(accessToken) {
  try {
    jwt.verify(accessToken, SECRET_KEY); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Refresh Token을 검증합니다.
function validateRefreshToken(refreshToken) {
  try {
    jwt.verify(refreshToken, SECRET_KEY); // JWT를 검증합니다.
    return true;
  } catch (error) {
    return false;
  }
}

// Access Token의 Payload를 가져옵니다. // payload? jwt body 내용.
function getAccessTokenPayload(accessToken) {
  try {
    const payload = jwt.verify(accessToken, SECRET_KEY); // JWT에서 Payload를 가져옵니다.
    return payload;
  } catch (error) {
    return null;
  }
}

// 루트 라우팅
app.get("/", (req, res) => {
  console.log(req.session);
  // 'user'라는 쿠키 데이터를 가져옴
  // 쿠키가 존재하지 않을 경우 로그인이 되지 않았다는 뜻
  //const user = req.session[COOKIE_KEY_USER]

  let isLogin = false;
  //console.log(req.params)

  console.log(userList);

  let content = "";
  if (isLogin) {
    content += `
    <h2>${user_id} 님 환영합니다.</h2>
    <button type="button" onclick="location.href='/logout' ">로그아웃</button>
    `;
  } else {
    content += `
    <button type="button" onclick="location.href='/signup' ">회원가입</button>
    <button type="button" onclick="location.href='/login' ">로그인</button>
    `;
  }

  let html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>HOME</title>
    </head>
  <body>

  <h2>Hello Node.js World</h2>
    ${content}
  </body>
  </html>
  `;
  res.send(html);
});

app.get("/user/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);

  let isLogin = false;
  if (userId == undefined) {
  } else {
    // 토큰 검증
    const accessToken = req.cookies.accessToken; // 쿠키에서 엑세스토큰 획득
    const refreshToken = req.cookies.refreshToken; // 쿠키에서 리프레시토큰 획득
    console.log(accessToken);

    // 쿠키에 토큰이 없을 경우 (재 로그인)
    if (!refreshToken)
      return res
        .status(400)
        .json({ message: "Refresh Token이 존재하지 않습니다." });
    if (!accessToken)
      return res
        .status(400)
        .json({ message: "Access Token이 존재하지 않습니다." });

    // 쿠키 유효성 검증
    const isAccessTokenValidate = validateAccessToken(accessToken);
    const isRefreshTokenValidate = validateRefreshToken(refreshToken);

    // 리프레시 토큰 만료 시 (재 로그인 유도)
    if (!isRefreshTokenValidate)
      return res
        .status(419)
        .json({ message: "Refresh Token이 만료되었습니다." });

    // 엑세스 토큰 만료 시 리프레시 토큰을 활용하여 재발급 한다.
    if (!isAccessTokenValidate) {
      const accessTokenId = tokenObject[refreshToken];
      if (!accessTokenId)
        return res
          .status(419)
          .json({
            message: "Refresh Token의 정보가 서버에 존재하지 않습니다.",
          });

      const newAccessToken = createAccessToken(accessTokenId);
      res.cookie("accessToken", newAccessToken);
      return res.json({ message: "Access Token을 새롭게 발급하였습니다." });
    }

    // 쿠키 인증을 성공하면 토큰에 저장된 유저 id를 가져와 앞으로 활용한다.
    const { id } = getAccessTokenPayload(accessToken);

    let user = userList[id];
    console.log(user);

    isLogin = true;
  }

  let content = "";
  if (isLogin) {
    content += `
    <h2>${userId} 님 환영합니다.</h2>
    <button type="button" onclick="location.href='/logout' ">로그아웃</button>
    `;
  } else {
    content += `
    <button type="button" onclick="location.href='/signup' ">회원가입</button>
    <button type="button" onclick="location.href='/login' ">로그인</button>
    `;
  }

  let html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>HOME</title>
    </head>
  <body>

  <h2>Hello Node.js World</h2>
    ${content}
  </body>
  </html>
  `;
  res.send(html);
});

// 회원 가입 페이지
app.get("/signup", (req, res) => {
  let html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>HOME</title>
    </head>

    <body>
    <h2>회원가입</h2>

    <form method="POST" action="/signup">
      <label for="user_id">아이디: </label><input type="text" name="user_id" />
      <br />
      <label for="user_pw">비밀번호: </label><input type="password" name="user_pw" />
      <br />
      <label for="user_name">이름: </label><input type="text" name="user_name" />
      <br />
      <button>Sign Up</button>
    </form>
    </body>
  </html>
  `;
  res.send(html);
});

// 회원 가입 처리
app.post("/signup", (req, res) => {
  const { user_id, user_name, user_pw } = req.body;

  const exists = userList.get(user_id);
  // 이미 존재하는 user_id이면 경우 회원 가입 실패
  if (exists) {
    res.status(400).send(`${user_id} 아이디는 이미 사용 중입니다.`);
    return;
  }

  // 아직 가입되지 않은 username인 경우 db에 저장
  // KEY = username, VALUE = { name, password }
  const newUser = {
    user_id,
    user_name,
    user_pw,
  };
  userList.set(user_id, newUser);

  // 가입 완료 후, 루트 페이지로 이동
  res.redirect("/");
});

// 로그인 페이지
app.get("/login", (req, res) => {
  let html = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>HOME</title>
    </head>

    <body>
    <h2>로그인</h2>

    <form method="POST" action="/login">
      <label for="user_id">아이디: </label><input type="text" name="user_id" />
      <br />
      <label for="user_pw">비밀번호: </label><input type="password" name="user_pw" />
      <br />
      <button>Log In</button>
    </form>
    </body>
  </html>
  `;
  res.send(html);
});

// 로그인 처리
app.post("/login", (req, res, next) => {
  let postData = req.body;
  let user_id = postData.user_id;
  let user_pw = postData.user_pw;
  console.log(user_id, user_pw);

  // 사용자가 입력한  id를 이용해 일치하는 사용자가 있는지 조회한다.
  let user = userList.get(user_id);
  console.log(user);

  if (user != undefined) {
    // 사용자 목록에 일치하는 user가 있으면
    if (user.user_pw === user_pw) {
      const accessToken = createAccessToken(user_id);
      const refreshToken = createRefreshToken();

      tokenObject[refreshToken] = user_id; // Refresh Token을 가지고 해당 유저의 정보를 서버에 저장한다.
      res.cookie("accessToken", accessToken); // Access Token을 Cookie에 전달한다.
      res.cookie("refreshToken", refreshToken); // Refresh Token을 Cookie에 전달한다.

      res.redirect(`/user/${user_id}`); // 로그인 후 홈 화면으로 이동
    } else {
      console.log("비밀번호가 일치하지 않습니다.");
      res.redirect("/"); // 홈 화면으로 이동
    }
  } else {
    console.log("사용자가 존재하지 않습니다.");
    res.redirect("/"); // 홈 화면으로 이동
  }
});

// 로그아웃 처리
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/"); // 로그인 후 홈 화면으로 이동
  });
});

app.listen(port, () => {
  console.log(`JWT Server is running... listening on port ${port}`);
});
