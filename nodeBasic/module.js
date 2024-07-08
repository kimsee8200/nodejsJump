const process = require("process");

process.on("beforeExit", (code) => {
  console.log("the door is on your left : " + code);
});

process.on("exit", (code) => {
  console.log("thank you", code);
});

console.log("this stop is final station of this train.");
console.log(process.env);
