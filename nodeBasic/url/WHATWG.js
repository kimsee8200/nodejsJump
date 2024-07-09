const myURL = new URL(
  "https://user:pass@sub.example.com:8080/p/a/t/h?query=string&rom=go#hash"
);
//#은 페이지에서의 이동에 많이 사용이됨.

//console.log(myURL);
console.log(myURL.pathname);
console.log(myURL.search);
console.log(myURL.searchParams);

myURL.pathname = "/yuri/vladimirovich/andropov";
console.log(myURL.pathname);
