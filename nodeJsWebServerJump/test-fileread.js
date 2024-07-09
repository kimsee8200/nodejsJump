let fs = require("fs");

fs.readdir("./data", function (err, filelist) {
  console.log(filelist);
});

//
