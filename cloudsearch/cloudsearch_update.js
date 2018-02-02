const AWS   = require("aws-sdk");

AWS.config.update({
  region        : "ap-northeast-2",
  cloudsearch   : '2013-01-01',
  // other service API versions
});

let cloudsearch = new AWS.CloudSearch();
let cloudSearchDomain = new AWS.CloudSearchDomain({
  endpoint : "doc-test-wef6js5fsgowsj4fyf7gwkkwwu.ap-northeast-2.cloudsearch.amazonaws.com"
})



let data = {id : "1111111111111"};

data.type = "add"
data.fields = {
  contentType : 1,
  contentID  : "99999999999"
}

let params = {
  contentType : "application/json",
  //documents : JSON.stringify([data])

  documents : JSON.stringify([
    {
      "type" : "add",
      "id" : "1_12314123255",
      "fields" : {
        "contentid" : "1131232314123213",
        "contenttype" : "1"
      }
    }, {
      "type" : "add",
      "id" : "1_34534534535356",
      "fields" : {
        "contentid" : "34534534535345",
        "contenttype" : "1"
      }
    }, {
      "type" : "add",
      "id" : "1_453534534557",
      "fields" : {
        "contentid" : "412353534534543",
        "contenttype" : "1"
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

