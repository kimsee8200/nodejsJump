const express = require('express')
var cookieSession = require('cookie-session')


const app = express()   // express 객체 생성

// Trust proxy setting
// proxy 설정 참고 : https://velog.io/@mochafreddo/Express-앱에서-프록시-서버를-사용할-때의-문제와-해결-방법
app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

app.get('/', function (req, res, next) {
  console.log(req.session)

  // Update views
  req.session.views = (req.session.views || 0) + 1

  req.session.user_id = "ahikuya"

  // Write response
  res.end(req.session.views + ' views')
})


app.listen(3000, () => {
  console.log('Appendix Server is Running....')
});