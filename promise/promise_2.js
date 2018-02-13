const Promise = require("promise");
const request = require("request");
const cheerio = require('cheerio');


const summary_API_url = "http://api.sgcslab.com/textsum"
const summary_API_data = {
  "content" : "",
  "rate" : "0.3",
  "access_token" :
"fdtjAGH5uJNAfhh0Q9Lk38jmVapF0wHAl4V6Y8tehIiSZseKOs4QoG37asPxfjLbYWXxxaRH5yUrwFu1sGR49DA33NWYsUEWPi6NEYx4tB2eoSw8rXworR8f"
}

const URL = "http://www.yonhapnews.co.kr/it/2402000003.html";


function makeUrlList(){

  return new Promise( (resolve, reject) =>{
    request(URL, (error, response, body) =>{
      if(error){
        reject(error);
      }
      else{
        let $ = cheerio.load(body, { decodeEntities: false });
        let newsList = $('.headline-list > ul > li > .con');

        $(newsList).each(function(ii) {
          let articleSource = "연합뉴스";
          let articleTitle = $(this).find('.news-tl').text();
          let articleUrl = $(this).find('.news-tl a').attr('href');
          console.log(articleTitle);
          console.log(articleUrl);
        })

        resolve(newsList);

        
      }
    });
  });
};


function getNewsInfo(newsInfo){

  return new Promise( (resolve, reject) =>{

    let articleSource = "연합뉴스";
    let articleTitle = newsInfo.find('.news-tl').text();
    let articleUrl = newsInfo.find('.news-tl a').attr('href');

    request(articleUrl, (error, response, body) =>{
      if(error){
        reject(error);
      }
      else{
        let $ = cheerio.load(body, { decodeEntities: false });
        let articleContent = $('.article').text();

        let timeStamp = misc.getTimeStamp().toString()
        summary_API_data.content = articleContent

        let options = {
          url : summary_API_url,
          method : "POST",
          json : summary_API_data
        }
        resolve(options);
      }
    })

  });
}



makeUrlList().then(results=>{
  console.log("After makeUrlList");
  let newsList = results;

  $(newsList).each(function(ii) {
    let articleSource = "연합뉴스";
    let articleTitle = $(this).find('.news-tl').text();
    let articleUrl = $(this).find('.news-tl a').attr('href');
    console.log(articleTitle);
    console.log(articleUrl);
  });
  console.log("hihi")
  //getNewsInfo(newList[0])
}, error =>{
  console.log(error);
})
  
  /*
getNewsInfo().then(results=>{
  console.log("get NewsInfo");
  console.log(results);
}, error =>{
  console.log(error);

});
*/







