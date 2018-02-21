const async = require("async")
const AWS   = require("aws-sdk");
require("date-utils")

AWS.config.update({
  region : "ap-northeast-2"
});

const rankTable = "rankTable";
const docClient = new AWS.DynamoDB.DocumentClient({
  endpoint : "dynamodb.ap-northeast-2.amazonaws.com"
});
const date = new Date();

Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}

const CheckAndUpdate = function(options, callback){

  let type      = options.type
  let userID    = options.userID
  let val       = options.val
  
  let check_params = {
    TableName : rankTable,
    KeyConditions : {
      "type" : {
        ComparisonOperator : "EQ",
        AttributeValueList : [type]
      },
      "userID" : {
        ComparisonOperator : "EQ",
        AttributeValueList : [userID] 
      }
    }
  }
  
  docClient.query( check_params, (err, data) =>{
    if(err){
      console.log("In Check Exist Error");
      console.log(err)
      callback(err, -1)
    }
    else{
      console.log("success check Exist");
      let isExist = data.Count > 0 ? 1 : 0;
      let UpdateExpression;

      if(isExist){
        UpdateExpression = "SET #likeCount = #likeCount + :val"
      }
      else{
        UpdateExpression = "SET #likeCount = :val"
        val = 1
      }
  
      let params = {
        TableName : rankTable,
        Key : {
          "type" : type,
          "userID" : userID
        },
        UpdateExpression : UpdateExpression,
        ExpressionAttributeNames : {
          "#likeCount" : "likeCount"
        },
        ExpressionAttributeValues :{
          ":val" : val
        }
      }
      console.log(params)

      docClient.update(params, (err, data) =>{
        if(err){
          callback(err, -1)
          //callback(true, {error: err}, null);
        }
        else{
          callback(null, 1)
          //callback(false, {data: data}, null);
        }
      });
    }
  });
}

exports.run = function(options, callback){

  const userID  = options.userID
  const val     = options.val
  const month   = date.getMonth() + 1
  const week    = (new Date()).getWeek();
  const year    = date.getFullYear();

  const type_week     = "1_" + week
  const type_month    = "2_" + month
  const type_year     = "3_" + year
  
  let function_arr = []
  
  let options1 = {type : type_week,  userID : userID, val : val}
  let options2 = {type : type_month, userID : userID, val : val}
  let options3 = {type : type_year,  userID : userID, val : val}

  function_arr.push( CheckAndUpdate.bind(null, options1 ) )
  function_arr.push( CheckAndUpdate.bind(null, options2 ) )
  function_arr.push( CheckAndUpdate.bind(null, options3 ) )

  console.log("start parallel");
  async.parallel(function_arr, (err, data) =>{
    if(err){
      console.log(err)
      return callback(true, {error : err}, null);
      //callback()
    }
    else{
      console.log(data)
      return callback(false, {data:data}, null);
    }
  });

};

module.exports = function(options, callback){
  return exports.run(options, callback);
};
