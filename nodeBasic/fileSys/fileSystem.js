const fs = require("fs");
let myName = "으시안 오옹";
function myFileRead(callback) {
  fs.readFile("andropov.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    callback(data);
  });
}

// myFileRead(function (result) {
//   console.log(result);
// });

//let resultData = fs.readFileSync("andropov.txt", "utf8");
//console.log(resultData);

module.exports = {
  myFileRead,
  myName,
};
