function listMaker(files) {
  let list = "";
  for (i = 0; i < files.length; i++) {
    list += `<tr>
    <td>${i}</td>
    <td><a href='/student/${files[i]}'>${files[i]}</a></td>
    <td><a href='/update/${files[i]}'>수정</a>
      <hr>
      <form action="http://localhost:8080/delete" method="post">
        <input type = "text" name="name" value = "${files[i]}" hidden>
        <input type = "submit" value = "삭제">
      </form>
    </td>
    <!--<td></td>-->
  </tr>`;
  }
  return list;
}

function inputHtml(name, data, link, valname) {
  let html = `<!DOCTYPE html>
  <html>
  
  <style>
    table,
    th,
    td {
      border: 1px solid black;
      border-collapse: collapse;
    }
  </style>
  
  <head>
    <meta charset="utf-8">
  </head>
  
  <body>
  <H2>학생 정보 ${valname}</H2>
  <form action="http://localhost:8080/${link}" method="post">
  <input type="text" name="name_old" value="${name}" hidden>
    <p>이름 : <input type="text" name="name" value = "${name}"></p>
    <p>설명 : 
      <textarea name="desc">${data}</textarea>
    </p>
    <p>
      <input type="submit" value="저장">
    </p>
  </form>
  </body>
  
  </html>`;

  return html;
}

function listHtml(list, name, data) {
  let html = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
    </head>
    <style>
      table, th, td {
        border:1px solid black;
        border-collapse: collapse;
      }
    </style>
  <body>

  <h2>학생</h2>

  <table style="width:100%">
    <tr>
      <th>id</th>
      <th>이름</th>
      <th>설정</th>
    </tr>
    ${list}
  </table>

  <a href="/create">입력하기</a>

  <h2>${name}</h2>
  <p>${data}</p>

  </body>
  </html>`;

  return html;
}

function createListForDB(students) {
  let list = "";
  let item;
  for (i = 0; i < students.length; i++) {
    item = students[i];
    list += `
      <tr>
        <th>${item.id}</th>
        <th><a href='/student/${item.name}'>${item.name}</a></th>
        <th><a href="/update/${item.name}">수정</a>
        <form action="/delete" method="post">
          <input type="hidden" name="name" value="${item.name}">
          <input type="submit" value="삭제">
        </form>
      </tr>
      `;
  }

  return list;
}

module.exports = {
  listHtml,
  inputHtml,
  listMaker,
  createListForDB,
};

// exports.views = {
//   list : `` -> static한 자원 모듈.
// }
