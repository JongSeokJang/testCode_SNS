const index = require("./invoke_lambda.js");

index.handler(null, null, (err, data)=>{
  console.log(data)
})
