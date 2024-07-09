const { myFileRead, myName } = require("./fileSystem");

myFileRead(function (result) {
  console.log(result);
});
console.log(myName);
