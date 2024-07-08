function main() {
  console.log("main");
  job1(job2);
}

function job1() {
  console.log("job1");
}

function job2() {
  console.log("job2");
}
