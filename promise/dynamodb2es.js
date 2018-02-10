const request   = require("request");
const AWS       = require("aws-sdk");
const http_aws_es = require("http-aws-es");
const elasticsearch = require("elasticsearch");


let myCredentials = new AWS.EnvironmentCredentials('AWS');

let params = {
  TableName : "newsTable",
}

AWS.config.update({
  region : "ap-northeast-2"
});

let docClient = new AWS.DynamoDB.DocumentClient({
  endpoint : "dynamodb.ap-northeast-2.amazonaws.com"
})

let es = elasticsearch.Client({
  hosts : "https://search-test-domain-khvsmpzvj6vc3wmukajv4lycpu.ap-northeast-2.es.amazonaws.com" ,
  connectionClass : http_aws_es,
  amazonES : {
    region : "ap-northeast-2",
    credentials : myCredentials
  }
})


docClient.scan(params, (err, data) =>{
  if(err)
    console.log(err)
  else{
    //console.log(data)

    for (let ii in data.Items){
      let temp = {
        "index" : {
          "_index": "test-domain",
          "_type" : "new",
          "_id" : ii.toString()
        }
      }
      let temp_data = data.Items[ii]
      //console.log(temp);
      //console.log(temp_data)
      console.log(JSON.stringify(temp))
      console.log(JSON.stringify(temp_data))
    }
    /*
    console.log("start es");
    createIndex(es, "indexName", () =>{
      let params = {
        index : "indexName",
        id : "test",
        body : data,
        type : "datatype"
      }
      const handler = function(err, response, status){
        if(status == 200 || status == 201){
          console.log("success");  
        }
        else{
          console.log("err")
          //console.log(err);
        }
      }
      es.update(params, handler)
    })
    */
    
  }
})


const createIndex = function(es, indiceName, callback) {
  es.indices.create({ //create indices
    index: indiceName
  }, function(err) {
    if (err) { //if err return
      callback(err);
    } else { //index created
      callback(null);
    }
  });
};



