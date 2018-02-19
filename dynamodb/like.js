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
const userID = "whdtjr321"

let function_arr = []
function_arr.push(
  (callback) =>{
    let check_params = {
      TableName : rankTable,
      KeyConditions : {
        "type" : {
          ComparisonOperator : "EQ",
          AttributeValueList : ["1_8"]
        },
        "userID" : {
          ComparisonOperator : "EQ",
          AttributeValueList : [userID]
        }
      }
    }

    docClient.query( check_params, (err, data) =>{

      if(err){
        console.log(err);
        callback(err, -2)
      }
      else{
        let params = {
          TableName : rankTable,
          Key : {
            "type" : "1_8",
            "userID" : userID
          },
          ExpressionAttributeNames : {
            "#likeCount" : "likeCount"
          },
          ExpressionAttributeValues : {
            ":val" : 1
          }
        }

        if(data.Count == 0) {
          params.UpdateExpression = "SET #likeCount = :val"
        }
        else{
          params.UpdateExpression = "SET #likeCount = #likeCount + :val"
        }
        
        docClient.update ( params, (err, data) =>{
          if(err){
            callback(err, -1)
          }
          else{
            callback(null, 1)
          }
        });
      }
    });
  }
)

function_arr.push(
  (callback) =>{
    let check_params = {
      TableName : rankTable,
      KeyConditions : {
        "type" : {
          ComparisonOperator : "EQ",
          AttributeValueList : ["2_2"]
        },
        "userID" : {
          ComparisonOperator : "EQ",
          AttributeValueList : [userID]
        }
      }
    }

    docClient.query( check_params, (err, data) =>{

      if(err){
        console.log(err);
        callback(err, -2)
      }
      else{
        let params = {
          TableName : rankTable,
          Key : {
            "type" : "2_2",
            "userID" : userID
          },
          ExpressionAttributeNames : {
            "#likeCount" : "likeCount"
          },
          ExpressionAttributeValues : {
            ":val" : 1
          }
        }

        if(data.Count == 0) {
          params.UpdateExpression = "SET #likeCount = :val"
        }
        else{
          params.UpdateExpression = "SET #likeCount = #likeCount + :val"
        }
        
        docClient.update ( params, (err, data) =>{
          if(err){
            callback(err, -1)
          }
          else{
            callback(null, 1)
          }
        });
      }
    });
  }
)
function_arr.push(
  (callback) =>{
    let check_params = {
      TableName : rankTable,
      KeyConditions : {
        "type" : {
          ComparisonOperator : "EQ",
          AttributeValueList : ["3_2018"]
        },
        "userID" : {
          ComparisonOperator : "EQ",
          AttributeValueList : [userID]
        }
      }
    }

    docClient.query( check_params, (err, data) =>{

      if(err){
        console.log(err);
        callback(err, -2)
      }
      else{
        let params = {
          TableName : rankTable,
          Key : {
            "type" : "3_2018",
            "userID" : userID
          },
          ExpressionAttributeNames : {
            "#likeCount" : "likeCount"
          },
          ExpressionAttributeValues : {
            ":val" : 1
          }
        }

        if(data.Count == 0) {
          params.UpdateExpression = "SET #likeCount = :val"
        }
        else{
          params.UpdateExpression = "SET #likeCount = #likeCount + :val"
        }
        
        docClient.update ( params, (err, data) =>{
          if(err){
            callback(err, -1)
          }
          else{
            callback(null, 1)
          }
        });
      }
    });
  }
)

async.parallel(function_arr, (err, data) =>{
  console.log("start parallel")
  if(err){
    console.log(err)
  }
  else{
    console.log(data);
  }
});
