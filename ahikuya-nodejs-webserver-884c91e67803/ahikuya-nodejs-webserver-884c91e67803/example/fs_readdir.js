/**
 * 디렉터리에 있는 파일 목록을 읽어온다.
 */

const fs = require('fs');   // file system 모듈 가져오기

// fs 모듈의 readdir 함수를 이용한다.
// 첫 번째 인자에는 폴더의 경로를 지정한다.
// 두 번째 인자에는 callback 함수를 지정하거나 정의한다.
fs.readdir('./data', function (err, filelist) {
  
  // 결과로 각 파일의 이름이 담긴 배열을 반환한다.
  console.log(filelist);    // [ '이순신', '정약용' ]

});