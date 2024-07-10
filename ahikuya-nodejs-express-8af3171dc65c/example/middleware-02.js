const express = require('express')

var app = express();


// 특정 경로에 마운트되는 미들웨어 함수
// 이 함수는 /user/:id 경로에 대한 모든 유형의 HTTP 요청에 대해 실행된다.
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});


app.get('*', (req, res) => {
  res.send('Hello Node.js!!')
})

app.listen(3000, () => {
  console.log('Server is running...')
})