const fs = require("fs");

let filename = "./sample-sql.js";
let sql = require(filename);
console.log("__dirname " + __dirname);

fs.watchFile(filename, (curr, prev) => {
  console.log(`curr=${curr}, prev=${prev}`);
  delete require.cache[require.resolve(filename)];
  sql = require(filename);
  console.log(sql.select());
});
