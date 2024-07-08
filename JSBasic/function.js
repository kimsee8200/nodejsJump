function aa(param, param2) {
  param();
  param2();
}

function bb() {
  console.log("bb");
}
function cc() {
  console.log("cc");
}

// 익명함수
let func1 = function () {};
let func2 = (a, b) => a + b;

let result = aa(bb, cc);
console.log(result);
