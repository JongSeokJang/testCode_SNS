const AWS   = require("aws-sdk");
const misc  = require("../lib/misc.js");
require("date-utils");

AWS.config.update({
  region        : "ap-northeast-2",
  endpoint      : "dynamodb.ap-northeast-2.amazonaws.com",
  //cloudsearch   : '2013-01-01',
  // other service API versions
});


const ddb           = new AWS.DynamoDB();
const docClient     = new AWS.DynamoDB.DocumentClient();
const contentTable = "contentTable"
const userTable = "userTable"


const userID = "whdtjr321@gmail.com";
const userName = "장종석"

const deviceKey = "skdj1l2k4h1k2h4k5kj6k54isd8dfus0cx9v8"
const ftcnt = 0
const ffcnt = 0 

let params_userinfo = {
  TableName : userTable,
  KeyConditionExpression : "#id = :id",
  ExpressionAttributeNames : {
    "#id" : "userID"
  },
  ExpressionAttributeValues: {
    ":id" : userID
  }
}

docClient.query(params_userinfo, (err, data) =>{
  if(err){
    console.log("===================[ -1 ]=====================")
    console.log(err)
  }
  else{
    if ( data.Count == 0 ){ // 기존에 등록된 ID가 없으면

      let params = {
        TableName : userTable,
        Item : {
          "userID"      : userID,
          "userName"    : userName,
          "deviceKey"   : deviceKey,
          "ftCnt"       : ftcnt,
          "ffCnt"       : ffcnt
        }
      }

      docClient.put(params, (err, data) => {

        if(err){
          console.log("===================[ -2 ]=====================")
          console.log(err)
        }
        else{
          console.log("===================[ 1 ]=====================")
          console.log(data)
        }
      });
    }
    else{ // 기존에 아이디가 등록디 되었다면
      console.log("===================[ 2 ]=====================")
    }
  }
});


/*
let params = {
  TableName : userTable,
  Item : {
    "userID" : userID,
    "ftCnt" : ftcnt,
    "ffCnt" : ffcnt
  }
}

docClient.put(params, (err, data) =>{
  if(err){
    console.log(err)
  }
  else{
    console.log(data)
  }
});
*/
