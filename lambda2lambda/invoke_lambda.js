const AWS = require("aws-sdk");

AWS.config.update({
  region        : "ap-northeast-2",
  endpoint      : "dynamodb.ap-northeast-2.amazonaws.com",
});


const docClient = new AWS.DynamoDB.DocumentClient();
const testTable = "testTable"

exports.handler = (event, context, callback)=> {


  console.log("============== jsjs testtest ============")
  console.log(event);
  //callback(null, JSON.stringify(data, null));
  callback(null, JSON.stringify({"result" :  1}));
};

