/**
 * 파일의 내용을 읽어온다.
 * https://nodejs.org/docs/latest/api/fs.html#fsreadfilepath-options-callback
 * https://nodejs.org/en/learn/manipulating-files/reading-files-with-nodejs 
 */

const fs = require('fs');   // file system 모듈 가져오기


// 파일을 읽어 온다.
// 첫 번째 인자에는 파일명을 입력한다.
// 두 번째 인자에는 문자열 인코딩 타입을 지정한다.
// 세 번째 인자에는 callback 함수를 정의하거나 지정한다.
fs.readFile('./data/정약용', 'utf8', (err, data) => {
  if (err) {
    // 에러이면 에러 로그를 출력한다.
    console.error(err);
    return;
  }

  // 데이터를 출력한다.
  console.log(data);
});