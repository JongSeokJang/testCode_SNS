const aws = require('aws-sdk');
const lambda = new aws.Lambda({
  region: 'ap-northeast-2' //change to your region
});


let event = "hihi"

lambda.invoke({
  FunctionName: 'lambda_test_invoke',
  Payload: JSON.stringify(event, null, 2) // pass params
}, function(error, data) {
  if (error) {
    console.log(error)
    //context.done('error', error);
  }
  if(data.Payload){
    console.log(data)
    //context.succeed(data.Payload)
  }
});
