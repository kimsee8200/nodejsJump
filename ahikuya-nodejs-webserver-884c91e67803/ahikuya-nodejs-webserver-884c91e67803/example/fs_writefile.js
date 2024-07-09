/**
 * 내용을 파일에 저장한다.
 * https://nodejs.org/en/learn/manipulating-files/writing-files-with-nodejs 
 * https://nodejs.org/docs/latest/api/fs.html#fswritefilefile-data-options-callback
 */

const fs = require('fs');   // file system 모듈 가져오기

const content = 'Some content!';
fs.writeFile('./data/test.txt', content, err => {
  if (err) {
    console.error(err);
  } else {
    // file written successfully
    console.log('success!!')
  }
});