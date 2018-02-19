const AWS   = require("aws-sdk");
const misc  = require("../lib/misc.js");
const async = require("async");
require("date-utils");

AWS.config.update({
  region        : "ap-northeast-2",
  endpoint      : "dynamodb.ap-northeast-2.amazonaws.com",
  //cloudsearch   : '2013-01-01',
  // other service API versions
});


const ddb           = new AWS.DynamoDB();
const docClient     = new AWS.DynamoDB.DocumentClient();
const rankTable = "rankTable"

let params = {
  TableName : rankTable,
  IndexName : "type-likeCount-index",
  KeyConditionExpression : "#type = :type and #Count < :Count",
  ExpressionAttributeNames : {
    "#type" : "type",
    "#Count" : "likeCount"
  },
  ExpressionAttributeValues : {
    ":type" : "2_2",
    ":Count" : 99999999999999  
  },
  Limit : 10,
  ScanIndexForward : false
}

docClient.query(params, (err, data) =>{
  if(err){
    console.log(err)
  }
  else{
    let rank = 1;
    let function_arr = []
    data.Items.forEach( (item)=>{
      console.log(item)
      function_arr.push(
        (callback) =>{

          let params = {
            TableName : rankTable,
            Key: {
              "type" : item.type,
              "userID" : item.userID
            },
            UpdateExpression : "SET #rank = :rank",
            ExpressionAttributeNames : {
              //"#likeCount" : "likeCount",
              "#rank" : "rank"
            },
            ExpressionAttributeValues :{
              //":Count" : 1
              ":rank" : rank
            }
          }
        
          rank++;
          console.log(params)
          //callback(null, 1);
          docClient.update(params, (err, data) =>{
            if(err){
              console.log(err)
              callback(err, -1)
            }
            else{
              callback(null, 1);
            }
          });
          
        } 
      )
    });
    console.log(function_arr);
    console.log("start!!")

    async.parallel(function_arr, (err, data) =>{
      console.log("start update");
      if(err){
        console.log(err)
      }
      else{
        console.log(data)
      }
    });
  }
});



