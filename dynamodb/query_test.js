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
const Table = "cstest"  

let timeStamp = misc.getTimeStamp().toString();
let val ="content"

  /*
let params = {
  TableName : "contentTable",
  //KeyConditionExpression : "#type = :type and #cID < :cID",
  KeyConditions :{
    "contentType" : {
      ComparisonOperator : "EQ",
      AttributeValueList : [
        { 
          N : "1"
        }
      ]
    },
    "contentID" :{
      ComparisonOperator : "LE",
      AttributeValueList : [
        { 
          S: timeStamp
        }
      ]
      //[{ S : timeStamp}]
    }
  },
  QueryFilter : {
    "content" : {
      ComparisonOperator : "CONTAINS",
      AttributeValueList :[
        { 
          S : "te" 
        }
      ]
    }
  } ,
  Limit :10

}
  */
  /*
let params = {
  TableName : Table,
  //KeyConditionExpression : "#type = :type and #cID < :cID",
  QueryFilter : {
    "content" :{
      ComparisonOperator : "CONTAINS",
      AttributeValueList :[
        {
          S : "content"
        }
      ]
    }
  },
  
  ExpressionAttributeNames :{
    "#type" : "ctype",
    "#cID"  : "cid" 
  },
  ExpressionAttributeValues :{
    ":type" : "1" ,
    ":cID"  : timeStamp,
    ":val"  : val
  }
}
*/

  /*
ddb.query(params, (err, data) =>{
  //docClient.query(params, (err, data) =>{
  if(err){
    console.log(err)
  }
  else{
    data.Items.forEach(function (item) {
        console.log(item);
    });

    console.log("Count : ", data.Count);
    console.log("ScannedCount : ", data.ScannedCount);
    console.log(data.LastEvaluatedKey)

  }
});
*/

var contentTable = "contentTable"

var params = {
  TableName : contentTable,
  IndexName : "content-index",
  Limit : 500,
  /* 
  AttributesToGet : [
    "contentType"
  ],
  */ 
  //Select : "COUNT"

  /* 
  ScanFilter: {
    "content": {
      ComparisonOperator: "CONTAINS",
      AttributeValueList: [
        {S: "cocomment"}
      ]
    }
  }
  */
  
};

 ddb.scan(params, function (err, data) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      } else {
        console.log(data)
       //console.log("Query succeeded.");
    /*
         data.Items.forEach(function (item) {
              console.log(item);
         });
         */
        console.log(typeof(data))
        console.log(roughSizeOfObject(data))
      }
 });


function roughSizeOfObject( object ) {

    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( var i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}

