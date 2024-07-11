const express = require("express");
const url = require("url");
const fs = require("fs");
const qs = require("querystring");
const app = express();
const view = require("./viewModel");
const port = 8080;
const db = require("./DBModule");

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  let reqUrl = req.url;
  let parsedUrl = url.parse(reqUrl);
  let queryData = qs.parse(parsedUrl.query);
  let pathname = parsedUrl.pathname;
  db.query(`SELECT * FROM students`, (err, results) => {
    let list = view.createListForDB(results);
    let html = view.listHtml(list, "", "");

    // 한글 깨짐 방지 위해 charset=utf-8 적용
    res.send(html);
  });
});

app.get("/student/:name", (req, res) => {
  // 순서대로 실행, 만약 주소가 /:name라면, create를 주소에 넣으면 좋지 않은 결과를 초래하기 때문에, 주소를 넣어주거나, /create를 위로 올려준다.
  console.log(req.params);
  let studentName = req.params.name;
  let list = undefined;
  let html = undefined;
  db.query("SELECT * FROM students", (err, results) => {
    if (err) {
      throw err;
    }
    list = view.createListForDB(results);
    console.log(results);
  });
  db.query(
    `SELECT * FROM students WHERE name=?`,
    [studentName], // sql injection 예방
    (err, resul) => {
      if (err) {
        throw err;
      }
      console.log(resul);
      html = view.listHtml(list, studentName, resul[0].profile);
      res.send(html);
    }
  );
});

app.get("/create", (req, res) => {
  let html = view.inputHtml("", "", "process_create", "생성");
  res.send(html);
});

app.post("/process_create", (req, res) => {
  let postData = req.body;

  let name = postData.name;
  let data = postData.desc;
  console.log(name, data);
  db.query(
    `INSERT INTO students (name, profile, school_id) VALUES (?, ?, ?)`,
    [name, data, 1],
    (err, result) => {
      res.redirect(`/student/${name}`);
    }
  );
});

app.get("/update/:name", (req, res) => {
  let uName = req.params.name;
  db.query(`SELECT * FROM students WHERE name = ? `, [uName], (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    let html = view.inputHtml(uName, data[0].profile, "process_update", "수정");
    res.send(html);
  });
});

app.post("/process_update", (req, res) => {
  console.log(JSON.stringify(req.body));
  db.query(
    `UPDATE students SET name=?,profile=?,school_id=? WHERE name=?`,
    [req.body.name, req.body.desc, 1, req.body.name_old],
    (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log("파일 저장 성공!");

        res.redirect("/");
      }
    }
  );
});

app.post("/delete", (req, res) => {
  db.query(
    `DELETE FROM students WHERE name = ?`,
    [req.body.name],
    (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      res.redirect("/");
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
