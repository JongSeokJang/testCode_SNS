var OgCrawler = require('og-crawler');
 
new OgCrawler({
    depth: 3,
    maxParallel: 5,
    silent: false,
    url: 'http://google.com'
}).crawl();

console.log("hihi")
console.log(OgCrawler)



