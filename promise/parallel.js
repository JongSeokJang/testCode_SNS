const Promise = require("promise");
const request = require("request");
const AWS     = require('aws-sdk');
const cheerio = require('cheerio');
const async   = require("async");
const misc    = require('../lib/misc.js')


AWS.config.update({
  region : "ap-northeast-2"
})

const docClient = new AWS.DynamoDB.DocumentClient({
  endpoint : "dynamodb.ap-northeast-2.amazonaws.com"
})
const newsTable = "newsTable"

const summary_API_url = "http://api.sgcslab.com/textsum"
const summary_API_data = {
  "content" : "",
  "rate" : "0.3",
  "access_token" :
}

const URL = "http://www.yonhapnews.co.kr/it/2402000003.html";


function makeNewsList(){

  return new Promise( (resolve, reject) =>{
    request(URL, (error, response, body) =>{
      if(error){
        reject(error);
      }
      else{
        let $ = cheerio.load(body, { decodeEntities: false });
        let newsList = $('.headline-list > ul > li > .con');
        let function_arr = []

        $(newsList).each( function(i) {
          let articleSource = "연합뉴스";
          let articleTitle = $(this).find('.news-tl').text();
          let articleUrl = $(this).find('.news-tl a').attr('href');

          function_arr.push(
            (callback) =>{
              request(articleUrl, (error, response, body)=>{
                let $ = cheerio.load(body, { decodeEntities: false });
                let articleContent = $('.article').text();

                let timeStamp = misc.getTimeStamp().toString()
                summary_API_data.content = articleContent

                let options = {
                  url : summary_API_url,
                  method : "POST",
                  json : summary_API_data
                }
                request(options, (error, response, body) =>{
                  if(error)
                    console.log(error)
                  else{
                    let API_content = body.content
                    let API_keywords = body.keywords
                    let keywords = []

                    for( let ii = 0; ii < API_keywords.length; ii++ ){
                      let temp = API_keywords[ii].split("(");
                      keywords.push(temp[0])
                    }

                    let params = {
                      TableName : newsTable,
                      Item : {
                        "ready"       : 1,
                        "timeStamp"   : timeStamp,
                        "Source"      : articleUrl,
                        "Title"       : articleTitle,
                        "Article"     : articleContent,
                        "Language"    : "kor",
                        "Summary"     : API_content,
                        "Keywords"    : keywords,
                        "from"        : articleSource
                      }
                    }

                    docClient.put(params, (err, data) =>{
                      console.log(4)
                      if(err){
                        callback(err, -1)
                        // console.log(err)
                      }
                      else{
                        callback(null, 1)
                        //console.log("hihi")
                      }
                    })
                  }
                });
              });
            }
          )
          console.log(articleTitle)
        })
        console.log("hihi");

        resolve(function_arr);
      }
    });
  });
};

makeNewsList().then(results=>{
  async.parallel(results, (err, results) =>{
    if(err){
      console.log(err);
    }
    else{
      console.log(results);
    }
  })
}, error =>{
  console.log(error);
})








