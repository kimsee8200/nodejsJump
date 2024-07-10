const express = require('express')
const fs = require('fs')
const path = require('path')
const qs = require('querystring')
const bodyParser = require('body-parser')
const compression = require('compression')

const template = require('./lib/template')

const app = express()

// bodyParser 사용 설정
app.use(bodyParser.urlencoded({extended:false}))

// 압축 전송
app.use(compression())

app.use(express.static('public'))

// 미들웨어 만들어 사용
app.get('*', function(req, res, next) {
  fs.readdir('./data', (err, files) => {
    req.list = files
    next()
  })
})

// root 라우팅
app.get('/', (req, res) => {
  let title = 'Welcome'
  let desc = 'Hello, Node.js Express'

  let list = template.list(req.list)
  let html = template.html(title, list, 
    `<h2>${title}</h2>${desc}`, 
  `<a href="/create">create</a>
  <img src="/images/image.jpg" style="width:300px; display:block" />`,
)

  res.send(html)
})

// 상세보기 페이지 라우팅
app.get('/page/:pageId', (req, res, next) => {
  let filteredId = path.parse(req.params.pageId).base
  let list = template.list(req.list)
  fs.readFile(`data/${filteredId}`, 'utf8', (err, desc) => {
    if(err){
      next(err)
    } else {
      let title = req.params.pageId
      let html = template.html(title, list, 
        `<h2>${title}</h2>${desc}`,
        `<a href="/create">create</a> 
        <a href="/update/${title}">update</a>
        <form action="/delete_process" method="post">
          <input type="hidden" name="id" value="${title}">
          <input type="submit" value="delete">
        </form>
        `
      )
      res.send(html)
    }
    
    
  })
})

// 페이지 생성 라우팅
app.get('/create', (req, res) => {
  let title = 'WEB - create'

  let list = template.list(req.list)
  let html = template.html(title, list, 
    `
    <form action="/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></input></p>
      <p>
          <textarea name="desc" placeholder="description"></textarea>
      </p>
      <p>
          <input type="submit">
      </p>
    </form>
    `, 
    `<a href="/update/${title}">update</a>`
  )

  res.send(html)
})

// 페이지 생성 처리
app.post('/create_process', (req, res) => {
  let post = req.body
  let title = post.title
  let desc = post.desc
  console.log(post.title)
  fs.writeFile(`data/${title}`, desc, 'utf8', err => {
    res.redirect(`/page/${title}`)
  });
})

// 페이지 업데이트
app.get('/update/:pageId', (req, res) => {
  let list = template.list(req.list)
    
  let filteredId = path.parse(req.params.pageId).base
  fs.readFile(`data/${filteredId}`, 'utf8', (err, desc) => {
    let title = req.params.pageId
    let html = template.html(title, list, 
      `
      <form action="/update_process" method="post">
      <input type="hidden" name="id" value="${title}"></input>
        <p><input type="text" name="title" placeholder="title"
          value="${title}"></input></p>
        <p>
            <textarea name="desc" placeholder="description">${desc}</textarea>
        </p>
        <p>
            <input type="submit">
        </p>
      </form>
      `,
      `<a href="/create">create</a> <a href="/update/${title}">update</a>`)
    res.send(html)
  })
})

// 업데이트 처리
app.post('/update_process', (req, res) => {
  let post = req.body
  let id = post.id
  let title = post.title
  let desc = post.desc
  fs.rename(`data/${id}`, `data/${title}`, (err) => {
    fs.writeFile(`data/${title}`, desc, 'utf8', err => {
      res.redirect(`/page/${title}`)
    });
  })
})

// 삭제
app.post('/delete_process', (req, res) => {
  let post = req.body
  let id = post.id
  console.log(post)
  let filteredId = path.parse(id).base
  fs.unlink(`data/${filteredId}`, (err) => {
    res.redirect('/')
  })
})


// error 페이지
app.use((req, res) => {
  res.status(404).send('Sorry can not find that!!')
})

app.use((err, req, res, next) => {
  res.status(500).send('Something broke!')
})

app.listen(3000, () => {
    console.log("Express Server is Running...")
})