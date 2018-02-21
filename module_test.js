RANK  = require("./lib/rank.js")


let options = {
  userID : "whdtjr321",
  val : 1
}

RANK(options, (err, data)=>{
  if(err){
    console.log(err)

  }
  else{
    console.log(data)
    console.log("success!!")

  }
});

