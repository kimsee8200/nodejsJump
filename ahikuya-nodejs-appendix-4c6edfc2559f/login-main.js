const express = require('express')
const session = require('express-session')
// session-file-store 모듈 불러오기
const fileStore = require('session-file-store')(session)

const app = express()   // express 객체 생성
const port = 3000       // 사용할 포트 번호


// bodyParser 사용 설정
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 60000
  },
  store: new fileStore()    // 세션 저장소로 fileStore 사용
}))

// KEY=VALUE 형태로 브라우저에 저장되는 쿠키의 KEY
const COOKIE_KEY_USER = 'USER'

// 사용자 정보를 저장할 데이터베이스
const userList = new Map()

// 루트 라우팅
app.get('/', (req, res) => {
  console.log(req.session)
  // 'user'라는 쿠키 데이터를 가져옴
  // 쿠키가 존재하지 않을 경우 로그인이 되지 않았다는 뜻
  //const user = req.session[COOKIE_KEY_USER]

  let user_id = req.session.user_id
  let isLogin = req.session.isLogin
  //console.log(req.params)

  console.log(userList)

  let content = ''
  if (isLogin) {
    content += `
    <h2>${user_id} 님 환영합니다.</h2>
    <button type="button" onclick="location.href='/logout' ">로그아웃</button>
    `
  } else {
    content += `
    <button type="button" onclick="location.href='/signup' ">회원가입</button>
    <button type="button" onclick="location.href='/login' ">로그인</button>
    `
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
  `
  res.send(html)
})

// 회원 가입 페이지
app.get('/signup', (req, res) => {

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
  `
  res.send(html)
})

// 회원 가입 처리
app.post('/signup', (req, res) => {
  const { user_id, user_name, user_pw } = req.body
  const exists = userList.get(user_id)

  // 이미 존재하는 user_id이면 경우 회원 가입 실패
  if (exists) {
      res.status(400).send(`${user_id} 아이디는 이미 사용 중입니다.`)
      return
  }

  // 아직 가입되지 않은 username인 경우 db에 저장
  // KEY = username, VALUE = { name, password }
  const newUser = {
      user_id,
      user_name,
      user_pw,
  }
  userList.set(user_id, newUser)

  // db에 저장된 user 객체를 문자열 형태로 변환하여 쿠키에 저장
  // { "user_id": "abcd", "user_name": "efgh", "user_pw": "1234" } 형태로 저장
  //res.cookie(COOKIE_KEY_USER, JSON.stringify(newUser))

  // 가입 완료 후, 루트 페이지로 이동
  res.redirect('/')
})


// 로그인 페이지
app.get('/login', (req, res) => {

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
  `
  res.send(html)
})

// 로그인 처리
app.post('/login', (req, res, next) => {
  let postData = req.body
  let user_id = postData.user_id
  let user_pw = postData.user_pw
  console.log(user_id, user_pw)

  // 사용자가 입력한  id를 이용해 일치하는 사용자가 있는지 조회한다.
  let user = userList.get(user_id)
  console.log(user)

  if(user != undefined){
    // 사용자 목록에 일치하는 user가 있으면
    if(user.user_pw === user_pw){
      req.session.isLogin = true
      req.session.user_id = user_id
      //req.session.user_pw = user_pw
      
      req.session.save(err => {
        if (err) throw err
        res.redirect('/')   // 로그인 후 홈 화면으로 이동
      })
    }else{
      console.log('비밀번호가 일치하지 않습니다.')
      res.redirect('/')   // 홈 화면으로 이동
    }
    
  }else{
    console.log('사용자가 존재하지 않습니다.')
    res.redirect('/')   // 홈 화면으로 이동
  }

})

// 로그아웃 처리
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err
    res.redirect('/')   // 로그인 후 홈 화면으로 이동
  })
})

app.listen(port, () => {
  console.log(`Login Server is running... listening on port ${port}`)
})