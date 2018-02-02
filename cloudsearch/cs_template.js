const AWS   = require("aws-sdk");

AWS.config.update({
  region        : "ap-northeast-2",
  cloudsearch   : '2013-01-01',
  // other service API versions
});

let cloudsearch = new AWS.CloudSearch();
let cloudSearchDomain = new AWS.CloudSearchDomain({
  endpoint : "doc-cstest2-gc3xtsd5vgvolyxipez34uid2m.ap-northeast-2.cloudsearch.amazonaws.com"
})

let params = {
  contentType : "application/json",
  //documents : JSON.stringify([data])

  documents : JSON.stringify([
    {
      "type" : "add",
      "id" : "1_12314123255",
      "fields" : {
        "cID" : "1131232314123213",
        "cType" : "1",
        "content" : "hihi"
      }
    }, {
      "type" : "add",
      "id" : "1_34534534535356",
      "fields" : {
        "cID" : "34534534535345",
        "cType" : "1",
        "content" : "hihi"
      }
    }, {
      "type" : "add",
      "id" : "1_453534534557",
      "fields" : {
        "cID" : "412353534534543",
        "cType" : "1",
        "content":"hihi"
      }
    }

  ])

}

console.log(params);
cloudSearchDomain.uploadDocuments(params, (err, data) =>{
  if(err)
    console.log(err)
  else  
    console.log(data)
});

