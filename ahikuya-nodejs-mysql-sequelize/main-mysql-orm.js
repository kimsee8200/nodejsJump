const express = require("express");
const sequelize = require("./models").sequelize;
const app = express();

// Sequelize 객체의 sync() 함수를 호출해서 모델에 정의한 테이블이 없을 때 생성해 준다.
sequelize.sync();

// students 테이블에 대한 squelize 모델
const { students } = require("./models");

// 클라이언트 요청 body를 json으로 파싱
app.use(
  express.json({
    limit: "50mb", // 최대 50메가
  })
);

app.listen(3000, () => {
  console.log("Server is running");
});

// 학생 정보 조회 라우터
app.get("/api/students", async (req, res) => {
  // students 테이블의 모든 데이터 조회
  const studentsData = await students.findAll();
  console.log(studentsData);
  res.send(studentsData);
});

// 학생 정보 추가
app.post("/api/students/insert", async (req, res) => {
  const { name, age, address, profile, school_id } = req.body.params;
  const result = await students.create({
    name: name,
    age: age,
    address: address,
    profile: profile,
    school_id: school_id,
  });
  res.send(result);
});

// 학생 정보 수정
app.put("/api/students/update", async (req, res) => {
  let newData = req.body.params[0]; // 수정할 데이터
  let name = req.body.params[1]; // 조회 조건
  const result = await students.update(newData, {
    where: { name: name },
  });
  res.send(result);
});

// 학생 정보 삭제
app.delete("/api/students/delete/:name", async (req, res) => {
  console.log(req.params);

  const { name } = req.params;
  const result = await students.destroy({
    where: { name: name },
  });
  console.log(result);
  res.send("delete success!!");
});

// 창청동 -> 사회제1구청 -> 당청사 -> 노이동 -> 아스필그라드역-> 노이동-> 당청사 -> 사회제1구청 -> 창청동
