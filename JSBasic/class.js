class MyClass {
  constructor(myVal1, myVal2) {
    this.myVal1 = myVal1;
    this.myVal2 = myVal2;
  }
  aa() {
    console.log("중앙위원회 주석");
  }
}

class childClass extends MyClass {
  constructor(myVal1, myVal2, myVal3) {
    super(myVal1, myVal2);
    this.myVal3 = myVal3;
  }
}
let cl = new MyClass("유리", "안드로포프");
let cl2 = new childClass("유리", "안드로포프", "kgv");
console.log(cl.myVal1);
console.log(cl.myVal2);
console.log(cl2.aa());
