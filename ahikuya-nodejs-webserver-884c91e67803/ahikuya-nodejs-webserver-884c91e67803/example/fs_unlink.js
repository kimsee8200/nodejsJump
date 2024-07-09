const fs = require('fs');   // file system 모듈 가져오기

// 파일을 삭제한다.
fs.unlink('./data/delete_example.txt', function(err){
  if(err) {
    console.log("Error : ", err)
    return
  }
  console.log('삭제 성공!!')
})