// session-file-store 사용하기

const express = require('express')
const session = require('express-session')
// session-file-store 모듈 불러오기
const fileStore = require('session-file-store')(session)


const app = express()   // express 객체 생성

// Trust proxy setting
// proxy 설정 참고 : https://velog.io/@mochafreddo/Express-앱에서-프록시-서버를-사용할-때의-문제와-해결-방법
app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: 'secret key', // 암호화하는데 쓰일 키
  resave: false,        // 세션에 변경 사항이 없어도 항상 다시 저장할지 여부
  saveUninitialized: true,    // 초기화되지 않은 세션을 스토어(저장소)에 강제로 저장할지 여부
  cookie: {
    httpOnly: true,   // true이면 클라이언트 자바스크립에서 document.cookie로 쿠키 정보를 볼 수 없음
    secure: false,     // true이면 https 환경에서만 쿠키 정보를 주고 받도록 처리
    maxAge: 60000     // 쿠키가 유지되는 시간 (밀리세컨드 단위)
  },
  store: new fileStore()    // fileStore 사용
}))

// Access the session as req.session
app.get('/', function(req, res, next) {
  console.log(req.session)

  req.session.user_id = "hello";
  req.session.user_name = "ahikuya"

  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>id: ' + req.session.id + '</p>')
    res.write('<p>name: ' + req.session.user_name + '</p>')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})


app.listen(3000, () => {
  console.log('Appendix Server is Running....')
});