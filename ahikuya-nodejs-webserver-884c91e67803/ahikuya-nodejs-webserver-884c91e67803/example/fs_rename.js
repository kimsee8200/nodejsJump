const fs = require('fs');   // file system 모듈 가져오기

let oldName = 'old_name'
let newName = 'new_name'

//파일의 이름을 변경한다.
fs.rename(`./data/${oldName}`,`./data/${newName}`,()=>{ 

  // 파일 내용 수정
  fs.writeFile('./data/'+title,'파일수정할내용','utf8',function(err){ 
      if (err ===undefined || err == null){
        return
      }
      console.log('success!!')
  });
});