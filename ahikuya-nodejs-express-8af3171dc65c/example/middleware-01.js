const express = require('express')

var app = express();

// 마운트 경로가 없는 미들웨어 함수
// 이 함수는 앱이 요청을 수신할 때마다 실행된다.
app.use(function (req, res, next) {
  console.log('Time:', Date.now());

  // 다음 라우트를 실행한다.
  next();   
});

app.get('/', (req, res) => {
  res.send('Hello Node.js!!')
})

app.listen(3000, () => {
  console.log('Server is running...')
})