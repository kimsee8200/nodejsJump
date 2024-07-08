// let myObj = {};
// console.log(typeof myObj);

// let person = {
//   name: "ahikuya",
//   gender: "남",
//   getName: function () {
//     console.log("My name is" + this.name);
//   },
// };

// console.log(typeof person);
// console.log(person);

// console.log("성별 : ", person.gender);

// person.getName();

// person.gender = "여";
// console.log("성별 : ", person.gender);

// person.age = 20;
// console.log(person.age);
// delete person.age;

// for (value in person) {
//   console.log(value);
// }

// console.log(`좋아요 ${1982 + 1984}`);

function getPerson() {
  return {
    firstName: "doyoung",
    lastName: "kim",
    age: 37,
    email: "ahikuya@gmail.com",
    city: "Seoul",
    country: "korea",
  };
}

let { firstName, lastName } = getPerson();
