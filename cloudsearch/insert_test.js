const AWS   = require("aws-sdk");
const misc  = require("../lib/misc.js");
require("date-utils");

AWS.config.update({
  region        : "ap-northeast-2",
  endpoint      : "dynamodb.ap-northeast-2.amazonaws.com",
  //cloudsearch   : '2013-01-01',
  // other service API versions
});



const docClient         = new AWS.DynamoDB.DocumentClient();
const cloudSearchDomain = new AWS.CloudSearchDomain({
  //endpoint : "doc-cstest-fi6siem6buod4broytg4w6drbe.ap-northeast-2.cloudsearch.amazonaws.com"
  //endpoint : "doc-cstest2-gc3xtsd5vgvolyxipez34uid2m.ap-northeast-2.cloudsearch.amazonaws.com"
  endpoint : "doc-cstest-fi6siem6buod4broytg4w6drbe.ap-northeast-2.cloudsearch.amazonaws.com"
})

const Table = "cstest"  

let timeStamp   = misc.getTimeStamp().toString();
let content     = timeStamp%10000000 + "번째 글입니다."
console.log(content);


let params_DDB ={
  TableName : Table,
  Item : {
    "ctype" : "1",
    "cid"   : timeStamp,
    "content" : content
  }
}

let csID = "1_" + timeStamp
let document_array = []

let documents_CS = {
  id : csID,
  type : "add",
  //fields : params_DDB.Item,
  fields : {
    "ctype" : '1',
    "cid"   : timeStamp,
    "content" : content
  }
}

document_array.push(documents_CS);

console.log(document_array[0])
let params_CS = {
  contentType : "application/json",
  documents : JSON.stringify(document_array)
}

docClient.put(params_DDB, (err, data) =>{
  if(err){
    console.log("1");
    console.log(err)
  }
  else{

    cloudSearchDomain.uploadDocuments(params_CS, (err, data) =>{
      if(err){
        console.log("2");
        console.log(err)
      }else{
        console.log("3");
        console.log(data)
      }
    });
  }
});

