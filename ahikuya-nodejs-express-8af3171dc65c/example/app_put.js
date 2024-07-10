const express = require('express')

const app = express()   // express 객체 생성
const port = 3000       // 사용할 포트 번호

// PUT request
app.put('/user', (req, res) => {
  res.send('Got a PUT request at /user')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})