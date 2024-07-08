const fs = require("fs");

let data = "회원 여러분";

fs.writeFile("message.txt", data, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
