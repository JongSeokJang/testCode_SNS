var originalData = "안녕하세요 저는 장종석 입니다 이번에 알려드릴 사이트에 대해 소개해 드리려고합니다. http://mylife365.tistory.com/238 여기는 네이버 입니다."

var expUrl = /(((http(s)?:\/\/)\S+(\.[^(\n|\t|\s,)]+)+)|((http(s)?:\/\/)?(([a-zA-z\-_]+[0-9]*)|([0-9]*[a-zA-z\-_]+)){2,}(\.[^(\n|\t|\s,)]+)+))+/gi;

console.log(originalData.match(expUrl))

