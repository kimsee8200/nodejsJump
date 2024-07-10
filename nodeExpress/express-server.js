const express = require("express");
const url = require("url");
const fs = require("fs");
const qs = require("querystring");
const app = express();
const view = require("./viewModel");
const port = 8080;

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  let reqUrl = req.url;
  let parsedUrl = url.parse(reqUrl);
  let queryData = qs.parse(parsedUrl.query);
  let pathname = parsedUrl.pathname;
  fs.readdir("./data", (err, files) => {
    let list = view.listMaker(files);
    let html = view.listHtml(list, "", "");

    // 한글 깨짐 방지 위해 charset=utf-8 적용
    res.send(html);
  });
});

app.get("/student/:name", (req, res) => {
  console.log(req.params);
  let studentName = req.params.name;
  fs.readdir("./data", (err, files) => {
    fs.readFile(`./data/${studentName}`, "utf-8", (err, data) => {
      if (err) {
        console.error(err);
        return;
      }

      let list = view.listMaker(files);
      let html = view.listHtml(list, studentName, data);

      res.send(html);
    });
  });
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
  fs.writeFile(`./data/${name}`, data, (err) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log("성공!");
      res.redirect(`/student/${name}`);
    }
  });
});

app.get("/update/:name", (req, res) => {
  let uName = req.params.name;
  fs.readFile(`./data/${uName}`, (err, data) => {
    if (err) {
      console.error(uName);
      return;
    }
    let html = view.inputHtml(uName, data, "process_update", "수정");
    res.send(html);
  });
});

app.post("/process_update", (req, res) => {
  console.log(JSON.stringify(req.body));
  fs.rename(`./data/${req.body.name_old}`, `./data/${req.body.name}`, () => {
    fs.writeFile(`./data/${req.body.name}`, req.body.desc, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("파일 저장 성공!");

        res.redirect("/");
      }
    });
  });
});

app.post("/delete", (req, res) => {
  fs.unlink(`./data/${req.body.name}`, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
