const ogs = require('open-graph-scraper');
//const options = {'url' : "http://www.facebook.com"}
const options = {"url" : "http://mylife365.tistory.com/238"}
//const options = {'url': 'http://ogp.me/'};
//const options = {"url" : "http://www.segye.com/newsView/20180202002608"}
//const options = {"url" : "http://finance.naver.com/news/news_read.nhn?mode=mainnews&office_id=003&article_id=0008429405"}


console.log(options)
ogs(options, function (error, results) {
  console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
  console.log('results:', results);
});



