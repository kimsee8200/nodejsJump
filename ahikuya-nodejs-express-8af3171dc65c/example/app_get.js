const express = require('express')

const app = express()   // express 객체 생성
const port = 3000       // 사용할 포트 번호

// 기본 라우팅
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/students', (req, res) => {
  res.send('Hello Students!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})