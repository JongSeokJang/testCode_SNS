const request = require("request");
const cheerio = require("cheerio");

const url = "http://www.yonhapnews.co.kr/it/2402000001.html";

request(url, firstCallback);

firstCallback = function(error, response, body) {
  if(error){
    console.log("error: " + error);
  }
  else{
    let $ = cheerio.load(body, {decodeEntitles : false });
    let newsList = $('.headline-list > ul > li > .con');
  }



}


