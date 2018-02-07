const AWS 	= require("aws-sdk");

AWS.config.update({
  region : "ap-northeast-2",
});

let docClient = new AWS.DynamoDB.DocumentClient({
  endpoint : "dynamodb.ap-northeast-2.amazonaws.com"
})

let s3 = new AWS.S3();


let contentID = "123123"
let delete_params = {
  TableName : "contentTable",
  Key : {
    "contentType"   : 1,
    "contentID"     : contentID
  },
  ReturnValues : "ALL_OLD"
}


let imgName = "default1.png"  
let params = {
  Bucket : 'drslidesns',
  Delete : {
    Objects : []
  }
};
/*
docClient.delete(delete_params, (err, data) =>{
  if(err){
    console.log("ddb delete error : ", err)
    
  }
  else{
  */
    console.log("ddb delete success");

    let temp_delete = []
    let deleteURL = ["img1.png", "img2.png"]
//let deleteURL = ["img1.png", "img2.png", "img3.png", "img4.png"]
    let newURL = ["img1.png", "img2.png"]   
if(newURL.length >= deleteURL.length){ // 삭제 하지 않아도 된다.
    console.log("not delete")
}
else{ //삭제 해야한다.

    for( let ii = newURL.length; ii < deleteURL.length; ii++){
      let temp = {
        Key : deleteURL[ii]
      }
      temp_delete.push(temp);
    }
    params.Delete.Objects = temp_delete

    s3.deleteObjects(params, function(err, data) {

      if (err){
        console.log("s3 delete error : ", err)
      }
      else{
        console.log("data:", data)
      }
    });
}
/* 
  }
})
*/
