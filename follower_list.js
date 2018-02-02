const AWS   = require("aws-sdk");
const misc  = require("../lib/misc.js");
require("date-utils");

AWS.config.update({
  region        : "ap-northeast-2",
  endpoint      : "dynamodb.ap-northeast-2.amazonaws.com",
});

const docClient     = new AWS.DynamoDB.DocumentClient();
const dynamodb      = new AWS.DynamoDB()
const followTable   = "followTable"

let userID = "whdtjr321"
let contentID = "123123123"
let timeStamp = misc.getTimeStamp().toString();

let params = {
  TableName : followTable,
  IndexName : "to-from-index",
  KeyConditionExpression : "#to = :to and #from < :from",
  ExpressionAttributeNames: {
    "#from"   : "from",
    "#to"     : "to"
  },
  ExpressionAttributeValues: {
    ":from"   : "~"  ,
    ":to"     : userID
  }
}
docClient.query(params, (err, data) => {
  if(err){
    console.log(err);
    //res.send(JSON.stringify(err,null,2));
  }
  else{

    let params_putRequest_arr = [];

    data.Items.forEach( (item) => {

      let temp = {
        PutRequest : {
          Item : {
            "tuID"  : { S : item.from },
            "aDate" : { S : timeStamp },
            "check" : { N : "0" },
            "aType" : { N : "3"},
            "fuID"  : { S : item.to},
            "info"  : { M : 
              {
                "pctID" : {
                  S : contentID
                },
                "ctID"  : {
                  S : "0"
                },
                "cmID"  : {
                  S : "0"
                }
              }}
          }
        }
      }
      params_putRequest_arr.push(temp); 
    });

    let params_putRequest = {
      RequestItems : {
        "alarmTable" : params_putRequest_arr
      }
    }

    console.log(params_putRequest)

    dynamodb.batchWriteItem(params_putRequest, (err, data) =>{
      if(err){
        console.log(err)
      }
      else{
        console.log(data)
      }
    });

  }
});


