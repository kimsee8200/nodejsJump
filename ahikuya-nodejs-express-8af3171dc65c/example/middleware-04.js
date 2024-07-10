const express = require('express')

var app = express();


// 라우트 핸들러를 이용하면 하나의 경로에 대해 여러 라우트를 정의할 수 있다.
// 아래의 예에서는 /user/:id 경로에 대한 GET 요청에 대해 2개의 라우트를 정의한다. 
// 두 번째 라우트는 어떠한 문제도 발생키지 않지만, 
// 첫 번째 라우트가 요청-응답 주기를 종료시키므로 두 번째 라우트는 절대로 호출되지 않는다.
// 다음 예에는 /user/:id 경로에 대한 GET 요청을 처리하는 미들웨어 하위 스택이 표시되어 있습니다.
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});


app.get('*', (req, res) => {
  res.send('Hello Node.js!!')
})

app.listen(3000, () => {
  console.log('Server is running...')
})