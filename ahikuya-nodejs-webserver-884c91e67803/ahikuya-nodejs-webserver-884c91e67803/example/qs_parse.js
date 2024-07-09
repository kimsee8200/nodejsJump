const url = require('url');

// 테스트용 URL
const urlStr = 'http://localhost:3000/p/a/t/h?id=1&name=aa';

// 1. url을 파싱한다.
const parsedUrl = url.parse(urlStr, true);
console.log(parsedUrl);

// 2. parsing Query String 
// api : https://nodejs.org/docs/latest/api/querystring.html#querystringparsestr-sep-eq-options
const qs = require('querystring');
let parsedQuery = qs.parse(parsedUrl.query)    // parse() 는 쿼리 문자열을 쿼리 객체로 바꿔주는 역할을 한다.
console.log('parsedQuery=', JSON.stringify(parsedQuery));   // object를 문자열로 출력하기 위해서 JSON.stringify() 를 사용한다.