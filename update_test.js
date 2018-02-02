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


contentID = "8482531424600260"
userVoteResult = [-1,-1,1,0,0,0];

let flag = 0;
let query;
let sql_input;
for( let ii = 0; ii < 6; ii++){

  if(userVoteResult[ii] != 0){

    if(flag == 0){ // 처음 입력을 하는 경우
      let temp = "v"+(ii+1).toString()
      let temp2 = "val"+(ii+1).toString()
      query = "SET #c.#v.#"+temp+".#r = #c.#v.#"+temp+".#r + :"+temp2
      sql_input1 = {
        "#c" : "content",
        "#v" : "voteSelect",
        "#r" : "result", 
      }
      sql_input1["#"+temp] = temp
      sql_input2 = {}
      sql_input2[":"+temp2] = userVoteResult[ii]
      flag = 1
    }
    else{
      let temp = "v"+(ii+1).toString()
      let temp2 = "val"+(ii+1).toString()
      query += ", #c.#v.#"+temp+".#r = #c.#v.#"+temp+".#r + :"+temp2
      sql_input1["#"+temp] = temp
      sql_input2[":"+temp2] = userVoteResult[ii]
    }
  }
  else{

  }
}
console.log("===============================")
console.log(query)
console.log(sql_input1)
console.log(sql_input2)
console.log("===============================")

  /*
query = "SET #c.#v.#v1.#r = #c.#v.#v1.#r + :val"
query += ", #c.#v.#v2.#r = #c.#v.#v2.#r + :val"
query += ", #c.#v.#v3.#r = #c.#v.#v3.#r + :val"


let attribute = {
  "#c" : "content",
  "#v" : "voteSelect",
  "#v1": "v1",
  "#r" : "result",
}
attribute["#v2"] = "v2"
attribute["#v3"] = "v3"
console.log(query)
console.log(attribute)
  */

let params = {
  TableName : contentTable,
  Key : {
    "contentID" : contentID,
    "contentType" : 1
  },
  UpdateExpression : query,
  /*
  ExpressionAttributeNames:{

    "#c" : "content",
    "#v" : "voteSelect",
    "#v1" : "v1",
    "#v2" : "v2",
    //"#v3" : "v3"
    "#r" : "result"
  },
  */
  ExpressionAttributeNames : sql_input1,
  ExpressionAttributeValues: sql_input2
  /*
  ExpressionAttributeNames : attribute,
  ExpressionAttributeValues:{
    ":val" : 1
  }
  */
}

console.log(params);
docClient.update(params, (err, data) =>{
  if(err){
    console.log(err)
  }
  else{
    console.log(data)
  }
})
