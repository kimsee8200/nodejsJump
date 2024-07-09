const http = require('http')
const fs = require('fs')
const url = require('url')

const app = http.createServer(function (req, res) {
  let reqUrl = req.url
  let parsedUrl = url.parse(reqUrl)
  let pathname = parsedUrl.pathname
  let queryData = parsedUrl.query
  console.log(`pathname=${pathname}, queryData=${queryData}`)

  if (pathname == '/') {

    // 디렉터리에 있는 내용을 읽어온다.
    fs.readdir('./data', (err, files) => {
      let list = ''
      for(i=0; i<files.length; i++){
        list += `index=${i}, name=${files[i]}`
        list += '\n'
      }

       // 한글 깨짐 방지 위해 charset=utf-8 적용
      res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'})
      res.end(list)
    })
  }
})

app.listen(3000, () => {
  console.log("Server is Running....")
})

