const AWS   = require("aws-sdk");
const express = require("express");
const http_aws_es = require("http-aws-es");
const elasticsearch = require("elasticsearch")

let app = express();
AWS.config.update({
  region : "ap-northeast-2"
});

let myCredentials = new AWS.EnvironmentCredentials('AWS');

let es = elasticsearch.Client({
  hosts : "https://search-test-domain-khvsmpzvj6vc3wmukajv4lycpu.ap-northeast-2.es.amazonaws.com/" ,
  connectionClass : http_aws_es,
  amazonES : {
    region : "ap-northeast-2",
    credentials : myCredentials
  }
})


app.get('/', (req, res) =>{

  let keyword = req.query.keyword

  let options = {
    index : "test-domain",
    q : keyword+'*'
  }

  es.search(options, (error, response) =>{
    if(error){
      console.log(error)
      res.send(JSON.stringify({"result":"-1"}))
    }
    else{
      console.log(response);
      res.send(response.hits.hits)
    }
  });

});


app.listen(3000, () =>{
  console.log("Server running at http://localhost:3000 ");
});

