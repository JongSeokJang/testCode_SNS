const ogs = require("open-graph-scraper");
const expr = /(((http(s)?:\/\/)\S+(\.[^(\n|\t|\s,)]+)+)|((http(s)?:\/\/)?(([a-zA-z\-_]+[0-9]*)|([0-9]*[a-zA-z\-_]+)){2,}(\.[^(\n|\t|\s,)]+)+))+/gi;

let url
let options

let input = "안녕하세요 오늘은 새로운 사이트를 소개해 드리려 합니다 이번에 소개해드릴 사이트는 http://mylife365.tistory.com/238 ㅇ인데요, 여기는 search 에 관하여 정리되어 있는 사이트 에요."

url = input.match(expr)
options = {"url":url[0]}

console.log(input)
console.log("============================================")

ogs(options, function(error, results){
  if(error){
    console.log("error: ", error)
  }
  else{
    console.log("results: ", results);
  }
})

