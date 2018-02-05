const request = require("request");
const cheerio = require("cheerio");


//let url = "https://gs.saro.me/#!m=elec&jn=458"
//let url = "https://www.naver.com"
//let url ="http://www.segye.com/newsView/20180202002608"
//let url ="https://www.fb.com"
//let url = "https://www.facebook.com/"
//let url = "http://www.google.com"
let url = "http://www.naver.com"


request(url, (err, response, html) =>{
  if(err){
    console.log(err)
  }
  else{
    //console.log(response)
    
    let $ = cheerio.load(html)
    const meta = $("meta");
    console.log(meta)
    // let $ = cheerio.load(html);
    /*
    console.log($)
    let tit = $('meta[property="og:title"]').attr('content');
    let url = $('meta[property="og:url"]').attr('content');
    let img = $('meta[property="og:image"]').attr('content');
    let des = $('meta[property="og:description"]').attr('content');


    console.log(tit)
    console.log(url)
    console.log(img)
    console.log(des)
    */
  }
})
