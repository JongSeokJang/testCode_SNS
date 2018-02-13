const Promise = require("promise");
const request = require('request');
const cheerio = require('cheerio');
const AWS     = require('aws-sdk');

AWS.config.update({
  region : "ap-northeast-2"
})

const docClient = new AWS.DynamoDB.DocumentClient({
  endpoint : "dynamodb.ap-northeast-2.amazonaws.com"
})


const url = "http://www.yonhapnews.co.kr/it/2402000003.html";
const newsTable = "newsTable"

const summary_API_url = "http://api.sgcslab.com/textsum"
const summary_API_data = {
  "content" : "",
  "rate" : "0.3",
}


let asyncfunction = function(param){
  return new Promise( (resolved, rejected) =>{

    // 여기에서 만약 for문이 돈다면?
    //
    request(url, (error, response, body) =>{

      if(error) {
        console.log("Error: " + error);
      }
      let $ = cheerio.load(body, { decodeEntities: false });
      let newsList = $('.headline-list > ul > li > .con');

      $(newsList).each(function(i){
        console.log(1)
        let articleSource = "연합뉴스";
        let articleTitle = $(this).find('.news-tl').text();
        let articleUrl = $(this).find('.news-tl a').attr('href');

        request(articleUrl, function(error, response, body){
          console.log(2)
          let $ = cheerio.load(body, { decodeEntities: false });
          let articleContent = $('.article').text();
          console.log(articleContent)

          resolved("success")
          /*
          let timeStamp = misc.getTimeStamp().toString()
          summary_API_data.content = articleContent

          let options = {
            url : summary_API_url,
            method : "POST",
            json : summary_API_data
          }
          console.l
          */
        });

      });
    })
  });
}


let promise = asyncfunction('jong');
promise.then( (result)=>{
  console.log(result)
  console.log("hihi");
}, (err)=>{
  console.log(err)
  console.log("error");
});

